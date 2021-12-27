import { instance } from "../services/api";

export const getUserSavings_req = async (userId, type) => {
  const response = await instance.get(
    `/admin/user/${userId}/saving?page=1&limit=10&type=${type}`
  );
  return response.data;
};

export const editUserSavings_req = async (userId, data) => {
  const response = await instance.put(`/admin/user/${userId}/saving`, data);
  return response.data;
};
