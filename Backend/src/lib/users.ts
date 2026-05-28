import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";

export async function getLocalUser(clerkUserId: string) {
  const [row] = await db.select().from(users).where(eq(users.clerkUserId, clerkUserId)).limit(1);
  return row;
}


// import { eq } from "drizzle-orm";
// import { db } from "../db/index.js";
// import { users } from "../db/schema.js";

// export async function getLocalUser(clerkUserId: string) {
//   try {
//     console.log("SEARCHING USER:", clerkUserId);

//     const [row] = await db
//       .select()
//       .from(users)
//       .where(eq(users.clerkUserId, clerkUserId))
//       .limit(1);

//     console.log("FOUND USER:", row);

//     return row;

//   } catch (e) {
//     console.error("DB ERROR:", e);

//     throw e;
//   }
// }