import { instance } from "../services/api";

export const getTotalAmounts_req = async (startDate, endDate) => {
  let queryString = "";

  if (startDate && endDate) {
    queryString = `start_date=${startDate}&end_date=${endDate}`;
  } else if (startDate) {
    queryString = `start_date=${startDate}`;
  } else if (endDate) {
    queryString = `end_date=${endDate}`;
  }

  const response = await instance.get(`/admin/dashboard?${queryString}`);
  return response.data;
};

export const getDashboardUsers_req = async (startDate, endDate) => {
  let queryString = "";

  if (startDate && endDate) {
    queryString = `start_date=${startDate}&end_date=${endDate}`;
  } else if (startDate) {
    queryString = `start_date=${startDate}`;
  } else if (endDate) {
    queryString = `end_date=${endDate}`;
  }

  const response = await instance.get(`/admin/dashboard/users?${queryString}`);
  return response.data;
};

export const getDashboardCoins_req = async (data) => {
  let params = {};

  Object.keys(data).map((key) => {
    if (data[key]) {
      params[key] = data[key];

      return key;
    }
  });

  const response = await instance.get(`/admin/dashboard/coins`, {
    params: params,
  });
  return response.data;
};

export const getDashboardSend_req = async (data) => {
  let params = {};

  Object.keys(data).map((key) => {
    if (data[key]) {
      params[key] = data[key];

      return key;
    }
  });

  const response = await instance.get(`/admin/dashboard/send`, {
    params: params,
  });
  return response.data;
};

export const getDashboardReceive_req = async (data) => {
  let params = {};

  Object.keys(data).map((key) => {
    if (data[key]) {
      params[key] = data[key];

      return key;
    }
  });

  const response = await instance.get(`/admin/dashboard/receive`, {
    params: params,
  });
  return response.data;
};

export const getDashboardSavings_req = async (type, data) => {
  let params = {};

  Object.keys(data).map((key) => {
    if (data[key]) {
      params[key] = data[key];

      return key;
    }
  });

  const response = await instance.get(`/admin/dashboard/savings?type=${type}`, {
    params: params,
  });
  return response.data;
};

export const getDashboardSavingsList_req = async (type, data) => {
  let params = {};

  Object.keys(data).map((key) => {
    if (data[key]) {
      params[key] = data[key];

      return key;
    }
  });

  const response = await instance.get(
    `/admin/dashboard/savings/list?type=${type}`,
    {
      params: params,
    }
  );
  return response.data;
};

export const getDashboardExchanges_req = async (data) => {
  let params = {};

  Object.keys(data).map((key) => {
    if (data[key]) {
      params[key] = data[key];

      return key;
    }
  });

  const response = await instance.get(`/admin/dashboard/swap`, {
    params: params,
  });
  return response.data;
};
