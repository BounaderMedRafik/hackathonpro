// hooks/useFetchPosts.ts
import { useEffect, useState } from "react";
import supabase from "@/app/supabase/supaClient";

export type Post = {
  uuid: string;
  created_at: string;
  username: string | null;
  LOT: string | null;
  desc: string | null;
  pfp: string | null;
};

export function useFetchPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error.message);
        setError(error);
        setPosts([]);
      } else {
        console.log("Fetched posts:", data);
        setPosts(data as Post[]);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
}
