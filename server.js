const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const workingHoursMiddleware = (req, res, next) => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next();
        res.send(
            "<h1>Sorry! The web app is only available from Monday to Friday (9 AM - 5 PM)</h1>"
        );
    }
};

app.use(workingHoursMiddleware);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "views", "home.html")));
app.get("/services", (req, res) => res.sendFile(path.join(__dirname, "views", "services.html")));
app.get("/contact", (req, res) => res.sendFile(path.join(__dirname, "views", "contact.html")));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
