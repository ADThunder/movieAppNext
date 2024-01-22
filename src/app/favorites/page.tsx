"use client";
import React from "react";
import { useAtom } from "jotai";
import { favoriteMoviesAtom } from "../atom";
import { MovieType } from "../type";
import Card from "../components/Card";

type Props = {};

export default function FavoritesPage({}: Props) {
  const [favoritesMovies, setFavoritesMovies] = useAtom(favoriteMoviesAtom);

  function addToFavorites(d: MovieType) {
    setFavoritesMovies((pre) => [...pre, d]);
  }
  function removeFromFavorites(d: MovieType) {
    setFavoritesMovies((pre) => pre.filter((fav) => fav.id !== d.id));
  }

  return (
    <section className=" justify-center flex flex-wrap gap-3 sm:justify-between">
      {/* card */}

      {favoritesMovies?.map((d, i) => (
        <Card
          addToFavorites={() => addToFavorites(d)}
          removeFromFavorites={() => removeFromFavorites(d)}
          d={d}
          id={d.id}
          key={i}
          movieImg={d.image.original}
          name={d.name}
          rating={d.rating.average}
          year={d.premiered}
        />
      ))}
    </section>
  );
}
