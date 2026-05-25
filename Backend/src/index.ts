import express from "express"
import cors from "cors"
import "dotenv"
import {clerkMiddleware} from "@clerk/express"
import { getEnv } from "./lib/env"
import { clerkWebhookHandler } from "./webhooks/clerk"

const env=getEnv()
const app=express()

const rawJson = express.raw({ type: "application/json", limit: "1mb" });
app.post("/webhooks/clerk", rawJson, (req, res) => {
  void clerkWebhookHandler(req, res);
});
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());



app.post("/webhooks/clerk",(req,res)=>{

})
app.listen(env.PORT, ()=> console.log("Running on port ", env.PORT))