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
  const { currentTrack, isLoading } = useCurrentSong();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="mx-auto w-fit">
      <header className="pb-10 pt-20 text-center">
        <h1 className="opacity-70 text-sm">Hey {meData?.display_name}!</h1>
      </header>

      <img
        src={currentTrack?.item.album.images[0].url ?? ""}
        className="hidden"
      />

      {showInfo && !isLoading ? (
        <TrackDisplay
          coverUrl={currentTrack?.item.album.images[0].url ?? ""}
          name={currentTrack?.item.name ?? ""}
          artists={currentTrack?.item.artists.map((a) => a.name) ?? []}
          releaseDate={new Date(currentTrack?.item.album.release_date ?? "")}
        />
      ) : (
        <PlaceholderTrackDisplay />
      )}

      <div className="flex gap-0.5 w-full mt-20">
        <button
          className="w-full bg-zinc-700 rounded-l-full py-2 active:bg-zinc-600 hover:outline transition-all"
          onClick={async () => {
            setShowInfo(false);
            await nextSong();
          }}
        >
          Next Song!
        </button>

        <button
          className="w-full bg-zinc-700 rounded-r-full active:bg-zinc-600 hover:outline transition-all rounded-l-sm"
          onClick={() => {
            setShowInfo(!showInfo);
          }}
        >
          Reveal info!
        </button>
      </div>
    </div>
  );
};
