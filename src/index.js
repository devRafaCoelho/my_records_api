const express = require("express");
const cors = require("cors");
const setUserRoutes = require("./routes/userRoutes");
const setRecordRoutes = require("./routes/recordRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/", (req, res) => {
  res.json({
    status: "API is running",
    timestamp: new Date(),
    service: "My Products API",
  });
});

setUserRoutes(app);
setRecordRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
