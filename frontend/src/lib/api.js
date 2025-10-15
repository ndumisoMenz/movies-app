import API from "../config/apiClient";

export const login = async (data) => {
  const res = await API.post("/auth/login", data);

  const { user, accessToken, refreshToken } = res;

  // store tokens locally
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  return { user, accessToken, refreshToken };
};

export const register = async (data) => API.post("/auth/register", data);
export const getUser = async () => API.get("/user");