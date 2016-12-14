'use strict';

const {
    nodeDefinitions,
    fromGlobalId,
} = require('graphql-relay');

const { getObjectById } = require('./data'); //src/data/index.js

const { nodeInterface, nodeField } = nodeDefinitions(
    (globalId) => {
        const { type, id } = fromGlobalId(globalId);

        return getObjectById(type.toLowerCase(), id);
    },
    (object) => {
        const { videoType } = require('../'); //src/index.js

        if( object.title ) {
            return videoType;
        }

        return null;
    }
);


exports.nodeInterface = nodeInterface;
exports.nodeField = nodeField;
