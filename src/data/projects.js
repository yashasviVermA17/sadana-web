import imgCharcoalLouvers from '../assets/Charcoal lowers.jpg'
import imgUvMarble from '../assets/Uv marble sheet.jpg'
import imgVerticalGarden from '../assets/Vertical garden.jpg'
import imgRattan from '../assets/Rattan cane.jpg'
import imgPuStone from '../assets/Pu stone wall panel.jpg'
import imgBaffle from '../assets/Baffle ceiling.jpg'
import imgHdhmr from '../assets/HDHMR 3d wall panel.jpg'
import imgAlabasterSheet from '../assets/Alabaster sheet.jpg'
import imgRipple from '../assets/Ripple sheet.jpg'
import imgWoodenFlooring from '../assets/Wooden flooring.jpg'
import imgWallpaper from '../assets/Wallpaper.jpg'
import img3DPanel from '../assets/3 D panel.jpg'
import imgMosaic from '../assets/Mosaic tiles.jpg'
import imgCurtain from '../assets/Curtain.jpg'
import imgCarpet from '../assets/Carpet.jpg'
import imgWoodenBlinds from '../assets/Wooden blinds.jpg'
import imgParametric from '../assets/Parametric wall panel.jpg'
import imgStretchFiber from '../assets/Stretch fiber ceiling.jpg'
import imgExteriorCladding from '../assets/Outdoor deck tile.jpg'
import imgSpcFlooring from '../assets/S.p.c flooring.jpg'

export const projectCategories = ['All', 'Residential', 'Hospitality', 'Office', 'Retail']

