/* ───────────────────────────────────────────────────────
   Malleshwaram Map Guide — Wards Tab UI
   ─────────────────────────────────────────────────────── */

// Shared state (checked by app.js click handler)
const wardsUI = { wardsMode: false };

let activeWardId = null;

// ── Map layers ────────────────────────────────────────────

function addWardLayers(map) {
  wards.forEach((ward) => {
    map.addSource(`ward-${ward.wardNumber}`, {
      type: 'geojson',
      data: ward.geometry,
    });

    map.addLayer({
      id: `ward-fill-${ward.wardNumber}`,
      type: 'fill',
      source: `ward-${ward.wardNumber}`,
      paint: {
        'fill-color': WARD_COLORS[ward.wardNumber].fill,
        'fill-opacity': 0.12,
      },
      layout: { visibility: 'none' },
    });

    map.addLayer({
      id: `ward-border-${ward.wardNumber}`,
      type: 'line',
      source: `ward-${ward.wardNumber}`,
      paint: {
        'line-color': WARD_COLORS[ward.wardNumber].border,
        'line-width': 2.5,
        'line-opacity': 0.9,
      },
      layout: { visibility: 'none' },
    });
  });
}

function setWardLayersVisible(map, visible) {
  const vis = visible ? 'visible' : 'none';
  wards.forEach((ward) => {
    map.setLayoutProperty(`ward-fill-${ward.wardNumber}`, 'visibility', vis);
    map.setLayoutProperty(`ward-border-${ward.wardNumber}`, 'visibility', vis);
  });
  // Swap neighbourhood boundary for individual ward boundaries
  const boundaryVis = visible ? 'none' : 'visible';
  map.setLayoutProperty('malleshwaram-fill', 'visibility', boundaryVis);
  map.setLayoutProperty('malleshwaram-border', 'visibility', boundaryVis);
}

function highlightWard(map, wardNumber) {
  wards.forEach((ward) => {
    const selected = ward.wardNumber === wardNumber;
    map.setPaintProperty(`ward-fill-${ward.wardNumber}`, 'fill-opacity', selected ? 0.28 : 0.05);
    map.setPaintProperty(`ward-border-${ward.wardNumber}`, 'line-width', selected ? 4 : 1.5);
    map.setPaintProperty(`ward-border-${ward.wardNumber}`, 'line-opacity', selected ? 1 : 0.5);
  });
}

function resetWardHighlight(map) {
  wards.forEach((ward) => {
    map.setPaintProperty(`ward-fill-${ward.wardNumber}`, 'fill-opacity', 0.12);
    map.setPaintProperty(`ward-border-${ward.wardNumber}`, 'line-width', 2.5);
    map.setPaintProperty(`ward-border-${ward.wardNumber}`, 'line-opacity', 0.9);
  });
}

// ── Mode switching ────────────────────────────────────────

function enterWardsMode(map) {
  wardsUI.wardsMode = true;
  activeWardId = null;

  markers.forEach(({ el }) => { el.style.display = 'none'; });
  if (activePopup) activePopup.remove();

  setWardLayersVisible(map, true);

  map.flyTo({ center: MALLESHWARAM_CENTER, zoom: 14.5, pitch: 0, bearing: 0, duration: 800 });

  document.getElementById('places-panel').style.display = 'none';
  const wardsPanel = document.getElementById('wards-panel');
  wardsPanel.style.display = 'flex';
  renderWardList(map);
}

function exitWardsMode(map) {
  wardsUI.wardsMode = false;
  activeWardId = null;

  updateMarkerVisibility();
  setWardLayersVisible(map, false);
  resetWardHighlight(map);

  document.getElementById('wards-panel').style.display = 'none';
  document.getElementById('places-panel').style.display = 'flex';
}

// ── Ward list ─────────────────────────────────────────────

