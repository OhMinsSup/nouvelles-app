import React from "react";
import type { Metadata } from "next";
import SignInForm from "apps/nouvelles/src/components/auth/signin-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function Page() {
  return <SignInForm />;
}
