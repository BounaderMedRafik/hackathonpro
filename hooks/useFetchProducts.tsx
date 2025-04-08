import { useEffect, useState } from "react";
import supabase from "@/app/supabase/supaClient";
import { Product, TraceabilityEvent } from "./useLotSearch";

type ProductWithEvent = {
  product: Product;
  event: TraceabilityEvent;
};

export function useFetchAllProductsOrderedByEventDate() {
  const [products, setProducts] = useState<ProductWithEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("traceability_events")
        .select(
          "product:products(*), product_code, event_date, event, location, status, id"
        )
        .order("event_date", { ascending: false });

      if (error) {
        console.error("Error fetching products by event_date:", error.message);
        setError(error);
        setProducts([]);
      } else {
        const result = data.map((item) => ({
          //@ts-ignore
          product: item.product as Product,
          event: {
            product_code: item.product_code,
            event_date: item.event_date,
            event: item.event,
            location: item.location,
            status: item.status,
          } as TraceabilityEvent,
        }));

        console.log("Fetched traceability products:", result);
        setProducts(result);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}
