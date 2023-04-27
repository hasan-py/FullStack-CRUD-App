import { AxiosInstance } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useHttp } from "../useHttp";

const addNewGame = async (data: any, http: AxiosInstance) => {
  const res = await http.post(`/api/data/new`, data);
  return res;
};

export function useAddNewGame() {
  const queryClient = useQueryClient();
  const { http } = useHttp();

  return useMutation((data: any) => addNewGame(data, http), {
    onSuccess: () => {
      queryClient.invalidateQueries("game-list");
    },
  });
}
