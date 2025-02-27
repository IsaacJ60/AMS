import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { updatePlayer as updatePlayerAPI } from "../services/message.service";

interface Player {
    player_id: number;
    player_base_id: number;
    name: string;
    age: number;
    gender: string;
}

interface EditPlayerProps {
    data: Player[];
    updatePlayer: (updatedPlayer: Player) => void;
}

export const EditPlayer: React.FC<EditPlayerProps> = ({
    data,
    updatePlayer,
}) => {
    const { getAccessTokenSilently } = useAuth0();
    const { player_id } = useParams<{ player_id: string }>();
    const { base_id } = useParams<{ base_id: string }>();
    const navigate = useNavigate();

    // Find the player to edit
    const existingPlayer = data.find(
        (player) => player.player_id === Number(player_id)
    );

    // State for player form
    const [player, setPlayer] = useState<Player | null>(null);

    // Populate the form when the component mounts
    useEffect(() => {
        if (existingPlayer) {
            setPlayer(existingPlayer);
        }
    }, [existingPlayer]);

    if (!player) {
        return <h2>Player not found!</h2>;
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
        const accessToken = await getAccessTokenSilently();

        try {
            const response = await updatePlayerAPI(
                accessToken,
                Number(base_id),
                player
            ); // Pass playerBaseId

            if (response.error) {
                console.error("Failed to add player:", response.error);
            } else {
                updatePlayer(player); // Update UI state
                console.log("Player updated successfully!");
            }
        } catch (error) {
            console.error("Error adding player:", error);
        }
        navigate(-1); // Go back to the player list
    };

    return (
        <div>
            <h2>Edit Player</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={player.name}
                        onChange={(e) =>
                            setPlayer({ ...player, name: e.target.value })
                        }
                    />
                </label>
                <label>
                    Age:
                    <input
                        type="number"
                        value={player.age}
                        onChange={(e) =>
                            setPlayer({
                                ...player,
                                age: Number(e.target.value),
                            })
                        }
                    />
                </label>
                <label>
                    Gender:
                    <select
                        value={player.gender}
                        onChange={(e) =>
                            setPlayer({ ...player, gender: e.target.value })
                        }
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </label>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};