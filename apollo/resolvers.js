export const resolvers = {
  Query: {
    todos() {
      return [
        {
          id: 1,
          text: "111",
          status: true,
        },
        {
          id: 2,
          text: "222",
          status: false,
        },
        {
          id: 3,
          text: "333",
          status: true,
        },
      ];
    },
  },
};
