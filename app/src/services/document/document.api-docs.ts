export default {
  Document: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        description: "Todo's title",
        example: 'Coding in JavaScript',
      },
      completed: {
        type: 'boolean',
        description: 'The status of the todo',
        example: false,
      },
    },
  },
  DocumentNew: {},
  DocumentUpdate: {},
};
