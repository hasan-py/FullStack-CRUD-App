import { AxiosInstance } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useHttp } from "../useHttp";

const addNewItem = async (data: any, http: AxiosInstance) => {
  const res = await http.post(`/api/item/new`, data);
  return res;
};

export function useAddNewItem() {
  const queryClient = useQueryClient();
  const { http } = useHttp({ auth: true });

  return useMutation((data: any) => addNewItem(data, http), {
    onSuccess: () => {
      queryClient.invalidateQueries("item-list");
    },
  });
}
