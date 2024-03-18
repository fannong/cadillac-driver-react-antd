import CryptoJS from "crypto-js";

/**
 * 对密码进行加密
 */
export const cryptoPassword = (password: string): string => {
  return CryptoJS.SHA256(password).toString();
};
