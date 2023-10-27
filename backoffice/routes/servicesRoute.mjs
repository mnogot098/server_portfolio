import express from "express";
import connection from "../../db.mjs"; // Assuming you have a separate file for your database connection

const serviceRoute = express.Router();

const handleServices = {
  getServices: (req, res) => {
    const sql = "SELECT * FROM SERVICES";
    connection.query(sql, (err, result) => {
      if (err) return res.json({ message: err.message });
      return res.render("services/index.ejs", { services: result });
    });
  },
  add: (req, res) => {
    const newService = {
      title: req.body.title,
      description: req.body.description,
      image_url: req.body.image_url,
      link_url: req.body.link_url,
    };

    const sql = "INSERT INTO SERVICES SET ?";
    connection.query(sql, newService, (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      // Check if the tech was successfully added
      if (result.affectedRows > 0) {
        // Redirect to the /techs route
        res.redirect("/services");
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Failed to add service" });
      }
    });
  },
  addView: (req, res) => {
    return res.render("services/add.ejs");
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
    const serviceId = req.params.id;
    const sql = "DELETE FROM SERVICES WHERE id = ?";
    connection.query(sql, [serviceId], (err, result) => {
      if (err)
        return res.status(500).json({ success: false, message: err.message });
      // Check if any rows were affected (successful deletion)
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .json({ success: true, message: "Service deleted successfully" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Service not found" });
      }
    });
  },
  editView: (req, res) => {
    const serviceId = req.params.id;
    const sql = "SELECT * FROM SERVICES WHERE id = ?"; // Assuming 'id' is the name of the column storing experience IDs
    connection.query(sql, [serviceId], (err, result) => {
      if (err) return res.json({ message: err.message });

      if (result.length === 0) {
        return res.status(404).json({ message: "Service not found" });
      }
      return res.render("services/edit.ejs", { service: result[0] });
    });
  },
  edit: (req, res) => {
    const serviceId = req.params.id;
    const updatedservice = {
      title: req.body.title,
      description: req.body.description,
      image_url: req.body.image_url,
      link_url: req.body.link_url
    };

    const sql = "UPDATE SERVICES SET ? WHERE id = ?";
    connection.query(sql, [updatedservice, serviceId], (err, result) => {
      if (err) return res.json({ message: err.message });

      // Redirect to the page displaying the updated experience or any other appropriate page
      res.redirect("/services");
    });
  }
};

serviceRoute.get("/", handleServices.getServices);
serviceRoute.get("/add", handleServices.addView);
serviceRoute.get("/edit/:id", handleServices.editView);
serviceRoute.post("/edit/:id/save", handleServices.edit);
serviceRoute.post("/add/save", handleServices.add);
serviceRoute.delete("/delete/:id", handleServices.delete);

export default serviceRoute;
