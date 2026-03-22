<<<<<<< HEAD
# malleshwaram-explore
=======
# Malleshwaram Map Guide

An interactive 3D map guide to Malleshwaram, one of Bangalore's oldest and most culturally rich neighbourhoods. Explore temples, iconic eateries, and landmarks with detailed descriptions, timings, ratings, and directions.

**[Live Demo](https://siddhanthc.github.io/avatar_app/)**

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Map rendering | [MapLibre GL JS](https://maplibre.org/) v5.1.0 |
| Map tiles | [OpenFreeMap](https://openfreemap.org/) (bright style) |
| 3D buildings | [OpenMapTiles](https://openmaptiles.org/) `fill-extrusion` layer |
| Directions | [Google Maps](https://maps.google.com/) (external links) |
| Styling | Vanilla CSS with custom properties (no framework) |
| Frontend | Vanilla JavaScript (no framework) |

## Data Sources

### Neighbourhood Boundary

The Malleshwaram boundary polygon is derived from official **BBMP (Bruhat Bengaluru Mahanagara Palike)** ward boundaries:

- **Ward 61** — Malleswaram
- **Ward 64** — Kadu Malleshwara
- **Ward 60** — Aramane Nagara (western portion only, to include Sankey Tank)

The three ward polygons were merged using [Shapely](https://shapely.readthedocs.io/) (polygon union), then clipped at **CV Raman Road** (north) and **Sankey Road** (east) to match the commonly understood extent of the neighbourhood.

**Dataset:** [datameet/Municipal_Spatial_Data — BBMP.geojson](https://github.com/datameet/Municipal_Spatial_Data/blob/master/Bangalore/BBMP.geojson)

### Places

13 hand-curated locations across three categories:

| Category | Count | Examples |
|----------|-------|---------|
| Temples | 5 | Kaadu Malleshwara Temple (1669), ISKCON Temple, Dakshinamukha Nandi |
| Eateries | 6 | CTR / Shri Sagar (est. 1960s), Veena Stores, Iyer Mess |
| Landmarks | 3 | Sankey Tank (1882), 8th Cross Market, Chowdiah Memorial Hall |

Each place includes:

- **Coordinates** — verified against OpenStreetMap GPS data
- **Description** — narrative write-ups sourced from Wikipedia, temple/restaurant websites, and local knowledge
- **Timings** — opening hours sourced from [Google Maps](https://maps.google.com/)
- **Rating** — aggregate star ratings from [Google Maps](https://maps.google.com/) reviews (4.2–4.6)
- **Must-try dishes** — popular recommendations from Google Maps reviews and food blogs
- **Category-specific fields** — `deity` and `established` (temples), `mustTry` and `priceRange` (eateries), `highlight` (landmarks)

### Marker Icons

Custom SVG pin markers (36 x 44 px), one per category:

- Temple — gopuram silhouette
- Eatery — fork and spoon
- Landmark — star

## Project Structure

```
├── index.html            # Entry point
├── css/
│   └── style.css         # Layout, theming, responsive design
├── js/
│   ├── data.js           # Boundary polygon + place data
│   ├── app.js            # Map initialisation, 3D buildings, boundary layer
│   └── ui.js             # Sidebar, markers, popups, filtering
└── assets/
    └── markers/
        ├── temple.svg
        ├── eatery.svg
        └── landmark.svg
```

## License

Apache 2.0
>>>>>>> claude/malleshwaram-map-guide-F2zlM
