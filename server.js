import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import certificationRouter from "./apis/certifications.mjs";
import experienceRouter from "./apis/experiences.mjs";
import projectsRouter from "./apis/projects.mjs";
import servicesRouter from "./apis/services.mjs";
import techsRouter from "./apis/techs.mjs";
import experienceRoute from "./backoffice/routes/experienceRoute.mjs";
import connection from "./db.mjs";
import techsRoute from "./backoffice/routes/techsRoute .mjs";
import projectsRoute from "./backoffice/routes/projectsRoute.mjs";
import certificationsRoute from "./backoffice/routes/certificationsRoute.mjs";
import serviceRoute from "./backoffice/routes/servicesRoute.mjs";
import blogsRouter from "./apis/blogs.mjs";
import blogRouter from "./backoffice/routes/blogsRoute.mjs";
const app = express();
const PORT = process.env.PORT || 8000;

//configure cors
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

//Home page
app.get("/", (req, res) => {
  res.render("index.ejs");
});

//APIS
app.use("/api/experiences", experienceRouter);
app.use("/api/techs", techsRouter);
app.use("/api/services", servicesRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/certifications", certificationRouter);

//backoffice
app.use("/experiences", experienceRoute);
app.use("/techs", techsRoute);
app.use("/projects", projectsRoute);
app.use("/certifications", certificationsRoute);
app.use("/services", serviceRoute);
app.use("/blogs", blogRouter);

app.post("/message", (req, res) => {
  const { name, email, message } = req.body;

  const sql = "INSERT INTO emails (name, email, message) VALUES (?, ?, ?)";
  connection.query(sql, [name, email, message], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to insert email into the database.",
        error: err.message,
      });
    }
    return res
      .status(201)
      .json({ message: "Email inserted into the database successfully." });
  });
});

app.listen(8000, () => {
  console.log("Server running on port" + PORT);
});
