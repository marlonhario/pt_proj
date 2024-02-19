import React from 'react';
import classnames from 'classnames';
import {
    Nav, NavItem, NavLink, Col
} from "reactstrap";
import { NavProps } from "../helpers";


const Navs = ({ navList, toggleTab, activeTab }: NavProps) => {
    const navElements = (
        <Col md={5}>
            <Nav tabs>
                {navList.map((nav) => (
                    <NavItem key={nav.tab}>
                        <NavLink
                            className={classnames({ active: activeTab === nav.tab })}
                            onClick={() => {
                                toggleTab(nav.tab);
                            }}
                        >
                            {nav.title}
                        </NavLink>
                    </NavItem>
                ))}
            </Nav>
        </Col>
    )

    return navElements;
}

export default Navs;