import express from "express";
import connection from "../db.mjs"; // Assuming you have a separate file for your database connection

const certificationRouter = express.Router();

const handleCertifications = {
  getCertifications:(req, res) => {
    const sql = "SELECT * FROM CERTIFICATIONS";
    connection.query(sql, (err, result) => {
      if (err) return res.json({ message: err.message });
      return res.json(result);
    });
  }
}

certificationRouter.get("/", handleCertifications.getCertifications);


  export default certificationRouter;