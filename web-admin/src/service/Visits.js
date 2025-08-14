import API from "@API/API";

export const getVisits = async (page, limit, search) => {
  const url = search
    ? `/visits?page=${page || 0}&limit=${limit || 10}&search=${search}`
    : `/visits?page=${page || 0}&limit=${limit || 10}`;

  const { data } = await API.get(url, {
    headers: { Authorization: localStorage.getItem("token") },
  });

  return data;
};

export const getVisitsByVisitorId = async (uuid) => {
  const url = `/visits/visitor/${uuid}`;

  const { data } = await API.get(url, {
    headers: { Authorization: localStorage.getItem("token") },
  });

  alert(data);

  return data;
};
