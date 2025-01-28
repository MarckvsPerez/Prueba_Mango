interface RangeData {
  min: number;
  max: number;
}

interface FixedRangeData {
  rangeValues: number[];
}

export const fetchNormalRangeData = async (): Promise<RangeData> => {
  const response = await fetch("http://demo4646020.mockable.io/exercise1");
  if (!response.ok) {
    throw new Error("Error al obtener los datos");
  }
  return response.json();
};

export const fetchFixedRangeData = async (): Promise<FixedRangeData> => {
  const response = await fetch("http://demo4646020.mockable.io/exercise2");
  if (!response.ok) {
    throw new Error("Error al obtener los datos");
  }
  return response.json();
};
