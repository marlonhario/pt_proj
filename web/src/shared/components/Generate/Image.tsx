import React from "react";
import Image from 'react-bootstrap/Image';

interface Props {
    url: string;
}

export const GenerateImage: React.FC<Props> = ({ url }) => {
    return (
        <a className="">
            <Image
                src={url}
            />
        </a>
    )
}