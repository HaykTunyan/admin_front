import { instance } from "../services/api";

export const getUserExchanges_req = async (userId) => {
  const response = await instance.get(`/admin/user/${userId}/exchange`);
  return response.data;
};
