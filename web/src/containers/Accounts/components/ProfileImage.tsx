import React from "react";
import Image from 'react-bootstrap/Image';

interface Props {
    profile: string;
}

export const ProfileImage: React.FC<Props> = ({ profile }) => {
    return (
        <a className="profile__image">
            <Image
                src={profile}
                rounded
            />
        </a>
    )
}