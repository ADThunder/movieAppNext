"use client";

import { useQuery } from "@tanstack/react-query";
import SearchBar from "./components/SearchBar";

import { MovieType } from "./type";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { favoriteMoviesAtom } from "./atom";

export default function Home() {
  const api = "https://api.tvmaze.com/shows";

  const [search, setSearch] = useState("");

  // todo : sử dụng atom
  const [favoriteMovies, setFavoriteMovies] = useAtom(favoriteMoviesAtom);

  const {
    isLoading,
    error,
    refetch,
    data: moviesData,
  } = useQuery<MovieType[]>({
    queryKey: ["singleMovie"],
    queryFn: () => fetch(api).then((res) => res.json()),
  });

  const data = search
    ? moviesData?.filter((d) =>
        d.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    : moviesData;

  useEffect(() => {
    refetch();
  }, [search, refetch]);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const addToFavorites = (d: MovieType) => {
    setFavoriteMovies((pre) => [...pre, d]);
  };

  function removeFromFavorites(d: MovieType) {
    setFavoriteMovies((pre) => pre.filter((fav) => fav.id !== d.id));
  }

  return (
    <div>
      <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
        <div className="max-w-7xl px-2 mx-auto flex flex-col gap-8  items-center sm:items-start">
          <SearchBar
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />

          <section className="items-center flex flex-wrap gap-3 justify-center sm:justify-between">
            {/* card */}

            {data && moviesData
              ? data?.map((d, i) => (
                  <Card
                    d={d}
                    id={d.id}
                    key={i}
                    movieImg={d.image.original}
                    rating={d.rating.average}
                    year={d.premiered}
                    name={d.name}
                    addToFavorites={() => addToFavorites(d)}
                    removeFromFavorites={() => removeFromFavorites(d)}
                  />
                ))
              : "loading..."}
          </section>
        </div>
      </main>
    </div>
  );
}
