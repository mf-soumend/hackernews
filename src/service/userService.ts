import { api, endPoints } from "src/api";

export const fetchUserDetails = async (token: string) => {
  return api.get(endPoints.auth.fetchUserDetails, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
