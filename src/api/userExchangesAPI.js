import { instance } from "../services/api";

export const getUserExchanges_req = async (
  userId,
  page,
  rowsPerPage,
  coinName
) => {
  let queryString = "";
  if (coinName && coinName !== "") {
    queryString = `coin=${coinName}`;
  }

  const response = await instance.get(
    `/admin/user/${userId}/exchange?page=${page}&limit=${rowsPerPage}&${queryString}`
  );
  return response.data;
};

export const addAffiliateExchanges_req = async (data) => {
  const response = await instance.post(`/admin/user/swap`, data);
  return response.data;
};

export const editAffiliateExchanges_req = async (data) => {
  const response = await instance.put(`/admin/user/swap`, data);
  return response.data;
};

export const deleteAffiliateExchanges_req = async (userId, id) => {
  const response = await instance.delete(
    `/admin/user/${userId}/send/receive/swap/${id}`
  );
  return response.data;
};
