import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { getPlayersByBase } from "../services/message.service";
import { CodeSnippet } from "../components/code-snippet";
import { deletePlayer as deletePlayerAPI } from "../services/message.service";

interface Player {
  player_id: number;
  player_base_id: number;
  name: string;
  age: number;
  gender: string;
}

interface PlayerListProps {
  playerRecords: Player[];
  setPlayerRecords: React.Dispatch<React.SetStateAction<Player[]>>; // Function to update the player list
}

export const PlayerList: React.FC<PlayerListProps> = ({ playerRecords, setPlayerRecords }) => {

  const [message, setMessage] = useState<string>("");
  
  const { getAccessTokenSilently } = useAuth0();


  const navigate = useNavigate();
  const { base_id } = useParams<{ base_id: string }>();
  const playerRecordsLength = playerRecords.length;

  useEffect(() => {
    let isMounted = true;
  
    const fetchPlayers = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getPlayersByBase(accessToken, Number(base_id));
  
      if (!isMounted) return;
  
      if (data && data.message) {
        console.log("Player Records:", data.message);  // Ensure correct structure
        const formattedPlayers: Player[] = data.message.map((player: any) => ({
          player_id: player.id, // Change 'id' to 'player_id'
          player_base_id: Number(base_id), // Ensure player_base_id is set correctly
          name: player.name,
          age: Number(player.age), // Convert age to a number if needed
          gender: player.gender,
        }));
  
        setPlayerRecords(formattedPlayers);

        setMessage(JSON.stringify(data.message, null, 2));
      }
  
      if (error) {
        setMessage(JSON.stringify(error, null, 2));
      }
    };
  
    fetchPlayers();
  
    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently, base_id, setPlayerRecords]);
  

  const handleAddPlayerClick = () => {
    navigate(`/playerbases/${base_id}/players/add-player`);
  };

  // Navigate to edit page with player ID
  const handleEditPlayerClick = (player_id: number) => () => {
    navigate(`/playerbases/${base_id}/players/edit/${player_id}`);
  };

  // Function to delete a player
  const handleDeletePlayerClick = (player_id: number) => async () => {
    // update backend
    const accessToken = await getAccessTokenSilently();
    
    try {
        const response = await deletePlayerAPI(
            accessToken,
            Number(base_id),
            player_id
        ); // Pass playerBaseId

        if (response.error) {
            console.error("Failed to delete player:", response.error);
        } else {
            // Update the frontend
            setPlayerRecords((prev) => prev.filter((player) => player.player_id !== player_id));

            console.log("Player deleted successfully!");
        }
    } catch (error) {
        console.error("Error deleting player:", error);
    }
  };

  return (
    <div className="player-list-container">

      <h1 id="page-title" className="content__title">Player List</h1>
      <div className="player-list-buttons">
        <button onClick={handleAddPlayerClick} className="player-list-button">
          Add Player
        </button>
      </div>
      <table className="player-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody className="player-list-table-body">
          {playerRecords.length > 0 ? (
            playerRecords.map((player) => (
              <tr className="fade-in" key={player.player_id}>
                <td>{player.player_id}</td>
                <td>{player.name}</td>
                <td>{player.age}</td>
                <td>{player.gender}</td>
                <td>
                  <div className="player-list-buttons">
                  <button
                    className="table-list-button"
                    onClick={handleEditPlayerClick(player.player_id)}
                  >
                    Edit
                  </button>
                  <button
                    className="table-list-button"
                    onClick={handleDeletePlayerClick(player.player_id)}
                  >
                    Delete
                  </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No players added yet.</td>
            </tr>
          )}
        </tbody>
      </table>    
    </div>
  );
};
