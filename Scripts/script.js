window.onload = () => {
     let places = staticLoadPlaces();
     renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Magnemite',
            location: {
                lat: 55.747960,
                lng: -4.643990,
            }
        },
    ];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let plane = document.createElement('a-entity');
        plane.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        plane.setAttribute('img-plane', 'src:https://cdn.glitch.global/972d1827-3886-4c44-9a4d-66844bdb1f1c/11%20-%2030%20Jun%20SW%20exit%20stairs.jpg?v=1708344527704;');
        plane.setAttribute('rotation', '0 180 0');
      
        plane.setAttribute('scale', '0.5 0.5 0.5');

        plane.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(plane);
    });
}