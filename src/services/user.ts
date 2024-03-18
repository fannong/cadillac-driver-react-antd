import instance from "./axios";

export const login = async (username: string, password: string) => {
  return await instance.post("/login", {
    username,
    password,
  });
};

export const register = async (username: string, password: string) => {
  return await instance.post("/register", {
    username,
    password,
  });
};
