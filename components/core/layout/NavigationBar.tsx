"use client";
import supabase from "@/app/supabase/supaClient";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  eventsAvailable,
  navigationLinks,
  statusAvilable,
  useBarLinks,
} from "@/data/frontData";
import { useCheckAdminEmail } from "@/hooks/useCheckAdminEmail";
import { useFetchAdmins } from "@/hooks/useFetchAdmins";
import { useFetchAllProductsOrderedByEventDate } from "@/hooks/useFetchProducts";
import { useFetchProductsByEmail } from "@/hooks/useFetchProductsByEmail";
import { SignedIn, SignedOut, SignOutButton, useUser } from "@clerk/nextjs";
import { ArrowDownRight, ArrowRight, Inbox, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AuthenticationPage from "../authPage/AuthenticationPage";
import LOGOCOMP from "../brand/LOGO";

const NavigationBar = ({ isLanding }: { isLanding?: boolean }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isLanding) {
        setScrolled(window.scrollY > 300); // 44 * 4 = 176px
      } else {
        setScrolled(window.scrollY > 1); // 44 * 4 = 176px
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="md:pt-4 pt-0 fixed top-0 left-0 w-full z-50 transition-colors duration-300">
      <div
        className={`flex wrapper items-center justify-between border-1   p-1.5 md:rounded-lg transition-all duration-300 ${
          scrolled
            ? "bg-background shadow-2xl border-foreground/10 max-w-3xl"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="spread">
          <LOGOCOMP />
          <SignedIn>
            <SEARCH />
          </SignedIn>
        </div>

        <SignedOut>
          <div className=" md:block hidden">
            <LINKS />
          </div>
        </SignedOut>

        <div className="">
          <SIGNBUTTON />
        </div>
      </div>
    </div>
  );
};

const LINKS = () => {
  const { isLoaded } = useUser();
  return (
    <div>
      {isLoaded && (
        <>
          <SignedOut>
            {navigationLinks?.map((item, i) => (
              <a
                key={i}
                href={item.link}
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                })}
              >
                <div className="spread">
                  <div>{item.title}</div>
                  <div>
                    <ArrowDownRight size={10} />
                  </div>
                </div>
              </a>
            ))}
          </SignedOut>
          <SignedIn>
            {useBarLinks?.map((item, i) => (
              <a
                key={i}
                href={item.link}
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                })}
              >
                <div className="spread">
                  <div>{item.title}</div>
                  {/* <div>
                <ArrowDownRight size={10} />
              </div> */}
                </div>
              </a>
            ))}
          </SignedIn>
        </>
      )}
    </div>
  );
};

const SIGNBUTTON = () => {
  const { isLoaded, user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress ?? null;
  const { isAdmin } = useCheckAdminEmail(email);

  const userId = user?.emailAddresses[0].emailAddress ?? null;
  const { products, loading, error } = useFetchProductsByEmail(userId); // Fetch by senderid

  const { products: AllProductes } = useFetchAllProductsOrderedByEventDate();

  const [event, setEvent] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [prodCode, setProdCode] = useState("");
  const [eventDate, setEventDate] = useState("");

  const [selectedLot, setSelectedLot] = useState("");
  const [desc, setDesc] = useState("");

  const { admins, loading: adminsLoading } = useFetchAdmins();

  const NewTrace = async () => {
    if (!eventDate) {
      toast.error("Please select a valid event date.");
      return;
    }

    const { error } = await supabase.from("traceability_events").insert({
      product_code: prodCode,
      event_date: eventDate,
      event: event,
      location: location,
      status: status,
    });

    if (error) {
      console.log(error, "error updating trace");
    } else {
      toast.success(`Updated ${prodCode} successfully`);
    }
  };

  const HandleSubmit = async () => {
    await NewTrace();
  };

  const HandlePublish = async () => {
    const { error } = await supabase.from("posts").insert({
      username: user?.fullName,
      LOT: selectedLot,
      desc: desc,
      pfp: user?.imageUrl,
    });

    if (error) {
      console.log(error, "error in publishing");
    } else {
      toast.success("Posted successfuly, Thank you for help");
    }
  };

  return (
    <div className="w-full flex justify-end items-center">
      {isLoaded && (
        <>
          <SignedOut>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="  hidden md:block">
                  <div className="spread">
                    <div>start now</div>
                    <div>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="min-w-min shadow-none p-0 w-auto bg-transparent border-transparent">
                <DialogTitle className="hidden" />
                <AuthenticationPage />
              </DialogContent>
            </Dialog>
          </SignedOut>

          <SignedIn>
            <div className="spread">
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="size-9 cursor-pointer bg-accent rounded-full flex items-center justify-center hover:opacity-75">
                      <Plus size={14} />
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle className=" hidden" />
                    <div className="text-xl font-semibold mb-2">
                      Declare uncosumable LOT
                    </div>
                    <div>LOT number</div>
                    <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant={"outline"} className=" w-full">
                            {selectedLot ? selectedLot : "Select LOT"}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className=" w-64">
                          {AllProductes.map((item, i) => (
                            <DropdownMenuItem key={i}>
                              <div
                                onClick={() =>
                                  setSelectedLot(item.product.product_code)
                                }
                                className=" spread items-start"
                              >
                                <div className=" text-xs opacity-75 font-mono">
                                  {item.product.product_code}
                                </div>
                                <div>{item.product.name}</div>
                              </div>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div>Description</div>
                    <div>
                      <Textarea
                        value={desc}
                        onChange={(e) => {
                          setDesc(e.target.value);
                        }}
                        className="  -mt-2"
                        placeholder="write the lot number you see.."
                      />
                    </div>

                    <div>
                      <Button className=" w-full" onClick={HandlePublish}>
                        publish
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Inbox icon for admin */}
              {isAdmin && (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="size-9 cursor-pointer bg-accent rounded-full flex items-center justify-center hover:opacity-75">
                      <Inbox size={14} />
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle className="hidden" />
                    <div className="text-xl font-semibold mb-2">Inbox</div>
                    {loading ? (
                      <div>Loading products...</div>
                    ) : products.length === 0 ? (
                      <div>No products found</div>
                    ) : (
                      <div className="flex flex-col gap-2 max-h-80 overflow-auto pr-2">
                        {products.map((product, i) => (
                          <div
                            key={i}
                            // href={`/search/${product.product_code}`}
                            className="text-sm p-2 border flex items-center justify-between rounded-xl hover:bg-accent/50 transition"
                          >
                            <div>
                              <div className="font-medium">{product.name}</div>
                              <div className="text-xs text-muted-foreground">
                                Code: {product.product_code}
                              </div>
                            </div>
                            <div>
                              {product.product_code}
                              <DropdownMenu>
                                <DropdownMenuTrigger onClick={() => {}} asChild>
                                  <Button
                                    onClick={() => {
                                      setProdCode(product.product_code);
                                      console.log(prodCode);
                                    }}
                                  >
                                    Update Traceablity
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <div className=" min-h-12">
                                    <Input
                                      disabled
                                      className=" w-full "
                                      value={product.product_code}
                                    />

                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          variant={"outline"}
                                          className=" w-full"
                                        >
                                          {event ? event : "Select Event"}
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent>
                                        {eventsAvailable.map((item, i) => (
                                          <DropdownMenuItem
                                            onClick={() => {
                                              setEvent(item);
                                            }}
                                            key={i}
                                          >
                                            {item}
                                          </DropdownMenuItem>
                                        ))}
                                      </DropdownMenuContent>
                                    </DropdownMenu>

                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          variant={"outline"}
                                          className=" w-full"
                                        >
                                          {location ? location : "Location"}
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent>
                                        {admins.map((item, i) => (
                                          <DropdownMenuItem
                                            onClick={() => {
                                              if (item?.name) {
                                                setLocation(item.name);
                                              }
                                            }}
                                            key={i}
                                          >
                                            {item.name}
                                          </DropdownMenuItem>
                                        ))}
                                      </DropdownMenuContent>
                                    </DropdownMenu>

                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          variant={"outline"}
                                          className=" w-full"
                                        >
                                          {status ? status : "Status"}
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent>
                                        {statusAvilable.map((item, i) => (
                                          <DropdownMenuItem
                                            onClick={() => {
                                              setStatus(item);
                                            }}
                                            key={i}
                                          >
                                            {item}
                                          </DropdownMenuItem>
                                        ))}
                                      </DropdownMenuContent>
                                    </DropdownMenu>

                                    <Input
                                      type="date"
                                      value={eventDate}
                                      onChange={(e) =>
                                        setEventDate(e.target.value)
                                      }
                                    />
                                    <div className=" mt-2">
                                      <Button
                                        onClick={() => {
                                          setProdCode(product.product_code);
                                          HandleSubmit();
                                        }}
                                        className=" w-full"
                                        size={"sm"}
                                      >
                                        Update now
                                      </Button>
                                    </div>
                                  </div>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              )}

              {isLoaded ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <img
                      className="size-8 rounded-full"
                      src={user?.imageUrl}
                      alt=""
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {isAdmin && (
                      <Link href={"/admin"}>
                        <DropdownMenuItem>Admin Dashboard</DropdownMenuItem>
                      </Link>
                    )}
                    <SignOutButton>
                      <DropdownMenuItem>Sign Out</DropdownMenuItem>
                    </SignOutButton>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Skeleton className="size-8" />
              )}
            </div>
          </SignedIn>
        </>
      )}
    </div>
  );
};

const SEARCH = () => {
  const [search, setSearch] = useState("");
  return (
    <div className=" relative">
      <Search size={12} className=" absolute top-1/2 -translate-y-1/2 left-3" />
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search LOT..."
        className="px-3 py-2 pl-8 bg-white shadow-2xl rounded-full border border-foreground/10 text-sm"
      />

      {search && (
        <Link
          href={`/search/${search}`}
          className={
            " rounded-full p-2 bg-primary absolute top-1/2 -translate-y-1/2 right-1"
          }
        >
          <ArrowRight size={13} />
        </Link>
      )}
    </div>
  );
};

export default NavigationBar;
