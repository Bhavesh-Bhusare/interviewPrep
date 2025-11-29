import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import DisplayTechIcons from "@/components/common/DisplayTechIcons";

import { cn, getRandomInterviewCover } from "@/lib/utils";
import { Calendar, CalendarDays, Star } from "lucide-react";
// import { getFeedbackByInterviewId } from "@/lib/actions/general.action";

const InterviewCard = async ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback = null;

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const badgeColor =
    {
      Behavioral: "bg-gray-400",
      Mixed: "bg-gray-500",
      Technical: "bg-gray-600",
    }[normalizedType] || "bg-gray-600";

  const formattedDate = dayjs(Date.now()).format("MMM D, YYYY");

  return (
    <div className=" p-0.5 rounded-2xl w-[360px] max-sm:w-full min-h-96">
      <div className="flex items-center justify-center flex-col gap-2 p-7 h-[400px] bg-gradient-to-b from-gray-50 to-gray-200 rounded-lg border flex-1 sm:basis-1/2 w-full relative">
        <div>
          {/* Type Badge */}
          <div
            className={cn(
              "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg rounded-tr  -lg",
              badgeColor
            )}
          >
            <p className="text-sm font-semibold capitalize">{normalizedType}</p>
          </div>

          {/* Cover Image */}
          <Image
            src={getRandomInterviewCover()}
            alt="cover-image"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px]"
          />

          {/* Interview Role */}
          <h3 className="mt-5 font-medium capitalize">{role} Interview</h3>

          {/* Date & Score */}
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row items-center gap-2">
              <CalendarDays className="text-yellow-400" size={22} />
              <p>{formattedDate}</p>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <Star className="text-yellow-400" size={22} />
              <p>{"---"}/100</p>
            </div>
          </div>

          {/* Feedback or Placeholder Text */}
          <p className="line-clamp-2 mt-5">
            {
              "You haven't taken this interview yet. Take it now to improve your skills."
            }
          </p>
        </div>

        <div className="flex flex-row justify-between mt-3 w-full">
          <DisplayTechIcons techStack={techstack} />

          <Button className="btn-primary">
            <Link
              href={
                feedback
                  ? `/interview/${interviewId}/feedback`
                  : `/interview/${interviewId}`
              }
            >
              {feedback ? "Check Feedback" : "View Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
