import { instance } from "../services/api";

export const getUserSavings_req = async (userId, type, page, rowsPerPage) => {
  const response = await instance.get(`/admin/user/${userId}/saving`, {
    params: {
      type: type,
      page: page,
      limit: rowsPerPage,
    },
  });
  return response.data;
};

export const editUserSavings_req = async (userId, data) => {
  const response = await instance.put(`/admin/user/${userId}/saving`, data);
  return response.data;
};
