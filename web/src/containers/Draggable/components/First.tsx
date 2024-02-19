import React, { useState } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { items } from "./data"

import { ItemList } from "./ItemList"

export const First: React.FC = () => {
    const [state, setState] = useState<any>({ lists: items })

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const lists = reorder(
            state.lists,
            result.source.index,
            result.destination.index
        )

        setState({ lists })
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "lightblue" : "lightblue",
        padding: 25,
        width: 250,
        margin: "auto"
    });

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            <ItemList lists={state.lists} />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}