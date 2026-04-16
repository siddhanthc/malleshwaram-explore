/* ───────────────────────────────────────────────────────
   Malleshwaram Map Guide — Ward Data
   Sources: datameet/Municipal_Spatial_Data (CC BY 4.0),
            Karnataka Legislative Assembly, GBA, ECI
   ─────────────────────────────────────────────────────── */

const WARD_COLORS = {
  60: { fill: '#4A90D9', border: '#1F6FB0' },
  61: { fill: '#E67E22', border: '#C0392B' },
  64: { fill: '#27AE60', border: '#1A7A44' },
};

const wards = [
  {
    id: 'ward-60',
    wardNumber: 60,
    wardName: 'Aramane Nagara',
    approximateAreaSqKm: 7.47,
    centroid: [77.5761, 13.0165],
    boundingBox: [[77.5606, 12.9947], [77.5963, 13.0382]],
    pinCodes: ['560020', '560094'],
    localities: [
      'Sadashivanagar', 'Sankey Tank Road', 'Rajmahal Vilas',
      'Rajmahal Vilas Extension', 'RMV 2nd Stage', 'Vyalikaval (part)',
      'Ashwathnagar', 'AGS Officers Layout', 'ITI Layout',
      'M. S. Ramaiah Nagar (part)',
    ],
    notableFeatures: [
      'Sankey Tank — 15 ha artificial lake, est. 1882',
      'Rajmahal Vilas Palace grounds',
      'M. S. Ramaiah College of Engineering',
    ],
    context: 'The largest of the three wards by area (~7.5 sq km). Named after Armane Nagar ("Palace Neighbourhood"), reflecting proximity to the Rajmahal Vilas estate. Sankey Tank, one of Bengaluru\'s oldest reservoirs, lies in the ward\'s southern section. The ward encompasses the upscale Sadashivanagar bungalow zone and stretches north into the institutional belt around M. S. Ramaiah and IISc.',
    geometry: {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [77.58009, 13.02651], [77.57696, 13.02736], [77.57030, 13.03111],
          [77.56710, 13.03581], [77.56335, 13.03633], [77.56400, 13.03282],
          [77.56197, 13.02792], [77.56321, 13.02158], [77.56309, 13.01567],
          [77.56973, 13.00543], [77.57314, 13.00663], [77.57187, 13.00802],
          [77.57663, 13.00754], [77.58407, 13.00284], [77.58658, 12.99748],
          [77.59441, 12.99543], [77.59448, 13.00150], [77.59067, 13.00992],
          [77.58397, 13.01591], [77.58261, 13.02463], [77.58023, 13.02638],
          [77.58009, 13.02651],
        ]],
      },
    },
  },
  {
    id: 'ward-61',
    wardNumber: 61,
    wardName: 'Malleswaram',
    approximateAreaSqKm: 1.81,
    centroid: [77.5604, 13.0179],
    boundingBox: [[77.5539, 13.0055], [77.5692, 13.0289]],
    pinCodes: ['560003', '560055'],
    localities: [
      'Malleshwaram West (Sampige Road belt)',
      'Margosa Road area',
      '8th Main to 18th Cross grid',
      'Malleshwaram Circle',
      'Vyalikaval (south portion)',
    ],
    notableFeatures: [
      'Sampige Road shopping street',
      '8th Cross Flower Market (est. ~1910s)',
      'Chowdaiah Memorial Hall',
    ],
    context: 'The historic core of Malleshwaram — a planned residential grid developed from 1898 onward after the bubonic plague displaced residents from the old city. Laid out with 8 main roads (N–S) crossed by 18 cross roads (E–W), framed by Sampige Road (west) and Margosa Road (east). Traditionally home to Brahmin and Lingayat families; known for cultural institutions, flower markets, and vegetarian eateries.',
    geometry: {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [77.56026, 13.02531], [77.56001, 13.02658], [77.55882, 13.02819],
          [77.55756, 13.02515], [77.55693, 13.02318], [77.55629, 13.02156],
          [77.55549, 13.01984], [77.55389, 13.01919], [77.55637, 13.01486],
          [77.55856, 13.01207], [77.55965, 13.00938], [77.56039, 13.00689],
          [77.56486, 13.00568], [77.56881, 13.00546], [77.56921, 13.00857],
          [77.56594, 13.01400], [77.56143, 13.01869], [77.56281, 13.02069],
          [77.56159, 13.02174], [77.56114, 13.02247], [77.55991, 13.02280],
          [77.55979, 13.02418], [77.56026, 13.02531],
        ]],
      },
    },
  },
  {
    id: 'ward-64',
    wardNumber: 64,
    wardName: 'Kadu Malleshwara',
    approximateAreaSqKm: 1.36,
    centroid: [77.5695, 13.0032],
    boundingBox: [[77.5601, 12.9966], [77.5788, 13.0084]],
    pinCodes: ['560003'],
    localities: [
      'Kadu Malleshwaram (core temple area)',
      'Subramanya Nagar B Block',
      'Gayathri Nagar (part)',
      'Gandhi Grama',
      'Maruthi Nagar (part)',
      'GDK Park Extension',
      'Kodanda Ramapura (part)',
    ],
    notableFeatures: [
      'Kaadu Malleshwara Temple (Shiva, 1669 CE) — origin of the name Malleshwaram',
      'Dakshinamukha Nandi Tirtha Kalyani Kshetra',
      'Yeshwanthapura Railway Station (adjacent)',
    ],
    context: 'The smallest ward by area (~1.36 sq km) but historically the most significant — the Kaadu Malleshwara Temple is the direct source of the name "Malleshwaram". An 1669 CE inscription records the founding of the temple by Venkoji (half-brother of Chhatrapati Shivaji). The ward sits south of the classic Malleshwaram grid, west of the railway line, with a mix of working-class and lower-middle-class residential pockets.',
    geometry: {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [77.57362, 13.00756], [77.57182, 13.00802], [77.57302, 13.00708],
          [77.57312, 13.00669], [77.57217, 13.00538], [77.56999, 13.00542],
          [77.56524, 13.00565], [77.56084, 13.00553], [77.56117, 13.00286],
          [77.56058, 13.00048], [77.56097, 12.99876], [77.56414, 12.99814],
          [77.56631, 12.99669], [77.56814, 12.99678], [77.57144, 12.99686],
          [77.57133, 13.00186], [77.57219, 13.00305], [77.57666, 13.00276],
          [77.57854, 13.00463], [77.57725, 13.00723], [77.57362, 13.00756],
        ]],
      },
    },
  },
];

