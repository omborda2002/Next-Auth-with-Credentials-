import { Button, Spacer } from "@nextui-org/react";

import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: 10 }}>
      <Link href="/signin">
        <Button shadow color="primary" auto>
          Sign in
        </Button>
      </Link>
      <Spacer y={0.5} />
      <Link href="/signup">
        <Button shadow color="primary" auto>
          Sign up
        </Button>
      </Link>
      <Spacer y={0.5} />
      <Link href="/data">
        <Button shadow color="error" auto>
          Data
        </Button>
      </Link>
      <Spacer y={0.5} />
      <Button shadow color="warning" auto onClick={(_) => signOut()}>
        SIGN OUT
      </Button>
      <Spacer y={0.5} />
      <Link href="/api/secureapi">Secure API Route</Link>
    </div>
  );
}
