import { ChangeEventHandler } from "react";
import { IoIosSearch } from "react-icons/io";

type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="border-2 w-fit flex gap-2 rounded-lg px-2 py-1">
      {/* icon */}
      <IoIosSearch className="text-3xl" />

      <input
        placeholder="Search movies..."
        value={value}
        onChange={onChange}
        type="text"
        className=" w-full sm:w-[350px] bg-inherit outline-none"
      />
    </div>
  );
}
