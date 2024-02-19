import { getDestinationPath, getItemById } from "./flast-tree";
import { getTreePosition } from "./tree";

export const calculateFinalDropPositions = (tree, flattenedTree, dragState) => {
    const { source, destination, combine, horizontalLevel } = dragState;

    const sourceItem = flattenedTree[source.index];
    const sourcePosition = {
        ...getTreePosition(tree, sourceItem.path),
        id: sourceItem.item.id
    };

    if (combine) {
        const destinationItem = getItemById(flattenedTree, combine.draggableId);

        const position = {
            ...getTreePosition(tree, destinationItem.path)
        };

        return {
            sourcePosition,
            destinationPosition: {
                parentId: position.parentId,
                id: combine.draggableId
            }
        };
    }

    if (!destination) {
        return { sourcePosition, destinationPosition: undefined };
    }

    const destinationPath = getDestinationPath(
        flattenedTree,
        source.index,
        destination.index,
        horizontalLevel
    );

    const destinationItem = flattenedTree[destination.index];
    const destinationPosition = {
        ...getTreePosition(tree, destinationPath),
        id: destinationItem.item.id
    };

    return { sourcePosition, destinationPosition };
}