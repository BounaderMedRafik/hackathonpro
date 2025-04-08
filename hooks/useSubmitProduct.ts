"use client";

import { useState } from "react";
import supabase from "@/app/supabase/supaClient";
import { toast } from "sonner";

// Define types for the data structure
type ProductData = {
  product_code: string;
  name: string;
  brand: string;
  description?: string;
  ingredients?: string[];
  image?: string;
  senderid?: string;
  sendto?: string | null;
};

type TraceabilityEventData = {
  product_code: string;
  event_date: string; // Format: YYYY-MM-DD
  event: string;
  location: string;
  status?: string;
};

const useSubmitProduct = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitProduct = async (
    productData: ProductData,
    eventData: TraceabilityEventData
  ) => {
    setIsSubmitting(true);

    try {
      const { error: productError } = await supabase
        .from("products")
        .insert([productData]);

      if (productError) {
        toast.error("Failed to insert product.");
        throw productError;
      }

      const { error: eventError } = await supabase
        .from("traceability_events")
        .insert([eventData]);

      if (eventError) {
        toast.error("Failed to insert traceability event.");
        throw eventError;
      }

      toast.success("Product and event added successfully!");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitProduct, isSubmitting };
};

export default useSubmitProduct;
