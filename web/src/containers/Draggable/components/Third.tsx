import React, { useState } from "react"
import Nestable from 'react-nestable';

export const Third: React.FC = () => {
    const items = [
        { id: 0, text: 'Andy' },
        {
            id: 1, text: 'Harry',
            children: [
                { id: 2, text: 'David' }
            ]
        },
        { id: 3, text: 'Lisa' }
    ];

    const onChange = (treeData) => {
        console.log(treeData)
    }

    const renderItem = ({ item }) => {
        console.log(item)
        return item.text
    };

    return (
        <div style={{ height: 400 }}>
            <Nestable
                items={items}
                renderItem={renderItem}
                maxDepth={2}
            />
        </div>
    )
}