/* ───────────────────────────────────────────────────────
   Malleshwaram Map Guide — UI Module
   ─────────────────────────────────────────────────────── */

let markers = [];
let activePopup = null;
let activeFilter = 'all';
let activeCardId = null;

// ── Sidebar rendering ────────────────────────────────────

function renderSidebar(map) {
  const list = document.querySelector('.place-list');
  const filtered =
    activeFilter === 'all'
      ? places
      : places.filter((p) => p.category === activeFilter);

  list.innerHTML = filtered.map((p) => placeCardHTML(p)).join('');

  list.querySelectorAll('.place-card').forEach((card) => {
    card.addEventListener('click', () => {
      const place = places.find((p) => p.id === card.dataset.id);
      if (place) flyToPlace(place, map);
    });
  });
}

function placeCardHTML(place) {
  const ratingStr = place.rating ? `<span>&#9733; ${place.rating}</span>` : '';
  const timingStr = place.timings ? `<span>&#128339; ${place.timings}</span>` : '';

  return `
    <div class="place-card${activeCardId === place.id ? ' active' : ''}" data-id="${place.id}">
      <div class="place-card-header">
        <h3>${place.name}</h3>
        <span class="category-badge ${place.category}">${place.category}</span>
      </div>
      <p class="place-card-desc">${place.description}</p>
      <div class="place-card-meta">
        ${ratingStr}${timingStr}
      </div>
    </div>`;
}

// ── Filter tabs ──────────────────────────────────────────

function initFilters(map) {
  document.querySelectorAll('.filter-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      activeFilter = tab.dataset.category;

      document
        .querySelectorAll('.filter-tab')
        .forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      renderSidebar(map);
      updateMarkerVisibility();
    });
  });
}

function updateMarkerVisibility() {
  markers.forEach(({ marker, place }) => {
    const visible =
      activeFilter === 'all' || place.category === activeFilter;
    marker.getElement().style.display = visible ? 'block' : 'none';
  });
}

// ── Markers ──────────────────────────────────────────────

function createMarkers(map) {
  places.forEach((place) => {
    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.innerHTML = `<img src="assets/markers/${place.category}.svg" width="32" height="40" alt="${place.category}">`;

    const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
      .setLngLat(place.coordinates)
      .addTo(map);

    el.addEventListener('click', (e) => {
      e.stopPropagation();
      flyToPlace(place, map);
    });

    markers.push({ marker, place, el });
  });
}

// ── Popup ────────────────────────────────────────────────

function showPopup(place, map) {
  if (activePopup) activePopup.remove();

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.coordinates[1]},${place.coordinates[0]}`;

  let detailsHTML = '';

  if (place.timings) {
    detailsHTML += `<div class="popup-detail"><strong>Timings</strong>${place.timings}</div>`;
  }
  if (place.rating) {
    detailsHTML += `<div class="popup-detail"><strong>Rating</strong>&#9733; ${place.rating} / 5</div>`;
  }
  if (place.mustTry) {
    detailsHTML += `<div class="popup-detail"><strong>Must try</strong>${place.mustTry}</div>`;
  }
  if (place.priceRange) {
    detailsHTML += `<div class="popup-detail"><strong>Price</strong>${place.priceRange}</div>`;
  }
  if (place.deity) {
    detailsHTML += `<div class="popup-detail"><strong>Deity</strong>${place.deity}</div>`;
  }
  if (place.established) {
    detailsHTML += `<div class="popup-detail"><strong>Est.</strong>${place.established}</div>`;
  }

  const highlightHTML = place.highlight
    ? `<div class="popup-highlight">${place.highlight}</div>`
    : '';

  const html = `
    <div class="popup-inner">
      <h2>${place.name}</h2>
      <span class="category-badge ${place.category}">${place.category}</span>
      <p class="popup-desc">${place.description}</p>
      ${detailsHTML}
      ${highlightHTML}
      <div class="popup-actions">
        <a href="${directionsUrl}" target="_blank" rel="noopener">Get Directions</a>
      </div>
    </div>`;

  activePopup = new maplibregl.Popup({
    closeButton: true,
    maxWidth: '320px',
    offset: [0, -40],
  })
    .setLngLat(place.coordinates)
    .setHTML(html)
    .addTo(map);

  activePopup.on('close', () => {
    setActiveCard(null, map);
  });
}

// ── Fly to place ─────────────────────────────────────────

function flyToPlace(place, map) {
  map.flyTo({
    center: place.coordinates,
    zoom: 17,
    pitch: 55,
    bearing: map.getBearing(),
    duration: 1200,
    essential: true,
  });

  setActiveCard(place.id, map);

  map.once('moveend', () => {
    showPopup(place, map);
  });
}

function setActiveCard(id, map) {
  activeCardId = id;

  // Update sidebar highlight
  document.querySelectorAll('.place-card').forEach((card) => {
    card.classList.toggle('active', card.dataset.id === id);
  });

  // Update marker highlight
  markers.forEach(({ el, place }) => {
    el.classList.toggle('active', place.id === id);
  });

  // Scroll card into view
  if (id) {
    const card = document.querySelector(`.place-card[data-id="${id}"]`);
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// ── Sidebar toggle ───────────────────────────────────────

function initSidebarToggle() {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('sidebar-toggle');

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    toggle.textContent = sidebar.classList.contains('collapsed') ? '\u25B6' : '\u25C0';
  });

  // Mobile: tap header to toggle
  if (window.innerWidth <= 768) {
    document.querySelector('.sidebar-header').addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
    });
  }
}
