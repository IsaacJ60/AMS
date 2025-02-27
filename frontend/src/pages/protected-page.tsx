import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { getPlayersByBase } from "../services/message.service";
import { PlayerBase } from "../components/player-base";

interface PlayerBase {
    base_id: number;
    name: string;
}

interface PlayerListProps {
  playerBaseRecords: PlayerBase[];
  setPlayerBaseRecords: React.Dispatch<React.SetStateAction<PlayerBase[]>>; // Function to update the player list
}

export const ProtectedPage: React.FC<PlayerListProps> = ({ playerBaseRecords, setPlayerBaseRecords }) => {

  return (
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Your Players
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              See, edit, and manage your players here.
            </span>
            {/* <span>
              <strong>Only authenticated users can access this page.</strong>
            </span> */}
          </p>
          <PlayerBase playerBaseRecords={playerBaseRecords} setPlayerBaseRecords={setPlayerBaseRecords} /> 
        </div>
      </div>
  );
};
