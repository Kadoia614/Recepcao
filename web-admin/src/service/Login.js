import API from "@API/API";

export const handdleLogin = async (username, password) => {
  const { data } = await API.post("/login", {
    username: username,
    password: password,
  });

  return data;
};

export const validateToken = async () => {
  const token = localStorage.getItem("token");

  const { data } = await API.post("/login/verify", { token });

  return data;
};

export const alterPassword = async () => {
  const { data } = await API.post(
    "/login/alterpwd",
    { oldPassword, newPassword },
    {
      headers: { Authorization: localStorage.getItem("token") },
    }
  );

  return data;
};
