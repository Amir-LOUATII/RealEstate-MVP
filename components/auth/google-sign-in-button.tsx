import { signIn } from "@/auth";
import { Button } from "../ui/button";
import GoogleIcon from "@/assets/google-icon.svg";
import Image from "next/image";
export function GoogleSignInButton() {
  return (
    <Button
      variant="outline"
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      <Image src={GoogleIcon} fill alt="google-icon" />
      Google
    </Button>
  );
}
