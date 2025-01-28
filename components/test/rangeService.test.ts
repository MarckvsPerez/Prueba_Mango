import {
  fetchNormalRangeData,
  fetchFixedRangeData,
} from "../../services/rangeService";

describe("Range Service", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("fetchNormalRangeData", () => {
    it("debería obtener datos del rango normal correctamente", async () => {
      const mockData = { min: 0, max: 100 };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchNormalRangeData();

      expect(global.fetch).toHaveBeenCalledWith(
        "http://demo4646020.mockable.io/exercise1"
      );
      expect(result).toEqual(mockData);
    });

    it("debería lanzar un error cuando la respuesta no es ok", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(fetchNormalRangeData()).rejects.toThrow(
        "Error al obtener los datos"
      );
    });
  });

  describe("fetchFixedRangeData", () => {
    it("debería obtener datos del rango fijo correctamente", async () => {
      const mockData = { rangeValues: [0, 25, 50, 75, 100] };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchFixedRangeData();

      expect(global.fetch).toHaveBeenCalledWith(
        "http://demo4646020.mockable.io/exercise2"
      );
      expect(result).toEqual(mockData);
    });

    it("debería lanzar un error cuando la respuesta no es ok", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(fetchFixedRangeData()).rejects.toThrow(
        "Error al obtener los datos"
      );
    });
  });
});
