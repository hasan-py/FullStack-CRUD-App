import { AxiosInstance } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useHttp } from "../useHttp";

const editItem = async (data: any, http: AxiosInstance) => {
  const res = await http.put(`/api/item/update/${data?._id}`, {
    name: data?.name,
  });
  return res;
};

export function useEditItem() {
  const queryClient = useQueryClient();
  const { http } = useHttp({ auth: true });

  return useMutation((data: any) => editItem(data, http), {
    onSuccess: () => {
      queryClient.invalidateQueries("item-list");
    },
  });
}
