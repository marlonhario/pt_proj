import React from "react"

interface Props {
    width: number;
    height: number;
    view: string;
    className: string;
}

export const TickMark: React.FC<Props> = ({ width, height, view, className }) => {
    return (
        <svg width={width} height={height} viewBox={view} fill="none" className={className}>
            <path
                d="M17.736.36a.981.981 0 00-1.272 0L5.68 9.943 1.536 6.26a.981.981 0 00-1.272 0 .739.739 0 000 1.131l4.78 4.25a.982.982 0 001.273 0l11.42-10.15a.739.739 0 000-1.132z"
                fill="#666"
            />
        </svg>
    )
}