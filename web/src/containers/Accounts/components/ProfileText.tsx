import React from "react";

interface Props {
    title: string;
    subtitle: string;
}

export const ProfileText: React.FC<Props> = ({ title, subtitle }) => {
    return (
        <div style={{ paddingLeft: 70, fontSize: 17, paddingTop: 1, paddingBottom: 7, fontFamily: 'Raleway' }}>
            <span className="bold-text" style={{ display: "block" }}>
                {title}
            </span>
            {subtitle}
        </div>
    )
}