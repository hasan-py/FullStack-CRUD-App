import { useToast } from "@chakra-ui/react";
import { AxiosError, AxiosInstance } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useHttp } from "../useHttp";

const createModerator = async (data: any, http: AxiosInstance) => {
  const res = await http.post(`/api/auth/create-user`, data);
  return res?.data;
};

export function useCreateModerator() {
  const queryClient = useQueryClient();
  const { http } = useHttp();
  const toast = useToast();

  return useMutation((data: any) => createModerator(data, http), {
    onSuccess: () => {
      queryClient.invalidateQueries("check-moderator");

      toast({
        title: `User created successfully`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (err: AxiosError) => {
      toast({
        title: err?.response?.data?.toString() || `Something went wrong`,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    },
  });
}
