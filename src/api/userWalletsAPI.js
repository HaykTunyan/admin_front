import { instance } from "../services/api";

export const getUserWallets_req = async (userId) => {
  const response = await instance.get(`/admin/user/${userId}/wallet`);
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
