import Pagination from "./components/Pagination";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;

  return (
    <div>
      <Pagination itemCount={100} pageSize={10} currentPage={parseInt(page)} />
    </div>
  );
}
