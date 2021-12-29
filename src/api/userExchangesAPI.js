import { instance } from "../services/api";

export const getUserExchanges_req = async (userId, page, rowsPerPage) => {
  const response = await instance.get(`/admin/user/${userId}/exchange`, {
    params: {
      page: page,
      limit: rowsPerPage,
    },
  });
  return response.data;
};
