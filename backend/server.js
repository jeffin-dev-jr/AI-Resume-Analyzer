require("dotenv").config();
const express = require("express");
const multer = require("multer");
const pdf = require("pdf-parse");
const cors = require("cors");
const fs = require("fs");

const connectDB = require("./config/db");
const extractSkills = require("./utils/extractSkills");

const Job = require("./models/Job");
const Course = require("./models/Course");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/admin", require("./routes/adminJobs"));
app.use("/api/admin", require("./routes/adminCourses"));

// Multer setup
const upload = multer({ dest: "uploads/" });


// ==============================
// API: Analyze Resume
// ==============================

app.post("/api/analyze", upload.single("resume"), async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;

    let resumeText = "";

    // ==============================
    // Extract Text From PDF
    // ==============================

    if (req.file.mimetype === "application/pdf") {

      const pdfBuffer = fs.readFileSync(filePath);
      const pdfData = await pdf(pdfBuffer);

      resumeText = pdfData.text;

    } else {
      return res.status(400).json({ error: "Only PDF is supported." });
    }

    // delete temp file
    fs.unlinkSync(filePath);


    // ==============================
    // Extract Skills from Resume
    // ==============================

    const extractedSkills = extractSkills(resumeText);

    console.log("Extracted Skills:", extractedSkills);


    // ==============================
    // Fetch Jobs from DB
    // ==============================

    const jobs = await Job.find();


    // ==============================
    // Job Matching Logic
    // ==============================

    const jobMatches = jobs.map((job) => {

      const jobSkills = job.skills.map(skill => skill.toLowerCase());

      const matchedSkills = extractedSkills.filter(skill =>
        jobSkills.includes(skill)
      );

      const missingSkills = jobSkills.filter(skill =>
        !extractedSkills.includes(skill)
      );

      const score = matchedSkills.length / jobSkills.length;

      return {
        jobId: job._id,
        title: job.title,
        company: job.company,
        location: job.location,
        description: job.description,
        score: score,
        matchedSkills: matchedSkills,
        missingSkills: missingSkills
      };

    });


    // ==============================
    // Sort Jobs by Score
    // ==============================

    jobMatches.sort((a, b) => b.score - a.score);

    const topJobs = jobMatches.slice(0, 5);


    // ==============================
    // Course Recommendation
    // ==============================

    const allMissingSkills = [...new Set(
      topJobs.flatMap(job => job.missingSkills)
    )];

    const courses = await Course.find();

    const recommendedCourses = courses.filter(course => {

      const courseSkills = course.skillsCovered.map(skill =>
        skill.toLowerCase()
      );

      return courseSkills.some(skill =>
        allMissingSkills.includes(skill)
      );

    });


    // ==============================
    // API Response
    // ==============================

    res.json({

      extractedSkills: extractedSkills,

      recommendedJobs: topJobs,

      missingSkills: allMissingSkills,

      recommendedCourses: recommendedCourses

    });


  } catch (err) {

    console.log("ERROR:", err);

    res.status(500).json({
      error: "Error processing resume"
    });

  }

});


// ==============================

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

app.listen(PORT, () => {
  console.log("Backend running on port " + PORT);
});