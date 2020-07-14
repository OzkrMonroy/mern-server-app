const express = require("express");
const taskController = require("../controllers/taskController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

const router = express.Router();

// /api/tasks
router.post(
  "/",
  [
    check("taskName", "El contenido de la tarea no puede estar vacío.")
      .not()
      .isEmpty(),
    check("taskProject", "El proyecto es obligatorio.").not().isEmpty(),
  ],
  auth,
  taskController.createTask
);

router.get("/", auth, taskController.fetchAllTasks);

router.put(
  "/:id",
  auth,
  taskController.updateTask
);

router.delete(
  "/:id",
  auth,
  taskController.deleteTask
);

module.exports = router;
