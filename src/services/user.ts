import instance from "./axios";
import {myResponse} from "./axios";

export const login = (username: string, password: string): Promise<myResponse> => {
  return instance.post("/user/login", {
    username,
    password,
  });
};

interface RegisterParams {
  username: string;
  password: string;
  email: string;
  code: string;
}
export const register = (params: RegisterParams): Promise<myResponse> => {
  return instance.post("/user/register", params);
};

export const tokenValid = (token: string): Promise<myResponse> => {
  return instance.post("/user/tokenValid", {
    token,
  });
};

export const validateEmail = (email: string): Promise<myResponse> => {
  return instance.post("/user/email/valid", {
    email,
  });
};
