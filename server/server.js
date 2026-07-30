const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// During development, allow requests from any origin on the local network so
// you can test from mobile devices. For production, restrict this to your
// frontend domain(s).
// CORS configuration
// In production, set FRONTEND_URL to your deployed frontend (comma-separated list allowed).
// In development, allow all origins so you can test from mobile/dev machines.
const frontendEnv = process.env.FRONTEND_URL || "";
const allowedOrigins = frontendEnv
  ? frontendEnv.split(",").map((s) => s.trim())
  : ["http://localhost:5173", "http://127.0.0.1:5173"];

if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: function (origin, callback) {
        // allow requests with no origin (curl, native apps)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
          return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
      },
      credentials: true,
    })
  );
} else {
  // relaxed for local and LAN development
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
}

app.use(express.json());
//Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
    res.send("JournalX API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});