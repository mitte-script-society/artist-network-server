// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const { isAuthenticated } = require("./middleware/jwt.middleware.js");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const concertRoutes= require("./routes/concert.routes");
app.use("/concert", concertRoutes)

const userRoutes= require("./routes/user.routes");
app.use("/user", userRoutes)

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const artistRoutes = require("./routes/artist.routes");
app.use("/artists", artistRoutes);

const referenceRoutes = require("./routes/reference.routes");
app.use("/reference", referenceRoutes);

const conversationRoutes = require("./routes/conversation.routes");
app.use("/conversation", isAuthenticated, conversationRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
