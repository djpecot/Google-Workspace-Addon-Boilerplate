import * as functions from "firebase-functions"
import * as express from "express"
import cors from "cors"

import hashRouter from "./hashRouter"
import subscriptionWebhook from "./subscriptionWebhook"
import trialExtender from "./trialExtender"

// 🤖 API \\
const app = express()
const corsConfig = cors({ origin: true })
// 1️⃣ set request handler:
app.use(corsConfig)
// 2️⃣ set the app controllers:
app.use("/auth", hashRouter)
app.use("/subscriptionWebhook", subscriptionWebhook)
// 3️⃣ set error handler:
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: err.message || "An unknown error occurred." })
})
// 4️⃣ export:
exports.api = functions.https.onRequest(app) // api

// 🤖 CALLABLE FUNCTIONS \\
exports.trialExtender = functions.https.onCall(trialExtender)
