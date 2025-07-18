mapboxgl.accessToken = mapToken;

try {
  const parsed = Array.isArray(coordinates) ? coordinates : JSON.parse(coordinates);

  if (!Array.isArray(parsed) || parsed.length !== 2) {
    throw new Error('Invalid coordinates');
  }

  listing.geometry.coords = parsed; // ✅ assign valid coords
} catch (err) {
  listing.geometry.coords = [77.289, 28.6139]; // ✅ fallback directly on listing.geometry.coords
}

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: listing.geometry.coords, // ✅ now always safe
  zoom: 9
});

const marker = new mapboxgl.Marker({ draggable: true, color: "red" })
  .setLngLat(listing.geometry.coords) // ✅ always safe
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h4>${listing.title}</h4><p>Exact location provided after booking</p>`
    )
  )
  .addTo(map);

  

function onDragEnd() {
  const lngLat = marker.getLngLat();
  console.log('Dragged to:', lngLat);
  document.getElementById('lngLat').value = JSON.stringify([
    lngLat.lng,
    lngLat.lat
  ]);
}

marker.on('dragend', onDragEnd);