export const projects = [
  {
    id: 'the-charcoal-loft',
    title: 'The Charcoal Loft',
    category: 'Residential',
    location: 'Gurugram, Haryana',
    year: 2025,
    scope: '3 BHK Residence · 2,150 sq ft',
    short: 'A moody, contemporary residence wrapped in charcoal louvers and warm wood tones.',
    description:
      'The Charcoal Loft reimagines a 3 BHK apartment as a calm, textural retreat. Charcoal louver screens filter daylight across the living volume, while fluted wall panelling and warm flooring ground the space in understated luxury. Every material was selected and installed turnkey by the Sadana Decor team.',
    details: [
      'Charcoal louver screens at the balcony edge for privacy and sun control',
      'Fluted wall panelling on the TV and dining feature walls',
      'Warm wooden flooring throughout the living and bedrooms',
      'Custom-designed wardrobe fronts in matte laminate',
      'Integrated cove lighting in the living ceiling',
    ],
    materials: ['Charcoal Louvers', 'Customized Wall Panelings', 'Wooden Flooring', 'Laminates', 'Customized Doors', 'Wallpapers'],
    cover: imgCharcoalLouvers,
    gallery: [imgCharcoalLouvers, imgWoodenFlooring, imgSpcFlooring, imgWallpaper],
  },
  {
    id: 'golden-hour-penthouse',
    title: 'Golden Hour Penthouse',
    category: 'Residential',
    location: 'Golf Course Road, Gurugram',
    year: 2025,
    scope: '4 BHK Penthouse · 3,400 sq ft',
    short: 'A sun-drenched penthouse that leans into warm neutrals, stone and soft light.',
    description:
      'Designed to capture the golden hour, this penthouse pairs a soft, neutral palette with marble-look surfaces, sheer drapes and statement 3D wall panels. The result is a layered, light-filled home that feels both grand and effortless.',
    details: [
      'Marble-look sheets on the living and dining floors',
      'Statement 3D panel feature wall in the entry',
      'Sheer and blackout curtains on every window',
      'Premium carpet in the master bedroom',
      'Upholstered headboard walls in the bedrooms',
    ],
    materials: ['UV Marble Sheets', '3D Panels', 'Curtains', 'Rugs & Carpets', 'Upholstery', 'Wooden Blinds'],
    cover: imgUvMarble,
    gallery: [imgUvMarble, img3DPanel, imgCurtain, imgWoodenBlinds],
  },
  {
    id: 'verde-villa',
    title: 'Verde Villa',
    category: 'Residential',
    location: 'Sohna Road, Gurugram',
    year: 2024,
    scope: 'Independent Villa · 5,600 sq ft',
    short: 'A villa where vertical gardens, stone cladding and wood bring the outside in.',
    description:
      'Verde Villa blurs the line between indoors and out. Vertical gardens climb the courtyard walls, PU stone cladding dresses the entrance elevation, and warm wooden floors carry through the interiors. A complete turnkey delivery from concept to finish.',
    details: [
      'Vertical garden panels on the courtyard feature wall',
      'PU stone cladding on the entrance elevation',
      'Wooden flooring across living and family rooms',
      'WPC cladding on the outdoor ceiling decks',
      'Designer door sets throughout the villa',
    ],
    materials: ['Vertical Garden', 'PU Stones', 'Wooden Flooring', 'WPC Cladding', 'Customized Doors', 'Exterior Cladding'],
    cover: imgVerticalGarden,
    gallery: [imgVerticalGarden, imgExteriorCladding, imgPuStone, imgWoodenFlooring],
  },
  {
    id: 'the-terracotta-boutique',
    title: 'The Terracotta Boutique',
    category: 'Retail',
    location: 'Khan Market, New Delhi',
    year: 2025,
    scope: 'Fashion Boutique · 1,100 sq ft',
    short: 'A warm, tactile boutique with terracotta tones, rattan and soft display lighting.',
    description:
      'A fashion boutique that feels like a warm, crafted interior. Terracotta-toned walls, rattan cane detailing and a luminous highlight-sheet ceiling create a space where product and atmosphere work together. Brand walls and display joinery were custom-made on site.',
    details: [
      'Rattan cane panel detailing on display walls',
      'Highlight sheet ceiling with warm backlighting',
      'Custom display joinery in wood finish laminates',
      'Marble-look sheet floor in the central aisle',
      'Sliding display doors in clear glass and frame',
    ],
    materials: ['Rattan Cane', 'Highlight Sheets', 'Laminates', 'Marble Sheets', 'Customized Doors', 'Wallpapers'],
    cover: imgRattan,
    gallery: [imgRattan, imgMosaic, imgWallpaper, imgRipple],
  },
  {
    id: 'cafe-terracotta',
    title: 'Café Terracotta',
    category: 'Hospitality',
    location: 'Cyber City, Gurugram',
    year: 2024,
    scope: 'Specialty Café · 1,400 sq ft',
    short: 'A specialty café built for warmth — from terracotta texture walls to rattan seating.',
    description:
      'Café Terracotta uses natural materials to create an intimate, slow-morning atmosphere. PU stone and textured walls set the mood, rattan and upholstered seating add comfort, and acoustic baffle ceilings keep the room pleasant even at full house.',
    details: [
      'PU stone textured feature wall behind the counter',
      'Baffle ceiling system for noise control',
      'Rattan and upholstered seating throughout',
      'Wooden flooring in the main dining area',
      'Dimmable highlight panels over each table',
    ],
    materials: ['PU Stones', 'Baffle Ceiling', 'Rattan Cane', 'Upholstery', 'Wooden Flooring', 'Highlight Sheets'],
    cover: imgPuStone,
    gallery: [imgPuStone, imgBaffle, imgRattan, imgWoodenFlooring],
  },
  {
    id: 'fintech-workspace',
    title: 'Fintech Workspace',
    category: 'Office',
    location: 'DLF Cyber Park, Gurugram',
    year: 2025,
    scope: 'Corporate Office · 12,000 sq ft',
    short: 'A fast-scaling fintech office with a calm palette, acoustic ceilings and focused lighting.',
    description:
      'A 12,000 sq ft corporate fit-out for a fintech scale-up. The brief was calm focus: parametric panels for a branded reception, baffle and stretch ceilings for acoustics, and carpeted meeting rooms to keep noise down. Delivered on a tight 8-week schedule.',
    details: [
      'Parametric panel branded reception backdrop',
      'Baffle ceiling in the open workspace',
      'Stretch fiber ceiling in the executive corridor',
      'Carpet in cabins, meeting rooms and break zones',
      'ACP sheet branding wall at the office entry',
    ],
    materials: ['Parametric Panel', 'Baffle Ceiling', 'Stretch Fiber Ceiling', 'Rugs & Carpets', 'ACP & HPL Sheets', 'Glass Films'],
    cover: imgBaffle,
    gallery: [imgBaffle, imgParametric, imgStretchFiber, imgCarpet],
  },
  {
    id: 'studio-forty-two',
    title: 'Studio Forty-Two',
    category: 'Office',
    location: 'Okhla, New Delhi',
    year: 2024,
    scope: 'Design Studio · 2,800 sq ft',
    short: 'A creative studio with exposed structure, gypsum geometry and flexible work zones.',
    description:
      'Studio Forty-Two is a working studio that doubles as a showroom for the firm’s craft. Sculptural 3D panels, painted moulding details and a flexible lounge built with modular wall panelling let the space evolve with every project.',
    details: [
      'Sculptural 3D panels on the main meeting wall',
      'French moulding details on ceiling borders',
      'Modular wall panelling with reconfigurable panels',
      'Wooden flooring in the design studio',
      'Custom designed doors for private cabins',
    ],
    materials: ['HDHMR 3D Wall Panels', 'French Mouldings', 'Customized Wall Panelings', 'Wooden Flooring', 'Customized Doors', 'Cork Sheets'],
    cover: imgHdhmr,
    gallery: [imgHdhmr, img3DPanel, imgWallpaper, imgWoodenFlooring],
  },
  {
    id: 'the-lumiere-showroom',
    title: 'The Lumière Showroom',
    category: 'Retail',
    location: 'Kirti Nagar, New Delhi',
    year: 2025,
    scope: 'Lighting Showroom · 3,200 sq ft',
    short: 'A lighting showroom built around glow — alabaster, backlit panels and sleek floors.',
    description:
      'The Lumière showroom is a stage for light. Alabaster panels and backlit displays dominate the walls, stretch ceilings wash the room in even light, and a marble-look floor keeps the focus on the product. A fully turnkey retail fit-out.',
    details: [
      'Alabaster sheet feature walls with backlighting',
      'Stretch fiber ceiling for an even light wash',
      'Marble-look sheets on the showroom floor',
      'Highlight and ripple sheets on display bays',
      'Custom display counters in high-gloss laminate',
    ],
    materials: ['Alabaster Sheets', 'Stretch Fiber Ceiling', 'UV Marble Sheets', 'Highlight Sheets', 'Acrylic Sheets', 'Wallpapers'],
    cover: imgAlabasterSheet,
    gallery: [imgAlabasterSheet, imgStretchFiber, imgUvMarble, imgRipple],
  },
  {
    id: 'amber-courtyard',
    title: 'Amber Courtyard',
    category: 'Hospitality',
    location: 'Chhatarpur, New Delhi',
    year: 2024,
    scope: 'Boutique Restaurant · 4,500 sq ft',
    short: 'A courtyard restaurant where amber light, wood and greenery set an intimate mood.',
    description:
      'Amber Courtyard is a boutique restaurant centred on an open courtyard. Amber-toned highlight panels glow overhead, vertical gardens frame the edges, and wooden floors and rattan furniture keep it warm and grounded. Acoustics handled with a baffle ceiling.',
    details: [
      'Amber highlight sheets over the courtyard seating',
      'Vertical garden panels on the perimeter walls',
      'Baffle ceiling over the indoor dining hall',
      'Wooden flooring and rattan furniture mix',
      'Marble-look surfaces on the service counter',
    ],
    materials: ['Highlight Sheets', 'Vertical Garden', 'Baffle Ceiling', 'Wooden Flooring', 'Rattan Cane', 'Wooden Blinds'],
    cover: imgRipple,
    gallery: [imgRipple, imgVerticalGarden, imgBaffle, imgWoodenBlinds],
  },
]

export const getProject = (id) => projects.find((p) => p.id === id)

export const projectsByCategory = (category) =>
  category === 'All' ? projects : projects.filter((p) => p.category === category)

export const relatedProjects = (project, count = 3) =>
  projects
    .filter((p) => p.category === project.category && p.id !== project.id)
    .concat(projects.filter((p) => p.category !== project.category && p.id !== project.id))
    .slice(0, count)
