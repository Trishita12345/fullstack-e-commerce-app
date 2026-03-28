"use client";

import { Session } from "@/lib/auth";
import { useSession } from "@/utils/store/session";
import { useRouter } from "next/navigation";

export interface LoggedInProps {
  session: Session;
}
export interface LoggedOutProps {
  redirectToLogin: () => void;
}

const LoginComponent = ({
  LoggedInComponent,
  NotLoggedInComponent,
}: {
  LoggedInComponent: any;
  NotLoggedInComponent: any;
}) => {
  const session = useSession();
  const router = useRouter();

  console.log("Session in LoginComponent: ", session);
  return (
    <>
      {session?.user ? (
        <LoggedInComponent session={session} />
      ) : (
        <NotLoggedInComponent redirectToLogin={() => router.push(`/login?redirectUrl=${encodeURIComponent(window.location.href)}`)} />
      )}
    </>
  );
};

export default LoginComponent;
