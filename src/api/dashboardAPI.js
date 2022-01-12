import { instance } from "../services/api";

export const getTotalAmounts_req = async (startDate, endDate) => {
  let queryString = "";

  if (startDate && endDate) {
    queryString = `startDate=${startDate}&endDate=${endDate}`;
  } else if (startDate) {
    queryString = `startDate=${startDate}`;
  } else if (endDate) {
    queryString = `endDate=${endDate}`;
  }

  const response = await instance.get(`/admin/dashboard?${queryString}`);
  return response.data;
};

export const getDashboardUsers_req = async (startDate, endDate) => {
  let queryString = "";

  if (startDate && endDate) {
    queryString = `startDate=${startDate}&endDate=${endDate}`;
  } else if (startDate) {
    queryString = `startDate=${startDate}`;
  } else if (endDate) {
    queryString = `endDate=${endDate}`;
  }

  const response = await instance.get(`/admin/dashboard/users?${queryString}`);
  return response.data;
};

export const getDashboardCoins_req = async (startDate, endDate) => {
  let queryString = "";

  if (startDate && endDate) {
    queryString = `startDate=${startDate}&endDate=${endDate}`;
  } else if (startDate) {
    queryString = `startDate=${startDate}`;
  } else if (endDate) {
    queryString = `endDate=${endDate}`;
  }
  const response = await instance.get(`/admin/dashboard/coins?${queryString}`);
  return response.data;
};

export const getDashboardSend_req = async (startDate, endDate) => {
  let queryString = "";

  if (startDate && endDate) {
    queryString = `startDate=${startDate}&endDate=${endDate}`;
  } else if (startDate) {
    queryString = `startDate=${startDate}`;
  } else if (endDate) {
    queryString = `endDate=${endDate}`;
  }
  const response = await instance.get(`/admin/dashboard/send?${queryString}`);
  return response.data;
};

export const getDashboardReceive_req = async (startDate, endDate) => {
  let queryString = "";

  if (startDate && endDate) {
    queryString = `startDate=${startDate}&endDate=${endDate}`;
  } else if (startDate) {
    queryString = `startDate=${startDate}`;
  } else if (endDate) {
    queryString = `endDate=${endDate}`;
  }
  const response = await instance.get(
    `/admin/dashboard/receive?${queryString}`
  );
  return response.data;
};

export const getDashboardSavings_req = async (type, startDate, endDate) => {
  let queryString = "";

  if (startDate && endDate) {
    queryString = `startDate=${startDate}&endDate=${endDate}`;
  } else if (startDate) {
    queryString = `startDate=${startDate}`;
  } else if (endDate) {
    queryString = `endDate=${endDate}`;
  }
  const response = await instance.get(
    `/admin/dashboard/savings?${queryString}&type=${type}`
  );
  return response.data;
};

export const getDashboardSavingsList_req = async (
  type,
  startDate,
  endDate,
  coinId,
  limit,
  page
) => {
  let queryString = "";

  if (startDate && endDate) {
    queryString = `startDate=${startDate}&endDate=${endDate}`;
  } else if (startDate) {
    queryString = `startDate=${startDate}`;
  } else if (endDate) {
    queryString = `endDate=${endDate}`;
  }
  const response = await instance.get(
    `/admin/dashboard/savings/list?type=${type}&coinId=${coinId}&limit=${limit}&page=${page}&${queryString}`
  );
  return response.data;
};

export const getDashboardExchanges_req = async (startDate, endDate) => {
  let queryString = "";

  if (startDate && endDate) {
    queryString = `startDate=${startDate}&endDate=${endDate}`;
  } else if (startDate) {
    queryString = `startDate=${startDate}`;
  } else if (endDate) {
    queryString = `endDate=${endDate}`;
  }
  const response = await instance.get(`/admin/dashboard/swap?${queryString}`);
  return response.data;
};
