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
  },
};
