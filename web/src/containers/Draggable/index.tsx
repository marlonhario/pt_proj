import React from "react"
import { Col, Row } from "reactstrap"
import { treeData } from "./components/data"
import { First } from "./components/First"
import { Second } from "./components/Second"
import { Third } from "./components/Third"
import { TreeNode } from "./components/Tree/Tree"
import { useDraggable } from "./components/useDraggable"
import styled from "styled-components"
import ChevronDownIcon from "mdi-react/ChevronDownIcon"
import ChevronRightIcon from "mdi-react/ChevronRightIcon"
import { moveItemOnTree, mutateTree } from "./components/Utils/tree"

export const DraggablePage: React.FC = () => {
    const [tree, setTree] = React.useState({ tree: treeData })
    console.log(tree)
    const renderItem = ({
        item,
        onExpand,
        onCollapse,
        provided,
        snapshot,
        dragState
    }) => {

        return (
            <div ref={provided.innerRef} {...provided.draggableProps}>
                <StyledRow
                    text={item.data ? item.data.title : ""}
                    dnd={{ dragHandleProps: provided.dragHandleProps }}
                    combine={snapshot.isDragging && dragState && dragState.combine}
                    group={!!item.children.length}
                    icon={getIcon(item, onExpand, onCollapse)}
                />
            </div>
        );
    }

    const xRow = ({ className, icon, text, dnd }) => (
        <div className={className} {...dnd.dragHandleProps}>
            {icon}
            {text}
        </div>
    )

    const StyledRow = styled(xRow) <any>`
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 33px;
        padding: 0 10px;
        background: ${props => (props.combine ? "orange" : "#282828")};
        border-bottom: 1px solid rgba(255, 255, 255, 0.26);
        color: ${props => (props.group ? "white" : "rgba(255, 255, 255, 0.65)")};
        font-family: "Roboto", sans-serif;
        font-size: 13px;
    `;

    const getIcon = (item, onExpand, onCollapse) => {
        if (item.children && item.children.length > 0) {
            return item.isExpanded ? (
                <div onClick={() => onCollapse(item.id)}>
                    <ChevronDownIcon />
                </div>
            ) : (
                    <div onClick={() => onExpand(item.id)}>
                        <ChevronRightIcon />
                    </div>
                );
        }
        return null;
    }

    const onExpand = (itemId) => {
        setTree({
            tree: mutateTree(tree.tree, itemId, { isExpanded: true })
        })
    }

    const onCollapse = (itemId) => {
        setTree({
            tree: mutateTree(tree.tree, itemId, { isExpanded: false })
        })
    }

    const onDragEnd = (source, destination) => {
        const trees = tree

        if (!destination) {
            return
        }

        const newTree = moveItemOnTree(trees.tree, source, destination)
        setTree({ tree: newTree })
    }
    console.log(tree)
    return (
        <Col>
            <Row>
                <Col>
                    <First />
                </Col>
                <Col>
                    <Second />
                </Col>
                <Col>
                    <TreeNode
                        tree={tree}
                        isDragEnabled={true}
                        renderItem={renderItem}
                        onExpand={onExpand}
                        onCollapse={onCollapse}
                        onDragEnd={onDragEnd}
                        offsetPerLevel={30}
                    />
                </Col>
            </Row>
        </Col >
    )
}