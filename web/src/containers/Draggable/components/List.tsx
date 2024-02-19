import React from "react"
import styled from "styled-components"
import { Draggable } from 'react-beautiful-dnd'

interface Props {
    list: any;
    index: any;
}

export const List: React.FC<Props> = ({ list, index }) => {
    const ListItem = styled.div`
        width: 200px;
        border: 1px solid grey;
        background-color: lightblue;
        padding: 10px;
    `;

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: 8 * 2,
        margin: `0 0 ${8}px 0`,
        border: `0px`,
        // change background colour if dragging
        background: isDragging ? "lightgrey" : "white",

        // styles we need to apply on draggables
        ...draggableStyle
    });

    return (
        <Draggable draggableId={list.id} index={index}>
            {(provided, snapshot) => (
                <ListItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                >
                    {list.content}
                </ListItem>
            )}
        </Draggable>
    )
}