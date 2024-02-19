import React from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { FixedSizeList } from "react-window";
import { useDraggable } from "../useDraggable";
import { getDestinationPath, getIndexById } from "../Utils/flast-tree";
import { TreeItem } from "./TreeItem";

interface Props {
    tree: any
    isDragEnabled: any
    renderItem: any
    onExpand: any
    onCollapse: any
    onDragEnd: any
    offsetPerLevel: number
}

export const TreeNode: React.FC<Props> = (props) => {
    const { dragState, itemsElement, flattenedTree, draggedItemId, isDragEnabled, onDragStart, onDragEnd, onDragUpdate } = useDraggable(props)

    const calculateEffectivePath = (flatItem, snapshot) => {
        if (
            dragState &&
            draggedItemId === flatItem.item.id &&
            (dragState.destination || dragState.combine)
        ) {
            const {
                source,
                destination,
                combine,
                horizontalLevel,
                mode
            } = dragState;
            // We only update the path when it's dragged by keyboard or drop is animated
            if (mode === "SNAP" || snapshot.isDropAnimating) {
                if (destination) {
                    // Between two items
                    return getDestinationPath(
                        flattenedTree,
                        source.index,
                        destination.index,
                        horizontalLevel
                    );
                }
                if (combine) {
                    // Hover on other item while dragging
                    return getDestinationPath(
                        flattenedTree,
                        source.index,
                        getIndexById(flattenedTree, combine.draggableId),
                        horizontalLevel
                    );
                }
            }
        }
        return flatItem.path;
    }

    const setItemRef = (itemId, el) => {
        if (!!el) {
            itemsElement[itemId] = el;
        }
    }

    const renderItem = (flatItem, index, style) => {
        return (
            <Draggable
                key={flatItem.item.id}
                draggableId={flatItem.item.id.toString()}
                index={index}
                isDragDisabled={!isDragEnabled}
            >
                {renderDraggableItem(flatItem, style)}
            </Draggable>
        );
    };


    const renderRow = ({ data, index, style }) => {
        const flatItem = data[index];
        return renderItem(flatItem, index, style);
    }

    const renderDraggableItem = (flatItem, style) => (provided, snapshot) => {
        const { renderItem, onExpand, onCollapse, offsetPerLevel } = props;
        const currentPath = calculateEffectivePath(flatItem, snapshot);

        return (
            <div style={style}>
                <TreeItem
                    key={flatItem.item.id}
                    item={flatItem.item}
                    path={currentPath}
                    onExpand={onExpand}
                    onCollapse={onCollapse}
                    renderItem={renderItem}
                    provided={provided}
                    snapshot={snapshot}
                    itemRef={setItemRef}
                    offsetPerLevel={offsetPerLevel}
                    dragState={dragState}
                />
            </div>
        )
    }

    const cloneDraggableItem = (provided, snapshot, rubric) => {
        const { renderItem, onExpand, onCollapse, offsetPerLevel } = props;
        const flatItem = flattenedTree[rubric.source.index];
        const currentPath = calculateEffectivePath(flatItem, snapshot);

        return (
            <TreeItem
                key={flatItem.item.id}
                item={flatItem.item}
                path={currentPath}
                onExpand={onExpand}
                onCollapse={onCollapse}
                renderItem={renderItem}
                provided={provided}
                snapshot={snapshot}
                itemRef={setItemRef}
                offsetPerLevel={offsetPerLevel}
                dragState={dragState}
            />
        );
    }
    return (
        <DragDropContext
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragUpdate={onDragUpdate}
        >
            <Droppable
                droppable="tree"
                mode="virtual"
                isCombineEnabled={true}
                renderClone={cloneDraggableItem}
                droppableId="droppable-1"
            >
                {provided => (
                    <FixedSizeList
                        height={500}
                        itemCount={flattenedTree.length}
                        itemSize={33}
                        width={700}
                        outerRef={provided.innerRef}
                        itemData={flattenedTree}
                    >
                        {renderRow}
                    </FixedSizeList>
                )}
            </Droppable>
        </DragDropContext>
    )
}