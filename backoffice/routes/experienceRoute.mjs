import express from "express";
import connection from "../../db.mjs"; // Assuming you have a separate file for your database connection

const experienceRoute = express.Router();

const handleExperience = {
  getExperiences:(req, res) => {
    const sql = "SELECT * FROM EXPERIENCES";
    connection.query(sql, (err, result) => {
      if (err) return res.json({ message: err.message });
      return res.render("experiences/index.ejs",{"experiences":result});
    });
  },
  findById: (req, res) => {
    const experienceId = req.params.id; // Assuming the ID is passed as a route parameter
  
    const sql = "SELECT * FROM EXPERIENCES WHERE id = ?"; // Assuming 'id' is the name of the column storing experience IDs
    connection.query(sql, [experienceId], (err, result) => {
      if (err) return res.json({ message: err.message });
  
      // Check if a result is found
      if (result.length === 0) {
        return res.status(404).json({ message: "Experience not found" });
      }
  
      return res.render("experiences/show.ejs", { "experience": result[0] });
    });
  }
  
}

experienceRoute.get("/", handleExperience.getExperiences);
experienceRoute.get("/:id", handleExperience.findById);



export default experienceRoute;
