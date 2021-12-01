import { axiosInstance } from "./config";

export const create_req = async (data) => {
  const email = data.email;
  const name = data.name;
  const role = data.role;
  const password = data.password;
  const permissions = data.permissions;
  console.log("data", data);
  const response = await axiosInstance.post("/admin", {
    email,
    name,
    role,
    password,
    permissions,
  });
  return response;
};

export const edit_req = async (data) => {
  const adminId = data.adminId;
  const email = data.email;
  const name = data.name;
  const role = data.role;
  const password = data.password;
  const permissions = data.permissions;
  console.log("data edit req", data);
  const response = await axiosInstance.post("/admin/post", {
    adminId,
    email,
    name,
    role,
    password,
    permissions,
  });
  return response;
};

// In Components.
//   const submitReq = async (id) => {
//     try {
//       const editReq = await edit_req(...state, id);

//       console.log("createReq", editReq);
//       if (editReq) {
//         setOpen(false);
//       }
//     } catch (e) {}
//   };
