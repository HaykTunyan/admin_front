import { instance } from "../services/api";

export const getUserSavings_req = async (
  userId,
  type,
  page,
  rowsPerPage,
  data
) => {
  let params = {
    type: type,
    page: page,
    limit: rowsPerPage,
  };

  let result = Object.keys(data).map((key) => {
    if (data[key]) {
      params[key] = data[key];

      return key;
    }
  });

  console.log("PARAMS ==>", params);

  const response = await instance.get(`/admin/user/${userId}/saving`, {
    params: params,
  });
  return response.data;
};

export const editUserSavings_req = async (userId, data) => {
  const response = await instance.put(`/admin/user/${userId}/saving`, data);
  return response.data;
};

export const createAffiliateLocked_req = async (data) => {
  const response = await instance.post(`/admin/user/saving/locked`, data);
  return response.data;
};

export const createAffiliateFlexible_req = async (data) => {
  const response = await instance.post(`/admin/user/saving/flexible`, data);
  return response.data;
};

export const deleteAffiliateSaving_req = async (userId, savingId) => {
  const response = await instance.delete(`/admin/user/saving`, {
    data: {
      userId: userId,
      savingId: savingId,
    },
  });
  return response.data;
};
