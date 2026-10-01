const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const Service = require("../service/GenericService");
const { default: mongoose } = require("mongoose");
const { verifyToken } = require("../security/auth");
const { checkPermission } = require("../middlewares/role.middleware");
const logger = require("../middlewares/logger.middleware");

const name = "Employee";
// router.get("/", verifyToken, checkPermission(["Admin"]), (req, res) => {
//   Service.getAll(res, Employee, name).catch((error) => {
//     res.status(500).send(error + "Server Error");
//   });
// });

router.get(
  "/",
  verifyToken,
  checkPermission("employee:viewAll"),
  logger("view_all_employee", "Employee"),
  (req, res) => {
    Service.getAll(res, Employee, name).catch((error) => {
      res.status(500).send(error + "Server Error");
    });
  }
);

router.get(
  "/:id",
  verifyToken,
  checkPermission("employee:view"),
  logger("view_employee", "Employee"),
  (req, res) => {
    Service.getById(req, res, Employee, name).catch((error) => {
      res.status(500).send(error + "Server Error");
    });
  }
);

router.post(
  "/",
  verifyToken,
  checkPermission("employee:create"),
  logger("create_employee", "Employee"),
  async (req, res) => {
    const { name, email, department, projects } = req.body;
    console.log("EMP", req.body);
    if (!name || !email || !department) {
      res.status(400).send("Please provide required fields");
    } else {
      Service.add(res, Employee, { name, email, department, projects }).catch(
        (error) => {
          res.status(500).send(error + "Server Error");
        }
      );
    }
  }
);

router.delete(
  "/:id",
  checkPermission("employee:delete"),
  logger("delete_employee", "Employee"),
  (req, res) => {
    Service.deleteById(req, res, Employee, name).catch((error) => {
      res.status(500).send(error + "Server Error");
    });
  }
);

router.put(
  "/:id",
  checkPermission("employee:edit"),
  logger("edit_employee", "Employee"),
  async (req, res) => {
    const id = req.params.id;
    const employee = await Employee.findById(id).catch((error) => {
      console.error(error);
    });
    if (!employee) {
      res.status(404).send("Employee not found");
    } else {
      const { name, location } = req.body;
      if (!name || !location) {
        res.status(400).send("Please provide required fields");
      } else {
        Service.update(res, employee, { name, location }).catch((error) => {
          res.status(500).send(error + "Server Error");
        });
      }
    }
  }
);

module.exports = router;
