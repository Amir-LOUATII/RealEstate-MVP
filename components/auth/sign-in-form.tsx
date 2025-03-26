import { signInWithCredentials } from "@/lib/actions/auth-actions";

import Link from "next/link";
import { SubmitButton } from "../auth/submit-button";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";

export function SignInForm() {
  return (
    <div className="w-full md:max-w-md lg:max-w-sm  p-3 md:p-6 rounded-2xl shadow-md mx-auto bg-header-foreground dark:bg-primary-foreground mt-3 ">
      <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

      <FormContainer action={signInWithCredentials}>
        <FormInput
          defaultValue="admin@guest.com"
          name="email"
          type="email"
          label="Email"
          placeholder="Please enter your email"
        />
        <FormInput
          defaultValue="adminguest123456789"
          name="password"
          type="password"
          label="Password"
          placeholder="Please enter your password"
        />
        <SubmitButton />
      </FormContainer>
      <p className="my-2 mx-auto text-center">Or</p>

      <p className="text-center mt-4">
        Don’t have an account?{" "}
        <Link
          href="/auth/register"
          className="text-blue-500 hover:underline text-nowrap"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
