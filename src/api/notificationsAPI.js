import { instance } from "../services/api";

export const getNotifTemplates_req = async () => {
  const response = await instance.get(
    `/admin/notification-templates/all?page=1&limit=50`
  );
  return response.data;
};

export const createNotifTemplate_req = async (data) => {
  const response = await instance.post(`/admin/notification-templates`, data);
  return response.data;
};

export const sendNotification_req = async (data) => {
  const response = await instance.post(`/admin/user-notification`, data);
  return response.data;
};
