// This route is for http://localhost:3001/blog

const router = require("express").Router();
const { sequelize } = require("../models");
const { Posts } = require("../models");
const checkAuth = require("../helper/checkAuth");

// This route is for http://localhost:3001/blog/
router.get("/", (req, res) => {
  console.log("This is the user route");
  res.cookie("usercookie", "ss", { maxAge: 1000 * 60 * 60, httpOnly: true });
  res.send("This is the user route");
});

// This route is for http://localhost:3001/blog/profile

router.get("/blogs", async (req, res) => {
  await Posts.findAll({}).then((posts) => {
    res.json(posts);
  });
  console.log("header=", req.cookies);
});

// This route is for http://localhost:3001/blog/:author
router.get("/blogs/:author", checkAuth, async (req, res) => {
  console.log("author=", req.params.author);
  const { author } = req.params;
  await Posts.findAll({ where: { postAuthor: author } }).then((posts) => {
    res.json(posts);
  });
});

// This route is for deleting a blog http://localhost:3001/blog/blogs/delete/:blogid
router.delete("/blogs/delete/:blogid", async (req, res) => {
  console.log("blogid to be deleted =", req.params.blogid);
  const { blogid } = req.params;
  console.log("blogid=", blogid);
  const deleterows = await Posts.destroy({ where: { id: blogid } });
  res.send("deleted rows=");
  console.log("deleted rows=", deleterows);
});

// This route is for creating a new blog at http://localhost:3001/blog/create

router.post("/blogs/createpost", async (req, res) => {
  const { postTitle, postText, postAuthor } = req.body;
  try {
    await Posts.create({ postTitle, postText, postAuthor });
    res.send("New blog created");
  } catch (err) {
    console.log("Post create error", err);
    res.send("error in creating a new blog");
  }
});

router.put("/blogs/updatepost", async (req, res) => {
  const { postText, blogid } = req.body;
  console.log("blogid=", blogid);
  console.log("postText=", postText);
  try {
    const updatedpost = await Posts.findByPk(blogid);
    console.log("updatedpost=", updatedpost);
    updatedpost.postText = postText;
    await updatedpost.save();
    res.send(" blog updated successfully");
  } catch (err) {
    console.log("Post update error", err);
    res.send("error in updating the  blog");
  }
});
module.exports = router;
