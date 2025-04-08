"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  aboutUsData,
  features,
  testimonialBottom,
  testimonials,
} from "@/data/frontData";
import useLotSearch from "@/hooks/useLotSearch";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ArrowRight, Clock, Play, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AuthenticationPage from "../authPage/AuthenticationPage";
import LOGOCOMP from "../brand/LOGO";
import { InfiniteMovingCards } from "./MovingCards";

const LandingPage = () => {
  return (
    <div>
      <div className=" hidden md:block">
        <Hero />
        <About />
        <Features />
        {/* <Testimonials /> */}
        <CTAsection />
      </div>

      <div className=" min-h-screen md:hidden flex items-center justify-center relative">
        <img
          className=" absolute top-0 left-0 w-full h-full object-cover object-right"
          src="https://img.freepik.com/free-photo/supermarket-banner-concept-with-ingredients_23-2149421147.jpg?t=st=1744030232~exp=1744033832~hmac=4468184ffdffb1fc997d544d5e17710b1effd046e3dae38668cdd7ec4b852228&w=1380"
        />
        <div className=" relative z-40">
          <AuthenticationPage />
        </div>
      </div>
    </div>
  );
};

export const Hero = ({ noPic }: { noPic?: boolean }) => {
  const [search, setSearch] = useState("");
  const { loading, error, results, searchLotNumber } = useLotSearch();

  const handleSearch = () => {
    if (search.trim()) {
      searchLotNumber(search.trim());
    }
  };

  const heroBackground =
    "https://img.freepik.com/free-photo/supermarket-banner-concept-with-ingredients_23-2149421147.jpg?t=st=1744030232~exp=1744033832~hmac=4468184ffdffb1fc997d544d5e17710b1effd046e3dae38668cdd7ec4b852228&w=1380";

  return (
    <div id="hero" className="relative min-h-[69vh] ">
      {!noPic && (
        <>
          <img
            className="absolute top-0 opacity-50 left-0 w-full h-full object-cover z-10"
            src={heroBackground}
            alt="Hero Background"
          />
          <div className="bg-background/70 blur-3xl absolute w-full -top-44 left-0 h-1/2 z-30" />
          <div className="bg-black/20 absolute w-full h-full z-20" />
        </>
      )}

      <div
        className={cn(
          "z-40 absolute top-0 left-0 h-full w-full flex flex-col gap-3 text-background text-2xl items-center justify-center",
          noPic ? "text-foreground" : null
        )}
      >
        <div>
          <div className="text-2xl max-w-lg mb-4">
            Enter a lot number to trace your food&apos;s origin, safety, and
            <span className="italic"> journey</span>
          </div>
          <div className="relative text-foreground">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Enter or  a lot number to trace your food..."
              className={cn(
                "min-w-2xl bg-background/60 focus-visible:outline-none backdrop-blur-2xl px-3 pl-10 py-2 text-lg rounded-lg shadow-xl placeholder:opacity-70 border border-transparent",
                noPic && "border-foreground/25 border-b-4"
              )}
            />
            <Search
              className="absolute top-1/2 ml-3 opacity-80 -translate-y-1/2"
              size={16}
            />

            <Dialog>
              <DialogTrigger asChild>
                {search && (
                  <ArrowRight
                    onClick={handleSearch}
                    className="absolute top-1/2 right-2 cursor-pointer hover:opacity-75 bg-foreground text-background size-8 p-2 rounded-full opacity-80 -translate-y-1/2"
                    size={16}
                  />
                )}
              </DialogTrigger>
              <DialogContent className="min-w-min w-auto bg-transparent border-transparent">
                <DialogTitle className="hidden" />
                <div className="min-w-lg bg-background rounded-xl overflow-hidden">
                  <div className="relative">
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      type="text"
                      placeholder="Enter a lot number to trace your food..."
                      className="w-full focus-visible:outline-none px-3 pl-10 py-2 text-lg border-b border-b-foreground/25 placeholder:opacity-70"
                    />
                    <Search
                      className="absolute top-1/2 ml-3 opacity-80 -translate-y-1/2"
                      size={16}
                    />
                  </div>

                  <div className="min-h-44 ">
                    {!loading && !error && results && (
                      <>
                        <SignedOut>
                          <Dialog>
                            <DialogTrigger asChild>
                              <div className=" w-full  text-start px-6 py-4 hover:bg-foreground/5 transition-all cursor-not-allowed flex items-center justify-between">
                                <div>
                                  <div className=" ">
                                    {results.product.brand}
                                  </div>
                                  <div className=" text-sm opacity-75 spread">
                                    <div>
                                      <ArrowRight size={10} />
                                    </div>
                                    <div>{results.product.name}</div>
                                  </div>
                                </div>

                                <div className=" text-sm opacity-75 spread">
                                  <div>
                                    <Clock size={10} />
                                  </div>
                                  <div>
                                    {
                                      results.traceability[
                                        results.traceability.length - 1
                                      ].event_date
                                    }
                                  </div>
                                </div>
                              </div>
                            </DialogTrigger>
                            <DialogContent className=" min-w-min w-auto bg-transparent border-transparent">
                              <DialogTitle className=" hidden" />
                              <AuthenticationPage />
                            </DialogContent>
                          </Dialog>
                        </SignedOut>
                        <SignedIn>
                          <Link href={`/search/${search}`}>
                            <div className=" w-full  text-start px-6 py-4 hover:bg-foreground/5 transition-all cursor-pointer flex items-center justify-between">
                              <div>
                                <div className=" ">{results.product.brand}</div>
                                <div className=" text-sm opacity-75 spread">
                                  <div>
                                    <ArrowRight size={10} />
                                  </div>
                                  <div>{results.product.name}</div>
                                </div>
                              </div>

                              <div className=" text-sm opacity-75 spread">
                                <div>
                                  <Clock size={10} />
                                </div>
                                <div>{results.traceability[0].status}</div>
                              </div>
                            </div>
                          </Link>
                        </SignedIn>
                      </>
                    )}
                    <div className="text-sm opacity-75 flex items-center justify-center">
                      {loading && "Loading..."}
                      {error && `Error: ${error}`}

                      {!loading &&
                        !error &&
                        !results &&
                        search &&
                        `There is no data of "${search}"`}
                      {!search && "Please search"}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div
      id="about"
      className="p-32  flex items-center justify-center relative z-40 "
    >
      <div className=" wrapper flex  justify-center gap-4">
        <div className=" w-1/2">
          <Dialog>
            <DialogTrigger>
              <div className=" relative group">
                <div className=" group-hover:scale-125 transition-all absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-foreground/75 backdrop-blur-lg text-background p-5 rounded-full">
                  <Play />
                </div>
                <img
                  className=" rounded-3xl"
                  src="https://cdn.prod.website-files.com/61e8494b1e8e024a7113bd50/65c270bcec66e132fd34d972_reporting-p-800.png"
                />
              </div>
            </DialogTrigger>
            <DialogContent className=" bg-transparent border-transparent shadow-none min-w-96">
              <DialogTitle className=" hidden" />
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/jqXbNEbOhmE?si=cw0fj7HH14jORa3K"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </DialogContent>
          </Dialog>
        </div>
        <div className=" w-1/2 h-64 -mt-12  ">
          <div className=" bg-background shadow-2xl p-7 py-0 pb-7 rounded-2xl">
            <div className=" text-2xl">Put food transparency on autopilot</div>
            {aboutUsData.map((item, i) => (
              <div key={i} className=" my-7 ">
                <div>
                  0{i + 1}.{" "}
                  <span className=" opacity-75  text-lg">{item.title}</span>
                </div>
                <div className=" text-sm mt-4">{item.desc}</div>
              </div>
            ))}

            <div className=" mt-8">
              <Button size={"lg"}>Start Now</Button>
              <Button size={"lg"} variant={"secondary"}>
                Download App
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <div
      id="features"
      className=" bg-accent min-h-screen flex items-center justify-center"
    >
      <div className=" wrapper w-full">
        <div className=" text-2xl">
          Everything you need for smarter, safer food decisions.
        </div>
        <div className=" max-w-lg mt-2 text-sm opacity-75 mb-7">
          From searching lot numbers to receiving live alerts, TraceEats gives
          you all the tools to take control of what you eat — and trust what you
          buy.
        </div>

        <div className=" grid grid-cols-3 gap-14 ">
          {features.map((item, i) => (
            <div key={i} className="">
              <img
                className=" w-full aspect-square  rounded-3xl"
                src={item.image}
                alt={item.title}
              />

              <div className=" text-center mt-3">
                <div className="">{item.title}</div>
                <div className=" text-sm opacity-75 mt-2">
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <div
      id="testimonials"
      className=" min-h-dvh flex items-center justify-center"
    >
      <div>
        <div className=" text-2xl wrapper text-foreground">
          <div>Trusted by conscious consumers, chefs, and families</div>
          <div className=" max-w-lg mt-2 text-sm opacity-75 mb-7">
            See how TraceEats is helping people make informed food choices and
            build trust with every search.
          </div>
        </div>
        <InfiniteMovingCards speed="slow" items={testimonials} />

        <InfiniteMovingCards
          className=" -mt-4"
          speed="slow"
          direction="right"
          items={testimonialBottom}
        />
      </div>
    </div>
  );
};

const CTAsection = () => {
  return (
    <section
      id="join-us"
      className="w-full min-h-screen flex items-center justify-center "
    >
      <div className="wrapper flex items-center flex-col md:flex-row">
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/screenshot-left.png"
            alt="Phone displaying app"
            className="h-[420px] "
          />
        </div>

        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <div className="flex justify-center md:justify-start">
            <img className=" w-24" src="/Logo-green-icn.png" alt="asdasd" />
          </div>

          <h2 className="text-3xl  ">Install the App and Take Us Everywhere</h2>

          <p className=" opacity-50 text-lg">
            Stay connected on the go. Access everything you need in one tap —
            anytime, anywhere.
          </p>

          <div className="flex justify-center md:justify-start gap-2 flex-wrap">
            <a
              href="#"
              className={buttonVariants({
                variant: "default",
                size: "lg",
              })}
            >
              Get it on Android
            </a>
            <a
              href="#"
              className={buttonVariants({
                variant: "secondary",
                size: "lg",
              })}
            >
              Download on iOS
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
