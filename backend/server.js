const express = require("express");
const cors = require("cors");
const knowledgeRoutes = require("./routes/knowledgeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/knowledge", knowledgeRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
