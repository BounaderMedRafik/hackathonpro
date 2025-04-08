import supabase from "@/app/supabase/supaClient";
import { useEffect, useState } from "react";

export const useCheckAdminEmail = (clerkEmail: string | null) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkEmail = async () => {
      if (!clerkEmail) {
        setIsAdmin(null);
        return;
      }

      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("admins")
        .select("email")
        .eq("email", clerkEmail)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // no match found
          setIsAdmin(false);
        } else {
          setError(error);
          setIsAdmin(null);
        }
      } else {
        setIsAdmin(!!data);
      }

      setLoading(false);
    };

    checkEmail();
  }, [clerkEmail]);

  return { isAdmin, loading, error };
};
