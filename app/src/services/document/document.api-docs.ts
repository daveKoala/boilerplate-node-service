const paths = {
  '/data/': {
    get: {},
  },
};

const schemas = {
  Document: {
    type: 'object',
    properties: {
      slug: {
        type: 'string',
        description: 'title',
        example: 'Coding in JavaScript',
      },
      title: {
        type: 'string',
        description: 'title',
        example: 'Coding in JavaScript',
      },
      body: {
        type: 'array',
        description: 'The status of the todo',
        items: {
          $ref: '#/components/schemas/DocumentBodyNew',
        },
      },
    },
  },
  DocumentNew: {},
  DocumentUpdate: {},
  DocumentBodyNew: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'name',
        example: 'Coding in JavaScript',
      },
      _type: {
        type: 'string',
        description: 'name',
        example: 'Coding in JavaScript',
      },
      tag: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/Tag',
        },
      },
    },
  },
  Tags: {
    type: 'string',
  },
};

export default {
  paths,
  schemas,
};
