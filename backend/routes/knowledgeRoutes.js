const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dataPath = path.join(__dirname, "../data/knowledge.json");

// GET ALL KNOWLEDGE
router.get("/", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to load knowledge" });
  }
});

// GET SINGLE ARTICLE
router.get("/:id", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    const article = data.find(item => item.id == req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(article);
  } catch (err) {
    res.status(500).json({ message: "Failed to load article" });
  }
});

// POST KNOWLEDGE
router.post("/", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

    const newArticle = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString()
    };

    data.push(newArticle);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    res.status(201).json(newArticle);
  } catch (err) {
    res.status(500).json({ message: "Failed to add article" });
  }
});

module.exports = router;
