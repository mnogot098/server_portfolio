import express from "express";
import connection from "../db.mjs"; // Assuming you have a separate file for your database connection

const blogsRouter = express.Router();

const handleExperience = {
  getBlogs:(req, res) => {
    const sql = "SELECT * FROM EXPERIENCES";
    connection.query(sql, (err, result) => {
      if (err) return res.json({ message: err.message });
      return res.json(result);
    });
  },
}

blogsRouter.get("/", handleExperience.getBlogs);


export default blogsRouter;
