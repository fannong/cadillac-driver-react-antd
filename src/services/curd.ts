import instance from "./axios";
import type { myResponse } from "./axios";

export const add = (): Promise<myResponse> => {
  return instance.post("/admin/create");
};
