"use client";
import { useFormState } from "react-dom";
import { useEffect } from "react";

import { actionFunction } from "@/lib/types";

const initialState = {
  message: "",
  error: false,
  success: false,
};

function FormContainer({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) {
  const [state, formAction] = useFormState(action, initialState);
  useEffect(() => {
    // if (state?.error && state?.message) {
    //   toast({ description: state?.message, variant: "destructive" });
    // } else if (state?.message && state?.success) {
    //   toast({ description: state?.message, variant: "default" });
    // }
  }, [state]);
  return <form action={formAction}>{children}</form>;
}
export default FormContainer;
