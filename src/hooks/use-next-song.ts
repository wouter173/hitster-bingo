import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./user-auth";

export const useNextSong = () => {
  const { token } = useAuth();

  const { mutateAsync } = useMutation({
    mutationKey: ["spotify", "next"],
    mutationFn: async () => {
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/next",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(await response.json());
    },
  });

  return { nextSong: mutateAsync };
};
