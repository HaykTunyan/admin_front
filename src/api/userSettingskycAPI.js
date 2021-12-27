import { instance } from "../services/api";

export const getUserKYC_req = async (userId) => {
  const response = await instance.get(`/admin/user/${userId}/kyc`);
  return response.data;
};

export const updateUserKYC_req = async (data) => {
  const response = await instance.put(`/admin/kyc`, data);
  return response.data;
};
