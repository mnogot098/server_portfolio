import express from "express";
import connection from "../db.mjs"; // Assuming you have a separate file for your database connection

const techsRouter = express.Router();

const handleTechs = {
  getTechs: (req, res) => {
    const sql = "SELECT * FROM TECH_STACK";
    connection.query(sql, (err, result) => {
      if (err) return res.json({ message: err.message });
      return res.json(result);
    });
  },
};

techsRouter.get("/", handleTechs.getTechs);

export default techsRouter;
