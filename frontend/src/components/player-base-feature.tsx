import React from "react";
import { useNavigate, useParams } from "react-router-dom";

interface PlayerBaseFeatureProps {
    title: string;
    description: string;
    resourceUrl: string;
    icon: string;
}

export const PlayerBaseFeature: React.FC<PlayerBaseFeatureProps> = (props) => {
    const { base_id } = useParams<{ base_id: string }>(); // `id` is of type string | undefined

    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleClick = (base_id: string) => {
        navigate(`/playerbases/${base_id}/${props.resourceUrl}`); // Navigate to the appropriate route
    };

    return (
        <button
            className="auth0-feature"
            onClick={() => {
                if (base_id) {
                    handleClick(base_id); // Safely convert `id` to a number
                } else {
                    console.error("ID is undefined");
                }
            }}
        >
            <h3 className="auth0-feature__headline">
                <img
                    className="auth0-feature__icon"
                    src={props.icon}
                    alt="external link icon"
                />
                {props.title}
            </h3>
            <p className="auth0-feature__description">{props.description}</p>
        </button>
    );
};
