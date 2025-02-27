import React from "react";
import { PageLayout } from "../components/page-layout";
import { useParams } from "react-router-dom";
import { PlayerBaseFeatures } from "src/components/player-base-features";
import { Routes, Route, Outlet } from "react-router-dom";
import { PlayerList } from "./player-list";
import { AddPlayer } from "./add-player";
import { useState } from "react";
import { PlayerBaseWelcome } from "src/components/player-base-welcome";
import { EditPlayer } from "./edit-player";
import { PlayerBaseSettings } from "./player-base-settings";

interface Player {
  player_id: number;
  player_base_id: number;
  name: string;
  age: number;
  gender: string;
}

export const PlayerBaseHome: React.FC = () => {

    const { base_id } = useParams<{ base_id: string }>();
  
      // State for playerRecords
    const [playerRecords, setPlayerRecords] = useState<Player[]>([]);

  // Add a player to the list
    const addPlayer = (newPlayer: Player) => {
      setPlayerRecords((prev) => [...prev, newPlayer]);
    };

    const updatePlayer = (updatedPlayer: Player) => {
      setPlayerRecords((prev) =>
        prev.map((player) =>
          player.player_id === updatedPlayer.player_id
            ? { ...player, ...updatedPlayer } // Ensuring all properties exist
            : player
        )
      );
    };    

  return (
      <div className="content-layout">

        <Routes>
        <Route
          path="/"
          element={<PlayerBaseWelcome />}
        />
        <Route
          path="players"
          element={<PlayerList playerRecords={playerRecords} setPlayerRecords={setPlayerRecords} />}
        />
        <Route
          path="settings"
          element={<PlayerBaseSettings />}
        />
        <Route
          path="players/add-player/"
          element={<AddPlayer addPlayer={addPlayer} />}
        />
        <Route
          path="players/edit/:player_id"
          element={<EditPlayer data={playerRecords} updatePlayer={updatePlayer} />}
        />
      </Routes>
      <Outlet />
      </div>
  );
};
