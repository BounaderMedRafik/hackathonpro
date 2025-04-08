"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchPosts } from "@/hooks/useFetchPosts";
import { useFetchAllProductsOrderedByEventDate } from "@/hooks/useFetchProducts";
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";

const HomePageContent = () => {
  const { products, loading, error } = useFetchAllProductsOrderedByEventDate();

  return (
    <div className="wrapper space-y-4">
      <div className="text-2xl opacity-75 bg-white p-3 px-5 rounded-xl">
        Latest Declares
      </div>

      {loading ? (
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500">Error fetching data</div>
      ) : products.length === 0 ? (
        <div className="text-muted-foreground">No declared products yet.</div>
      ) : (
        <ScrollArea className=" h-96">
          <div className="space-y-3">
            {products.map(({ product, event }, i) => (
              <Link
                key={i}
                href={`/search/${product.product_code}`}
                className="block bg-white p-4 rounded-xl border hover:bg-accent/30 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-base font-medium spread">
                      <div
                        className={cn(
                          "size-4 bg-orange-500 rounded-full",
                          event.status == "onHold"
                            ? " bg-orange-500"
                            : event.status == "Consumable"
                            ? "bg-green-500"
                            : event.status == "Not consumable"
                            ? " bg-red-600"
                            : null
                        )}
                      />
                      {product.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Brand: {product.brand}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {event.event} on {event.event_date} at {event.location}
                    </div>
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 object-cover rounded-lg"
                  />
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      )}

      <div className=" mt-10">
        <Feed />
      </div>
    </div>
  );
};

const Feed = () => {
  const { posts, loading, error } = useFetchPosts();

  return (
    <div className=" pb-24">
      <div className="text-2xl opacity-75 mb-4">Community</div>

      {loading && <div>Loading community posts...</div>}
      {error && <div>Error loading posts: {error.message}</div>}

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <div
            key={post.uuid}
            className="p-4 border rounded-xl bg-white shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              {post.pfp && (
                <img
                  src={post.pfp}
                  alt="pfp"
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div>
                <div className="font-medium">
                  {post.username ?? "Anonymous"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(post.created_at).toLocaleString()}
                </div>
              </div>
            </div>

            <div className=" p-5 bg-red-200  rounded-xl flex items-center justify-center gap-3">
              <div className=" text-foreground">
                <TriangleAlert size={24} />
              </div>
              <div className="  md:text-xl text-center opacity-75">{`Declared a Not consumable product, LOT: ${post.LOT}`}</div>
            </div>

            <div className=" text-lg opacity-75 mt-4">Description</div>
            <div className="text-base mb-1 p-5">{post.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageContent;
