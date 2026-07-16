require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const logger = require("morgan"); // logging middleware
const cors = require("cors"); // cross origin middleware


const PORT = process.env.PORT || 3000; // default port to listen

// Pull Router Class
const routes = require("./routes"); 




// Pull database 
require("./config/database");





// Application Setup
const app = express();
app.use(logger("dev")); // log every request to the console
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Use the defined routes
app.use("/api", routes);


// catch 404 and forward to error handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: "Route not found"
    });
});


// error handler
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500).json({
        success: false,
        error: err.message
    });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Express running on port ${PORT}`);
});

// Start Up Message
console.log(`TuneFX API running on port ${PORT}`);
console.log(`Environment: ${process.env.NODE_ENV}`);

