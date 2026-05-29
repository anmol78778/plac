import { getAuth } from "@clerk/express";
import { Router } from "express";
import { getLocalUser } from "../lib/users";
import { db } from "../db";
import { users } from "../db/schema";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    let user = await getLocalUser(userId);

    // AUTO CREATE USER
    if (!user) {
  user = (
    await db
      .insert(users)
      .values({
        clerkUserId: userId,
        email: "",
        displayName: "User",
        role: "customer",
      })
      .returning()
  )[0];
}

    res.json({ user });
  } catch (e) {
    next(e);
  }
});

export default router;










// import { getAuth } from "@clerk/express";
// import { Router } from "express";
// import { getLocalUser } from "../lib/users";

// const router = Router();

// router.get("/", async (req, res, next) => {
//   try {
//     const { userId } = getAuth(req);

//     if (!userId) {
//       res.status(401).json({ error: "Unauthorized" });
//       return;
//     }

//     console.log("CLERK USER ID:", userId);

//     const user = await getLocalUser(userId);

//     console.log("FOUND USER:", user);

//     res.json({ user });
//   } catch (e) {
//     next(e);
//   }
// });

// export default router;


// import { getAuth } from "@clerk/express";
// import { Router } from "express";
// import { getLocalUser } from "../lib/users";

// const router = Router();

// router.get("/", async (req, res, next) => {
//   try {
//     const { userId } = getAuth(req);
//     if ( !userId) {
//       res.status(401).json({ error: "Unauthorized" });
//       return;
//     }
// //!isAuthenticated ||



//     const user = await getLocalUser(userId);
//      console.log("AUTH DEBUG:", getAuth(req));
//     res.json({ user });
//   } catch (e) {
//     next(e);
//   }
// });

// export default router;