// index.js
import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("GovTrack microservice is running. Try /api/bills");
});

app.get("/api/bills", async (req, res) => {
  try {
    const response = await axios.get("https://www.govtrack.us/api/v2/bill", {
      params: {
        congress: 119,
        sort: "-introduced_date",
        limit: 10,
      },
    });

    const bills = response.data.objects.map((bill) => ({
      id: bill.id,
      title: bill.title,
      date: bill.introduced_date,
      sponsor: bill.sponsor?.name || "Unknown",
      bill_type: bill.bill_type,
      number: bill.number,
    }));

    res.json(bills);
  } catch (error) {
    console.error("Error fetching bills:", error.message);
    res.status(500).json({ error: "Failed to fetch bills" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
