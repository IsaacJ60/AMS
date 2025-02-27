import React from "react";
import { useNavigate } from "react-router-dom";
import { getMaxPlayerBaseId } from "src/services/message.service";
import { useAuth0 } from "@auth0/auth0-react";

interface PlayerBase {
    base_id: number;
    name: string;
}

interface PlayerBaseListProps {
  playerBaseRecords: PlayerBase[];
  setPlayerBaseRecords: React.Dispatch<React.SetStateAction<PlayerBase[]>>; // Function to update the player list
}

export const PlayerBase: React.FC<PlayerBaseListProps> = ({ playerBaseRecords, setPlayerBaseRecords }) => {

    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleClick = (base_id: number) => {
        navigate(`/playerbases/${base_id}`); // Navigate to the appropriate route
    };

    const { getAccessTokenSilently } = useAuth0();

    const handleAddPlayerBase = async () => {
        const accessToken = await getAccessTokenSilently();

        const response = await getMaxPlayerBaseId(accessToken);
        if (response.error) {
            console.error("Failed to get max player base id:", response.error);
            return;
        }
        if (response.data && response.data.message) {
            const base_id = response.data.message["base_id"];
            console.log("Max Player Base Id FIRST:", base_id);
            navigate(`/playerbases/add-playerbase/${base_id}`);
        } 
    };

    return (
        <div className="content-layout"> 
        
        <button className="" onClick={() => {(handleAddPlayerBase())}}>Add PlayerBase</button>

        <div className="project-grid">
            {playerBaseRecords.map((item) => (
                <button
                    onClick={() => handleClick(item.base_id)} // Navigate with the id
                    className="project-card fade-in"
                    key={item.base_id}
                >
                    <h3>{item.name}</h3>
                    <p>base_id: {item.base_id}</p>
                </button>
            ))}
        </div>
        </div>
    );
};
