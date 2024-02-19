
window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'TowerBridge',
            location: {
                lat: 55.747960,
                lng: -4.643990, 
            },
        },
    ];
}
var modelIndex = 0;
var media = [
    {
        type: 'image',
        url: './assets/Image1.jpg',
        scale: '5 5 5', // Adjust scale as needed
        rotation: '0 100 0', // Adjust rotation as needed
        info: 'Image description here',
    },
    {
        type: 'video',
        url: './assets/video1.mp4',
        scale: '5 5 5', // Adjust scale as needed
        rotation: '0 180 0', // Adjust rotation as needed
        info: 'Video description here',
    },
];

var setMedia = function (mediaItem, entity) {
    if (mediaItem.scale) {
        entity.setAttribute('scale', mediaItem.scale);
    }

    if (mediaItem.rotation) {
        entity.setAttribute('rotation', mediaItem.rotation);
    }

    // Using a-plane for both images and videos
    if (mediaItem.type === 'image') {
        entity.setAttribute('material', `src: ${mediaItem.url}`);
    } else if (mediaItem.type === 'video') {
        // Create a video element and set it as the source for the texture
        let video = document.createElement('video');
        video.src = mediaItem.url;
        video.setAttribute('autoplay', 'true');
        video.setAttribute('loop', 'true');
        video.setAttribute('playsinline', 'true'); // Important for iOS
        video.load(); // Ensure the video loads

        // Set the video element on the entity using a-plane
        entity.setAttribute('material', `src: ${video.src};`);
    }

    const div = document.querySelector('.instructions');
    div.innerText = mediaItem.info;
};


function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        // Always create an a-plane for each media item
        let entity = document.createElement('a-plane');
        entity.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setMedia(media[modelIndex], entity);

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % media.length;
            setMedia(media[newIndex], entity);
        });

        scene.appendChild(entity);
    });
}

