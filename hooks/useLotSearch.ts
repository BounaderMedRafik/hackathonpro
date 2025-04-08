import { useState } from "react";
import axios, { AxiosError } from "axios";
import { HostServer } from "@/data/frontData";

// Define the types for the expected API response
export type Product = {
  product_code: string;
  name: string;
  brand: string;
  description?: string;
  ingredients: string[];
  image: string;
  senderid: string;
  sendto: string;
};

export type TraceabilityEvent = {
  product_code: string;
  event_date: string;
  event:
    | "Shipped"
    | "Canned"
    | "Harvested"
    | "Received"
    | "Packed"
    | "Processed";
  location: string;
  status?: "onHold" | "Consumable" | "Not consumable";
};

export type MealRecommendation = {
  name: string;
  description: string;
  ingredients: string[];
  preparationTime: string;
};

export type LotLookupResponse = {
  product: Product;
  traceability: TraceabilityEvent[];
  mealRecommendations: MealRecommendation[];
};

export default function useLotSearch() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [results, setResults] = useState<LotLookupResponse | null>(null);

  const searchLotNumber = async (lotNumber: string): Promise<void> => {
    try {
      setLoading(true);
      setError("");
      setResults(null);

      const response = await axios.post<LotLookupResponse>(
        `${HostServer}/api/lot-lookup`,
        {
          lotNumber,
        }
      );

      console.log("Fetched data:", response.data); // 👈 Log the data
      setResults(response.data);
    } catch (err) {
      const axiosError = err as AxiosError<{ error: string }>;
      if (axiosError.response?.data?.error) {
        setError(axiosError.response.data.error);
      } else {
        setError("Failed to fetch lot information");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, results, searchLotNumber };
}
