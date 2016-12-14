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

module.exports = {
    getVideoById: getVideoById
};
