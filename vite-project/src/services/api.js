// src/services/api.js

export const fetchJobs = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/admin/jobs");

    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};

export const fetchCourses = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/admin/courses");

    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};