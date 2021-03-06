'use strict';
const express = require('express');
const graphqlHTTP = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLInputObjectType,
} = require('graphql');

const {
    getVideoById,
    getVideos,
    createVideo
} = require('./src/data');

const {
    globalIdField,
    connectionDefinitions,
    connectionFromPromisedArray,
    connectionArgs,
} = require('graphql-relay');

const { nodeInterface, nodeField } = require('./src/node');

const PORT = process.env.port || 3000;
const server = express();



const videoType = new GraphQLObjectType({
    name: 'Video',
    description: 'A video somewhere',
    fields: {
        id: globalIdField(),
        title: {
            type: GraphQLString,
            description: 'The title of the video.'
        },
        duration: {
            type: GraphQLInt,
            description: 'The duration of the video (in seconds).'
        },
        watched: {
            type: GraphQLBoolean,
            description: 'Whether or not the viewer has watched the video.'
        }
    },
    interfaces: [nodeInterface],
});

exports.videoType = videoType;

const { connectionType: VideoConnection } = connectionDefinitions({
    nodeType: videoType,
    connectionFields: () => ({
        totalCount: {
            type: GraphQLInt,
            description: 'A count of the total number of objects in this connection.',
            resolve: (conn) => {
                return conn.edges.length;
            }
        }
    })
});

const queryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type',
    fields:  {
        node: nodeField,
        videos: {
            type: VideoConnection,
            args: connectionArgs,
            resolve: (_, args) => connectionFromPromisedArray(
                getVideos(),
                args
            )

        },
        video: {
            type: videoType,
            args: {
                id:  {
                    type: new GraphQLNonNull(GraphQLID),
                    description: 'The id of the video. ',
                },

            },
            resolve: (_, args) => {
                return getVideoById(args.id);
            }
        }
    }
});

const videoInputType = new GraphQLInputObjectType({
    name: 'VideoInput',
    description: 'Props on a video object',
    fields: {
        title: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The title of the video.',
        },
        duration: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'The duration of the video (in seconds).',
        },
        released: {
            type: new GraphQLNonNull(GraphQLBoolean),
            description: 'Whether or not the video is released publicly.',
        },
    }
});

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'The root mutation type.',
    fields: {
        createVideo: {
            type: videoType,
            args: {
                video: {
                    type: new GraphQLNonNull(videoInputType),
                }
            },
            resolve: (_, args) => createVideo(args),
        },

    },

});

const schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType,
});

server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
