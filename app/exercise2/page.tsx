import Range from "@/components/Range";

export default function Exercise2() {
  const mockData = { rangeValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99] };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] mt-[64px] p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-purple-500">Fixed Range</h1>
      <Range mode="fixed" rangeValues={mockData.rangeValues} />
    </div>
  );
}
