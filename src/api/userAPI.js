import { instance } from "../services/api";

export const getUserData_req = async (userId) => {
  const response = await instance.get(`/admin/user/${userId}`);
  return response.data;
};

export const editUserData_req = async (userId, field, value, affiliate) => {
  const response = await instance.put(`/admin/user`, {
    userId: userId,
    [`${field}`]: value,
    is_affiliate: affiliate,
  });
  return response.data;
};
