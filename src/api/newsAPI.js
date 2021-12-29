import { instance } from "../services/api";

export const getNews_req = async (page, rowsPerPage) => {
  const response = await instance.get(`/admin/news/all`, {
    params: {
      page: page,
      limit: rowsPerPage,
    },
  });
  return response.data;
};

export const addNews_req = async (data) => {
  const response = await instance.post(`/admin/news`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const editNews_req = async (data) => {
  const response = await instance.put(`/admin/news`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteNews_req = async (newsId) => {
  const response = await instance.delete(`/admin/news/${newsId}`);
  return response.data;
};

export const publishNews_req = async (data) => {
  const response = await instance.put(`/admin/news`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
