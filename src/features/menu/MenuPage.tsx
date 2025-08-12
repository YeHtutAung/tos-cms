import { useQuery } from "@tanstack/react-query";
import { getMenu } from "./menu.api";

export default function MenuPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["menu"],
    queryFn: getMenu,
  });

  if (isLoading) return <div>Loading menu…</div>;
  if (isError) return <div>Failed to load menu.</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Menu</h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map(item => (
          <div key={item.id} className="border rounded-lg p-3 bg-white">
            <div className="font-medium">{item.name}</div>
            {item.description && <div className="text-sm text-gray-500">{item.description}</div>}
            <div className="mt-2 font-semibold">${item.price.toFixed(2)}</div>
            <button className="mt-3 px-3 py-2 border rounded">Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}