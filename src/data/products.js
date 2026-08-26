import img3DPanel from '../assets/products/wall-panels/3 D panel.jpg'
import imgHdhmr from '../assets/products/wall-panels/HDHMR 3d wall panel.jpg'
import imgPvcWallPanelJpeg from '../assets/products/wall-panels/Pvc wall panel.jpeg'
import imgPuStoneJpeg from '../assets/products/wall-panels/Pu stone wall panel.jpeg'
import imgParametric from '../assets/products/wall-panels/Parametric wall panel.jpeg'
import imgVictaraPanel from '../assets/products/wall-panels/Victara panel.jpg'
import imgWpcPanels from '../assets/products/wall-panels/W.p.c panel.jpg'
import imgExteriorWallPanel from '../assets/products/wall-panels/Exterior wall panel.jpg'
import imgAcrylicSheet from '../assets/products/decorative-sheets/Acrylic sheet.jpg'
import imgLaminates from '../assets/products/decorative-sheets/Laminate sheet.jpeg'
import imgRippleSheet from '../assets/products/decorative-sheets/Ripple sheet.jpg'
import imgHighlighterSheet from '../assets/products/decorative-sheets/metal highjlighter sheet 2.jpeg'
import imgCharcoalSheet from '../assets/products/decorative-sheets/Charcoal sheets.jpeg'
import imgAcpSheet from '../assets/products/decorative-sheets/Acp sheet.jpeg'
import imgCorkSheet from '../assets/products/decorative-sheets/Cork sheet.jpg'
import imgUvMarbleSheet from '../assets/products/decorative-sheets/Uv marble sheet.jpg'
import imgVeneerSheet from '../assets/products/decorative-sheets/Veneer sheets.jpeg'
import imgFabricSheet from '../assets/products/decorative-sheets/Fabric sheet.png'
import imgAlabasterCeiling from '../assets/products/ceiling/Alabaster sheet .jpg'
import imgBaffle from '../assets/products/ceiling/Baffle ceiling.jpg'
import imgStretchFiber from '../assets/products/ceiling/Stretch fiber ceiling.jpg'
import imgVoxSofit from '../assets/products/ceiling/Vox sofit celling.jpg'
import imgWoodenFlooring from '../assets/products/flooring/Wooden flooring.jpg'
import imgSpcFlooring from '../assets/products/flooring/S.p.c flooring.jpg'
import imgGymFlooring from '../assets/products/flooring/Gym rubber flooring.jpg'
import imgRugs from '../assets/products/flooring/rugs.jpg'
import imgVinylFlooring from '../assets/products/flooring/Vinyl flooring.jpeg'
import imgMosaicTiles from '../assets/products/flooring/Mosaic tiles.jpg'
import imgRoofingThatch from '../assets/products/roofing/Roofing Thatch.jpeg'
import imgOutdoorDeckTile from '../assets/products/exterior-outdoor/Outdoor deck tile.jpg'
import imgDoors from '../assets/products/doors/Designer door.jpeg'
import imgGlassFilm from '../assets/products/doors/Glass film.jpeg'
import imgBlinds from '../assets/products/blinds-curtains/Blinds.jpeg'
import imgWoodenBlinds from '../assets/products/blinds-curtains/Wooden blinds.jpg'
import imgCurtains from '../assets/products/blinds-curtains/Curtain.jpg'
import imgWallpapers from '../assets/products/wallpaper/customized wallpaper .jpeg'
import imgArtificialGrass from '../assets/products/artificial-grass/Artificial grass1.jpg'
import imgExteriorLouvers from '../assets/products/exterior-outdoor/HDPC lowers.jpeg'
import imgFabricLouvers from '../assets/products/exterior-outdoor/Fabric lowers.png'
import imgVerticalGarden from '../assets/products/exterior-outdoor/Vertical garden.jpg'
import imgMouldings from '../assets/products/moulding-decorative/Moulding.jpg'
import imgVoxSoftPanel from '../assets/products/soft-panels/Exterior vox panel.jpeg'
import imgCarpet from '../assets/products/carpet/Carpet.jpg'
import imgCncWork from '../assets/products/cnc-work/C.n.c work.jpeg'
import imgRattan from '../assets/products/rattan-cane/Rattan cane.jpg'
import imgMattress from '../assets/products/mattress/Mattress.jpeg'
import imgCushion from '../assets/products/mattress/cushion.jpg'
import imgSofa from '../assets/products/sofa/upholstery.jpg'

export const categories = [
  'Wall Panels',
  'Decorative Sheets',
  'Ceiling',
  'Flooring',
  'Roofing',
  'Doors',
  'Blinds & Curtains',
  'Customized Wallpaper',
  'Artificial Grass',
  'Exterior / Outdoor',
  'Moulding & Decorative',
  'Sofit Panels',
  'Carpet',
  'CNC Work',
  'Rattan Cane',
  'Mattress',
  'Sofa',
]

