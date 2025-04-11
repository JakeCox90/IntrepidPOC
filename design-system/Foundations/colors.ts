import { palette } from '../primitives';

// Colors
export const colors = {
  // Brand colors
  Primary: {
    Resting: palette.red[60],
    Disabled: palette.grey[30],
    Pressed: palette.blue[80],
    Selected: palette.blue[100],
  },
  Secondary: {
    Resting: palette.grey[30],
    Disabled: palette.grey[30],
    Pressed: palette.grey[40],
    Selected: palette.grey[90],
  },
  Text: {
    Primary: palette.grey[100],
    Secondary: palette.grey[60],
    Inverse: palette.grey[10],
    Disabled: palette.grey[40],
    Error: palette.red[70],
  },
  Surface: {
    Primary: palette.grey[10],
    Secondary: palette.grey[20],
    Disabled: palette.grey[30],
    Overlay01: palette.blackTint[70],
    Overlay02: palette.blackTint[20],
  },
  Error: {
    Resting: palette.red[30],
    Pressed: palette.red[80],
    Disabled: palette.grey[20],
    // Error state tokens for consistent error styling
    Background: palette.red[10],
    Border: palette.red[40],
    Text: palette.red[70],
  },
  Warning: {
    Resting: palette.amber[60],
    Pressed: palette.amber[80],
    Disabled: palette.amber[20],
  },
  Success: {
    Resting: palette.green[60],
    Pressed: palette.green[80],
    Disabled: palette.green[20],
  },
  Border: {
    Primary: palette.blackTint[10],
    Secondary: palette.blackTint[40],
    Skeleton01: palette.blackTint[20],
    Skeleton02: palette.blackTint[30],
    Error: palette.red[40],
  },
  // Updated section colors to match The Sun website exactly
  Section: {
    // Main sections
    News: '#E03A3A',
    Sport: '#00A54F',
    TV: '#9C27B0',
    Showbiz: '#FF0099',
    Fabulous: '#FF0099',
    Money: '#00A54F',
    Travel: '#FF9500',
    Tech: '#00BCD4',
    Motors: '#E03A3A',
    Health: '#00BCD4',

    // News subsections
    UKNews: '#E03A3A',
    WorldNews: '#E03A3A',
    IrishNews: '#E03A3A',
    ScottishNews: '#E03A3A',
    Politics: '#E03A3A',
    RoyalFamily: '#E03A3A',
    USNews: '#E03A3A',
    Opinion: '#E03A3A',

    // Sport subsections
    Football: '#00A54F',
    Boxing: '#00A54F',
    Racing: '#00A54F',
    UFC: '#00A54F',
    F1: '#00A54F',
    Cricket: '#00A54F',
    Rugby: '#00A54F',
    Golf: '#00A54F',
    Tennis: '#00A54F',
    NFL: '#00A54F',
    DreamTeam: '#00A54F',

    // TV subsections
    Soaps: '#9C27B0',
    RealityTV: '#9C27B0',
    TVNews: '#9C27B0',

    // Showbiz subsections
    Celebrity: '#FF0099',
    Music: '#FF0099',
    Film: '#FF0099',

    // Fabulous subsections
    Fashion: '#FF0099',
    Beauty: '#FF0099',
    Food: '#FF0099',
    Parenting: '#FF0099',

    // Money subsections
    Property: '#00A54F',
    Bills: '#00A54F',
    Banking: '#00A54F',
    Pensions: '#00A54F',

    // Travel subsections
    BeachHolidays: '#FF9500',
    UKHolidays: '#FF9500',
    CityBreaks: '#FF9500',
    Cruises: '#FF9500',

    // Tech subsections
    Phones: '#00BCD4',
    Gaming: '#00BCD4',
    Science: '#00BCD4',

    // Motors subsections
    NewCars: '#E03A3A',
    UsedCars: '#E03A3A',

    // Health subsections
    Fitness: '#00BCD4',
    Diet: '#00BCD4',
    HealthNews: '#00BCD4',

    // Other sections
    Puzzles: '#9C27B0',
    DearDeidre: '#FF0099',
    SunBingo: '#FF9500',
    SunVegas: '#FFD700',
    SunSavers: '#FFD700',
    SunCasino: '#FFD700',
    SunWin: '#FFD700',
    SunSelects: '#E03A3A',
  },
};
