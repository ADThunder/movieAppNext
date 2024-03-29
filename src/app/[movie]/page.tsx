"use client";

import { useQuery } from "@tanstack/react-query";
import { MovieType } from "../type";
import Link from "next/link";
import Image from "next/image";

import parse from "html-react-parser";
import dateFormat from "dateformat";
import { FaStar } from "react-icons/fa";

export default function MoviePage({
  params,
}: {
  params: { movie: string | number };
}) {
  const { isLoading, error, data } = useQuery<MovieType>({
    queryKey: ["movies"],
    queryFn: () =>
      fetch(`https://api.tvmaze.com/shows/${params.movie}`).then((res) =>
        res.json()
      ),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col gap-4">
        <Link
          href={"/"}
          className="border px-6 py-1.5 rounded hover:opacity-80 w-fit"
        >
          Back
        </Link>
        {/* <p>{data?.name}</p> */}

        <div className="flex gap-5 flex-col sm:flex-row pb-10">
          {/* leftside */}
          <Image
            src={data?.image?.original ?? ""}
            alt="movie"
            width={600}
            height={600}
            className="w-[528px] h-[339px] object-cover rounded-md"
            priority
          />
          {/* rightside */}
          <section className="w-full max-w-[500px] flex flex-col gap-3">
            <h2 className="text-4xl font-bold">{data?.name}</h2>
            <p>{parse(data?.summary ?? "")}</p>

            <div className="flex gap-3 text-gray-500">
              <p>{dateFormat(data?.premiered, "yyyy")}</p>
              <p>{data?.averageRuntime}m</p>

              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                {data?.rating?.average}/10
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
