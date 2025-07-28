import API from "@API/API";

export const handdleLogin = async (username, password) => {
    const {data} = await API.post("/login", {username: username, password: password})

    return data
}