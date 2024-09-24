import { useState } from "react";
import { useCurrentSong } from "../hooks/use-current-song";
import { useMe } from "../hooks/use-me";
import { useNextSong } from "../hooks/use-next-song";

export const AppPage = () => {
  const { nextSong } = useNextSong();
  const { data } = useCurrentSong();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div>
      <p>Welcome to the dashboard!</p>

      <UserDisplay />

      <button
        onClick={async () => {
          setShowInfo(false);
          await nextSong();
        }}
      >
        Next Song!
      </button>

      <button
        onClick={() => {
          setShowInfo(!showInfo);
        }}
      >
        show info
      </button>
      {showInfo ? (
        <div>
          <p>Here is some info</p>
          <img
            src={data?.item.album.images[0].url}
            alt=""
            width={640}
            height={640}
            className=""
          />
          <pre>{data?.item.artists.map((x) => x.name)}</pre>
        </div>
      ) : null}
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
