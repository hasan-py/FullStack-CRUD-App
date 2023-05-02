import { AxiosInstance } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useHttp } from "../useHttp";

const deleteItem = async (data: any, http: AxiosInstance) => {
  const res = await http.delete(`/api/item/delete/${data?._id}`);
  return res;
};

export function useDeleteItem() {
  const queryClient = useQueryClient();
  const { http } = useHttp({ auth: true });

  return useMutation((data: any) => deleteItem(data, http), {
    onSuccess: () => {
      queryClient.invalidateQueries("item-list");
    },
  });
}
