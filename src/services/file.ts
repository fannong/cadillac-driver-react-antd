import instance from "./axios";
import { myResponse } from "./axios";

export const upload = (data: any): Promise<myResponse> => {
  return instance.post("/file/upload", data);
};
