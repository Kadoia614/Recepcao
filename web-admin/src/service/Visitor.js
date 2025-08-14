import API from "@API/API";

export const getVisitor = async (page, limit, search) => {
  const url = search
    ? `/visitors?page=${page || 0}&limit=${limit || 10}&search=${search}`
    : `/visitors?page=${page || 0}&limit=${limit || 10}`;

  const { data } = await API.get(url, {
    headers: { Authorization: localStorage.getItem("token") },
  });

  console.log(data);

  return data;
};

export const postVisitor = async (visitor) => {
  const { data } = await API.post("/visitors", visitor, {
    headers: { Authorization: localStorage.getItem("token") },
  });

  return data;
};

export const putVisitor = async (visitor, uuid) => {
  const { data } = await API.put(`/visitors/${uuid}`, visitor, {
    headers: { Authorization: localStorage.getItem("token") },
  });

  return data;
};

export const deleteVisitor = async (uuid) => {
  const { data } = await API.delete(`/visitors/${uuid}`, {
    headers: { Authorization: localStorage.getItem("token") },
  });
  return data;
};
