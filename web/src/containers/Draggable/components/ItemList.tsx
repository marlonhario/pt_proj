import React from "react"
import { List } from "./List"

interface Props {
    lists: any;
}

export const ItemList: React.FC<Props> = ({ lists }) => {
    return lists.map((list, index) => {
        return (
            <List list={list} index={index} key={list.id} />
        )
    })
}