/**
 * Central content model for the site.
 *
 * PHOTOS ARE PENDING — every image slot is currently a labeled CSS placeholder.
 * When real photography arrives, drop files into `public/photos/` and set the
 * matching `src` field below to the public path (e.g. `/photos/deck-01.jpg`).
 * Components render `<img>` automatically once `src` is non-empty, so no other
 * file needs to change.
 */

/** Company identity. Name may change later — update here only. */
export const site = {
  name: 'Solowood',
  legalName: 'Solowood',
  tagline: 'Built Right. Built to Last.',
  /** Shown in the hero + status ticker until real availability data exists. */
  availabilityNote: 'Currently booking local framing & interior remodeling',
  phoneDisplay: '214-868-2131',
  phoneHref: 'tel:+12148682131',
  email: 'quotes@solowood.example',
  serviceArea: 'Surrounding towns & rural counties within a 60-mile radius',
  licenseNumber: 'LIC #SW-40812',
  /** Portrait. The assertion keeps this assignable when a photo path lands. */
  craftsmanPhoto: null as string | null,
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const navItems: readonly NavItem[] = [
  { label: 'The Craft', href: '#craft' },
  { label: 'Work', href: '#work' },
  { label: 'The Craftsman', href: '#craftsman' },
  { label: 'Service Area', href: '#service-area' },
  { label: 'Get a Quote', href: '#quote' },
];

/* -------------------------------------------------------------------------- */
/* Services                                                                    */
/* -------------------------------------------------------------------------- */

export type Service = {
  id: string;
  index: string;
  title: string;
  blurb: string;
  /** Short bullet list of what a client actually gets. */
  includes: readonly string[];
  /** Photo slot — leave null until real photography is supplied. */
  photo: string | null;
  photoLabel: string;
};

export const services: readonly Service[] = [
  {
    id: 'custom-framing',
    index: '01',
    title: 'Custom Framing',
    blurb:
      'Stick-built walls, floors, and roof structures sized for the job — not for a truck bed. Every member is selected, not substituted.',
    includes: [
      'Engineered lumber & LVL sizing',
      'Shear walls and hold-downs',
      'Stepped foundations & outbuildings',
    ],
    photo: null,
    photoLabel: 'Framing',
  },
  {
    id: 'finish-carpentry',
    index: '02',
    title: 'Finish Carpentry',
    blurb:
      'The part of the job that has to look right when it is finished. Trim, stairs, built-ins, paneling, and cabinetry installed by the same hands.',
    includes: [
      'Custom stairs & railing',
      'Trim, casing & paneling',
      'Built-ins and closet systems',
    ],
    photo: null,
    photoLabel: 'Finish work',
  },
  {
    id: 'remodeling-additions',
    index: '03',
    title: 'Remodeling & Additions',
    blurb:
      'Opening up walls, tying in new rooms, and making the addition look like it was always part of the house. Structural first, cosmetic second.',
    includes: [
      'Room additions & sunrooms',
      'Kitchen and bath remodels',
      'Tie-ins, permits & inspections',
    ],
    photo: null,
    photoLabel: 'Remodel',
  },
  {
    id: 'heavy-repairs',
    index: '04',
    title: 'Heavy Repairs',
    blurb:
      'Rot removal, beam repair, sagging joists, and the structural work other contractors walk away from. Bring me the problem nobody else will touch.',
    includes: [
      'Rot & termite damage repair',
      'Beam and joist replacement',
      'Load-bearing wall removal',
    ],
    photo: null,
    photoLabel: 'Structural repair',
  },
];

/* -------------------------------------------------------------------------- */
/* Portfolio                                                                   */
/* -------------------------------------------------------------------------- */

export type ProjectCategory = 'framing' | 'finish' | 'remodel' | 'repair';

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  location: string;
  /** One-line result the client is buying. */
  summary: string;
  scope: readonly string[];
  /** Aspect ratio of the hero tile, e.g. '4/3'. Keeps layout stable pre-photo. */
  aspect: string;
  photo: string | null;
  photoLabel: string;
  /** Populated only for projects that get a before/after comparison. */
  beforeAfter: {
    summary: string;
    before: { src: string | null; label: string };
    after: { src: string | null; label: string };
  } | null;
};

export const projectCategories: readonly { id: ProjectCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Work' },
  { id: 'framing', label: 'Framing' },
  { id: 'finish', label: 'Finish Carpentry' },
  { id: 'remodel', label: 'Remodeling' },
  { id: 'repair', label: 'Heavy Repairs' },
];

