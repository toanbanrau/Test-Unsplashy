import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function SearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", e.target.value);
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="filter">
      <label htmlFor="search">Search</label>
      <input
        id="search"
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
}
