import Range from "@/components/Range";
import { fetchNormalRangeData } from "@/services/rangeService";
import { Suspense } from "react";

export default async function Exercise1() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] mt-[64px] p-4 bg-gray-100 font-mono">
      <h1 className="text-3xl font-bold mb-8 text-purple-500">Normal Range</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <RangeContent />
      </Suspense>
    </div>
  );
}

export async function RangeContent() {
  const rangeData = await fetchNormalRangeData();
  return <Range mode="normal" min={rangeData.min} max={rangeData.max} />;
}
