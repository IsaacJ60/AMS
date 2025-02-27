import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../models/api-response";
import { callExternalApi } from "./external-api.service";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

// Fetch max player base id
export const getMaxPlayerBaseId = async (
  accessToken: string,
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/player-bases-count`, // Updated endpoint
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return { data: data, error };
};

// Fetch player bases
export const getPlayerBases = async (
  accessToken: string,
  email: string
  ): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/player-bases-user`, // Updated endpoint
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      email
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return { data, error };
}

// Add a player base
export const addPlayerBase = async (
  accessToken: string,
  name: string
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/player-bases`, // Updated endpoint
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: { name },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return { data, error };
};

// Add a player base to a user's list
export const addUserPlayerBase = async (
  accessToken: string,
  email: string,
  user_base_id: number
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/user-player-bases`, // Updated endpoint
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: { email, user_base_id },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return { data, error };
};

// Fetch all players within a specific player base
export const getPlayersByBase = async (
  accessToken: string,
  playerBaseId: number
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/player-bases/${playerBaseId}/players`, // Updated endpoint
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return { data, error };
};

// Add a player to a specific player base
export const addPlayer = async (
  accessToken: string,
  playerBaseId: number,
  player: any
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/player-bases/${playerBaseId}/players`, // Updated endpoint
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: player,
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return { data, error };
};

// Update a specific player within a player base
export const updatePlayer = async (
  accessToken: string,
  playerBaseId: number,
  player: any
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/player-bases/${playerBaseId}/players/${player.player_id}`, // Updated endpoint
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: player,
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return { data, error };
};

// Delete a player from a specific player base
export const deletePlayer = async (
  accessToken: string,
  playerBaseId: number,
  playerId: number
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/player-bases/${playerBaseId}/players/${playerId}`, // Updated endpoint
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return { data, error };
};

// Fetch admin resources (unchanged)
export const getAdminResource = async (
  accessToken: string
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/messages/admin`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return { data, error };
};
