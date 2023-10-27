import express from "express";
import connection from "../../db.mjs"; // Assuming you have a separate file for your database connection

const projectsRoute = express.Router();

const handleProjects = {
  getTechs: (req, res) => {
    const sql = "SELECT * FROM PROJECTS";
    connection.query(sql, (err, result) => {
      if (err) return res.json({ message: err.message });
      return res.render("projects/index.ejs", { projects: result });
    });
  },
  add: (req, res) => {
    const newProject = {
      title: req.body.title,
      description: req.body.description,
      image_url: req.body.image_url,
      link_url: req.body.link_url,
    };

    const sql = "INSERT INTO PROJECTS SET ?";
    connection.query(sql, newProject, (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      // Check if the tech was successfully added
      if (result.affectedRows > 0) {
        // Redirect to the /techs route
        res.redirect("/projects");
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Failed to add project" });
      }
    });
  },
  addView: (req, res) => {
    return res.render("projects/add.ejs");
  },
  /* add: (req, res) => {
    const newTech = {
      name: req.body.name,
      link: req.body.link,
    };

    const sql = "INSERT INTO TECH_STACK SET ?";
    connection.query(sql, newTech, (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      // Check if the experience was successfully added
      if (result.affectedRows > 0) {
        // Redirect to the /experiences route
        res.redirect("/techs");
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Failed to add tech" });
      }
    });
  }, */
  delete: (req, res) => {
    const projectId = req.params.id;
    const sql = "DELETE FROM PROJECTS WHERE id = ?";
    connection.query(sql, [projectId], (err, result) => {
      if (err)
        return res.status(500).json({ success: false, message: err.message });
      // Check if any rows were affected (successful deletion)
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .json({ success: true, message: "Project deleted successfully" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Project not found" });
      }
    });
  },
  editView: (req, res) => {
    const projectId = req.params.id;
    const sql = "SELECT * FROM PROJECTS WHERE id = ?"; // Assuming 'id' is the name of the column storing experience IDs
    connection.query(sql, [projectId], (err, result) => {
      if (err) return res.json({ message: err.message });

      if (result.length === 0) {
        return res.status(404).json({ message: "Project not found" });
      }
      return res.render("projects/edit.ejs", { project: result[0] });
    });
  },
  edit: (req, res) => {
    const projectId = req.params.id;
    const updatedProject = {
      title: req.body.title,
      description: req.body.description,
      image_url: req.body.image_url,
      link_url: req.body.link_url
    };

    const sql = "UPDATE PROJECTS SET ? WHERE id = ?";
    connection.query(sql, [updatedProject, projectId], (err, result) => {
      if (err) return res.json({ message: err.message });

      // Redirect to the page displaying the updated experience or any other appropriate page
      res.redirect("/projects");
    });
  }
};

projectsRoute.get("/", handleProjects.getTechs);
projectsRoute.get("/add", handleProjects.addView);
projectsRoute.get("/edit/:id", handleProjects.editView);
projectsRoute.post("/edit/:id/save", handleProjects.edit);
projectsRoute.post("/add/save", handleProjects.add);
projectsRoute.delete("/delete/:id", handleProjects.delete);

export default projectsRoute;
