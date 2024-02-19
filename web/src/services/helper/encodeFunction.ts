import { encode as ENCODE, decode as DECODE } from "js-base64";

export const encode = (data: any) => {
  return ENCODE(data);
};

export const decode = (data: any) => {
  return DECODE(data);
};
