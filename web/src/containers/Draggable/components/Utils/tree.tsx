import { getIndexAmongSiblings, getParentPath } from "./path";

export const mutateTree = (tree, itemId, mutation) => {
    const itemToChange = tree.items[itemId];
    if (!itemToChange) {
        return tree;
    }
    return {
        rootId: tree.rootId,
        items: {
            ...tree.items,
            [itemId]: {
                ...itemToChange,
                ...mutation
            }
        }
    };
}

export const flattenTree = (tree, path) => {
    return tree.items[tree.rootId]
        ? tree.items[tree.rootId].children.reduce((accum, itemId, index) => {
            // iterating through all the children on the given level
            const item = tree.items[itemId];
            const currentPath = [...path, index];
            // we create a flattened item for the current item
            const currentItem = createFlattenedItem(item, currentPath);
            // we flatten its children
            const children = flattenChildren(tree, item, currentPath);
            // append to the accumulator
            return [...accum, currentItem, ...children];
        }, [])
        : [];
};

const createFlattenedItem = (item, currentPath) => {
    return {
        item,
        path: currentPath
    };
};

/*
  Flatten the children of the given subtree
*/
const flattenChildren = (tree, item, currentPath) => {
    return item.isExpanded
        ? flattenTree({ rootId: item.id, items: tree.items }, currentPath)
        : []
}

export const getTreePosition = (tree, path) => {
    const parent = getParent(tree, path)
    const index = getIndexAmongSiblings(path)
    return {
        parentId: parent.id,
        index
    }
}

export const getParent = (tree, path) => {
    const parentPath = getParentPath(path);
    return getItem(tree, parentPath);
}

export const getItem = (tree, path) => {
    let cursor = tree.items[tree.rootId];

    for (const i of path) {
        cursor = tree.items[cursor.children[i]];
    }

    return cursor;
}

export const moveItemOnTree = (tree, from, to) => {
    console.log("FROM", from);
    console.log("TO", to);

    const canCombine =
        typeof to.index === "undefined" && to.parentId === tree.rootId;

    return canCombine
        ? combineItemsToGroup(tree, from, to)
        : replaceItemOnTree(tree, from, to);
}

const combineItemsToGroup = (tree, from, to) => {
    console.log("CAN COMBINE");

    const isFromGroup = isGroupItem(tree, from.id);
    const isToGroup = isGroupItem(tree, to.id);

    // combine two groups
    if (isFromGroup && isToGroup) {
        return combineGroups(tree, from, to);
    }

    // combine item with group
    if (isFromGroup === false && isToGroup) {
        return combineItemWithGroup(tree, from, to);
    }

    // combine group with item
    if (isFromGroup && isToGroup === false) {
        return combineItemWithGroup(tree, to, from);
    }

    // combine two items
    return combineItems(tree, from, to);
}

const combineItemWithGroup = (tree, item, group) => {
    // remove item from the tree
    const { tree: newTree } = removeItemFromTree(tree, item);

    // add signal to the group
    const newChildren = [item.id, ...newTree.items[group.id].children];

    return mutateTree(newTree, group.id, {
        children: newChildren,
        hasChildren: true
    });
}

const combineGroups = (tree, from, to) => {
    // remove source children
    const temporaryTree = mutateTree(tree, from.id, {
        children: [],
        hasChildren: false
        // isExpanded: newSourceChildren.length > 0 && sourceParent.isExpanded
    });

    // merge source children into destination children
    const newChildren = [
        ...tree.items[to.id].children,
        ...tree.items[from.id].children
    ];

    const finalTree = mutateTree(temporaryTree, to.id, {
        children: newChildren,
        hasChildren: newChildren.length > 0
        // isExpanded: newSourceChildren.length > 0 && sourceParent.isExpanded
    });

    // remove an empty group from the tree
    return removeGroupFromTree(finalTree, from);
}

const combineItems = (tree, from, to) => {
    // remove items by their ids
    const { tree: temporaryTree } = removeItemFromTree(tree, from);
    const { tree: finalTree, indexRemoved } = removeItemFromTree(
        temporaryTree,
        to
    );

    // add group node
    return addGroupToTree(finalTree, from, to, indexRemoved);
}

const replaceItemOnTree = (tree, from, to) => {
    // prohibit nesting groups
    const isFromGroup = isGroupItem(tree, from.id);
    const isToParentGroup = isGroupItem(tree, to.parentId);
    const toRoot = to.parentId === tree.rootId;

    if (toRoot === false && isFromGroup && isToParentGroup) {
        return tree;
    }

    const { tree: temporaryTree } = removeItemFromTree(tree, from);
    const newTree = addItemToTree(temporaryTree, to, from.id);

    // console.log("FROM", tree.items[from.id]);
    // console.log("TO", tree.items[to.id]);

    const parentId = getParentIdById(newTree, from.parentId, null);
    const position = { id: from.parentId, parentId };
    return removeGroupFromTree(newTree, position);
}

const removeItemFromTree = (tree, position) => {
    const parent = tree.items[position.parentId];
    const newChildren = [...parent.children];
    const indexRemoved = newChildren.indexOf(position.id);
    newChildren.splice(indexRemoved, 1);

    const newTree = mutateTree(tree, position.parentId, {
        children: newChildren,
        hasChildren: newChildren.length > 0
        // isExpanded: newSourceChildren.length > 0 && sourceParent.isExpanded
    });

    return {
        tree: newTree,
        indexRemoved
    };
}

const removeGroupFromTree = (tree, position) => {
    const item = tree.items[position.id];

    if (position.id === tree.rootId || item.children.length > 0) {
        return tree;
    }

    const { tree: newTree } = removeItemFromTree(tree, position);
    delete newTree.items[position.id];

    return newTree;
};

const getParentIdById = (tree, itemId, nodeId) => {
    const item = tree.items[nodeId || tree.rootId];

    if (item.children.indexOf(itemId) !== -1) {
        return item.id;
    }

    let parentId;

    for (let child of item.children) {
        parentId = getParentIdById(tree, itemId, child);
        if (parentId) {
            break;
        }
    }

    return parentId;
}

const isGroupItem = (tree, itemId) => !!tree.items[itemId].children.length;

const addItemToTree = (tree, position, item) => {
    const destinationParent = tree.items[position.parentId];
    const newDestinationChildren = [...destinationParent.children];
    if (typeof position.index === "undefined") {
        if (hasLoadedChildren(destinationParent) || isLeafItem(destinationParent)) {
            newDestinationChildren.push(item);
        }
    } else {
        newDestinationChildren.splice(position.index, 0, item);
    }
    return mutateTree(tree, position.parentId, {
        children: newDestinationChildren,
        hasChildren: true
    });
}

const addGroupToTree = (tree, from, to, indexRemoved) => {
    const item = tree.items[to.id];
    const groupId = `group_${item.id}`;
    // const title = `Group ${item.data.title}`;
    const title = `The Best Bundle`;
    const children = [to.id, from.id];

    const group = {
        id: groupId,
        isExpanded: true,
        children,
        data: {
            title
        }
    };

    const itemToChange = tree.items[to.parentId];
    const newChildren = [...itemToChange.children];
    newChildren.splice(indexRemoved, 0, group.id);

    return {
        rootId: tree.rootId,
        items: {
            ...tree.items,
            [to.parentId]: {
                ...itemToChange,
                children: newChildren
            },
            [groupId]: group
        }
    };
}

const hasLoadedChildren = (item) =>
    !!item.hasChildren && item.children.length > 0;

const isLeafItem = (item) => !item.hasChildren;