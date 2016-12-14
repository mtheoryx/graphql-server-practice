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

const getVideoById = id => new Promise(resolve => {
    const [video] = videos.filter(video => video.id === id);
    resolve(video);
});

const getVideos = () => new Promise(resolve => resolve(videos));

const createVideo = ({ title, duration, released }) => {
    const video = {
        id: ( new Buffer(title, 'utf8').toString('base64') ),
        title,
        duration,
        released
    };

    videos.push(video);

    return video;
};

const getObjectById = (type, id) => {
    const types = {
        video: getVideoById,
    };

    return types[type](id);
};

module.exports = {
    getVideoById: getVideoById,
    getVideos:    getVideos,
    createVideo:  createVideo,
    getObjectById: getObjectById,
};
