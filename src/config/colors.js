// Configuration ultra-compacte avec array au lieu d'objet
const BELTS = [
  ['white', '#E5E7EB', 'gray'], ['yellow', '#EAB308', 'yellow'], 
  ['orange', '#F97316', 'orange'], ['green', '#22C55E', 'green'],
  ['blue', '#3B82F6', 'blue'], ['brown', '#8B4513', 'amber'],
  ['black', '#1F2937', 'gray'], ['practice', '#DC2626', 'red']
];

// Générateur de styles ultra-compact
const s = (belt, tw, isBlack = belt === 'black', isPractice = belt === 'practice') => ({
  iconColor: BELTS.find(([k]) => k === belt)?.[1] || '#E5E7EB',
  button: {
    bg: `bg-${tw}-50`, border: `border-${tw}-${isPractice ? '500' : '400'}`,
    text: `text-${tw}-800`, iconBg: belt === 'white' ? 'bg-gray-700' : 'bg-white'
  },
  section: {
    headerBorder: `border-${tw}-${isBlack ? '800' : '400'}`,
    descBg: `bg-${tw}-50`, descText: `text-${tw}-${isBlack ? '900' : '800'}`,
    descBorder: `border-l-${tw}-${isBlack ? '800' : '400'}`,
    navText: `text-${tw}-${isBlack ? '900' : '800'}`
  },
  home: {
    border: `border-l-${tw}-${isBlack ? '800' : '400'}`,
    text: `text-${tw}-${isBlack ? '800' : '700'}`
  }
});

// Exports générés automatiquement
export const BELT_ICON_COLORS = Object.fromEntries(BELTS.map(([k, c]) => [k, c]));
export const NAVBAR_BUTTON_STYLES = Object.fromEntries(BELTS.map(([k, _, tw]) => [k, s(k, tw).button]));
export const getBeltStyles = (belt) => { const [_, __, tw] = BELTS.find(([k]) => k === belt) || BELTS[0]; return s(belt, tw); };

// Compatibilité (génération automatique)
export const SECTION_HEADER_COLORS = Object.fromEntries(BELTS.map(([k, _, tw]) => [k, s(k, tw).section.headerBorder]));
export const SECTION_DESC_COLORS = Object.fromEntries(BELTS.map(([k, _, tw]) => [k, { bg: s(k, tw).section.descBg, text: s(k, tw).section.descText, border: s(k, tw).section.descBorder }]));
export const SECTION_NAV_COLORS = Object.fromEntries(BELTS.map(([k, _, tw]) => [k, s(k, tw).section.navText]));
export const HOME_NAV_COLORS = Object.fromEntries(BELTS.map(([k, _, tw]) => [k, { ...s(k, tw).home, bg: "bg-white" }]));
export const SECTION_DATA_COLORS = Object.fromEntries(BELTS.map(([k, _, tw]) => [k, { bg: `bg-${tw}-50`, text: `text-${tw}-${k === 'black' ? '100' : '900'}`, border: `border-${tw}-300`, accent: `bg-${tw}-600`, headerBorder: `border-${tw}-${k === 'black' ? '500' : '400'}`, tagBg: k === 'black' ? `bg-${tw}-700` : `bg-${tw}-200`, tagText: k === 'black' ? `text-${tw}-100` : `text-${tw}-800`, hover: `hover:bg-${tw}-${k === 'black' ? '900' : '100'}` }]));
export const NAVBAR_COLORS = Object.fromEntries(BELTS.map(([k, _, tw]) => [k, { ring: `ring-${tw}-${k === 'practice' ? '600' : '400'}`, hover: `hover:bg-${tw}-50`, text: `text-${tw}-${k === 'black' ? '800' : '700'}`, activeText: `text-${tw}-${k === 'black' ? '900' : '800'}`, activeBg: `bg-${tw}-50`, hoverBorder: `hover:border-${tw}-${k === 'black' ? '800' : '400'}` }]));
