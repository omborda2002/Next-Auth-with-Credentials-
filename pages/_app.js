import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import Load from "../components/Load";
import { useSession } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider
      session={session} // Re-fetch session every 60 minutes
      refetchInterval={60 * 60}
      // Re-fetches session when window is focused
      refetchOnWindowFocus={true}
    >
      <NextUIProvider>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
        <Toaster />
      </NextUIProvider>
    </SessionProvider>
  );
}

export default MyApp;

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.href = "/signin";
    },
  });

  if (status === "loading") {
    return <Load />;
  }

  return children;
}
