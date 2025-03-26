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
          {["firstName", "lastName"].map((field) => (
            <div key={field} className="space-y-2">
              <Label htmlFor={field}>
                {field === "firstName" ? "First Name" : "Last Name"}
              </Label>
              <Input
                id={field}
                name={field}
                defaultValue={formState?.fields?.[field]}
              />
              {formState?.errors?.[field] && (
                <p className="text-sm text-red-500">
                  {formState.errors[field]}
                </p>
              )}
            </div>
          ))}
        </div>

        {["email", "password", "confirmPassword"].map((field) => (
          <div key={field} className="space-y-2">
            <Label htmlFor={field}>
              {field === "email"
                ? "Email"
                : field === "password"
                ? "Password"
                : "Confirm Password"}
            </Label>
            <Input
              id={field}
              name={field}
              type={field.includes("password") ? "password" : "text"}
              defaultValue={formState?.fields?.[field]}
            />
            {formState?.errors?.[field] && (
              <p className="text-sm text-red-500">{formState.errors[field]}</p>
            )}
          </div>
        ))}

        {formState?.message && (
          <p
            className={`text-sm ${
              formState?.success ? "text-green-600" : "text-red-500"
            }`}
          >
            {formState.message}
          </p>
        )}

        <SubmitButton />
      </form>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/signin" className="underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
