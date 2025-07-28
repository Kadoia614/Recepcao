import API from "@API/API";

export const getUser = async (page, limit, search) => {
  const url = search
    ? `/user?page=${page || 0}&limit=${limit || 10}&search=${search}`
    : `/user?page=${page || 0}&limit=${limit || 10}`;

  console.log(url);

  const { data } = await API.get(url, {
    headers: { Authorization: localStorage.getItem("token") },
  });

  console.log(data);

  return data;
};

export const postUser = async (newUser) => {
  const { data } = await API.post("/user", newUser, {
    headers: { Authorization: localStorage.getItem("token") },
  });

  return data;
};

export const deleteUser = async (uuid) => {
  const { data } = await API.delete(`/user/${uuid}`, {
    headers: { Authorization: localStorage.getItem("token") },
  });
  return data;
};

export const updateUser = async (user, uuid) => {
  const { data } = await API.put(
    `/user/${uuid}`,
    {
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      email: user.email,
      cpf: user.cpf,
    },
    { headers: { Authorization: localStorage.getItem("token") } }
  );

  return data;
};
