import Image from "next/image";
import { PiTelevisionFill } from "react-icons/pi";

import dateFormat from "dateformat";
import Link from "next/link";
import { CiBookmark } from "react-icons/ci";
import { MovieType } from "../type";
import { useAtom } from "jotai";
import { favoriteMoviesAtom } from "../atom";
import { IoBookmark } from "react-icons/io5";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type Props = {
  movieImg: string;
  year: string;
  rating: number;
  name: string;
  id: number;
  d: MovieType;
  addToFavorites: (d: MovieType) => void;
  removeFromFavorites: (d: MovieType) => void;
};

export default function Card(props: Props) {
  const [animationParent] = useAutoAnimate();

  const [favoriteMovies, setFavoriteMovies] = useAtom(favoriteMoviesAtom);

  const isFavorite = favoriteMovies.some((fav) => fav?.id === props.d.id);

  const handleFavoriteMovie = () => {
    if (isFavorite) {
      props.removeFromFavorites(props.d);
    } else {
      props.addToFavorites(props.d);
    }
  };

  return (
    <div className="relative">
      <button
        ref={animationParent}
        onClick={handleFavoriteMovie}
        className="w-10 h-10 bg-black/60 absolute right-2 top-2 rounded-full flex items-center justify-center hover:opacity-85"
      >
        {isFavorite ? <IoBookmark /> : <CiBookmark className="text-xl" />}
      </button>
      <Link href={`/${props.id}`} className="flex flex-col gap-1 ">
        {/* <Image /> */}
        <div className="h-[154px] w-[275px]  rounded-md overflow-hidden  ">
          <Image
            src={props.movieImg}
            alt="movie-img"
            className="w-full h-full object-cover "
            height={400}
            width={400}
          />
        </div>
        {/* details */}
        <div className="text-sm flex gap-3 text-gray-500 items-center">
          <div>{dateFormat(props.year, "yyyy")}</div>
          <div className="flex gap-2 items-center">
            <PiTelevisionFill />
            <span>TV Series</span>
            {/* ratings */}
            <p>{props.rating}</p>
          </div>
        </div>
        {/* movie title */}
        <p>{props.name}</p>
      </Link>
    </div>
  );
}
