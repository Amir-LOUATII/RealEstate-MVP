"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInWithCredentials } from "@/lib/actions/auth-actions";
import { loginFormSchema } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SubmitButton } from "./submit-button";
import { Divider } from "./divider";
import { GoogleSignInButton } from "./google-sign-in-button";

export function SignInForm() {
  const [formState, formAction] = useActionState(signInWithCredentials, null);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form
          ref={formRef}
          onSubmit={form.handleSubmit(() =>
            startTransition(() => formAction(new FormData(formRef.current!)))
          )}
          className="space-y-4"
        >
          {(["email", "password"] as const).map((name) => (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {name === "email" ? "Email" : "Password"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={name === "password" ? "password" : "text"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  {formState?.errors?.[name] && (
                    <p className="text-red-500 text-sm">
                      {formState.errors[name]}
                    </p>
                  )}
                </FormItem>
              )}
            />
          ))}
          <SubmitButton />
        </form>
      </Form>
      <Divider text="Or continue with" />
      <GoogleSignInButton />
    </div>
  );
}
