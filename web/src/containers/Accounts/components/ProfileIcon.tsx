import { MdiReactIconProps } from "mdi-react";
import React, { ComponentType } from "react";

interface Props {
    Icon: ComponentType<MdiReactIconProps>;
}

export const ProfileIcon: React.FC<Props> = ({ Icon }) => {
    return (
        <div
            style={{
                backgroundColor: '#13EFB4',
                textAlign: "center",
                float: "left",
                padding: 17,
                width: 57,
                height: 57
            }}
        >
            <Icon
                style={{ color: "white" }}
            />
        </div>
    )
}