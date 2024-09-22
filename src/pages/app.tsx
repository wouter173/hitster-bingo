import { useMe } from "../hooks/use-me";
import { useNextSong } from "../hooks/use-next-song";

export const AppPage = () => {
  const { nextSong } = useNextSong();

  return (
    <div>
      <p>Welcome to the dashboard!</p>

      <UserDisplay />

      <button
        onClick={async () => {
          await nextSong();
        }}
      >
        Next random song!
      </button>
    </div>
  );
};

const UserDisplay = () => {
  const { data, isLoading } = useMe();

  if (isLoading || !data) return <p>Loading...</p>;

  return (
    <p>
      Hello, {data.display_name}! Your email is {data.email}.
    </p>
  );
};
