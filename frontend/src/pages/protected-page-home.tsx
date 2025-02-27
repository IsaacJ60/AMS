import React from "react";
import { PageLayout } from "../components/page-layout";
import { Routes, Route, Outlet } from "react-router-dom";
import { useState } from "react";
import { ProtectedPage } from "./protected-page";
import { PlayerBaseHome } from "./player-base-home";
import { AddPlayerBase } from "./add-player-base";
import { AuthenticationGuard } from "../components/authentication-guard";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { getPlayerBases } from "../services/message.service";

interface PlayerBase {
  base_id: number;
  name: string;
}

export const ProtectedPageHome: React.FC = () => {

  const { user } = useAuth0();

  const [playerBaseRecords, setPlayerBaseRecords] = useState<PlayerBase[]>([]);

  // Add a player base to the list
  const addPlayerBase = (newPlayerBase: PlayerBase) => {
    setPlayerBaseRecords((prev) => [...prev, newPlayerBase]);
  };

  // Update an existing player base
  const updatePlayerBase = (updatedPlayerBase: PlayerBase) => {
    setPlayerBaseRecords((prev) =>
      prev.map((playerBase) =>
        playerBase.base_id === updatedPlayerBase.base_id
          ? { ...playerBase, ...updatedPlayerBase }
          : playerBase
      )
    );
  };

  const { getAccessTokenSilently } = useAuth0();

  // Fetch Player Bases on Page Load
  useEffect(() => {
    const fetchPlayerBases = async () => {
        try {
          if (!user || !user.email) {
            console.error("User email not found");
            return;
          }
          
          const accessToken = await getAccessTokenSilently();
          const response = await getPlayerBases(accessToken, user.email);
      
          if (response.error) {
            console.error("Failed to fetch player bases:", response.error);
          } else if (response.data && Array.isArray(response.data.message)) {
            console.log("Player Bases:", response.data.message); // Debugging
            
            // Explicitly assert response.data.message as PlayerBase[]
            setPlayerBaseRecords(response.data.message as PlayerBase[]);
          } else {
            console.error("Unexpected API response format", response);
          }
        } catch (error) {
          console.error("Error fetching player bases:", error);
        }
      };      

    fetchPlayerBases();
  }, [getAccessTokenSilently]);

  return (
    <PageLayout>
      <div className="content-layout">
        <Routes>
          {/* Main Protected Page */}
          <Route path="/" element={<ProtectedPage playerBaseRecords={playerBaseRecords} setPlayerBaseRecords={setPlayerBaseRecords} />} />

          {/* Player Base Specific Pages */}
          <Route path="/:base_id/*" element={<PlayerBaseHome />} />

          {/* Add Player Base Page */}
          <Route
            path="/add-playerbase/:playerBaseRecordsLength"
            element={<AddPlayerBase addPlayerBase={addPlayerBase} />} 
          />
        </Routes>
        <Outlet />
      </div>
    </PageLayout>
  );
};
