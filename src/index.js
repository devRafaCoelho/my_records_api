const express = require("express");
const bodyParser = require("body-parser");
const setExampleRoutes = require("./routes/exampleRoutes"); // Renomeado para refletir a função
const setUserRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

setExampleRoutes(app); // Passa o objeto app para a função
setUserRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
