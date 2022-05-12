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
};