function renderWardList(map) {
  const panel = document.getElementById('wards-panel');
  panel.innerHTML = `
    <div class="ward-list-intro">
      All three wards fall within <strong>Malleshwaram Assembly Constituency (No. 157)</strong>.
      Select a ward to see its boundary and representatives.
    </div>
    <div class="ward-list">
      ${wards.map((w) => wardCardHTML(w)).join('')}
    </div>
    <div class="ward-gov-teaser">
      <div class="ward-gov-teaser-title">Municipal Body</div>
      <div class="ward-gov-teaser-name">${wardGovernance.bodyName} — ${wardGovernance.subBody}</div>
      <div class="ward-gov-teaser-note">${wardGovernance.wardCouncillorNote}</div>
    </div>
  `;

  panel.querySelectorAll('.ward-card').forEach((card) => {
    card.addEventListener('click', () => {
      const ward = wards.find((w) => w.id === card.dataset.wardId);
      if (ward) selectWard(ward, map);
    });
  });
}

function wardCardHTML(ward) {
  const color = WARD_COLORS[ward.wardNumber].fill;
  return `
    <div class="ward-card" data-ward-id="${ward.id}" style="border-left-color:${color}">
      <div class="ward-card-top">
        <span class="ward-num-badge" style="background:${color}">Ward ${ward.wardNumber}</span>
        <h3>${ward.wardName}</h3>
      </div>
      <p class="ward-card-snippet">${ward.context.slice(0, 110)}…</p>
      <div class="ward-card-meta">
        <span>${ward.approximateAreaSqKm} sq km</span>
        <span>PIN: ${ward.pinCodes.join(', ')}</span>
      </div>
    </div>`;
}

// ── Ward selection & detail ───────────────────────────────

function selectWard(ward, map) {
  activeWardId = ward.id;
  highlightWard(map, ward.wardNumber);
  map.fitBounds(ward.boundingBox, { padding: 60, pitch: 0, bearing: 0, duration: 900 });
  renderWardDetail(ward, map);
}

