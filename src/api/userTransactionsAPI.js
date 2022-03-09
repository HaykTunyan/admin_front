import { instance } from "../services/api";

export const getUserTransactions_req = async (userId, data) => {
  const response = await instance.get(`/admin/user/${userId}/transaction`, {
    params: data,
  });
  return response.data;
};

export const createAffiliateSend_req = async (data) => {
  const response = await instance.post(`/admin/user/send`, data);
  return response.data;
};

export const createAffiliateReceive_req = async (data) => {
  const response = await instance.post(`/admin/user/receive`, data);
  return response.data;
};

export const editAffiliateSend_req = async (data) => {
  const response = await instance.put(`/admin/user/send`, data);
  return response.data;
};

export const editAffiliateReceive_req = async (data) => {
  const response = await instance.put(`/admin/user/receive`, data);
  return response.data;
};
