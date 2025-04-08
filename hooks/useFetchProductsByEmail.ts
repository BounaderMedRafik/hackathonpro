import { useEffect, useState } from "react";
import supabase from "@/app/supabase/supaClient";
import { Product } from "./useLotSearch";

export function useFetchProductsByEmail(email: string | null) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!email) {
        console.log("No email provided. Skipping fetch.");
        setProducts([]);
        setLoading(false);
        return;
      }

      console.log(`Fetching products for email: ${email}`);
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("sendto", email);

      if (error) {
        console.error("Error fetching products:", error.message);
        setError(error);
        setProducts([]);
      } else {
        console.log(`Fetched ${data?.length ?? 0} products:`, data);
        setProducts(data as Product[]);
      }

      setLoading(false);
    };

    fetchProducts();
  }, [email]);

  return { products, loading, error };
}