function renderWardDetail(ward, map) {
  const panel = document.getElementById('wards-panel');
  const color = WARD_COLORS[ward.wardNumber].fill;
  const { mla } = wardRepresentatives.assemblyConstituency;
  const { mp } = wardRepresentatives.lokSabhaConstituency;
  const gov = wardGovernance;

  const mlaDirectionsUrl =
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mla.officeAddress)}`;
  const zoneDirectionsUrl =
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(gov.zoneOffice.address)}`;

  panel.innerHTML = `
    <div class="ward-detail">
      <button class="ward-back-btn" id="ward-back-btn">&#8592; All Wards</button>

      <div class="ward-detail-header" style="border-left:4px solid ${color}">
        <span class="ward-num-badge" style="background:${color}">Ward ${ward.wardNumber}</span>
        <h2>${ward.wardName}</h2>
        <div class="ward-detail-stats">
          <span>${ward.approximateAreaSqKm} sq km</span>
          <span>PIN ${ward.pinCodes.join(', ')}</span>
          <span>Constituency 157</span>
        </div>
      </div>

      <p class="ward-detail-context">${ward.context}</p>

      <div class="ward-info-block">
        <div class="ward-section-label">Areas covered</div>
        <div class="ward-tags">
          ${ward.localities.map((l) => `<span class="ward-tag">${l}</span>`).join('')}
        </div>
      </div>

      <div class="ward-info-block">
        <div class="ward-section-label">Notable features</div>
        <ul class="ward-features-list">
          ${ward.notableFeatures.map((f) => `<li>${f}</li>`).join('')}
        </ul>
      </div>

      <div class="rep-section">
        <div class="rep-section-title">Municipal Governance</div>
        <div class="rep-card">
          <div class="rep-org">${gov.bodyName}</div>
          <div class="rep-org-sub">${gov.subBody} · Est. ${gov.formedDate}</div>
          <div class="rep-row"><span class="rep-label">Commissioner</span><span>${gov.commissioner}</span></div>
          <div class="rep-note">${gov.wardCouncillorNote}</div>
          <div class="rep-divider"></div>
          <div class="rep-sub-heading">${gov.zoneOffice.label}</div>
          <div class="rep-row"><span class="rep-label">Address</span><span>${gov.zoneOffice.address}</span></div>
          <div class="rep-row"><span class="rep-label">Phone</span><span>${gov.zoneOffice.phone} / ${gov.zoneOffice.mobile}</span></div>
          <div class="rep-actions">
            <a href="${zoneDirectionsUrl}" target="_blank" rel="noopener">Get Directions</a>
          </div>
        </div>
      </div>

      <div class="rep-section">
        <div class="rep-section-title">MLA — Karnataka Assembly</div>
        <div class="rep-constituency">Malleshwaram Constituency · No. 157 · Bengaluru Urban
          <br><small>${wardRepresentatives.assemblyConstituency.note}</small>
        </div>
        <div class="rep-card">
          <div class="rep-name">${mla.name}</div>
          <div class="rep-party">${mla.party}</div>
          <div class="rep-row"><span class="rep-label">In office</span><span>${mla.tenure}</span></div>
          <div class="rep-note">${mla.notes}</div>
          <div class="rep-divider"></div>
          <div class="rep-sub-heading">Constituency Office</div>
          <div class="rep-row"><span class="rep-label">Address</span><span>${mla.officeAddress}</span></div>
          <div class="rep-row"><span class="rep-label">Phone</span><span>${mla.phone} / ${mla.altPhone}</span></div>
          <div class="rep-row"><span class="rep-label">Email</span><a href="mailto:${mla.email}">${mla.email}</a></div>
          <div class="rep-actions">
            <a href="${mlaDirectionsUrl}" target="_blank" rel="noopener">Get Directions</a>
          </div>
        </div>
      </div>

      <div class="rep-section">
        <div class="rep-section-title">MP — Lok Sabha</div>
        <div class="rep-constituency">Bangalore North Constituency</div>
        <div class="rep-card">
          <div class="rep-name">${mp.name}</div>
          <div class="rep-party">${mp.party}</div>
          <div class="rep-row"><span class="rep-label">In office</span><span>${mp.tenure}</span></div>
          <div class="rep-note">${mp.notes}</div>
          <div class="rep-divider"></div>
          <div class="rep-row"><span class="rep-label">Office</span><span>${mp.officeAddress}</span></div>
          <div class="rep-row"><span class="rep-label">Phone</span><span>${mp.phone}</span></div>
          <div class="rep-row"><span class="rep-label">Email</span><a href="mailto:${mp.email}">${mp.email}</a></div>
          <div class="rep-actions">
            <a href="${mp.website}" target="_blank" rel="noopener">Official Website &#8599;</a>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('ward-back-btn').addEventListener('click', () => {
    activeWardId = null;
    resetWardHighlight(map);
    map.flyTo({ center: MALLESHWARAM_CENTER, zoom: 14.5, pitch: 0, bearing: 0, duration: 700 });
    renderWardList(map);
  });
}

// ── Init ──────────────────────────────────────────────────

function initWardsTab(map) {
  addWardLayers(map);

  wards.forEach((ward) => {
    map.on('click', `ward-fill-${ward.wardNumber}`, (e) => {
      e.originalEvent._wardClick = true;
      if (wardsUI.wardsMode) selectWard(ward, map);
    });
    map.on('mouseenter', `ward-fill-${ward.wardNumber}`, () => {
      if (wardsUI.wardsMode) map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', `ward-fill-${ward.wardNumber}`, () => {
      map.getCanvas().style.cursor = '';
    });
  });

  document.querySelectorAll('.mode-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.mode-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      if (tab.dataset.mode === 'wards') {
        enterWardsMode(map);
      } else {
        exitWardsMode(map);
      }
    });
  });
}
