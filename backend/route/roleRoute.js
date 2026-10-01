const express = require("express");
const router = express.Router();
const Role = require("../models/Role");
const Service = require("../service/GenericService");
const { default: mongoose } = require("mongoose");
const { verifyToken } = require("../security/auth");
const {
  checkPermission,
  authorizeRoles,
} = require("../middlewares/role.middleware");
const logger = require("../middlewares/logger.middleware");

const name = "Role";

router.get(
  "/",
  verifyToken,
  authorizeRoles("Admin"),
  logger("view_all_roles", "Role"),
  (req, res) => {
    Service.getAll(res, Role, name).catch((error) => {
      res.status(500).send(error + "Server Error");
    });
  }
);

router.get(
  "/:id",
  verifyToken,
  authorizeRoles("Admin"),
  logger("view_role", "Role"),
  (req, res) => {
    console.log("getID", req.params);
    Service.getById(req, res, Role, name).catch((error) => {
      res.status(500).send(error + "Server Error");
    });
  }
);

router.post(
  "/",
  verifyToken,
  authorizeRoles("Admin"),
  logger("create_role", "Role"),
  async (req, res) => {
    const { _id, name, permissions } = req.body;
    if (!name || !permissions) {
      res.status(400).send("Please provide required fields");
    } else {
      Service.add(res, Role, { _id, name, permissions }).catch((error) => {
        res.status(500).send(error + "Server Error");
      });
    }
  }
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("Admin"),
  logger("delete_role", "Role"),
  (req, res) => {
    Service.deleteById(req, res, Role, name).catch((error) => {
      res.status(500).send(error + "Server Error");
    });
  }
);

router.put(
  "/:id",
  verifyToken,
  authorizeRoles("Admin"),
  logger("edit_role", "Role"),
  async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ID");
    }
    const role = await Role.findById(id).catch((error) => {
      console.error(error);
    });
    if (!role) {
      res.status(404).send("Role not found");
    } else {
      const { name, permissions } = req.body;
      if (!name || !permissions) {
        res.status(400).send("Please provide required fields");
      } else {
        Service.update(res, Role, id, { name, permissions }).catch((error) => {
          res.status(500).send(error + "Server Error");
        });
      }
    }
  }
);

module.exports = router;
