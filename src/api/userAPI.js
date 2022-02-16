import { instance } from "../services/api";

export const getUserData_req = async (userId) => {
  const response = await instance.get(`/admin/user/${userId}`);
  return response.data;
};

export const editUserData_req = async (userId, field, value) => {
  const response = await instance.put(`/admin/user`, {
    userId: userId,
    [`${field}`]: value,
  });
  return response.data;
};

export const createAffiliateUser_req = async (data) => {
  const response = await instance.post(`/admin/user`, data);
  return response.data;
};
