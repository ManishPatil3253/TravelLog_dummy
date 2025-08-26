// server/index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser'); // Import cookie-parser
require('dotenv').config();
const authRoutes = require("./routes/authRoutes");
const testRoutes = require('./routes/testRoutes');
const userRoutes = require('./routes/userRoutes');
const travelLogRoutes = require("./routes/travelLogRoutes");

const app = express();

// --- START OF CHANGES ---

// 1. Define your CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Your client's origin
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 200 // For legacy browser support
};

// 2. Use the CORS options
app.use(cors(corsOptions));

// --- END OF CHANGES ---

// You also need cookie-parser middleware to handle cookies from the request
app.use(cookieParser());

// Enable JSON parsing (this should come after CORS)
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/test', testRoutes);
app.use('/api/users', userRoutes);
app.use("/api/travel-logs", travelLogRoutes);

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Travel Log API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// server/index.js
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');
// require('dotenv').config();

// const authRoutes = require("./routes/authRoutes");
// const testRoutes = require('./routes/testRoutes');
// const userRoutes = require('./routes/userRoutes');
// const travelLogRoutes = require("./routes/travelLogRoutes");

// const app = express();

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true,
//   optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));
// app.use(cookieParser());
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use('/api/test', testRoutes);
// app.use('/api/users', userRoutes);
// app.use("/api/travel-logs", travelLogRoutes);

// // DB Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// app.get("/", (req, res) => {
//   res.send("Travel Log API Running");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });