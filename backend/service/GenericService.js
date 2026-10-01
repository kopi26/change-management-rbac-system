const mongoose = require("mongoose");

async function getAll(res, Model, name) {
  const result = await Model.find();
  if (result) {
    res.status(200).json({ success: true, data: result });
  } else {
    res.status(404).send(name + " not found");
  }
}
async function getById(req, res, Model, name) {
  const id = req.params.id;
  console.log("paramID", id);
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(400).send("Invalid ID");
  // }
  const result = await Model.findById(id);
  if (result) {
    res.status(200).json({ success: true, data: result });
  } else {
    res.status(404).send(name + " not found");
  }
}

async function add(res, Model, data) {
  try {
    console.log("data", data);
    const result = await Model.create(data);
    res.status(200).json({ success: true, message: "Added data successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
}

async function deleteById(req, res, Model, name) {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID");
  }
  const model = await Model.findById(id).catch((error) => {
    return res.status(500).json(error);
  });
  if (!model) {
    res.status(404).send(name + " not found");
  } else {
    try {
      const result = await Model.deleteOne(model);
      res
        .status(200)
        .json({ success: true, message: "Deleted data successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

async function update(res, Model, id, data) {
  try {
    console.log("UPDATE data", data);
    const result = await Model.updateOne({ _id: id }, data);
    console.log("UPDATE result", result);
    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No document updated" });
    }
    res
      .status(200)
      .json({ success: true, message: "Updated data successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
}
module.exports = { getAll, getById, add, deleteById, update };
