const express = require("express");
const router = express.Router();
const Library = require("../models/Library");
const Service = require("../service/GenericService");
const { default: mongoose } = require("mongoose");
const { verifyToken } = require("../security/auth");
const { checkPermission } = require("../middlewares/role.middleware");
const Log = require("../models/Log");

const name = "Library";
// router.get("/", verifyToken, checkPermission(["Admin"]), (req, res) => {
//   Service.getAll(res, Library, name).catch((error) => {
//     res.status(500).send(error + "Server Error");
//   });
// });

router.get("/", verifyToken, checkPermission("employee:view"), (req, res) => {
  Service.getAll(res, Library, name).catch((error) => {
    res.status(500).send(error + "Server Error");
  });
});

router.get("/:id", verifyToken, checkPermission(["Admin"]), (req, res) => {
  Service.getById(req, res, Library, name).catch((error) => {
    res.status(500).send(error + "Server Error");
  });
});

router.post("/", verifyToken, checkPermission(["Admin"]), async (req, res) => {
  const { name, location } = req.body;
  if (!name || !location) {
    res.status(400).send("Please provide required fields");
  } else {
    Service.add(res, Library, { name, location }).catch((error) => {
      res.status(500).send(error + "Server Error");
    });
  }
});

router.delete("/:id", (req, res) => {
  Service.deleteById(req, res, Library, name).catch((error) => {
    res.status(500).send(error + "Server Error");
  });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const library = await Library.findById(id).catch((error) => {
    console.error(error);
  });
  if (!library) {
    res.status(404).send("Library not found");
  } else {
    const { name, location } = req.body;
    if (!name || !location) {
      res.status(400).send("Please provide required fields");
    } else {
      Service.update(res, library, { name, location }).catch((error) => {
        res.status(500).send(error + "Server Error");
      });
    }
  }
});

router.get("/:id/books", async (req, res) => {
  try {
    const lid = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(lid)) {
      return res.status(400).send("Invalid ID");
    }
    const libraryId = new mongoose.Types.ObjectId(lid);
    const result = await Library.aggregate([
      { $match: { _id: libraryId } },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "library_id",
          as: "books_detail",
        },
      },
      {
        $project: {
          name: 1,
          book_names: "$books_detail.title",
          no_of_Books: { $size: "$books_detail" },
        },
      },
    ]);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).send(name + " not found");
    }
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

module.exports = router;
