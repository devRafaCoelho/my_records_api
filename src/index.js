const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Importa o cors
const setUserRoutes = require("./routes/userRoutes");
const setRecordRoutes = require("./routes/recordRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check route
app.get("/", (req, res) => {
  res.json({
    status: "API is running",
    timestamp: new Date(),
    service: "My Records API",
  });
});

setUserRoutes(app);
setRecordRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
