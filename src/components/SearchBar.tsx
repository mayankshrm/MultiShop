"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchBar = () => {

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    if(name){
      router.push(`/list?name=${name}`)
    }
  };

  return (
    <form
      className="flex items-center gap-3 bg-surface-muted px-4 py-2.5 rounded-full flex-1 ring-1 ring-transparent focus-within:ring-lama transition-all duration-200"
      onSubmit={handleSearch}
    >
      <button className="cursor-pointer shrink-0" type="submit">
        <Image src="/search.png" alt="Search" width={16} height={16} className="opacity-50" />
      </button>
      <input
        type="text"
        name="name"
        placeholder="Search products..."
        className="flex-1 bg-transparent outline-none text-sm text-ink placeholder:text-ink-faint"
      />
    </form>
  );
};

export default SearchBar;
