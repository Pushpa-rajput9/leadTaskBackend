import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import leadRoutes from "./src/routes/lead.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
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
