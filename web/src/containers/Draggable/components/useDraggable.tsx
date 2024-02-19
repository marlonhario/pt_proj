import React from "react"
import { flattenTree, mutateTree } from "./Utils/tree"
import { calculateFinalDropPositions } from "./Utils/tree-utils";
export const useDraggable = (props) => {
    let dragState;
    let itemsElement = {};
    const [draggedItemId, setDraggedItemId] = React.useState()
    const [isDragEnabled, setIsDragEnabled] = React.useState([])

    const finalTree = closeParentIfNeeded(props.tree.tree, draggedItemId)
    const flattenedTrees = flattenTree(finalTree, []);

    const flattenedTree = flattenedTrees

    function closeParentIfNeeded(tree, draggedItemId) {
        if (!!draggedItemId) {
            return mutateTree(tree, draggedItemId, {
                isExpanded: false
            });
        }
        return tree;
    }
    React.useEffect(() => {

    }, [])

    const onDragStart = (result) => {
        dragState = {
            source: result.source,
            destination: result.source,
            mode: result.mode
        };
        setDraggedItemId(result.draggableId);
    }

    const onDragUpdate = (update) => {
        if (!dragState) {
            return;
        }

        dragState = {
            ...dragState,
            destination: update.destination,
            combine: update.combine
        }
    }

    const onDragEnd = (result) => {
        const { onDragEnd, tree } = props;

        const finalDragState = {
            ...dragState,
            source: result.source,
            destination: result.destination,
            combine: result.combine
        };

        setDraggedItemId(undefined);

        const { sourcePosition, destinationPosition } = calculateFinalDropPositions(
            tree.tree,
            flattenedTree,
            finalDragState
        );

        onDragEnd(sourcePosition, destinationPosition);

        dragState = undefined;
    }

    return {
        dragState,
        itemsElement,
        flattenedTree,
        isDragEnabled,
        draggedItemId,
        onDragStart,
        onDragEnd,
        onDragUpdate,
    }
}