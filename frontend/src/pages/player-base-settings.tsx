import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


export const PlayerBaseSettings: React.FC = () => {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const { base_id } = useParams<{ base_id: string }>();
  

  return (
    <div className="player-base-settings-container">
        <h1 id="page-title" className="content__title">
            Player Base Settings
        </h1>

    </div>
);
};
