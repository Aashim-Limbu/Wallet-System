"use client";
import { Suspense, useActionState, useEffect } from "react";
import NextImage from "next/image";
import Background from "../assets/verification-background-image.jpg";
import { Button } from "./button";
import { startTransition } from "react";
import { toast, Toaster } from "sonner";
import { useSearchParams } from "next/navigation";

type ReturnTypeAction = Promise<{ error?: string; success?: string }>;

type VerifyUserPageProps = {
  verifyAction: (prevState: unknown, token: string) => ReturnTypeAction;
};

const VerifyUserPage = ({ verifyAction }: VerifyUserPageProps) => {
  const [error, action, isPending] = useActionState(verifyAction, {});
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    setTimeout(() => {
      toast.info("Welcome, please verify your email.");
    });

    if (error?.error || error?.success) {
      toast("Email has been confirmed, please login", {
        duration: 5000,
        action: {
          label: "Login",
          onClick: () => {
            window.location.href = "http://localhost:3000/login";
          },
        },
      });
    }
  }, [error]);

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="relative bg-gray-800 h-full px-6 py-32 sm:px-12 sm:py-42 lg:py-56 lg:px-16">
        <div className="absolute inset-0 overflow-hidden">
          <NextImage
            alt="Background Image"
            src={Background}
            className="h-full w-full object-cover object-center blur-sm"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gray-900 bg-opacity-50" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Verify Email
          </h2>
          <p className="mt-3 text-xl text-white">
            Your financial journey starts here. With our wallet application, you can manage your assets securely and effortlessly. We prioritize your safety, ensuring every transaction is protected. Embrace the freedom to explore your financial possibilities with confidence.
          </p>
          <Button
            variant="Secondary"
            onClick={async () => startTransition(() => action(token!))}
            className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
          >
            {isPending ? "Loading..." : "Secure your finance"}
          </Button>
        </div>
      </div>
    </>
  );
};

type VerifyUserWithSuspenseProps = {
  verifyAction: (prevState: unknown, token: string) => ReturnTypeAction;
};

const VerifyUserWithSuspense = (props: VerifyUserWithSuspenseProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyUserPage {...props} />
    </Suspense>
  );
};

export default VerifyUserWithSuspense;
