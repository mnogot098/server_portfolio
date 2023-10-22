import express from "express";
import connection from "../db.mjs"; // Assuming you have a separate file for your database connection

const projectsRouter = express.Router();

const handleProjects = {
  getCertifications:(req, res) => {
    const sql = "SELECT * FROM PROJECTS";
    connection.query(sql, (err, result) => {
      if (err) return res.json({ message: err.message });
      return res.json(result);
    });
  }
}

projectsRouter.get("/", handleProjects.getCertifications);

export default projectsRouter;
