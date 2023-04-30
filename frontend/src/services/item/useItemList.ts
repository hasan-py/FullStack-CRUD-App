import { AxiosError, AxiosInstance } from "axios";
import { useQuery } from "react-query";
import { useHttp } from "../useHttp";

const getItemList = async (http: AxiosInstance) => {
  const res = await http.get(`/api/item/list`);
  return res.data?.data;
};

export function useItemList() {
  const { http } = useHttp();

  return useQuery<any, AxiosError>(["item-list"], () => getItemList(http), {
    refetchOnWindowFocus: false,
  });
}
