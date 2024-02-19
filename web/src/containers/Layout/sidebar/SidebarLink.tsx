import React from "react";
import PropTypes from "prop-types";
import { Badge } from "reactstrap";
import { NavLink } from "react-router-dom";

const SidebarLink = ({ title, icon, newLink, route, onClick, role, is_strat, is_percent, is_start }) => (
    <NavLink to={route} onClick={onClick} activeClassName="sidebar__link-active">
        {role ? (
            <li className="sidebar__link">
                {icon ? <span className={`sidebar__link-icon lnr lnr-${icon}`} /> : ""}
                <p className="sidebar__link-title">
                    {title}{" "}
                    {is_strat ? (
                        <span
                            className="sidebar__badge_strat"
                            style={{
                                color: is_percent ? (is_start ? "red" : "#70bbfd") : "",
                            }}
                        >
                            ({is_strat}
                            {is_percent ? "%" : ""})
                        </span>
                    ) : (
                        ""
                    )}
                    {newLink ? (
                        <Badge className="sidebar__link-badge">
                            <span>New</span>
                        </Badge>
                    ) : (
                        ""
                    )}
                </p>
            </li>
        ) : (
            ""
        )}
    </NavLink>
);

SidebarLink.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    newLink: PropTypes.bool,
    route: PropTypes.string,
    onClick: PropTypes.func,
    is_strat: PropTypes.number,
    is_percent: PropTypes.bool,
    is_start: PropTypes.bool,
};

SidebarLink.defaultProps = {
    icon: "",
    newLink: false,
    route: "/",
    onClick: () => {},
    role: true,
    is_strat: 0,
    is_percent: false,
};

export default SidebarLink;
