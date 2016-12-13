'use strict';

const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
type Query {
    id: ID,
    title: String,
    duration: Int,
    watched: Boolean
}
type Schema {
    query: Query
}
`);

const resolvers = {
    foo: () => 'bar',
    id:  () => '1',
    duration: () => 120,
    watched: () => true,
};

const query = `
query myFirstQuery {
    id
    title
    duration
    watched
}
`;

graphql(schema, query, resolvers)
    .then(result => console.log(result))
    .catch(error => console.error(error));
