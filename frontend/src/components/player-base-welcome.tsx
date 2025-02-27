import React from "react";
import { useNavigate } from "react-router-dom";
import { PlayerBaseFeatures } from "./player-base-features";
import { useParams } from "react-router-dom";

export const PlayerBaseWelcome: React.FC = () => {

    const { base_id } = useParams<{ base_id: string }>();

    return (
        <div>
            <h1 id="page-title" className="content__title">
                Player Base {base_id}: Home
            </h1>

            <PlayerBaseFeatures />
        </div>
    );
};
