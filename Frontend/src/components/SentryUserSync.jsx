import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import * as Sentry from "@sentry/react";

export function SentryUserSync() {
  const auth = useAuth();

  useEffect(() => {
    // 🔴 safety check (prevents crash if provider is missing)
    if (!auth || !auth.isLoaded) return;

    Sentry.setUser(auth.userId ? { id: auth.userId } : null);
  }, [auth?.isLoaded, auth?.userId]);

  return null;
}

export default SentryUserSync;



// import { useEffect } from "react";
// import { useAuth } from "@clerk/clerk-react";
// import * as Sentry from "@sentry/react";

// /** keeps Sentry user context in sync with Clerk (errors and replays show which user). */
// export function SentryUserSync() {
//   const { isLoaded, userId } = useAuth();

//   useEffect(() => {
//     if (!isLoaded) return;
//     Sentry.setUser(userId ? { id: userId } : null);
//   }, [isLoaded, userId]);

//   return null;
// }

// export default SentryUserSync;