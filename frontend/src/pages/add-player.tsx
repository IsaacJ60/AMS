import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addPlayer as addPlayerAPI } from "src/services/message.service";
import { useAuth0 } from "@auth0/auth0-react";

interface Player {
  player_id: number;
  player_base_id: number; 
  name: string;
  age: number;
  gender: string;
}

interface AddPlayerProps {
  addPlayer: (newPlayer: Player) => void;
}

export const AddPlayer: React.FC<AddPlayerProps> = ({ addPlayer }) => {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const { base_id } = useParams<{ base_id: string }>();
  

  const [form, setForm] = useState<Omit<Player, "player_id" | "player_base_id">>({
    name: "",
    age: 0,
    gender: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    const accessToken = await getAccessTokenSilently();
    const newPlayer: Player = { 
      player_id: -1, 
      player_base_id: Number(base_id), // Include base_id
      ...form 
    };
  
    try {
      const response = await addPlayerAPI(accessToken, Number(base_id), newPlayer); // Pass playerBaseId
  
      if (response.error) {
        console.error("Failed to add player:", response.error);
      } else {
        addPlayer(newPlayer); // Update UI state
      }
    } catch (error) {
      console.error("Error adding player:", error);
    }

    navigate(`../players`); // Redirect based on player_base_id
  };

  return (
    <div className="add-player-container">
      <h1 id="page-title" className="content__title">Add Player</h1>
      <p>Player Base ID: {base_id}</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleInputChange}
        />
        <select name="gender" value={form.gender} onChange={handleInputChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <button type="button" onClick={handleSubmit}>
          Add Player
        </button>
      </form>
    </div>
  );
};
