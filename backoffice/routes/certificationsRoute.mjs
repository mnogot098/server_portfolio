import express from "express";
import connection from "../../db.mjs"; // Assuming you have a separate file for your database connection

const certificationsRoute = express.Router();

const handlecertifications = {
  getTechs: (req, res) => {
    const sql = "SELECT * FROM CERTIFICATIONS";
    connection.query(sql, (err, result) => {
      if (err) return res.json({ message: err.message });
      return res.render("certifications/index.ejs", { certifications: result });
    });
  },
  add: (req, res) => {
    const newCertification = {
      title: req.body.title,
      description: req.body.description,
      image_url: req.body.image_url,
      link_url: req.body.link_url,
    };

    const sql = "INSERT INTO CERTIFICATIONS SET ?";
    connection.query(sql, newCertification, (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      // Check if the tech was successfully added
      if (result.affectedRows > 0) {
        // Redirect to the /techs route
        res.redirect("/certifications");
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Failed to add certification" });
      }
    });
  },
  addView: (req, res) => {
    return res.render("certifications/add.ejs");
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
    const certificationId = req.params.id;
    const sql = "DELETE FROM CERTIFICATIONS WHERE id = ?";
    connection.query(sql, [certificationId], (err, result) => {
      if (err)
        return res.status(500).json({ success: false, message: err.message });
      // Check if any rows were affected (successful deletion)
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .json({ success: true, message: "certification deleted successfully" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "certification not found" });
      }
    });
  },
  editView: (req, res) => {
    const certificationId = req.params.id;
    const sql = "SELECT * FROM certifications WHERE id = ?"; // Assuming 'id' is the name of the column storing experience IDs
    connection.query(sql, [certificationId], (err, result) => {
      if (err) return res.json({ message: err.message });

      if (result.length === 0) {
        return res.status(404).json({ message: "certification not found" });
      }
      return res.render("certifications/edit.ejs", { certification: result[0] });
    });
  },
  edit: (req, res) => {
    const certificationId = req.params.id;
    const updatedcertification = {
      title: req.body.title,
      description: req.body.description,
      image_url: req.body.image_url,
      link_url: req.body.link_url
    };

    const sql = "UPDATE certifications SET ? WHERE id = ?";
    connection.query(sql, [updatedcertification, certificationId], (err, result) => {
      if (err) return res.json({ message: err.message });

      // Redirect to the page displaying the updated experience or any other appropriate page
      res.redirect("/certifications");
    });
  }
};

certificationsRoute.get("/", handlecertifications.getTechs);
certificationsRoute.get("/add", handlecertifications.addView);
certificationsRoute.get("/edit/:id", handlecertifications.editView);
certificationsRoute.post("/edit/:id/save", handlecertifications.edit);
certificationsRoute.post("/add/save", handlecertifications.add);
certificationsRoute.delete("/delete/:id", handlecertifications.delete);

export default certificationsRoute;
