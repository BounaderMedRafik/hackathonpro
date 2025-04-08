"use client";
import { Button } from "@/components/ui/button";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { BsDiscord, BsGithub } from "react-icons/bs";

const AuthenticationPage = () => {
  const [signup, setSignup] = useState(false);

  const { signIn } = useSignIn();
  const { signUp } = useSignUp();

  if (!signIn) return null;

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn
      .authenticateWithRedirect({
        strategy,
        redirectUrl: "/",
        redirectUrlComplete: "/",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          console.error("Authentication error:", err.message);
        } else {
          console.error("An unknown error occurred:", err);
        }
      });
  };

  const signUpWith = (strategy: OAuthStrategy) => {
    if (!signUp) return;

    return signUp
      .authenticateWithRedirect({
        strategy,
        redirectUrl: "/",
        redirectUrlComplete: "/",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          console.error("Authentication error:", err.message);
        } else {
          console.error("An unknown error occurred:", err);
        }
      });
  };

  if (signup) {
    return (
      <AnimatePresence>
        <motion.div
          key={signup ? "open" : "closed"}
          initial={{
            opacity: 0,
            y: 75,
            scale: 0.6,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
              ease: [0.25, 1, 0.5, 1],
              duration: 0.5,
            },
          }}
          exit={{
            opacity: 0,
            y: 75,
            filter: "blur(10px)",
            transition: {
              ease: [0.7, 0, 0.84, 0],
              duration: 0.3,
            },
          }}
          className="  overflow-hidden flex items-center flex-col justify-center border-foreground/10 border shadow-2xl p-3 pt-4 bg-background rounded-xl max-w-2xs w-full"
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              rotate: 90,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: 0,
              filter: "blur(0px)",
              transition: {
                ease: [0.25, 1, 0.5, 1],
                duration: 0.5,
                delay: 0.3,
              },
            }}
          >
            <img
              className=" bg-transparent  size-20"
              src="/Logo-black.svg"
              alt=""
            />
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                ease: [0.25, 1, 0.5, 1],
                duration: 0.5,
                delay: 0.35,
              },
            }}
            className=" w-full text-center"
          >
            <div className=" text-xl font-bold">Sign Up</div>
            <div className=" text-xs opacity-75  mx-auto  leading-3.5 mt-2">
              Join the community of developers sharing knowledge and insights!
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                ease: [0.25, 1, 0.5, 1],
                duration: 0.5,
                delay: 0.4,
              },
            }}
            className=" w-full mt-4 space-y-0.5"
          >
            <Button
              onClick={() => {
                signUpWith("oauth_github");
              }}
              className=" w-full relative"
            >
              <div className=" flex items-center gap-2">
                <div>
                  <BsGithub size={10} />
                </div>
                <div>Continue with Github</div>
              </div>
            </Button>

            <Button
              onClick={() => {
                signUpWith("oauth_discord");
              }}
              variant={"secondary"}
              className=" w-full relative"
            >
              <div className=" flex items-center gap-2">
                <div>
                  <BsDiscord size={10} />
                </div>
                <div>Continue with discord</div>
              </div>
            </Button>

            <div
              id="clerk-captcha"
              data-cl-theme="dark"
              data-cl-size="flexible"
              data-cl-language="es-ES"
            />

            <div
              onClick={() => {
                setSignup(false);
              }}
              className=" cursor-pointer mt-1 text-xs  w-fit mx-auto opacity-75 hover:opacity-100 transition-all "
            >
              Already have an account?
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  } else {
    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 75,
          scale: 0.6,
          filter: "blur(10px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: {
            ease: [0.25, 1, 0.5, 1],
            duration: 0.5,
          },
        }}
        exit={{
          opacity: 0,
          y: 75,
          filter: "blur(10px)",
          transition: {
            ease: [0.7, 0, 0.84, 0],
            duration: 0.3,
          },
        }}
        className="overflow-hidden flex items-center flex-col justify-center shadow-2xl border border-foreground/10    p-3 pt-4 bg-background rounded-xl max-w-2xs w-full"
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
            rotate: 90,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            rotate: 0,
            filter: "blur(0px)",
            transition: {
              ease: [0.25, 1, 0.5, 1],
              duration: 0.5,
              delay: 0.3,
            },
          }}
        >
          <img
            className=" bg-transparent  size-20"
            src="/Logo-black.svg"
            alt=""
          />
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
              ease: [0.25, 1, 0.5, 1],
              duration: 0.5,
              delay: 0.35,
            },
          }}
          className="  w-full text-center"
        >
          <div className=" text-xl font-bold">Welcome Back</div>
          <div className=" text-xs opacity-75  w-2/3 mx-auto leading-3.5 mt-2">
            Log in to continue where you left off and stay updated.
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
              ease: [0.25, 1, 0.5, 1],
              duration: 0.5,
              delay: 0.4,
            },
          }}
          className=" w-full mt-4 space-y-0.5"
        >
          <Button
            onClick={() => {
              signInWith("oauth_github");
            }}
            className=" w-full relative"
          >
            <div className=" flex items-center gap-2">
              <div>
                <BsGithub size={10} />
              </div>
              <div>Continue with Github</div>
            </div>
          </Button>

          <Button
            variant={"secondary"}
            onClick={() => {
              signInWith("oauth_discord");
            }}
            className=" w-full relative"
          >
            <div className=" flex items-center gap-2">
              <div>
                <BsDiscord size={10} />
              </div>
              <div>Continue with Discord</div>
            </div>
          </Button>

          <div
            onClick={() => {
              setSignup(true);
            }}
            className=" cursor-pointer mt-1 text-xs  w-fit mx-auto opacity-75 hover:opacity-100 transition-all "
          >
            Make an account?
          </div>
        </motion.div>
      </motion.div>
    );
  }
};

export default AuthenticationPage;
