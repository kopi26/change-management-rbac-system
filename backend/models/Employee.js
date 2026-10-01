const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  projects: [{ type: String }],
});

const Employee = mongoose.model("employees", employeeSchema);

module.exports = Employee;
