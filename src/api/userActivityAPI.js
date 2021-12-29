import { instance } from "../services/api";

export const getUserActivity_req = async (userId) => {
  const response = await instance.get(
    `/admin/user/${userId}/activity?context=account&page=1&limit=10`
  );
  return response.data;
};
