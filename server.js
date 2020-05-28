const express = require("express");
const app = express();


const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets up express to server static css/js/images
app.use(express.static("public"));

//API Routes
// The below points our server to a series of "route" files.
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//Port Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
