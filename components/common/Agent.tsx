"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

enum CallStatus {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  CONNECTING = "CONNECTING",
  FINISHED = "FINISHED",
}

const Agent = () => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const isSpeaking = true;
  const messages = [
    "What is your name?",
    "My name is Bhavesh, nice to meet you",
  ];
  const lastMessage = messages[messages.length - 1];
  return (
    <>
      <div className="flex sm:flex-row flex-col gap-10 items-center justify-between w-full">
        {/* AI Interviewer Card */}
        <div className="flex justify-center items-center flex-col gap-2 p-7 h-[400px] rounded-lg border-1  flex-1 sm:basis-1/2 w-full shadow">
          <div className="z-10 flex items-center justify-center bg-gradient-to-l from-[#FFFFFF] to-[#CAC5FE] rounded-full size-[120px] relative">
            <Image
              src="/ai-avatar.png"
              alt="profile-image"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && (
              <span className="absolute inline-flex size-5/6 animate-ping rounded-full bg-[#CAC5FE] opacity-75" />
            )}
          </div>
          <h3>AI Interviewer</h3>
        </div>
        <div className=" border-1 rounded-lg flex-1 sm:basis-1/2 w-full h-[400px] max-md:hidden shadow">
          <div className="flex flex-col gap-2 justify-center items-center p-7 bg-gradient-to-b from-[#dae1ef] to-[#949ab2] rounded-lg min-h-full">
            <Image
              src="/user-avatar.png"
              alt="profile-image"
              width={539}
              height={539}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{"userName"}</h3>
          </div>
        </div>
      </div>

      <div>
        {messages.length > 0 && (
          <div className="bg-gradient-to-b from-[#9fa4a8] to-[#a1abb633] p-0.5 rounded-2xl w-full">
            <div className=" rounded-2xl  min-h-12 px-5 py-3 flex items-center justify-center">
              <p
                key={lastMessage}
                className={cn(
                  "text-lg text-center transition-opacity duration-500 opacity-0",
                  "animate-fadeIn opacity-100"
                )}
              >
                {lastMessage}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button
            className="relative inline-block px-7 py-3 font-bold text-sm leading-5 text-white transition-colors duration-150 bg-success-100 border border-transparent rounded-full shadow-sm focus:outline-none focus:shadow-2xl active:bg-success-200 hover:bg-success-200 min-w-28 cursor-pointer items-center justify-center overflow-visible;"
            onClick={() => {}}
          >
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />

            <span className="relative">
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : ". . ."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect" onClick={() => {}}>
            End
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
