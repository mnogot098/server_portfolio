import express from "express";
import connection from "../../db.mjs"; // Assuming you have a separate file for your database connection

const blogRouter = express.Router();

const handleBlogs = {
  getBlogs: (req, res) => {
    const sql = "SELECT * FROM BLOGS";
    connection.query(sql, (err, result) => {
      if (err) return res.json({ message: err.message });
      return res.render("blogs/index.ejs", { blogs: result });
    });
  },
  add: (req, res) => {
    const newService = {
      title: req.body.title,
      description: req.body.description,
      link_url: req.body.link_url,
    };

    const sql = "INSERT INTO BLOGS SET ?";
    connection.query(sql, newService, (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      // Check if the tech was successfully added
      if (result.affectedRows > 0) {
        // Redirect to the /techs route
        res.redirect("/blogs");
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Failed to add blog" });
      }
    });
  },
  addView: (req, res) => {
    return res.render("blogs/add.ejs");
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
    const blogId = req.params.id;
    const sql = "DELETE FROM BLOGS WHERE id = ?";
    connection.query(sql, [blogId], (err, result) => {
      if (err)
        return res.status(500).json({ success: false, message: err.message });
      // Check if any rows were affected (successful deletion)
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .json({ success: true, message: "Blog deleted successfully" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Blog not found" });
      }
    });
  },
  editView: (req, res) => {
    const blogId = req.params.id;
    const sql = "SELECT * FROM BLOGS WHERE id = ?"; // Assuming 'id' is the name of the column storing experience IDs
    connection.query(sql, [blogId], (err, result) => {
      if (err) return res.json({ message: err.message });

      if (result.length === 0) {
        return res.status(404).json({ message: "Blog not found" });
      }
      console.log("blog",result[0])
      return res.render("blogs/edit.ejs", { blog: result[0] });
    });
  },
  edit: (req, res) => {
    const blogeId = req.params.id;
    const updatedBlog = {
      title: req.body.title,
      description: req.body.description,
      link_url: req.body.link_url
    };

    const sql = "UPDATE BLOGS SET ? WHERE id = ?";
    connection.query(sql, [updatedBlog, blogeId], (err, result) => {
      if (err) return res.json({ message: err.message });

      // Redirect to the page displaying the updated experience or any other appropriate page
      res.redirect("/blogs");
    });
  }
};

blogRouter.get("/", handleBlogs.getBlogs);
blogRouter.get("/add", handleBlogs.addView);
blogRouter.get("/edit/:id", handleBlogs.editView);
blogRouter.post("/edit/:id/save", handleBlogs.edit);
blogRouter.post("/add/save", handleBlogs.add);
blogRouter.delete("/delete/:id", handleBlogs.delete);

export default blogRouter;
