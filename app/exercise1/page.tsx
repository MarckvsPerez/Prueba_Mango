import Range from "@/components/Range";

export default function Exercise1() {
  const mockData = { min: 1, max: 100 };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] mt-[64px] p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-purple-500">Normal Range</h1>
      <Range mode="normal" min={mockData.min} max={mockData.max} />
    </div>
  );
}
