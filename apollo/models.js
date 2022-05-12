import mongoose from "mongoose";

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

// [TODO] models can be separated to multiple files
const TodoSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

const TodoModel = mongoose.models.Todos || mongoose.model("Todos", TodoSchema);

module.exports = TodoModel;
