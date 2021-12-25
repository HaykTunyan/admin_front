import { instance } from "../services/api";

export const getUserTransactions_req = async (userId) => {
  const response = await instance.get(`/admin/user/${userId}/transaction`);
  return response.data;
};
