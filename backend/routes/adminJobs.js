const express = require("express");
const Job = require("../models/Job");

const router = express.Router();

// Admin: Add a job
router.post("/add-job", async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json({ message: "Job added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all jobs
router.get("/jobs", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

module.exports = router;
