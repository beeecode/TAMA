import { SignUpPage } from "./SignUpPage";

/** Same screen as sign-up, in its signing-in mode. */
export function SignInPage() {
  return <SignUpPage mode="signin" />;
}

export default SignInPage;
