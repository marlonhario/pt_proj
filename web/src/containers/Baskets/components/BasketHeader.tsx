import React, { useState } from "react";
import { Button, Col, Collapse, Nav, Navbar, NavbarToggler, NavItem } from "reactstrap";
import Swal from "sweetalert2";

import RefreshIcon from "mdi-react/RefreshIcon";
import PlayIcon from "mdi-react/PlayIcon";
import PlusIcon from "mdi-react/PlusIcon";
import DownloadIcon from "mdi-react/DownloadIcon";
import UploadIcon from "mdi-react/UploadIcon";
import DeleteIcon from "mdi-react/DeleteIcon";

import { useDeleteAllStrategiesMutation } from "../../../generated/graphql";
import { getAccessToken } from "../../../accessToken";
import { toastify } from "../../../components/Toastify";
import useBaskets from "../../../services/graphQL/Baskets/useBaskets";

export const BasketHeader: React.FC = () => {
    const token = getAccessToken();
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const [deleteAllStrategies] = useDeleteAllStrategiesMutation();
    const { refetchStrategies } = useBaskets();

    const handleDelete = () => {
        Swal.fire({
            title: "Warning",
            text: "Are you sure you want to delete all?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            allowOutsideClick: false,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await deleteAllStrategies({
                        variables: {
                            token: token,
                        },
                    });
                    if (data.deleteAllStrategies.strategies) {
                        toastify(200, "Successfully deleted!");
                        refetchStrategies();
                    }
                } catch (e) {
                    toastify(400, `Error upon delete, ${e}`);
                }
            }
        });
    };

    return (
        <Col>
            <Navbar color="light" light expand="md">
                <h3>Basket</h3>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem className="nav-item-basket">
                            <Button className="icon nav-basket-btn" outline block>
                                <p>
                                    <RefreshIcon /> Refresh
                                </p>
                            </Button>
                        </NavItem>
                        <NavItem className="nav-item-basket">
                            <Button className="icon nav-basket-btn" outline block>
                                <p>
                                    <PlayIcon /> Recalculate
                                </p>
                            </Button>
                        </NavItem>
                    </Nav>
                    <Nav className="justify-content-end" navbar>
                        <NavItem className="nav-item-basket">
                            <Button className="icon nav-basket-btn" outline block>
                                <p>
                                    <PlusIcon /> Portfolio
                                </p>
                            </Button>
                        </NavItem>
                        <NavItem className="nav-item-basket">
                            <Button className="icon nav-basket-btn" outline block>
                                <p>
                                    <DownloadIcon /> Download
                                </p>
                            </Button>
                        </NavItem>
                        <NavItem className="nav-item-basket">
                            <Button className="icon nav-basket-btn" outline block>
                                <p>
                                    <UploadIcon /> Upload
                                </p>
                            </Button>
                        </NavItem>
                    </Nav>
                    <Nav className="content-delete" navbar>
                        <NavItem className="nav-item-basket">
                            <Button className="icon basket-btn-delete" block color="danger" onClick={handleDelete}>
                                <p>
                                    <DeleteIcon /> Delete ALL
                                </p>
                            </Button>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </Col>
    );
};
