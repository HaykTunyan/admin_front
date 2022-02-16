import { instance } from "../services/api";

export const getUserWallets_req = async (userId, sortParam, sortType) => {
  let queryString = "";

  if (sortParam && sortParam !== "" && sortType && sortType !== "") {
    queryString = `sort_param=${sortParam}&sort_type=${sortType}`;
  } else if (sortParam && sortParam !== "") {
    queryString = `sort_param=${sortParam}`;
  } else if (sortType && sortType !== "") {
    queryString = `sort_type=${sortType}`;
  }

  const response = await instance.get(
    `/admin/user/${userId}/wallet?${queryString}`
  );
  return response.data;
};

export const editUserWallets_req = async (userId, walletId, limit) => {
  const response = await instance.put(`/admin/user/${userId}/wallet`, {
    walletId: walletId,
    limit: limit,
  });
  return response.data;
};

export const addToUserWallet_req = async (data) => {
  const response = await instance.post(
    `/admin/user/${data.userId}/wallet/add`,
    {
      walletId: data.walletId,
      amount: data.amount,
      addTransaction: data.transaction,
    }
  );
  return response.data;
};

export const sendToUserWallet_req = async (data) => {
  const response = await instance.post(
    `/admin/user/${data.userId}/wallet/send`,
    {
      walletId: data.walletId,
      amount: data.amount,
      addTransaction: data.transaction,
      toAddress: data.address,
    }
  );
  return response.data;
};

export const blockUserWallet_req = async (userId, walletId) => {
  const response = await instance.put(`/admin/user/${userId}/wallet/status`, {
    walletId: walletId,
  });
  return response.data;
};

export const getCoins_req = async () => {
  const response = await instance.get(`/admin/settings/coins`);
  return response.data;
};
