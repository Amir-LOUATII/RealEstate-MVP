"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpWithCredentials } from "@/lib/actions/auth-actions";
import Link from "next/link";
import { startTransition, useActionState, useRef } from "react";
import { SubmitButton } from "./submit-button";

export function SignUpForm() {
  const [formState, formAction] = useActionState(signUpWithCredentials, null);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="grid gap-6">
      <form
        ref={formRef}
        action={(formData) => {
          startTransition(() => {
            formAction(formData);
          });
        }}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              defaultValue={formState?.fields?.firstName}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              defaultValue={formState?.fields?.lastName}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={formState?.fields?.email}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            defaultValue={formState?.fields?.password}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            defaultValue={formState?.fields?.confirmPassword}
          />
        </div>

        {formState?.message && (
          <p
            className={`text-sm ${
              formState?.success ? "text-green-600" : "text-destructive"
            }`}
          >
            {formState.message}
          </p>
        )}

        <SubmitButton />
      </form>

      <div className="text-center text-sm">
        Already have an account?
        <Link href="/auth/signin" className="underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
