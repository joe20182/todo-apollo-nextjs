const Todo = require("./models");

export const resolvers = {
  Query: {
    todos: async () => {
      try {
        const data = await Todo.find({});
        return data;
      } catch (err) {
        console.log(err);
        return [];
      }
    },
  },
  Mutation: {
    createTodo: async (_, { input }) => {
      try {
        const Model = new Todo(input);
        const result = await Model.save();
        return result;
      } catch (error) {
        console.log(err);
      }
    },
    updateTodo: async (_, { id, input }) => {
      try {
        const doc = await Todo.findById(id);
        if (!doc) {
          throw new Error("document not found");
        }
        const newDoc = await Todo.findOneAndUpdate({ _id: id }, input, {
          new: true,
        });
        return newDoc;
      } catch (error) {
        console.log(error);
      }
    },
    deleteTodo: async (_, { id }) => {
      try {
        const doc = await Todo.findById(id);
        if (!doc) {
          throw new Error("document not found");
        }
        await Todo.findOneAndDelete({ _id: id });
        return "delete success";
      } catch (error) {
        console.log(error);
      }
    },
  },
};
