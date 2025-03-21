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

setUserRoutes(app);
setRecordRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
