import React from "react"
import moment from "moment"
import { Button, ModalBody, ModalFooter, ModalHeader, Modal, Table } from "reactstrap"
import useBaskets from "../../../services/graphQL/Baskets/useBaskets"
import actionBaskets from "./actionBaskets"

interface Props {
    toggle: () => void
    modal: boolean
}

export const BasketModal: React.FC<Props> = ({ toggle, modal }) => {
    const { dataTrash, loadingTrash } = useBaskets()
    const { handleRetrieve } = actionBaskets()

    return (
        <div>
            <Modal
                size="lg"
                isOpen={modal}
                toggle={toggle}
                contentClassName="basket--modal"
            >
                <ModalHeader toggle={toggle}>Trash Strategies</ModalHeader>
                <ModalBody>
                    <Table striped className="baskets--modal-table">
                        <thead>
                            <tr>
                                <th>Strategies</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !loadingTrash && dataTrash.getTrash.strategies.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{moment(item.deleted_at).format("YYYY-MM-DD h:mm:ss a")}</td>
                                        <td>
                                            <Button
                                                size="sm"
                                                color="danger"
                                                style={{ margin: 10 }}
                                                onClick={() => {
                                                    handleRetrieve(item.id)
                                                }}
                                            >
                                                Retrieve
                                        </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}