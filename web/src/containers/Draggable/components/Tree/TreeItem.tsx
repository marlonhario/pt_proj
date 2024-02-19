export const TreeItem = (props) => {
    const {
        item,
        path,
        onExpand,
        onCollapse,
        renderItem,
        provided,
        snapshot,
        itemRef,
        dragState
    } = props;

    const patchDraggableProps = (draggableProps, snapshot) => {
        const { path, offsetPerLevel } = props

        const transitions =
            draggableProps.style && draggableProps.style.transition
                ? [draggableProps.style.transition]
                : [];

        if (snapshot.dropAnimation) {
            transitions.push(
                `padding-left ${snapshot.dropAnimation.duration}s ${snapshot.dropAnimation.curve
                }`
            );
        }

        const transition = transitions.join(", ");

        return {
            ...draggableProps,
            style: {
                ...draggableProps.style,
                paddingLeft: (path.length - 1) * offsetPerLevel,
                transition
            }
        };
    }

    const innerRef = el => {
        itemRef(item.id, el);
        provided.innerRef(el);
    }

    const finalProvided = {
        draggableProps: patchDraggableProps(
            provided.draggableProps,
            snapshot
        ),
        dragHandleProps: provided.dragHandleProps,
        innerRef
    }

    return renderItem({
        item,
        dept: path.length - 1,
        onExpand: itemId => onExpand(itemId, path),
        onCollapse: itemId => onCollapse(itemId, path),
        provided: finalProvided,
        snapshot,
        dragState
    })
}