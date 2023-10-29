import express from "express";
import connection from "../../db.mjs"; // Assuming you have a separate file for your database connection

const emailsRoute = express.Router();

const handleEmails = {
  getEmails: (req, res) => {
    const sql = "SELECT * FROM EMAILS";
    connection.query(sql, (err, result) => {
      if (err) return res.json({ message: err.message });
      return res.render("emails/index.ejs", { emails: result });
    });
  },
/*   add: (req, res) => {
    const Email = {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    };

    const sql = "INSERT INTO EMAILS SET ?";
    connection.query(sql, Email, (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      // Check if the tech was successfully added
      if (result.affectedRows > 0) {
        // Redirect to the /techs route
        res.redirect("/emails");
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Failed to add email" });
      }
    });
  },
  addV */iew: (req, res) => {
    return res.render("emails/add.ejs");
  },
/*   add: (req, res) => {
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
    const emailId = req.params.id;
    const sql = "DELETE FROM EMAILS WHERE id = ?";
    connection.query(sql, [emailId], (err, result) => {
      if (err)
        return res.status(500).json({ success: false, message: err.message });
      // Check if any rows were affected (successful deletion)
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .json({ success: true, message: "Email deleted successfully" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Email not found" });
      }
    });
  },
  editView: (req, res) => {
    const emailId = req.params.id;
    const sql = "SELECT * FROM EMAILS WHERE id = ?"; // Assuming 'id' is the name of the column storing experience IDs
    connection.query(sql, [emailId], (err, result) => {
      if (err) return res.json({ message: err.message });

      if (result.length === 0) {
        return res.status(404).json({ message: "Email not found" });
      }
      return res.render("emails/edit.ejs", { tech: result[0] });
    });
  },
  edit: (req, res) => {
    console.log("Req:",req.body)
    const emailId = req.params.id;
    const updatedEmail = {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    };

    const sql = "UPDATE TECH_STACK SET ? WHERE id = ?";
    connection.query(sql, [updatedEmail, emailId], (err, result) => {
      if (err) return res.json({ message: err.message });

      // Redirect to the page displaying the updated experience or any other appropriate page
      res.redirect("/emails");
    });
  }
};

emailsRoute.get("/", handleEmails.getEmails);
emailsRoute.get("/edit/:id", handleEmails.editView);
emailsRoute.post("/edit/:id/save", handleEmails.edit);
emailsRoute.delete("/delete/:id", handleEmails.delete);

export default emailsRoute;
