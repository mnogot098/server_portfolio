import express from "express";
import connection from "../../db.mjs"; // Assuming you have a separate file for your database connection

const techsRoute = express.Router();

const handleTechs = {
  getTechs: (req, res) => {
    const sql = "SELECT * FROM TECH_STACK";
    connection.query(sql, (err, result) => {
      if (err) return res.json({ message: err.message });
      return res.render("techs/index.ejs", { techs: result });
    });
  },
  add: (req, res) => {
    const Tech = {
      name: req.body.name,
      link: req.body.link,
    };

    const sql = "INSERT INTO TECHS SET ?";
    connection.query(sql, newTech, (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      // Check if the tech was successfully added
      if (result.affectedRows > 0) {
        // Redirect to the /techs route
        res.redirect("/techs");
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Failed to add tech" });
      }
    });
  },
  addView: (req, res) => {
    return res.render("techs/add.ejs");
  },
  add: (req, res) => {
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
  },
  delete: (req, res) => {
    const tecHId = req.params.id;
    const sql = "DELETE FROM TECH_STACK WHERE id = ?";
    connection.query(sql, [tecHId], (err, result) => {
      if (err)
        return res.status(500).json({ success: false, message: err.message });
      // Check if any rows were affected (successful deletion)
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .json({ success: true, message: "Tech deleted successfully" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Tech not found" });
      }
    });
  },
  editView: (req, res) => {
    const techId = req.params.id;
    const sql = "SELECT * FROM TECH_STACK WHERE id = ?"; // Assuming 'id' is the name of the column storing experience IDs
    connection.query(sql, [techId], (err, result) => {
      if (err) return res.json({ message: err.message });

      if (result.length === 0) {
        return res.status(404).json({ message: "Tech not found" });
      }
      return res.render("techs/edit.ejs", { tech: result[0] });
    });
  },
  edit: (req, res) => {
    console.log("Req:",req.body)
    const techId = req.params.id;
    const updatedTech = {
      name: req.body.name,
      link: req.body.link,
    };

    const sql = "UPDATE TECH_STACK SET ? WHERE id = ?";
    connection.query(sql, [updatedTech, techId], (err, result) => {
      if (err) return res.json({ message: err.message });

      // Redirect to the page displaying the updated experience or any other appropriate page
      res.redirect("/techs");
    });
  }
};

techsRoute.get("/", handleTechs.getTechs);
techsRoute.get("/add", handleTechs.addView);
techsRoute.get("/edit/:id", handleTechs.editView);
techsRoute.post("/edit/:id/save", handleTechs.edit);
techsRoute.post("/add/save", handleTechs.add);
techsRoute.delete("/delete/:id", handleTechs.delete);

export default techsRoute;
