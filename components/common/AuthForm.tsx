"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "@/components/common/FormField";
import { Form } from "@/components/ui/form";

const authFormSchema = (type: FormType) => {
  return z.object({
    username:
      type === "sign-up"
        ? z.string().min(2, {
            message: "Username must be at least 2 characters.",
          })
        : z.string().optional(),
    email: z.email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const isSignIN = type === "sign-in";
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-in") {
        console.log("SIGN IN", values);
      } else {
        console.log("SIGN UP", values);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Something went wrong, ${error}`);
    }
  }

  return (
    <div className="bg-background border border-accent shadow p-5 lg:p-8 rounded-md lg:rounded-xl w-3/4 md:w-2/5">
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-row justify-center items-center gap-3 ">
          <Image src={"/logo.svg"} height={35} width={38} alt="logo" />
          <h2 className="font-semibold leading-tight text-2xl">
            InterviewPrep
          </h2>
        </div>
        <h5>Practice job interview with AI</h5>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 w-full"
          >
            {!isSignIN && (
              <FormField
                control={form.control}
                name="username"
                label="Full Name"
                placeholder="Enter your full name"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your Email ID"
              type="email"
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your Password"
              type="password"
              enableVisibilityToggle
            />
            <p>Password</p>
            <Button type="submit">
              {isSignIN ? "Sign in" : "Create New Account"}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIN ? "New to InterviewPrep?" : "Already on InterviewPrep?"}
          <Link
            href={isSignIN ? "/sign-up" : "/sign-in"}
            className="font-bold ml-1"
          >
            {isSignIN ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
