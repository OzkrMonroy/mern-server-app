const express = require("express");
const projectController = require("../controllers/projectController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

const router = express.Router();

// Create project
// /api/projects
router.post(
  "/",
  [
    check("projectName", "El nombre del proyecto es obligatorio")
      .not()
      .isEmpty(),
  ],
  auth,
  projectController.createProject
);

router.get("/", auth, projectController.fetchAllProjects);

router.put(
  "/:id",
  auth,
  [
    check("projectName", "El nombre del proyecto es obligatorio")
      .not()
      .isEmpty(),
  ],
  projectController.updateProject
);
router.delete(
  "/:id",
  auth,
  projectController.deleteProject
);

module.exports = router;
