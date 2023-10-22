import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import experienceRouter from "./apis/experiences.mjs";
import connection from "./db.mjs";
import techsRouter from "./apis/techs.mjs";
import projectsRouter from "./apis/projects.mjs";
import blogsRouter from "./apis/blogs.mjs";
import servicesRouter from "./apis/services.mjs";
import certificationRouter from "./apis/certifications.mjs";

const app = express();

//configure cors
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

app.use("/experiences", experienceRouter);
app.use("/techs", techsRouter);
app.use("/services", servicesRouter);
app.use("/projects", projectsRouter);
app.use("/blogs", blogsRouter);
app.use("/certifications", certificationRouter);


app.post("/message", (req, res) => {
  const { name, email, message } = req.body;

  const sql = "INSERT INTO emails (name, email, message) VALUES (?, ?, ?)";
  connection.query(sql, [name, email, message], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({
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
  console.log("Server running");
});