const wardRepresentatives = {
  assemblyConstituency: {
    name: 'Malleshwaram',
    number: 157,
    district: 'Bengaluru Urban',
    note: 'All three wards fall within this single Assembly constituency.',
    mla: {
      name: 'Dr. C. N. Ashwath Narayan',
      party: 'Bharatiya Janata Party (BJP)',
      tenure: '2023–present (4th consecutive term; first elected 2008)',
      notes: 'Former Deputy Chief Minister of Karnataka (2019–2021); former Minister for Higher Education, IT/BT, Science & Technology.',
      officeAddress: 'No. 87, 6th Cross, 2nd Main, RMV 2nd Stage, 1st Block, Bengaluru – 560094',
      phone: '9845179709',
      altPhone: '080-23563944',
      email: 'malleshwaram.mla@karnataka.gov.in',
    },
  },
  lokSabhaConstituency: {
    name: 'Bangalore North',
    mp: {
      name: 'Km. Shobha Karandlaje',
      party: 'Bharatiya Janata Party (BJP)',
      tenure: '2024–present',
      notes: 'Minister of State, Ministry of Labour & Employment and Ministry of MSME, Government of India. Won by a margin of 2,59,476 votes in 2024.',
      officeAddress: 'Parliament House Annexe, New Delhi – 110001',
      phone: '09448087039',
      email: 'shobhakarandlaje@sansad.nic.in',
      website: 'https://shobhakarandlaje.in',
    },
  },
};

const wardGovernance = {
  bodyName: 'Greater Bengaluru Authority (GBA)',
  subBody: 'North Bengaluru City Corporation',
  formedDate: 'September 2025 (replaced BBMP)',
  commissioner: 'Pommala Sunil Kumar, IAS (Karnataka 2011 batch)',
  wardCouncillorNote: 'No elected ward councillors since September 2020. BBMP was dissolved and replaced by the GBA in September 2025. All three wards are under administrator rule pending elections.',
  zoneOffice: {
    label: 'ARO Office — Wards 60, 61 & 64',
    address: 'IPP Centre, 16th Cross, Opp. Chowdaiah Memorial Hall, Kodandaramapura, Vaiyalikaval, Bengaluru – 560003',
    phone: '080-22975634',
    mobile: '9480685406',
  },
};
