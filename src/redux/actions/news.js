import { NEWS_DELETE, NEWS_ADD, NEWS_EDIT } from "./type";
import { instance } from "../../services/api";

export const addNews = (values) => (dispatch) => {
  dispatch({
    type: NEWS_ADD,
    payload: true,
  });
  return instance
    .post("/admin/news", values)
    .then(({ data }) => {
      dispatch({
        type: NEWS_ADD,
        payload: {
          data: data,
          authorized: true,
          loading: false,
        },
      });
      return data;
    })
    .catch((err) => {
      dispatch({
        type: NEWS_ADD,
        payload: false,
      });
      return Promise.reject(err);
    });
};

export const editNews = (values) => (dispatch) => {
  dispatch({
    type: NEWS_EDIT,
    payload: true,
  });
  return instance
    .put("/admin/news", values)
    .then(({ data }) => {
      dispatch({
        type: NEWS_EDIT,
        payload: {
          data: data,
          authorized: true,
          loading: false,
        },
      });
      return data;
    })
    .catch((err) => {
      dispatch({
        type: NEWS_EDIT,
        payload: false,
      });
      return Promise.reject(err);
    });
};

export const deleteNews =
  ({ newsID }) =>
  (dispatch) => {
    dispatch({
      type: NEWS_DELETE,
      payload: true,
    });
    return instance
      .delete(`/admin/news${newsID}`)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

export const getNews = () => {
  return instance.get(`/admin/news/all`).then(({ data: { data } }) => {
    return data;
  });
};
