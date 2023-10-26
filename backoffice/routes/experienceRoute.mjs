import express from "express";
import connection from "../../db.mjs"; // Assuming you have a separate file for your database connection

const experienceRoute = express.Router();

const handleExperience = {
  getExperiences: (req, res) => {
    const sql = "SELECT * FROM EXPERIENCES";
    connection.query(sql, (err, result) => {
      if (err) return res.json({ message: err.message });
      return res.render("experiences/index.ejs", { experiences: result });
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

      return res.render("experiences/show.ejs", { experience: result[0] });
    });
  },
  editView: (req, res) => {
    const experienceId = req.params.id;
    const sql = "SELECT * FROM EXPERIENCES WHERE id = ?"; // Assuming 'id' is the name of the column storing experience IDs
    connection.query(sql, [experienceId], (err, result) => {
      if (err) return res.json({ message: err.message });

      if (result.length === 0) {
        return res.status(404).json({ message: "Experience not found" });
      }
      return res.render("experiences/edit.ejs", { experience: result[0] });
    });
  },
  // Edit an experience
  edit: (req, res) => {
    const experienceId = req.params.id;
    const updatedExperience = {
      title: req.body.title,
      company: req.body.company,
      duration: req.body.duration,
      description: req.body.description,
    };

    const sql = "UPDATE EXPERIENCES SET ? WHERE id = ?";
    connection.query(sql, [updatedExperience, experienceId], (err, result) => {
      if (err) return res.json({ message: err.message });

      // Redirect to the page displaying the updated experience or any other appropriate page
      res.redirect("/experiences");
    });
  },
  delete: (req, res) => {
    const experienceId = req.params.id;
    const sql = "DELETE FROM EXPERIENCES WHERE id = ?";
    connection.query(sql, [experienceId], (err, result) => {
      if (err)
        return res.status(500).json({ success: false, message: err.message });
      // Check if any rows were affected (successful deletion)
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .json({ success: true, message: "Experience deleted successfully" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Experience not found" });
      }
    });
  },
  add: (req, res) => {
    const newExperience = {
      title: req.body.title,
      company: req.body.company,
      duration: req.body.duration,
      description: req.body.description,
    };

    const sql = "INSERT INTO EXPERIENCES SET ?";
    connection.query(sql, newExperience, (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      // Check if the experience was successfully added
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .json({ success: true, message: "Experience added successfully" });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Failed to add experience" });
      }
    });
  },
  addView: (req, res) => {
      return res.render("experiences/add.ejs");
  },
  add: (req, res) => {
    const newExperience = {
      title: req.body.title,
      company: req.body.company,
      duration: req.body.duration,
      description: req.body.description,
    };
  
    const sql = "INSERT INTO EXPERIENCES SET ?";
    connection.query(sql, newExperience, (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }
  
      // Check if the experience was successfully added
      if (result.affectedRows > 0) {
        // Redirect to the /experiences route
        res.redirect("/experiences");
      } else {
        return res.status(400).json({ success: false, message: "Failed to add experience" });
      }
    });
  },
  
};

experienceRoute.get("/", handleExperience.getExperiences);
experienceRoute.get("/add", handleExperience.addView);
experienceRoute.get("/:id", handleExperience.findById);
experienceRoute.get("/edit/:id", handleExperience.editView);
experienceRoute.post("/edit/:id/save", handleExperience.edit);
experienceRoute.delete("/delete/:id", handleExperience.delete);
experienceRoute.post("/add/save", handleExperience.add);



export default experienceRoute;