export const products = [
  {
    id: '3d-panels',
    name: '3D Wall Panel',
    category: 'Wall Panels',
    image: img3DPanel,
    gallery: [img3DPanel],
    short: 'Sculptural 3D panels that add depth, texture and character to any wall.',
    description:
      'Modern 3D panels bring dimension and drama to plain walls. Lightweight, easy to install and available in a range of sculpted patterns, they suit feature walls, ceilings and commercial interiors alike.',
    features: ['Lightweight & durable', 'Wide range of sculpted patterns', 'Easy to cut & install', 'Great for feature walls'],
    material: 'High-density moulded panels finished for interior wall and ceiling application.',
    applications: ['Feature walls', 'Living & dining areas', 'Office & showroom walls', 'Ceiling accents'],
    finishes: ['White', 'Textured', 'Wood Finish', 'Custom Colour'],
    related: ['pu-stones', 'pvc-wall-panels', 'hdhmr-3d-panels'],
  },
  {
    id: 'hdhmr-3d-panels',
    name: 'HDHMR 3D Wall Panel',
    category: 'Wall Panels',
    image: imgHdhmr,
    gallery: [imgHdhmr],
    short: 'Durable HDHMR-based 3D panels for crisp, moisture-resistant feature walls.',
    description:
      'HDHMR 3D wall panels combine the sculptural look of 3D panelling with the moisture resistance of HDHMR board. A dependable choice for feature walls that need to stay crisp in Indian climate.',
    features: ['Moisture-resistant HDHMR base', 'Sculpted 3D relief', 'Crisp, clean edges', 'Paint-ready finish'],
    material: 'HDHMR board finished with sculpted 3D relief in a paint-ready surface.',
    applications: ['TV feature walls', 'Reception backdrops', 'Bedroom & living walls', 'Office cabins'],
    finishes: ['White', 'Primed for Paint', 'Wood Finish', 'Custom Colour'],
    related: ['3d-panels', 'pvc-wall-panels', 'pu-stones'],
  },
  {
    id: 'pvc-wall-panels',
    name: 'PVC Wall Panel',
    category: 'Wall Panels',
    image: imgPvcWallPanelJpeg,
    gallery: [imgPvcWallPanelJpeg],
    short: 'Waterproof, easy-to-install PVC wall panels in wood and solid finishes.',
    description:
      'PVC wall panels give walls a clean, premium finish that is fully waterproof and simple to maintain. Available in wood-grain, marble and solid colour options for homes, offices and bathrooms.',
    features: ['100% waterproof', 'Easy, adhesive installation', 'Wood-grain & solid finishes', 'Low maintenance'],
    material: 'High-quality PVC wall panels in wood-grain, marble and solid finishes.',
    applications: ['Bathrooms & kitchens', 'Living room feature walls', 'Balconies & terraces', 'Shops & clinics'],
    finishes: ['Wood Grain', 'Marble', 'Solid Colour', 'Matte'],
    related: ['pu-stones', 'hdhmr-3d-panels', 'parametric-panel'],
  },
  {
    id: 'pu-stones',
    name: 'PU Stone Wall Panel',
    category: 'Wall Panels',
    image: imgPuStoneJpeg,
    gallery: [imgPuStoneJpeg],
    short: 'Lightweight stone-textured panels that bring the natural stone look without the weight.',
    description:
      'PU stone panels replicate the texture and look of natural stone at a fraction of the weight and cost. Easy to install on walls and elevation, they suit both interiors and exteriors.',
    features: ['Realistic stone texture', 'Lightweight, easy to handle', 'Simple adhesive installation', 'Suitable indoor & outdoor'],
    material: 'PU stone panels with a natural stone-textured surface, sealed for durability.',
    applications: ['Feature walls', 'Fireplace surrounds', 'Elevation & exterior cladding', 'Retail & café walls'],
    finishes: ['Brick', 'Stone', 'Slate', 'Sandstone'],
    related: ['pvc-wall-panels', '3d-panels', 'parametric-panel'],
  },
  {
    id: 'parametric-panel',
    name: 'Parametric Wall Panel',
    category: 'Wall Panels',
    image: imgParametric,
    gallery: [imgParametric],
    short: 'Geometric parametric panels with a striking, contemporary architectural look.',
    description:
      'Parametric panels offer a precise, geometric grid that reads as modern architecture on the wall. Ideal for lobbies, reception areas and statement walls where the design needs to lead.',
    features: ['Geometric parametric design', 'Precision-cut, uniform modules', 'Quick modular installation', 'Modern architectural appeal'],
    material: 'Moulded and CNC-cut panels in a decorative finish, ready for wall mounting.',
    applications: ['Hotel & office lobbies', 'Reception backdrops', 'Retail brand walls', 'Residential feature walls'],
    finishes: ['White', 'Grey', 'Wood Finish', 'Custom'],
    related: ['3d-panels', 'pvc-wall-panels', 'pu-stones'],
  },
  {
    id: 'victara-panel',
    name: 'Victara Panel',
    category: 'Wall Panels',
    image: imgVictaraPanel,
    gallery: [imgVictaraPanel],
    short: 'Victara panels for premium, ready-to-install designer walls.',
    description:
      'Victara panels bring a rich, ready-to-finish look to feature walls with quick installation and a clean, seamless surface. A dependable choice for homes, offices and showrooms.',
    features: ['Ready-to-install panels', 'Seamless premium finish', 'Lightweight & durable', 'Low maintenance'],
    material: 'Decorative wall panels in durable, paint-ready finishes.',
    applications: ['TV feature walls', 'Reception backdrops', 'Bedroom & living walls', 'Showroom displays'],
    finishes: ['Wood Finish', 'Fluted', 'Textured', 'Custom Colour'],
    related: ['3d-panels', 'pvc-wall-panels', 'hdhmr-3d-panels'],
  },
  {
    id: 'wpc-panels',
    name: 'WPC Panel',
    category: 'Wall Panels',
    image: imgWpcPanels,
    gallery: [imgWpcPanels],
    short: 'Waterproof, termite-proof WPC panels for walls, doors and outdoor use.',
    description:
      'WPC (Wood Plastic Composite) panels combine the look of wood with waterproof, termite-proof durability. Perfect for panelling, wardrobes and outdoor cladding.',
    features: ['100% waterproof', 'Termite & insect resistant', 'Wood-like finish', 'Indoor & outdoor use'],
    material: 'Wood plastic composite panels in wood-grain and solid finishes.',
    applications: ['Wall panelling', 'Doors & frames', 'Wardrobes & kitchens', 'Outdoor cladding'],
    finishes: ['Wood Grain', 'Solid Colour', 'Textured', 'Matt'],
    related: ['pvc-wall-panels', 'hdhmr-3d-panels', 'wooden-flooring'],
  },
  {
    id: 'exterior-wall-panel',
    name: 'Exterior Wall Panel',
    category: 'Wall Panels',
    image: imgExteriorWallPanel,
    gallery: [imgExteriorWallPanel],
    short: 'Weatherproof exterior wall panels for premium outdoor façades.',
    description:
      'Exterior-grade wall panels built to withstand sun and rain while giving façades, balconies and outdoor walls a refined, finished look. Fade-resistant with a premium wood-like surface.',
    features: ['UV & weather resistant', 'Fade-proof colours', 'Wood-like premium finish', 'Easy screw-fix installation'],
    material: 'Exterior-grade polymer wall panels with UV-stabilised surface layers.',
    applications: ['Outdoor façades', 'Balconies & terraces', 'Outdoor ceilings', 'Garden walls'],
    finishes: ['Wood Grain', 'Grey', 'Charcoal', 'Solid Colour'],
    related: ['pu-stones', 'pvc-wall-panels', 'parametric-panel'],
  },
  {
    id: 'acrylic-sheets',
    name: 'Acrylic Sheet',
    category: 'Decorative Sheets',
    image: imgAcrylicSheet,
    gallery: [imgAcrylicSheet],
    short: 'Glossy acrylic sheets that give cabinets and panels a premium, reflective finish.',
    description:
      'Acrylic sheets deliver a deep, glossy, mirror-like finish for wardrobe shutters, kitchen cabinets and panel accents. Scratch-resistant and easy to keep clean.',
    features: ['High-gloss premium finish', 'Scratch resistant', 'Rich colour depth', 'Easy to clean'],
    material: 'High-gloss acrylic sheets laminated onto board for shutters and panels.',
    applications: ['Wardrobe shutters', 'Kitchen cabinets', 'TV & feature panels', 'Showroom displays'],
    finishes: ['Glossy Solid', 'Pearl', 'High Gloss Wood', 'Frosted'],
    related: ['acrylic-sheets', 'laminates'],
  },
  {
    id: 'laminates',
    name: 'Laminate Sheet',
    category: 'Decorative Sheets',
    image: imgLaminates,
    gallery: [imgLaminates],
    short: 'Decorative laminate sheets in a huge range of colours, textures and finishes.',
    description:
      'Decorative laminates for furniture, wardrobes, doors and surfaces. Available in glossy, matte, textured and wood-grain finishes to suit every interior style.',
    features: ['Huge colour range', 'Gloss, matte & textured', 'Scratch resistant', 'Easy to clean'],
    material: 'High-pressure and decorative laminate sheets in various finishes.',
    applications: ['Furniture & wardrobes', 'Kitchen shutters', 'Door surfaces', 'Panelling'],
    finishes: ['Gloss', 'Matte', 'Wood Grain', 'Textured'],
    related: ['acrylic-sheets', 'charcoal-sheets'],
  },
  {
    id: 'ripple-sheet',
    name: 'Ripple Sheet',
    category: 'Decorative Sheets',
    image: imgRippleSheet,
    gallery: [imgRippleSheet],
    short: 'Wave-patterned ripple sheets that add movement and light-play to surfaces.',
    description:
      'Ripple sheets add a luminous, dimensional accent to ceilings, partitions and panel details. The wave pattern plays beautifully with both natural and artificial light.',
    features: ['Decorative wave patterns', 'Translucent options', 'Cut to size for your project', 'Great for light panels'],
    material: 'Decorative translucent PVC / acrylic sheets in ripple finishes.',
    applications: ['Ceiling highlights', 'Lighting panels', 'Partitions & screens', 'Feature panel details'],
    finishes: ['Transparent', 'White Glow', 'Amber', 'Frosted'],
    related: ['acrylic-sheets', 'charcoal-sheets'],
  },
  {
    id: 'metal-highlighter-sheet',
    name: 'Metal Highlighter Sheet',
    category: 'Decorative Sheets',
    image: imgHighlighterSheet,
    gallery: [imgHighlighterSheet],
    short: 'Metallic highlighter sheets that add shine and depth to accent surfaces.',
    description:
      'Metal highlighter sheets add layered texture and metallic shine to accent walls, pillars and panel inserts. They catch light beautifully, making every surface look crafted and premium.',
    features: ['Rich metallic texture', 'Perfect for accent walls', 'Cut to size available', 'Durable & washable'],
    material: 'Metallic-finish decorative highlighter sheets for wall cladding and accents.',
    applications: ['Accent walls', 'Pillar cladding', 'Lobby & reception walls', 'Panel inserts'],
    finishes: ['Metallic', 'Charcoal Black', 'Grey Wash', 'Textured'],
    related: ['acrylic-sheets', 'charcoal-sheets'],
  },
  {
    id: 'charcoal-sheets',
    name: 'Charcoal Sheet',
    category: 'Decorative Sheets',
    image: imgCharcoalSheet,
    gallery: [imgCharcoalSheet],
    short: 'Bold charcoal sheets that bring rich texture and depth to accent surfaces.',
    description:
      'Charcoal decorative sheets give walls, furniture and panel accents a deep, textured, contemporary finish. Durable, easy to maintain and perfect for statement interiors.',
    features: ['Rich charcoal texture', 'Contemporary look', 'Scratch & stain resistant', 'Easy to clean'],
    material: 'Decorative charcoal-finish sheets laminated for wall and furniture application.',
    applications: ['Accent walls', 'Furniture surfaces', 'TV unit panelling', 'Showroom displays'],
    finishes: ['Matte Charcoal', 'Textured', 'Wood Grain', 'Metallic'],
    related: ['acrylic-sheets', 'metal-highlighter-sheet'],
  },
  {
    id: 'acp-sheets',
    name: 'ACP Sheet',
    category: 'Decorative Sheets',
    image: imgAcpSheet,
    gallery: [imgAcpSheet],
    short: 'Lightweight aluminium composite panels for modern facades and interiors.',
    description:
      'ACP sheets combine a polyethylene core with aluminium facings for a rigid, lightweight and weather-resistant surface. Ideal for exterior cladding, signage and interior wall panelling.',
    features: ['Lightweight & rigid', 'Weather resistant', 'Fire-retardant options', 'Easy to fabricate'],
    material: 'Aluminium composite panels with PE or FR core in various finishes.',
    applications: ['Exterior cladding', 'Signage & branding', 'Interior wall panelling', 'Ceiling accents'],
    finishes: ['Glossy', 'Matte', 'Wood Grain', 'Mirror'],
    related: ['acrylic-sheets', 'charcoal-sheets'],
  },
  {
    id: 'cork-sheets',
    name: 'Cork Sheet',
    category: 'Decorative Sheets',
    image: imgCorkSheet,
    gallery: [imgCorkSheet],
    short: 'Natural cork sheets that add warmth, texture and acoustic comfort.',
    description:
      'Cork sheets bring a natural, warm texture to walls, ceilings and pin boards. Excellent acoustic insulation and a soft, tactile surface.',
    features: ['Natural & sustainable', 'Acoustic insulation', 'Soft tactile surface', 'Easy to install'],
    material: 'Natural cork sheets in various thicknesses and finishes.',
    applications: ['Pin boards', 'Wall accents', 'Ceiling panels', 'Study walls'],
    finishes: ['Natural', 'Pressed', 'Painted', 'Custom'],
    related: ['charcoal-sheets', 'acrylic-sheets'],
  },
  {
    id: 'uv-marble-sheets',
    name: 'UV Marble Sheet',
    category: 'Decorative Sheets',
    image: imgUvMarbleSheet,
    gallery: [imgUvMarbleSheet],
    short: 'High-gloss UV marble sheets with a realistic stone look and scratch resistance.',
    description:
      'UV marble sheets deliver a stunning, high-gloss marble finish with UV-coated surface for scratch and fade resistance.',
    features: ['High-gloss marble look', 'UV-coated scratch resistance', 'Waterproof surface', 'Easy to maintain'],
    material: 'UV-coated decorative sheets with realistic marble patterns.',
    applications: ['Feature walls', 'Kitchen cabinets', 'Wardrobe shutters', 'Bathroom walls'],
    finishes: ['White Marble', 'Black Marble', 'Gold Vein', 'Grey Statuario'],
    related: ['acrylic-sheets', 'charcoal-sheets'],
  },
  {
    id: 'veneer-sheets',
    name: 'Veneer Sheet',
    category: 'Decorative Sheets',
    image: imgVeneerSheet,
    gallery: [imgVeneerSheet],
    short: 'Natural wood veneer sheets for a rich, authentic wood finish.',
    description:
      'Wood veneer sheets bring the beauty of real wood to furniture, wardrobes and panelling at a fraction of the cost of solid wood.',
    features: ['Real wood grain', 'Cost-effective luxury', 'Wide species range', 'Easy to apply'],
    material: 'Natural wood veneer sheets in various species and thicknesses.',
    applications: ['Furniture & wardrobes', 'Wall panelling', 'Doors & cabinets', 'Ceiling accents'],
    finishes: ['Teak', 'Walnut', 'Oak', 'Maple'],
    related: ['acrylic-sheets', 'charcoal-sheets'],
  },
  {
    id: 'fabric-sheets',
    name: 'Fabric Sheet',
    category: 'Decorative Sheets',
    image: imgFabricSheet,
    gallery: [imgFabricSheet],
    short: 'Textured fabric-finish sheets that add a soft, premium feel to surfaces.',
    description:
      'Fabric-finish decorative sheets bring a rich, tactile texture to walls, cabinets and furniture. Available in a range of woven and embossed patterns for a warm, elegant interior.',
    features: ['Soft tactile texture', 'Woven & embossed patterns', 'Scratch resistant', 'Easy to clean'],
    material: 'Fabric-laminated decorative sheets in various textures.',
    applications: ['Wardrobe shutters', 'Feature walls', 'Furniture surfaces', 'TV units'],
    finishes: ['Linen', 'Denim', 'Velvet Touch', 'Woven'],
    related: ['acrylic-sheets', 'veneer-sheets'],
  },
  {
    id: 'alabaster-sheet',
    name: 'Alabaster Sheet',
    category: 'Decorative Sheets',
    image: imgAlabasterCeiling,
    gallery: [imgAlabasterCeiling],
    short: 'Elegant alabaster sheets with a soft, glowing premium finish.',
    description:
      'Alabaster sheets bring the milky glow of natural stone to walls, ceilings and light features. Available in translucent panels that light up beautifully from behind.',
    features: ['Soft, natural glow', 'Ceiling & wall panels', 'Works with backlighting', 'Modern premium finish'],
    material: 'Translucent alabaster-look panels finished for ceilings, walls and light features.',
    applications: ['Ceiling panels', 'Feature walls', 'Backlit panels', 'Reception areas'],
    finishes: ['Ivory', 'Honey', 'White Glow', 'Amber'],
    related: ['acrylic-sheets', 'ripple-sheet'],
  },
  {
    id: 'baffle-ceiling',
    name: 'Baffle Ceiling',
    category: 'Ceiling',
    image: imgBaffle,
    gallery: [imgBaffle],
    short: 'Linear baffle ceilings that look striking and tame noise at the same time.',
    description:
      'Baffle ceilings use vertical or horizontal linear panels to create a modern, open look while absorbing echo. A favourite for retail, offices and commercial spaces that need both style and sound control.',
    features: ['Modern linear design', 'Open grid, airy feel', 'Good sound absorption', 'Fast, clean installation'],
    material: 'Powder-coated aluminium / metal baffle systems in a range of finishes.',
    applications: ['Retail stores', 'Office reception', 'Cafés & restaurants', 'Shopping malls'],
    finishes: ['White', 'Black', 'Wood Finish', 'Custom Colour'],
    related: ['stretch-fiber-ceiling', 'vox-sofit-ceiling'],
  },
  {
    id: 'stretch-fiber-ceiling',
    name: 'Stretch Fiber Ceiling',
    category: 'Ceiling',
    image: imgStretchFiber,
    gallery: [imgStretchFiber],
    short: 'Sleek, seamless stretch fiber ceilings for a flawless, modern surface.',
    description:
      'Stretch fiber ceilings create a smooth, seamless surface that hides wires, ducts and unevenness above. Available in a range of colours and backlit effects, they deliver a clean, high-end ceiling finish.',
    features: ['Flawless seamless finish', 'Hides services above', 'Wide colour range', 'Backlit effects available'],
    material: 'Stretch fiber membrane mounted on a lightweight aluminium track system.',
    applications: ['Showrooms', 'Hotel lobbies', 'Corporate offices', 'Retail & cafés'],
    finishes: ['Matte White', 'Satin', 'Backlit', 'Custom Colour'],
    related: ['baffle-ceiling', 'vox-sofit-ceiling'],
  },
  {
    id: 'vox-sofit-ceiling',
    name: 'Vox Sofit Ceiling',
    category: 'Ceiling',
    image: imgVoxSofit,
    gallery: [imgVoxSofit],
    short: 'Sleek vox sofit systems that make ceilings look custom and refined.',
    description:
      'Vox sofit ceilings use slim profiles to create a refined, layered ceiling look. Perfect for retail, offices and modern homes where the ceiling should feel considered.',
    features: ['Slim, modern profiles', 'Layered design', 'Conceals services above', 'Fast installation'],
    material: 'Vox sofit ceiling system in powder-coated and wood-grain finishes.',
    applications: ['Retail stores', 'Office reception', 'Modern homes', 'Cafés & restaurants'],
    finishes: ['White', 'Black', 'Wood Grain', 'Grey'],
    related: ['stretch-fiber-ceiling', 'baffle-ceiling'],
  },
  {
    id: 'wooden-flooring',
    name: 'Wooden Flooring',
    category: 'Flooring',
    image: imgWoodenFlooring,
    gallery: [imgWoodenFlooring],
    short: 'Warm, durable wooden flooring in laminates, engineered and deck options.',
    description:
      'Premium wooden flooring that brings warmth and value to homes, offices and showrooms. Choose from laminate, engineered wood and deck options with a wide range of shades and grain patterns.',
    features: ['Warm, natural look', 'Scratch & stain resistant', 'Easy maintenance', 'Wide shade range'],
    material: 'Laminated and engineered wooden flooring with durable, wear-resistant top layers.',
    applications: ['Bedrooms & living rooms', 'Offices & cabins', 'Showrooms', 'Retail spaces'],
    finishes: ['Natural Oak', 'Walnut', 'Smoked', 'Grey Wood'],
    related: ['spc-flooring', 'rugs'],
  },
  {
    id: 'spc-flooring',
    name: 'SPC Flooring',
    category: 'Flooring',
    image: imgSpcFlooring,
    gallery: [imgSpcFlooring],
    short: 'Stone-plastic composite flooring that is tough, waterproof and realistic.',
    description:
      'SPC flooring brings a realistic wood or stone look with a completely waterproof, dimensionally stable core. Perfect for high-traffic homes and commercial spaces.',
    features: ['100% waterproof', 'Scratch resistant', 'Realistic wood & stone looks', 'Quiet underfoot'],
    material: 'Stone-plastic composite planks with rigid, waterproof cores and wear layers.',
    applications: ['Living & bedrooms', 'Kitchens & bathrooms', 'Offices & retail', 'Balconies'],
    finishes: ['Oak', 'Walnut', 'Marble', 'Textured Wood'],
    related: ['wooden-flooring', 'rugs'],
  },
  {
    id: 'vinyl-flooring',
    name: 'Vinyl Flooring',
    category: 'Flooring',
    image: imgVinylFlooring,
    gallery: [imgVinylFlooring],
    short: 'Waterproof vinyl flooring with realistic wood and stone looks.',
    description:
      'Vinyl flooring delivers the warm look of wood and stone with a fully waterproof, comfortable underfoot feel. Click-lock planks install quickly over most surfaces and handle daily wear with ease.',
    features: ['100% waterproof', 'Realistic wood & stone designs', 'Comfortable, quiet underfoot', 'Quick click-lock installation'],
    material: 'Luxury vinyl planks and tiles with wear layers and rigid cores.',
    applications: ['Living & bedrooms', 'Kitchens', 'Offices & retail', 'Clinics'],
    finishes: ['Oak', 'Walnut', 'Grey Wood', 'Stone Look'],
    related: ['spc-flooring', 'wooden-flooring'],
  },
  {
    id: 'gym-flooring',
    name: 'Gym Rubber Flooring',
    category: 'Flooring',
    image: imgGymFlooring,
    gallery: [imgGymFlooring],
    short: 'Impact-absorbing rubber flooring built for gyms and sports floors.',
    description:
      'Durable, shock-absorbing rubber flooring for gyms, sports halls, play areas and multipurpose rooms. Protects joints and equipment while resisting heavy foot traffic and impact.',
    features: ['High shock absorption', 'Slip-resistant surface', 'Easy to clean', 'Long service life'],
    material: 'Rubber flooring systems in tile and roll formats.',
    applications: ['Gyms & fitness centres', 'Sports floors', 'Play areas', 'Multipurpose halls'],
    finishes: ['Black', 'Multi-Colour', 'Rolls', 'Rubber Tiles'],
    related: ['wooden-flooring', 'spc-flooring'],
  },
  {
    id: 'rugs',
    name: 'Rugs',
    category: 'Flooring',
    image: imgRugs,
    gallery: [imgRugs],
    short: 'Stylish, durable rugs to elevate any room with warmth and texture.',
    description:
      'A wide range of rugs for living rooms, bedrooms and offices — available in multiple sizes, textures and patterns to complement every interior.',
    features: ['Soft & comfortable', 'Wide range of designs', 'Durable construction', 'Easy to maintain'],
    material: 'Wool, cotton and synthetic fibre rugs in various pile styles.',
    applications: ['Living rooms & bedrooms', 'Office spaces', 'Hotel lobbies', 'Hallways & entryways'],
    finishes: ['Hand-tufted', 'Flatweave', 'Shaggy', 'Printed'],
    related: ['wooden-flooring', 'spc-flooring'],
  },
  {
    id: 'mosaic-tiles',
    name: 'Mosaic Tiles',
    category: 'Moulding & Decorative',
    image: imgMosaicTiles,
    gallery: [imgMosaicTiles],
    short: 'Decorative mosaic tiles for statement walls and accents.',
    description:
      'Mosaic tiles bring colour, pattern and texture to kitchen backsplashes, bathroom walls and accent strips. Glass, ceramic and stone options for endless design combinations.',
    features: ['Glass, ceramic & stone options', 'Endless design patterns', 'For walls & accents', 'Easy wipe-clean surface'],
    material: 'Mesh-backed mosaic tiles in glass, ceramic and natural stone.',
    applications: ['Kitchen backsplashes', 'Bathroom walls', 'Accent strips & borders', 'Feature walls'],
    finishes: ['Glossy Glass', 'Matte Ceramic', 'Natural Stone', 'Metallic'],
    related: ['mouldings', 'cnc-work'],
  },
  {
    id: 'roofing-thatch',
    name: 'Roofing Thatch',
    category: 'Roofing',
    image: imgRoofingThatch,
    gallery: [imgRoofingThatch],
    short: 'Synthetic thatch roofing for resorts, gazebos and tropical-style spaces.',
    description:
      'Synthetic roofing thatch recreates the charm of natural straw with none of the upkeep. Weather-proof, fire-retardant and long-lasting — perfect for gazebos, resort roofs, huts and patio covers.',
    features: ['Natural thatch look', 'Weather & UV proof', 'Fire-retardant options', 'Zero maintenance'],
    material: 'Synthetic thatch tiles and rolls over treated structural frames.',
    applications: ['Gazebos & pergolas', 'Resort & farmhouse roofs', 'Poolside huts', 'Café & theme décor'],
    finishes: ['Natural Straw', 'Golden', 'Dark Thatch', 'Mixed Reed'],
    related: ['exterior-wall-panel', 'outdoor-deck-tile'],
  },
  {
    id: 'customized-doors',
    name: 'Designer Door',
    category: 'Doors',
    image: imgDoors,
    gallery: [imgDoors],
    short: 'Designer doors made to order in wood, laminate and modern finishes.',
    description:
      'Designer doors manufactured to your style, size and finish. From flush doors to panel and designer patterns, each door is built for a clean, premium fit.',
    features: ['Made to your size & design', 'Wide range of finishes', 'Sturdy, durable construction', 'Modern designer styles'],
    material: 'Solid and flush doors in plywood, veneer, laminate and PU finishes.',
    applications: ['Interior doors', 'Main & entrance doors', 'Wardrobe doors', 'Office & hotel doors'],
    finishes: ['Veneer', 'Laminate', 'PU Painted', 'Designer'],
    related: ['wooden-flooring', 'wooden-blinds'],
  },
  {
    id: 'glass-films',
    name: 'Glass Film',
    category: 'Doors',
    image: imgGlassFilm,
    gallery: [imgGlassFilm],
    short: 'Decorative and sun-control films that upgrade any glass surface.',
    description:
      'Glass films add privacy, sun control and a decorative finish to windows, partitions and doors — a quick, clean upgrade over bare glass.',
    features: ['Sun & UV control', 'Privacy without darkness', 'Decorative patterns', 'Easy application'],
    material: 'Self-adhesive decorative and sun-control films for glass surfaces.',
    applications: ['Office partitions', 'Shopfronts & windows', 'Bathroom windows', 'Decorative glass doors'],
    finishes: ['Frosted', 'Privacy', 'Printed', 'Gradient'],
    related: ['wallpapers', 'acrylic-sheets'],
  },
  {
    id: 'blinds',
    name: 'Blinds',
    category: 'Blinds & Curtains',
    image: imgBlinds,
    gallery: [imgBlinds],
    short: 'Roller, zebra and vertical blinds for clean, modern window control.',
    description:
      'Window blinds in roller, zebra, vertical and roman styles — precise light control with a clean, minimal look for homes and offices. Made to measure with smooth operating systems.',
    features: ['Roller, zebra & vertical styles', 'Made to measure', 'Smooth chain & motorised options', 'Blackout & sunscreen fabrics'],
    material: 'Polyester and sunscreen blind fabrics with aluminium bottom bars and quality mechanisms.',
    applications: ['Windows & French doors', 'Office cabins & conference rooms', 'Clinics & showrooms', 'Balcony doors'],
    finishes: ['Blackout', 'Sunscreen', 'Printed', 'Textured'],
    related: ['wooden-blinds', 'curtains'],
  },
  {
    id: 'wooden-blinds',
    name: 'Wooden Blinds',
    category: 'Blinds & Curtains',
    image: imgWoodenBlinds,
    gallery: [imgWoodenBlinds],
    short: 'Warm wooden blinds that bring natural texture and precise light control.',
    description:
      'Wooden blinds add warmth and a natural grain to windows while giving you precise control over light and privacy. Available in a range of wood tones and finishes.',
    features: ['Natural wood warmth', 'Precise light control', 'Durable slats', 'Easy to operate'],
    material: 'Natural and engineered wood slats in a range of tones.',
    applications: ['Living room windows', 'Bedrooms', 'Office windows', 'Café interiors'],
    finishes: ['Natural Wood', 'Walnut', 'White', 'Dark Oak'],
    related: ['blinds', 'curtains'],
  },
  {
    id: 'curtains',
    name: 'Curtain',
    category: 'Blinds & Curtains',
    image: imgCurtains,
    gallery: [imgCurtains],
    short: 'Elegant curtains and drapes in every fabric, colour and style.',
    description:
      'Curtains and drapes in a wide range of fabrics and styles — sheer, blackout, printed and plain — made to measure for windows of every size.',
    features: ['Made to measure', 'Sheer, blackout & printed', 'Wide fabric range', 'Clean, tailored finish'],
    material: 'Polyester, cotton and blended curtain fabrics with lining options.',
    applications: ['Living & bedroom windows', 'Hotel rooms', 'Office partitions', 'Theatre & event halls'],
    finishes: ['Sheer', 'Blackout', 'Printed', 'Plain'],
    related: ['blinds', 'wooden-blinds'],
  },
  {
    id: 'wallpapers',
    name: 'Customized Wallpaper',
    category: 'Customized Wallpaper',
    image: imgWallpapers,
    gallery: [imgWallpapers],
    short: 'Elegant wallpapers in every texture, pattern and finish to transform any room.',
    description:
      'A wide selection of wallpapers for residential, commercial and office spaces — from subtle textures to bold designer patterns, with printed and vinyl options that are easy to install and simple to maintain.',
    features: ['Huge range of patterns & textures', 'Durable, washable finishes', 'Easy, clean installation', 'For homes, offices & retail'],
    material: 'Premium vinyl, non-woven and paper-backed wallpapers in a range of textures and finishes.',
    applications: ['Living rooms & bedrooms', 'Hotel rooms & suites', 'Office cabins & reception', 'Retail & café walls'],
    finishes: ['Textured', 'Printed', 'Plain', 'Vinyl'],
    related: ['3d-panels', 'acrylic-sheets'],
  },
  {
    id: 'artificial-grass',
    name: 'Artificial Grass',
    category: 'Artificial Grass',
    image: imgArtificialGrass,
    gallery: [imgArtificialGrass],
    short: 'Low-maintenance artificial grass that stays green all year round.',
    description:
      'Artificial grass gives lawns, terraces and balconies a lush green look without watering or mowing. Soft underfoot and built to last in sun and rain.',
    features: ['Always-green look', 'Zero watering or mowing', 'Soft, realistic feel', 'Indoor & outdoor use'],
    material: 'UV-stabilised synthetic grass in natural green shades.',
    applications: ['Lawns & gardens', 'Terraces & balconies', 'Play areas', 'Event & stage floors'],
    finishes: ['Realistic Green', 'Multi-tone Green', 'Indoor', 'Sports'],
    related: ['rugs', 'outdoor-deck-tile'],
  },
  {
    id: 'hdpc-lowers',
    name: 'HDPC Lowers',
    category: 'Exterior / Outdoor',
    image: imgExteriorLouvers,
    gallery: [imgExteriorLouvers],
    short: 'High-density HDPC louvers for durable, elegant outdoor shading.',
    description:
      'HDPC (high-density polymer composite) louvers combine the richness of wood with all-weather toughness. Ideal for façade shading, balcony screens and outdoor ceilings that need to last.',
    features: ['High-density composite core', 'Water & termite proof', 'UV-stable colours', 'Low maintenance'],
    material: 'High-density polymer composite louver profiles in wood-grain and solid finishes.',
    applications: ['Façade shading', 'Balcony screens', 'Outdoor ceilings', 'Terrace pergolas'],
    finishes: ['Teak', 'Walnut', 'Grey Wood', 'Charcoal'],
    related: ['exterior-wall-panel', 'outdoor-deck-tile', 'pu-stones'],
  },
  {
    id: 'fabric-lowers',
    name: 'Fabric Lowers',
    category: 'Exterior / Outdoor',
    image: imgFabricLouvers,
    gallery: [imgFabricLouvers],
    short: 'Elegant fabric louver panels for privacy screens and decorative shading.',
    description:
      'Fabric louver panels combine soft fabric textures with a structured louver frame for decorative shading, privacy screens and wall accents. A stylish alternative to traditional louvers.',
    features: ['Soft fabric finish', 'Privacy & shading', 'Lightweight panels', 'Easy to install'],
    material: 'Fabric-wrapped louver panels on aluminium or WPC frames.',
    applications: ['Privacy screens', 'Balcony dividers', 'Wall accents', 'Window shading'],
    finishes: ['Linen', 'Canvas', 'Textured', 'Custom'],
    related: ['hdpc-lowers', 'outdoor-deck-tile'],
  },
  {
    id: 'vertical-garden',
    name: 'Vertical Garden',
    category: 'Exterior / Outdoor',
    image: imgVerticalGarden,
    gallery: [imgVerticalGarden],
    short: 'Living green walls with artificial and natural planting systems.',
    description:
      'Vertical gardens bring greenery to walls and façades with artificial or natural planting systems. Low-maintenance, modular panels that transform bare walls into living features.',
    features: ['Natural & artificial options', 'Modular panel system', 'Low maintenance', 'Great for elevation'],
    material: 'Modular green-wall panels with natural plants or high-grade artificial foliage.',
    applications: ['Building elevation', 'Reception & lobby walls', 'Balconies & terraces', 'Café & retail walls'],
    finishes: ['Artificial Green', 'Natural Plants', 'Mixed Foliage', 'Flower Wall'],
    related: ['outdoor-deck-tile', 'vertical-garden'],
  },
  {
    id: 'outdoor-deck-tile',
    name: 'Outdoor Deck Tile',
    category: 'Exterior / Outdoor',
    image: imgOutdoorDeckTile,
    gallery: [imgOutdoorDeckTile],
    short: 'Interlocking outdoor deck tiles for instant, stylish terrace flooring.',
    description:
      'Outdoor deck tiles snap together over any flat surface to create warm, wood-look decking in minutes. Perfect for balconies, terraces, poolside surrounds and garden paths.',
    features: ['Click-lock interlocking design', 'Installs in minutes, no glue', 'Weather-resistant material', 'Replace individual tiles easily'],
    material: 'WPC and solid-wood deck tiles on interlocking plastic bases.',
    applications: ['Balcony floors', 'Terrace decks', 'Poolside surrounds', 'Garden paths'],
    finishes: ['Teak', 'Walnut', 'Grey Wood', 'Natural'],
    related: ['hdpc-lowers', 'vertical-garden'],
  },
  {
    id: 'mouldings',
    name: 'Moulding',
    category: 'Moulding & Decorative',
    image: imgMouldings,
    gallery: [imgMouldings],
    short: 'Decorative mouldings for elegant cornices, borders and wall detailing.',
    description:
      'French and decorative mouldings add a classic, finished edge to walls, ceilings and panelling. Lightweight and paintable, they give interiors a refined architectural detail.',
    features: ['Elegant decorative profiles', 'Lightweight & paintable', 'Easy to cut & install', 'Ceiling & wall detailing'],
    material: 'Extruded and moulded decorative profiles in a durable, paint-ready finish.',
    applications: ['Ceiling cornices', 'Wall borders & panelling', 'Door & window frames', 'Mirror & photo frames'],
    finishes: ['White', 'Primed for Paint', 'Gold', 'Wood Finish'],
    related: ['customized-doors', '3d-panels'],
  },
  {
    id: 'vox-sofit-panel',
    name: 'Exterior Clading',
    category: 'Sofit Panels',
    image: imgVoxSoftPanel,
    gallery: [imgVoxSoftPanel],
    short: 'Elegant soft-finish panels that bring a smooth, premium layer to walls.',
    description:
      'Vox soft panels add a refined, velvety-soft surface layer to feature walls and interiors. Lightweight, moisture-resistant and quick to install, they deliver a clean, seamless look for homes, offices and showrooms.',
    features: ['Smooth, soft premium finish', 'Lightweight & easy to install', 'Moisture-resistant surface', 'Low maintenance'],
    material: 'Soft-finish decorative panels in durable, ready-to-install profiles.',
    applications: ['Feature walls', 'Bedroom & living areas', 'Office receptions', 'Showroom displays'],
    finishes: ['White', 'Wood Finish', 'Textured', 'Custom Colour'],
    related: ['vox-sofit-ceiling', 'victara-panel', 'pvc-wall-panels'],
  },
  {
    id: 'carpet',
    name: 'Carpet',
    category: 'Carpet',
    image: imgCarpet,
    gallery: [imgCarpet],
    short: 'Soft carpets that add comfort, colour and acoustic warmth.',
    description:
      'A range of carpets for homes, hotels, offices and event spaces — from plush broadloom to custom sizes that soften any space and quiet every step.',
    features: ['Soft & comfortable', 'Acoustic warmth', 'Wide range of designs', 'Durable options available'],
    material: 'Wool, nylon and polypropylene carpets in various pile styles.',
    applications: ['Bedrooms & living rooms', 'Hotel rooms', 'Office floors', 'Theatre & event halls'],
    finishes: ['Broadloom', 'Loop Pile', 'Plush', 'Custom Size'],
    related: ['outdoor-deck-tile', 'wooden-flooring'],
  },
  {
    id: 'cnc-work',
    name: 'CNC Work',
    category: 'CNC Work',
    image: imgCncWork,
    gallery: [imgCncWork],
    short: 'Precision CNC-cut jali panels and patterns made to your design.',
    description:
      'Custom CNC cutting on MDF, WPC, acrylic and metal — intricate jalis, jaali partitions, wall art and ceiling patterns manufactured exactly to your design and size. Precision-cut edges with a flawless finish.',
    features: ['Made to your design & size', 'MDF, WPC, acrylic & metal', 'Intricate precision cuts', 'Paint & finish options'],
    material: 'CNC-cut jali and pattern panels in MDF, WPC, acrylic and metal sheets.',
    applications: ['Room partitions & jalis', 'Temple & pooja backdrops', 'Ceiling patterns', 'Wall art & murals'],
    finishes: ['Natural MDF', 'Painted', 'Wood Finish', 'Metallic'],
    related: ['mouldings', 'customized-doors'],
  },
  {
    id: 'rattan-cane',
    name: 'Rattan Cane',
    category: 'Rattan Cane',
    image: imgRattan,
    gallery: [imgRattan],
    short: 'Natural and synthetic rattan for furniture, décor and outdoor spaces.',
    description:
      'Rattan and cane materials for furniture, wall décor and outdoor spaces. Natural and synthetic options with a warm, handcrafted look.',
    features: ['Natural & synthetic options', 'Warm handcrafted look', 'Indoor & outdoor use', 'Durable weaves'],
    material: 'Natural rattan cane and weather-resistant synthetic rattan.',
    applications: ['Furniture', 'Wall décor', 'Outdoor seating', 'Café & resort décor'],
    finishes: ['Natural Cane', 'Brown', 'Black', 'White Wash'],
    related: ['wooden-blinds', 'wooden-flooring'],
  },
  {
    id: 'mattress',
    name: 'Mattress',
    category: 'Mattress',
    image: imgMattress,
    gallery: [imgMattress],
    short: 'Comfortable, supportive mattresses in foam, spring and orthopedic options.',
    description:
      'Mattresses designed for comfort and support in foam, spring, coir and orthopedic variants. Available in all standard sizes with soft, medium and firm comfort levels.',
    features: ['Foam, spring & orthopedic', 'All standard sizes', 'Soft, medium & firm', 'Breathable covers'],
    material: 'PU foam, spring, coir and orthopedic mattress systems with quilted covers.',
    applications: ['Bedrooms', 'Hotels & guesthouses', 'Hostels', 'Guest rooms'],
    finishes: ['Foam', 'Spring', 'Coir', 'Orthopedic'],
    related: ['cushion', 'rattan-cane'],
  },
  {
    id: 'cushion',
    name: 'Cushion',
    category: 'Mattress',
    image: imgCushion,
    gallery: [imgCushion],
    short: 'Soft, plush cushions in a range of fabrics, sizes and fillings.',
    description:
      'Comfort and decorative cushions to complete sofas, beds and lounge seating. Available in multiple sizes, fabrics and fillings with premium stitching and finishes.',
    features: ['Soft plush comfort', 'Multiple sizes & shapes', 'Premium fabric covers', 'Custom colours available'],
    material: 'Cushions with poly-fiber / foam filling and stitched fabric covers.',
    applications: ['Sofa & lounge seating', 'Bedroom décor', 'Hotel rooms', 'Office lounges'],
    finishes: ['Fabric', 'Velvet', 'Leatherette', 'Printed'],
    related: ['mattress', 'sofa'],
  },
  {
    id: 'sofa',
    name: 'Upholstery',
    category: 'Sofa',
    image: imgSofa,
    gallery: [imgSofa],
    short: 'Stylish, comfortable sofas in fabrics and leatherette finishes.',
    description:
      'Sofas designed for everyday comfort and lasting style — available in multiple seating capacities, fabrics, leatherette and colours for homes, offices and lounges.',
    features: ['Multiple sizes & layouts', 'Premium fabric & leatherette', 'Solid frame construction', 'Custom colours'],
    material: 'Hardwood frames with high-density foam and premium upholstery.',
    applications: ['Living rooms', 'Office lounges', 'Hotel lobbies', 'Waiting areas'],
    finishes: ['Fabric', 'Leatherette', 'Velvet', 'Linen'],
    related: ['mouldings', '3d-panels'],
  },
]

export const getProduct = (id) => products.find((p) => p.id === id)

export const productsByCategory = (category) =>
  category === 'All' ? products : products.filter((p) => p.category === category)

export const relatedProducts = (product) => {
  const explicit = (product.related || []).map(getProduct).filter(Boolean)
  if (explicit.length) return explicit
  const slug = PRODUCT_SHOP_SLUGS[product.id]
  return products.filter(
    (p) =>
      p.id !== product.id &&
      (slug ? PRODUCT_SHOP_SLUGS[p.id] === slug : p.category === product.category),
  )
}
