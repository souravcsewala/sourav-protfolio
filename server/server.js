require("dotenv").config();
const express = require("express");
const cors = require("cors");
const protfoliorouter = require("./routes/protfolioroute");
const { mongodbconnect } = require("./database/protfoliodb");

const PORT = process.env.PORT || 7001;
const app = express();
const corsOptions = {
    origin: "https://sourav-protfolio-user-looks.netlify.app",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Set the view engine and serve static files
app.use(express.static("public"));

// Routes
app.use("/protfolio", protfoliorouter);

app.get("/", (req, res) => {
    res.send("hii ");
});

mongodbconnect().then(() => {
    app.listen(PORT, () => {
        console.log(`The server is running at the port number ${PORT}`);
    });
});
