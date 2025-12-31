import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// ---- GOOGLE BUSINESS ----
app.get("/auth/google", (req, res) => {
  const url =
    "https://accounts.google.com/o/oauth2/v2/auth" +
    `?client_id=${process.env.GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}` +
    "&response_type=code" +
    "&scope=https://www.googleapis.com/auth/business.manage" +
    "&access_type=offline&prompt=consent";

  res.redirect(url);
});

app.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code"
    })
  });

  const tokens = await tokenRes.json();
  console.log("Google tokens:", tokens);

  res.send("Google Business connected");
});

// ---- YOUTUBE ----
app.get("/auth/youtube", (req, res) => {
  const url =
    "https://accounts.google.com/o/oauth2/v2/auth" +
    `?client_id=${process.env.YOUTUBE_CLIENT_ID}` +
    `&redirect_uri=${process.env.YOUTUBE_REDIRECT_URI}` +
    "&response_type=code" +
    "&scope=https://www.googleapis.com/auth/youtube.readonly" +
    "&access_type=offline&prompt=consent";

  res.redirect(url);
});

app.get("/auth/youtube/callback", async (req, res) => {
  const code = req.query.code;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.YOUTUBE_CLIENT_ID,
      client_secret: process.env.YOUTUBE_CLIENT_SECRET,
      redirect_uri: process.env.YOUTUBE_REDIRECT_URI,
      grant_type: "authorization_code"
    })
  });

  const tokens = await tokenRes.json();
  console.log("YouTube tokens:", tokens);

  res.send("YouTube connected");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on", PORT));
