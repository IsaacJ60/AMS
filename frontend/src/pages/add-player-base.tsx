import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { addPlayerBase as addPlayerBaseAPI } from "../services/message.service";
import { addUserPlayerBase as AddUserPlayerBaseAPI} from "../services/message.service";

interface PlayerBase {
    base_id: number;
    name: string;
}

interface AddPlayerBaseProps {
  addPlayerBase: (newPlayerBase: PlayerBase) => void;
}

export const AddPlayerBase: React.FC<AddPlayerBaseProps> = ({ addPlayerBase }) => {

  const { user } = useAuth0();

  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const { playerBaseRecordsLength } = useParams<{ 
    playerBaseRecordsLength: string;  // NEW PARAMETER
  }>();  

  const [form, setForm] = useState<Omit<PlayerBase, "base_id">>({
    name: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,}));
  };

  const handleSubmit = async () => {
    const accessToken = await getAccessTokenSilently();
    const newPlayerBase: PlayerBase = { 
      base_id: Number(playerBaseRecordsLength), // Include base_id
      ...form 
    };
  
    try {
        const response = await addPlayerBaseAPI(accessToken, form.name); // Pass playerBaseId

        if (response.data && response.data.message && user && user.email) {
          newPlayerBase.base_id = response.data.message.base_id;
          const user_response = await AddUserPlayerBaseAPI(accessToken, user.email, response.data.message.base_id);
        }

        if (response.error) {
            console.error("Failed to add player base:", response.error);
          } else {
            addPlayerBase(newPlayerBase); // Update UI state
        }
    } catch (error) {
        console.error("Error adding player:", error);
    }

    navigate(`/playerbases/${Number(playerBaseRecordsLength)}`);
  };

  return (
    <div className="add-player-container">
      <h1 id="page-title" className="content__title">Add Player Base</h1>
      <p>Player Base ID: {Number(playerBaseRecordsLength)}</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleSubmit}>
          Add Player Base
        </button>
      </form>
    </div>
  );
};
