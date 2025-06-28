import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import leadRoutes from "./src/routes/lead.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = [
  "http://localhost:5173",
  "https://main.d1fpedi83xilbf.amplifyapp.com/",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// log body for debugging
// app.use((req, res, next) => {
//   console.log("🔹 Request Body:", req.body);
//   next();
// });
//routes
app.use("/api/v1/lead", leadRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
