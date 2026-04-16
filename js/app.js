/* ───────────────────────────────────────────────────────
   Malleshwaram Map Guide — Map Initialization
   ─────────────────────────────────────────────────────── */

const map = new maplibregl.Map({
  container: 'map',
  style: 'https://tiles.openfreemap.org/styles/bright',
  center: MALLESHWARAM_CENTER,
  zoom: DEFAULT_ZOOM,
  pitch: DEFAULT_PITCH,
  bearing: DEFAULT_BEARING,
  antialias: true,
  maxPitch: 70,
});

// Navigation controls
map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');
map.addControl(new maplibregl.ScaleControl({ maxWidth: 150 }), 'bottom-right');

map.on('load', () => {
  // ── Find label layer (insert visual layers beneath labels) ──
  const layers = map.getStyle().layers;
  let labelLayerId;
  for (const layer of layers) {
    if (layer.type === 'symbol' && layer.layout && layer.layout['text-field']) {
      labelLayerId = layer.id;
      break;
    }
  }

  // ── 3D Buildings ─────────────────────────────────────
  if (!map.getLayer('3d-buildings')) {
    map.addLayer(
      {
        id: '3d-buildings',
        source: 'openmaptiles',
        'source-layer': 'building',
        type: 'fill-extrusion',
        minzoom: 14,
        paint: {
          'fill-extrusion-color': [
            'interpolate',
            ['linear'],
            ['get', 'render_height'],
            0, '#e8ddd3',
            20, '#d4c5b5',
            50, '#c0b0a0',
          ],
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            14, 0,
            15.5, ['get', 'render_height'],
          ],
          'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            14, 0,
            15.5, ['get', 'render_min_height'],
          ],
          'fill-extrusion-opacity': 0.75,
        },
        filter: ['!=', ['get', 'hide_3d'], true],
      },
      labelLayerId
    );
  }

  // ── Malleshwaram Boundary ────────────────────────────
  map.addSource('malleshwaram-boundary', {
    type: 'geojson',
    data: {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [MALLESHWARAM_BOUNDARY],
      },
    },
  });

  // Translucent fill
  map.addLayer({
    id: 'malleshwaram-fill',
    type: 'fill',
    source: 'malleshwaram-boundary',
    paint: {
      'fill-color': '#e67e22',
      'fill-opacity': 0.08,
    },
  }, labelLayerId);

  // Thick border outline
  map.addLayer({
    id: 'malleshwaram-border',
    type: 'line',
    source: 'malleshwaram-boundary',
    paint: {
      'line-color': '#d35400',
      'line-width': 5,
      'line-dasharray': [2, 1],
      'line-opacity': 0.9,
    },
  });

  // ── Markers & UI ─────────────────────────────────────
  createMarkers(map);
  renderSidebar(map);
  initFilters(map);
  initSidebarToggle();
  initWardsTab(map);
});

// ── Click on map to deselect ───────────────────────────
map.on('click', (e) => {
  if (wardsUI.wardsMode) {
    // Ward polygon clicks are handled by layer-specific handlers;
    // a click on empty space deselects the active ward.
    if (!e.originalEvent._wardClick && activeWardId) {
      activeWardId = null;
      resetWardHighlight(map);
      map.flyTo({ center: MALLESHWARAM_CENTER, zoom: 14.5, pitch: 0, bearing: 0, duration: 700 });
      renderWardList(map);
    }
    return;
  }
  const target = e.originalEvent.target;
  if (!target.closest('.custom-marker') && !target.closest('.maplibregl-popup')) {
    setActiveCard(null, map);
  }
});
