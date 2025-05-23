const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Sample news headlines data
let newsHeadlines = [
  {
    id: "1",
    title: "New Technology Breakthrough Promises Faster Internet Speeds",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    url: "https://example.com/news/1",
  },
  {
    id: "2",
    title: "Global Climate Summit Reaches Historic Agreement",
    imageUrl:
      "https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    url: "https://example.com/news/2",
  },
  {
    id: "3",
    title:
      "MARINA grants special permits to ease San Juanico bridge disruption",
    imageUrl:
      "https://files01.pna.gov.ph/ograph/2025/05/20/tacloban---ormoc-roro.jpg",
    url: "https://news.google.com/read/CBMiUEFVX3lxTFBfY0JiOFQ3Q1ZxY0hIbnZubml0a1J0ZmxHWHN2UTB3RzlGOFhMUUVnT2U4dG9ja01Ia3JpdmtOdmx5eUNxbjZjVEU5dXlvX080?hl=en-PH&gl=PH&ceid=PH%3Aen",
  },
  {
    id: "4",
    title: "PBBM to Cabinet secretaries: Submit courtesy resignations",
    imageUrl:
      "https://files01.pna.gov.ph/category-list/2025/05/08/img1671.jpeg",
    url: "https://news.google.com/read/CBMiUEFVX3lxTE5HajV6SHhZdC1WckQxWW5OZzA2YmkxZjJMbUNuMlYxSXJkb2hfOHprNjUtSjhrTDluX2NuaEt1RUVZTy1FSzJlazhkTW8wNmFG?hl=en-PH&gl=PH&ceid=PH%3Aen",
  },
  {
    id: "5",
    title:
      "Justin Bieber's remarks on Hailey Bieber's Vogue cover sparks controversy",
    imageUrl:
      "https://www.geo.tv/assets/uploads/updates/2025-05-21/l_605439_053336_updates.jpg",
    url: "https://news.google.com/read/CBMixAFBVV95cUxNX1NfTlNxT0lBV3NzNW1qQ0F5TC02NmJwMkZGMm9pX29RcVRNcHRpU2RoVll6T04xWUxnQmtiSEpXejAxblRpNXcxVEZkUjc2aHktVHJxV0dIWTNFMFk4WlNvaVlYcmNXZFFxY21aYzh4M1JST1QxZ01oUElpOF9rRnA3NUdnVkdwcEtVR3pMWmFOdlFqU1NwX1hsN21OVFRDT25yby1JVTNWcGhINEpUbHBCZkc4T2kxM1RMal9kNzNKUHB6?hl=en-PH&gl=PH&ceid=PH%3Aen",
  },
  {
    id: "6",
    title: "Tech Giant Announces Revolutionary New Product Line",
    // No imageUrl provided to demonstrate S3 fallback
    url: "https://example.com/news/6",
  },
];

// API endpoint to get all news headlines
app.get("/api/news", (req, res) => {
  res.json(newsHeadlines);
});

// API endpoint to get a random news headline
app.get("/api/news/random", (req, res) => {
  if (newsHeadlines.length === 0) {
    return res.status(404).json({ error: "No headlines available" });
  }

  const randomIndex = Math.floor(Math.random() * newsHeadlines.length);
  res.json(newsHeadlines[randomIndex]);
});

// API endpoint to get a specific news headline by ID
app.get("/api/news/:id", (req, res) => {
  const headline = newsHeadlines.find((h) => h.id === req.params.id);

  if (!headline) {
    return res.status(404).json({ error: "Headline not found" });
  }

  res.json(headline);
});

// API endpoint to add a new headline
app.post("/api/news", (req, res) => {
  const { title, imageUrl, url } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newHeadline = {
    id: String(Date.now()),
    title,
    imageUrl,
    url: url || "#",
  };

  newsHeadlines.push(newHeadline);
  res.status(201).json(newHeadline);
});

// API endpoint to update a headline
app.put("/api/news/:id", (req, res) => {
  const { title, imageUrl, url } = req.body;
  const headlineIndex = newsHeadlines.findIndex((h) => h.id === req.params.id);

  if (headlineIndex === -1) {
    return res.status(404).json({ error: "Headline not found" });
  }

  const updatedHeadline = {
    ...newsHeadlines[headlineIndex],
    title: title || newsHeadlines[headlineIndex].title,
    imageUrl:
      imageUrl !== undefined ? imageUrl : newsHeadlines[headlineIndex].imageUrl,
    url: url || newsHeadlines[headlineIndex].url,
  };

  newsHeadlines[headlineIndex] = updatedHeadline;
  res.json(updatedHeadline);
});

// API endpoint to delete a headline
app.delete("/api/news/:id", (req, res) => {
  const headlineIndex = newsHeadlines.findIndex((h) => h.id === req.params.id);

  if (headlineIndex === -1) {
    return res.status(404).json({ error: "Headline not found" });
  }

  const deletedHeadline = newsHeadlines[headlineIndex];
  newsHeadlines = newsHeadlines.filter((h) => h.id !== req.params.id);

  res.json(deletedHeadline);
});

// API documentation endpoint
app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the News Headlines API",
    endpoints: [
      { method: "GET", path: "/api/news", description: "Get all headlines" },
      {
        method: "GET",
        path: "/api/news/random",
        description: "Get a random headline",
      },
      {
        method: "GET",
        path: "/api/news/:id",
        description: "Get a specific headline by ID",
      },
      {
        method: "POST",
        path: "/api/news",
        description: "Create a new headline",
      },
      {
        method: "PUT",
        path: "/api/news/:id",
        description: "Update a headline",
      },
      {
        method: "DELETE",
        path: "/api/news/:id",
        description: "Delete a headline",
      },
    ],
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
app.listen(port, () => {
  console.log(`News API server running at http://localhost:${port}`);
  console.log(`API documentation available at http://localhost:${port}/api`);
});
