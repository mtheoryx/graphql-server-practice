'use strict';
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { graphql, buildSchema } = require('graphql');

const PORT = process.env.port || 3000;
const server = express();

const schema = buildSchema(`
type Video {
    id: ID,
    title: String,
    duration: Int,
    watched: Boolean
}

type Query {
    video: Video,
    videos: [Video]
}
type Schema {
    query: Query
}
`);

const videoA = {
    id: 'a',
    title: 'Graphql Schema Training Video 1',
    duration: 30,
    watched: true
};

const videoB = {
    id: 'b',
    title: 'Graphql For Real Training Video 2',
    duration: 1000,
    watched: false
};

const videos = [videoA, videoB];

const resolvers = {
    video: () => ({
        id: () => '1',
        title: () => 'Something?',
        duration: () => 120,
        watched: () => true,
    }),
    videos: () => videos
};

server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
    rootValue: resolvers,
}));

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
