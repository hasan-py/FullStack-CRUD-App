import { AxiosInstance } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useHttp } from "../useHttp";

const deleteGame = async (data: any, http: AxiosInstance) => {
  const res = await http.delete(`/api/data/delete/${data?._id}`);
  return res;
};

export function useDeleteGame() {
  const queryClient = useQueryClient();
  const { http } = useHttp();

  return useMutation((data: any) => deleteGame(data, http), {
    onSuccess: () => {
      queryClient.invalidateQueries("game-list");
    },
  });
}