export const projects: readonly Project[] = [
  {
    id: 'ridge-house',
    title: 'Ridge House — Full Framing',
    category: 'framing',
    location: 'Rural build',
    summary: 'Whole-house stick frame on a sloped lot with a constrained driveway.',
    scope: ['2,400 sq ft', 'Engineered roof', 'Septic & utility rough-in'],
    aspect: '4/3',
    photo: null,
    photoLabel: 'Whole-house frame',
    beforeAfter: {
      summary: 'Bare slab and footings to a fully framed, roofed shell.',
      before: { src: null, label: 'Before — slab & footings' },
      after: { src: null, label: 'After — framed & roofed' },
    },
  },
  {
    id: 'oak-staircase',
    title: 'White Oak Staircase',
    category: 'finish',
    location: 'Interior — two story',
    summary: 'A closed stringer rebuilt into an open stair with a continuous handrail.',
    scope: ['White oak treads', 'Custom balusters', 'Steel handrail'],
    aspect: '3/4',
    photo: null,
    photoLabel: 'Oak staircase',
    beforeAfter: null,
  },
  {
    id: 'kitchen-tie-in',
    title: 'Kitchen Wall Tie-In',
    category: 'remodel',
    location: 'Load-bearing removal',
    summary: 'Opened a closed kitchen to the dining room by relocating the beam.',
    scope: ['Engineered beam', 'LVL splice', 'New drywall & trim'],
    aspect: '4/3',
    photo: null,
    photoLabel: 'Kitchen opening',
    beforeAfter: {
      summary: 'Wall removed and the load path rerouted without disturbing the floor above.',
      before: { src: null, label: 'Before — closed wall' },
      after: { src: null, label: 'After — opened plan' },
    },
  },
  {
    id: 'sagging-joists',
    title: 'Sagging Joist Repair',
    category: 'repair',
    location: '1920s two story',
    summary: 'Floor had 3 inches of sag over a 22-foot span. Straightened and sistered.',
    scope: ['Sistered joists', 'New subfloor', 'Level finish floor'],
    aspect: '16/10',
    photo: null,
    photoLabel: 'Joist repair',
    beforeAfter: {
      summary: 'Restored structural support and a dead-flat floor surface.',
      before: { src: null, label: 'Before — sagging floor' },
      after: { src: null, label: 'After — leveled & floored' },
    },
  },
  {
    id: 'garage-apartment',
    title: 'Garage-to-Apartment',
    category: 'remodel',
    location: 'Detached conversion',
    summary: 'Drywall, rough-in, and insulation inside an existing two-car garage.',
    scope: ['Full rough-in', 'R-13 insulation', 'Separate meter'],
    aspect: '4/3',
    photo: null,
    photoLabel: 'Garage conversion',
    beforeAfter: null,
  },
  {
    id: 'cedar-deck',
    title: 'Cedar Deck & Pergola',
    category: 'framing',
    location: 'Slope & retaining wall',
    summary: 'Built a level deck platform over a failing grade with cedar cladding.',
    scope: ['Ledger & footings', 'Cedar decking', 'Freestanding pergola'],
    aspect: '3/2',
    photo: null,
    photoLabel: 'Cedar deck',
    beforeAfter: null,
  },
];

/* -------------------------------------------------------------------------- */
/* Craftsman + trust                                                           */
/* -------------------------------------------------------------------------- */

export type CraftStat = {
  value: string;
  label: string;
};

export const craftStats: readonly CraftStat[] = [
  { value: '30+', label: 'Years on the job' },
  { value: '1', label: 'Crew — no subcontractors' },
  { value: '0', label: 'Change-order surprises' },
];

export const trustBadges: readonly { label: string; value: string }[] = [
  { label: 'Licensed', value: 'State General Contractor' },
  { label: 'Insured', value: 'Liability & Workers’ Comp' },
  { label: 'Permitted', value: 'Pulled & closed by me' },
  { label: 'Warranty', value: 'Workmanship in writing' },
];

export const serviceAreas: readonly string[] = [
  'Anchor County',
  'Belltown',
  'Cedar Falls',
  'Dover Mills',
  'Eastbourne',
  'Fairmont',
  'Granite Hollow',
  'Harrow Bend',
  'Ironwood',
  'Junction City',
  'Kingsford',
  'Lakemont',
];

/* -------------------------------------------------------------------------- */
/* Quote request                                                               */
/* -------------------------------------------------------------------------- */

export const projectTypes: readonly string[] = [
  'Custom Framing',
  'Finish Carpentry',
  'Remodeling / Addition',
  'Heavy / Structural Repair',
  'Something else — describe below',
];

export const timelines: readonly string[] = [
  'ASAP — call me today',
  'Within 30 days',
  '1–3 months out',
  'Next season / budgeting',
  'Just planning',
];