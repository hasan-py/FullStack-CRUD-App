import axios from "axios";
import { useMemo } from "react";
import { getLocalStorageData } from "../_helper/localstorage";

type HeaderType = {
  [key: string]: string | number;
};

const defaultParam = {
  auth: true,
};

export const useHttp = (param = defaultParam) => {
  return useMemo(() => {
    const headers: HeaderType = {
      "Content-Type": "application/json",
    };

    if (param.auth) {
      const token = getLocalStorageData("token");
      headers.token = token;
    }

    const http = axios.create({
      baseURL: "http://localhost:8000",
      headers,
    });

    return { http };
  }, []);
};
