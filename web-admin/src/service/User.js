import API from "./API";

export const getUser = async (page, limit, search) => {
  const url = 
  search ? `/user?page=${page || 0}&limit=${limit || 10}&search=${search}` : `/user?page=${page || 0}&limit=${limit || 10}`;

console.log(url)

  const { data } = await API.get(url, {
    headers: { Authorization: localStorage.getItem("token") },
  });

  console.log(data)

  return data;
};

export const postUser = async (
  newUser
) => {
  const { data } = await API.post(
    "/user",
    {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      role: newUser.role,
      email: newUser.email,
      password: newUser.password,
      cpf: newUser.cpf,
    },
    { headers: { Authorization: localStorage.getItem("token") } }
  );

  return data;
};
