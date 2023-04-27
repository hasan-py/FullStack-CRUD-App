import { useToast } from "@chakra-ui/react";
import { AxiosInstance } from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../useHttp";
import { setLocalStorageData } from "../../_helper/localstorage";

const login = async (data: any, http: AxiosInstance) => {
  const res = await http.post(`/api/auth/login`, data);
  return res?.data;
};

export function useLogin() {
  const navigate = useNavigate();
  const { http } = useHttp();
  const toast = useToast();

  return useMutation((data: any) => login(data, http), {
    onSuccess: (data: any) => {
      navigate("/");
      setLocalStorageData("token", data?.token);

      toast({
        title: `Login sucessfully`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: `Invalid login details`,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    },
  });
}
