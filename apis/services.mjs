import express from "express";
import connection from "../db.mjs"; // Assuming you have a separate file for your database connection

const servicesRouter = express.Router();

const handleServices = {
  getServices: (req, res) => {
    const sql = "SELECT * FROM SERVICES";
    connection.query(sql, (err, result) => {
      if (err) return res.json({ message: err.message });
      return res.json(result);
    });
  },
};

servicesRouter.get("/",handleServices.getServices);
export default servicesRouter;
