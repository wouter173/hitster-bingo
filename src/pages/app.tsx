import { useState } from "react";
import {
  PlaceholderTrackDisplay,
  TrackDisplay,
} from "../components/track-display";
import { useCurrentSong } from "../hooks/use-current-song";
import { useMe } from "../hooks/use-me";
import { useNextSong } from "../hooks/use-next-song";

export const AppPage = () => {
  const { data: meData } = useMe();
  const { nextSong } = useNextSong();

  const [revealed, setRevealed] = useState(false);

  return (
    <div className="mx-auto w-fit">
      <header className="pb-10 pt-20 text-center">
        <h1 className="opacity-70 text-sm">Hey {meData?.display_name}!</h1>
      </header>

      <CurrentTrack revealed={revealed} />

      <div className="flex gap-0.5 w-full mt-20">
        <button
          className="w-full bg-zinc-700 rounded-l-full py-2 active:bg-zinc-600 hover:outline transition-all"
          onClick={async () => {
            setRevealed(false);
            await nextSong();
          }}
        >
          Next Song!
        </button>

        <button
          className="w-full bg-zinc-700 rounded-r-full active:bg-zinc-600 hover:outline transition-all rounded-l-sm"
          onClick={() => {
            setRevealed(!revealed);
          }}
        >
          Reveal track!
        </button>
      </div>
    </div>
  );
};

const CurrentTrack = ({ revealed }: { revealed: boolean }) => {
  const { currentTrack, isLoading } = useCurrentSong();

  if (currentTrack && !isLoading && revealed) {
    return (
      <TrackDisplay
        coverUrl={currentTrack.item.album.images[0].url}
        name={currentTrack.item.name}
        artists={currentTrack.item.artists.map((a) => a.name)}
        releaseDate={new Date(currentTrack?.item.album.release_date)}
      />
    );
  }

  console.log({ currentTrack, isLoading, revealed });

  if (!currentTrack) {
    return (
      <>
        <div className="flex flex-col gap-2 w-[300px]">
          <div className="w-full aspect-square rounded-xl bg-zinc-800 grid place-items-center p-4 ">
            <p className="whitespace-pre-wrap text-center">
              No music playing!
              <br />
              Make sure to play an album or a playlist on Spotify and put it on
              shuffle.
            </p>
          </div>
        </div>
      </>
    );
  }

  if (isLoading || !revealed) {
    return <PlaceholderTrackDisplay />;
  }
};
