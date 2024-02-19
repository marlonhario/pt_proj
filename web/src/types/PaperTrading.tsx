export interface PaperList {
    rootId: string;
    items: Object;
}

export interface onDragStart {
    draggableId: string
    mode: string
    source: {
        droppableId: string
        index: number
    }
    type: string
}

export interface onDragUpdate {
    combine: {
        draggableId: string
        droppableId: string
    } | null
    destination: {
        droppableId: string
        index: number
    } | null
    draggableId: string
    mode: string
    source: {
        droppableId: string
        index: number
    }
    type: string
}

export interface onDragEnd {
    combine: {
        draggableId: string
        droppableId: string
    } | null
    destination: {
        droppableId: string
        index: number
    }
    mode: string
    reason: string
    source: {
        index: number
        droppableId: string
    }
    type: string
}

export interface onDragSource {
    id: string
    index: number
    parentId: string
}

export interface onDragDestination {
    id: string
    index: number | null
    parentId: string
}