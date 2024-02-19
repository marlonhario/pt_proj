import React from "react"
import { TickMark } from "./Tick"

interface Props {
    width: number;
    height: number;
    view: string;
    label?: string;
    selected: boolean;
    cname: string;
    boxWidth: number;
    boxHeight: number;
    onChange: () => void;
    fontSize?: number;
    mTop?: number;
}

export const Checkbox: React.FC<Props> = ({ width, height, view, label, selected, cname, boxWidth, boxHeight, onChange, fontSize, mTop }) => {
    return (
        <div className="modern-checkbox-container" onClick={onChange}>
            <div className="checkbox-outer-box" style={{ width: boxWidth, height: boxHeight, marginTop: mTop }}>
                <TickMark
                    width={width}
                    height={height}
                    view={view}
                    className={`checkbox-tick ${selected ? cname : ""}`}
                />
            </div>
            <div className="helper-text" style={{ fontSize: fontSize }}>{label}</div>
        </div>
    )
}