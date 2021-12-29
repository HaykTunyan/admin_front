import { instance } from "../services/api";

export const getUserTransactions_req = async (userId, page, rowsPerPage) => {
  const response = await instance.get(`/admin/user/${userId}/transaction`, {
    params: {
      page: page,
      limit: rowsPerPage,
    },
  });
  return response.data;
};
