"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useLotSearch from "@/hooks/useLotSearch";
import { cn } from "@/lib/utils";
import {
  Box,
  Cog,
  Inbox,
  Info,
  Leaf,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import { useEffect } from "react";

const SearchLotContent = ({ id }: { id: string }) => {
  const { loading, error, results, searchLotNumber } = useLotSearch();

  useEffect(() => {
    if (id) {
      searchLotNumber(id);
    }
  }, [id]); // runs only once on mount (unless `id` changes)

  if (loading)
    return (
      <div className=" flex items-center justify-center min-h-44 animate-pulse">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className=" flex items-center justify-center min-h-44 text-destructive opacity-75">
        Error: {error}
      </div>
    );
  if (!results)
    return (
      <div className=" flex items-center justify-center min-h-44 opacity-75">
        No data found.
      </div>
    );

  return (
    <div className=" wrapper ">
      <div>
        <div className=" spread text-2xl">
          <div>
            <Info size={24} />
          </div>
          <div>
            <span className=" font-mono font-bold ">{id}</span> Informations
          </div>
        </div>

        <div className="grid grid-cols-6 mt-4">
          <div className=" col-span-2">
            <img
              className=" w-full border border-foreground/25 shadow-xl rounded-2xl"
              src={results.product.image}
              alt="placeholder"
            />
          </div>

          <div className=" col-span-4 p-5">
            <div className=" text-sm opacity-75">{results.product.brand}</div>
            <div className=" text-2xl  ">{results.product.name}</div>
            <div className=" text-sm mt-3 max-w-sm">
              {results.product.description}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 md:grid grid-cols-2 gap-3">
        <div className=" col-span-1">
          <div className=" h-px bg-foreground my-4 w-full opacity-10" />

          <div>
            <Accordion type="single" collapsible>
              {results.mealRecommendations.map((item, i) => (
                <AccordionItem key={i} value={item.description}>
                  <AccordionTrigger>
                    <div key={i} className=" py-2">
                      <div className=" text-sm opacity-75">
                        Prepared in {item.preparationTime}
                      </div>
                      <div>{item.name}</div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className=" text-xs opacity-75">
                      {item.ingredients}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        <div className=" col-span-1 md:ml-10 mt-5">
          <div className=" text-md ">Traceablity Timeline</div>
          <div className=" mt-6 relative ">
            <div className=" absolute -left-2 -bottom-2 size-4 bg-primary z-20 rounded-full" />
            {results.traceability.map((item, i) => (
              <div
                key={i}
                className=" border-l border-l-foreground relative pb-6"
              >
                <div className=" text-sm  ml-5 relative">
                  <div className=" absolute -top-2.5 opacity-75">
                    {item.event_date}
                  </div>
                </div>
                <div className=" pt-4 ml-5 spread">
                  <div>
                    {item.event === "Shipped" ? (
                      <Truck size={13} />
                    ) : item.event === "Canned" ? (
                      <Package size={13} />
                    ) : item.event === "Harvested" ? (
                      <Leaf size={13} />
                    ) : item.event === "Packed" ? (
                      <Box size={13} />
                    ) : item.event === "Processed" ? (
                      <Cog size={13} />
                    ) : item.event === "Received" ? (
                      <Inbox size={13} />
                    ) : null}
                  </div>
                  <div>{item.event}</div>
                </div>
                <div className=" ml-5  text-sm opacity-75 spread">
                  <MapPin size={12} />
                  <div>{item.location}</div>
                </div>
                <div className=" ml-5  text-sm opacity-75 spread">
                  <div
                    className={cn(
                      "size-4 bg-orange-500 rounded-full",
                      item.status == "onHold"
                        ? " bg-orange-500"
                        : item.status == "Consumable"
                        ? "bg-green-500"
                        : item.status == "Not consumable"
                        ? " bg-red-600"
                        : null
                    )}
                  />
                  <div> {item.status}</div>
                </div>
                <div className=" absolute -top-1 -left-1 size-2 bg-foreground rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" min-h-[30vh]" />
    </div>
  );
};

export default SearchLotContent;
