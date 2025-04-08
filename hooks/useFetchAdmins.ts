import supabase from "@/app/supabase/supaClient";
import { useEffect, useState } from "react";

export interface Admin {
  id: string;
  email: string | null;
  name: string | null;
  created_at: string;
}

export const useFetchAdmins = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("admins")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError(error);
        setAdmins([]);
      } else {
        setAdmins(data as Admin[]);
      }
      setLoading(false);
    };

    fetchAdmins();
  }, []);

  return { admins, loading, error };
};
