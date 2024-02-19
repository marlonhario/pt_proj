import React, { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { v4 as uuidv4 } from 'uuid'
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Divider from "@material-ui/core/Divider"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"

export const Second: React.FC = () => {
    const classes = useStyles();
    const [list, setList] = useState<any>({
        fruit: {
            fruit1: { id: `fruit1`, content: `Orange` },
            fruit2: { id: `fruit2`, content: `Mangue` },
            fruit3: { id: `fruit3`, content: `Fraise` },
            fruit4: { id: `fruit4`, content: `Papaye` },
            fruit5: { id: `fruit5`, content: `Goyave` }
        },
        columns: {
            columnFruit: {
                id: `columnFruit`,
                title: `fruits`,
                fruitId: [`fruit1`, `fruit2`, `fruit3`, `fruit4`, `fruit5`]
            },
            columnEat: {
                id: `columnEat`,
                title: `eat`,
                fruitId: []
            },
            columnExtra: {
                id: `columnExtra`,
                title: `extra`,
                fruitId: []
            }
        },
        columnOrder: [`columnFruit`, `columnEat`, `columnExtra`]
    })

    const ItemData = props => {
        const { data, item, classes } = props;
        const displayItem = item.map((itemId, index) => {
            const itemValue = data.fruit[itemId];
            return (
                <Draggable key={itemValue.id} draggableId={itemValue.id} index={index}>
                    {provided => (
                        <Card
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className={classes.card}
                        >
                            <CardContent>
                                <Typography
                                    className={classes.title}
                                    color="textSecondary"
                                    gutterBottom
                                >
                                    item = {itemValue.content}
                                </Typography>
                            </CardContent>
                        </Card>
                    )}
                </Draggable>
            );
        });
        return <div>{displayItem}</div>
    }

    const TitleData = (pros) => {
        const { title } = pros
        return (
            <Typography variant="h5" component="h3" align="center">
                {title}
            </Typography>
        )
    }

    const ColumnData = (props) => {
        const { data, classes } = props
        const displayColumn = data.columnOrder.map((columnId, idx) => {
            const column = data.columns[columnId]

            return (
                <Droppable key={columnId} droppableId={column.id}>
                    {provided => (
                        <Paper
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={classes.root}
                        >
                            <Typography variant="h5" component="h3" align="center">
                                {column.title}
                            </Typography>
                            <Divider />
                            <ItemData item={column.fruitId} data={data} classes={classes} />
                            {provided.placeholder}
                        </Paper>
                        // <div
                        //     ref={provided.innerRef}
                        //     {...provided.droppableProps}
                        // // className={classes.root}
                        // >

                        //     <Draggable draggableId={columnId} droppableId={column.id} index={idx}>
                        //         {
                        //             provided1 => (
                        //                 <Paper
                        //                     ref={provided1.innerRef}
                        //                     {...provided1.draggableProps}
                        //                     {...provided1.dragHandleProps}
                        //                     className={classes.root}
                        //                 >
                        //                     <Typography variant="h5" component="h3" align="center">
                        //                         {column.title}
                        //                     </Typography>
                        //                     <Divider />
                        //                     <ItemData item={column.fruitId} data={data} classes={classes} />
                        //                     {provided1.placeholder}
                        //                 </Paper>
                        //             )
                        //         }
                        //     </Draggable>
                        //     {provided.placeholder}
                        // </div>
                    )}
                </Droppable>
            );
        })
        return <div>{displayColumn}</div>
    }

    const handleOnDragEnd = React.useCallback(
        result => {
            const { destination, source, draggableId } = result;
            // console.log(123)
            if (!destination) {
                return;
            }

            if (
                destination.droppableId === source.droppableId &&
                destination.index === source.index
            ) {
                return;
            }
            const start: any = list.columns[source.droppableId];
            const newStartFruitId = start.fruitId;
            const finish = list.columns[destination.droppableId];
            const newFinishFruitId = finish.fruitId;

            if (start === finish) {
                newStartFruitId.splice(source.index, 1);
                newStartFruitId.splice(destination.index, 0, draggableId);
                // console.log(start);
                setList({
                    ...list,
                    start
                });
            } else {
                console.log(321);
                newStartFruitId.splice(source.index, 1);
                newFinishFruitId.splice(destination.index, 0, draggableId);
                setList({
                    ...list,
                    start,
                    finish
                });
            }
        },
        [list]
    );

    return (
        <div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <ColumnData data={list} classes={classes} />
            </DragDropContext>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        width: 350,
        background: "#ebecf0",
        margin: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        whiteSpace: "normal"
    },
    backgroundRoot: {
        padding: theme.spacing(1, 2),
        background: "#fff",
        width: 420,
    },
    card: {
        width: 300,
        margin: "15px 0 0 0"
    },
    title: {
        fontSize: 14
    },
    toolbar: theme.mixins.toolbar
}))

// import React, { useState } from "react"
// import SortTree from "react-sortable-tree"
// import SolverboardTheme from 'react-sortable-tree-theme-solverboard'
// import 'react-sortable-tree/style.css'
// import { v4 as uuidv4 } from 'uuid'

// export const Second: React.FC = () => {
//     const [stree, setSTree] = useState([
//         { id: '2e447fce-4c59-491a-a381-0154baf49cd7', title: "Sample 1" },
//         { id: '9631070c-aa30-449c-8bf2-238a5813a900', title: "Sample 2" },
//         { id: 'da482752-6900-4dc5-9ce1-3820b511e1f1', title: "Sample 3" },
//         { id: 'b6d96513-828c-4b2f-bd39-8ba1edf887df', title: "Sample 4" },
//         { id: 'cee96513-828c-4b2f-bd39-8ba1edf887df', title: "Sample 5" }
//     ])

//     const dragItem: any = React.useRef()
//     const dragItemNode: any = React.useRef()
//     const [dragging, setDragging] = useState(false)

//     const onChange = (treeData) => {
//         let statTree: any = []
//         console.log(dragItem.current)
//         stree.map((item, index) => {
//             const dataTree = treeData[index] ? treeData[index] : null
//             // console.log(dataTree)
//             if (JSON.stringify(dataTree) !== JSON.stringify(item)) {
//                 const dataChildrens = dataTree ? dataTree.children : null
//                 console.log(dataTree)
//                 if (dataChildrens) {
//                     // console.log(dataTree)
//                     let ab = [{ id: dataTree.id, title: dataTree.title }]
//                     // console.log(ab)
//                     if (dataTree.children) {
//                         dataTree.children.map((i, k) => {
//                             const ck_children = i.children ? i.children : null
//                             ab.push({ id: i.id, title: i.title })
//                         })
//                         const newData = {
//                             id: uuidv4(),
//                             title: 'The Best Bundle!',
//                             expanded: true,
//                             children: ab
//                         }
//                         // console.log(newData)
//                         statTree.push(newData)
//                     }

//                     // console.log(newData)statTree.push
//                 }
//             } else {
//                 console.log(dataTree)
//                 if (dataTree) {
//                     statTree.push(dataTree)
//                 }
//             }

//             // setSTree({ ...stree, statTree })
//         })
//         setSTree(statTree)
//     }

//     React.useEffect(() => {

//     }, [stree])
//     // console.log(stree)
//     return (
//         <div style={{ height: 400 }}>
//             <SortTree
//                 ref={dragItem}
//                 className="withThemeNew"
//                 treeData={stree}
//                 onChange={(treeData) => {
//                     onChange(treeData)
//                 }}
//                 theme={SolverboardTheme}
//                 maxDepth={2}
//             />
//         </div>
//     )
// }