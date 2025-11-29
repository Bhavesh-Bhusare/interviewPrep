"use client";
import FormField from "@/components/common/FormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { z } from "zod";

const authFormSchema = (type: FormType) => {
  return z.object({
    name:
      type === "sign-up"
        ? z.string().min(2, {
            message: "Name must be at least 2 characters.",
          })
        : z.string().optional(),
    email: z.email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isSignIN = type === "sign-in";
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      if (type === "sign-in") {
        const { email, password } = values;

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.error("Sign in Failed. Please try again.");
          setLoading(false);
          return;
        }

        await signIn({
          email,
          idToken,
        });

        toast.success("Signed in successfully.");
        router.push("/");
      } else {
        const { name, email, password } = values;

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result.success) {
          toast.error(result.message);
          setLoading(false);
          return;
        }

        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      }
    } catch (error) {
      console.log(error);
      toast.error(`Something went wrong, ${error}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-background border shadow p-5 lg:p-8 rounded-md lg:rounded-xl w-3/4 md:w-2/5">
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
                name="name"
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
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <ClipLoader size={22} color="white" />
              ) : isSignIN ? (
                "Sign in"
              ) : (
                "Create New Account"
              )}
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
