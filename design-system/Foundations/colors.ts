import { palette } from "../primitives"

// Colors
export const colors = {
  // Brand colors
  Primary: {
    Resting: palette.blue[60],
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
    "Overlay-01": palette.blackTint[70],
    "Overlay-02": palette.blackTint[20],
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
    "Border-Primary": palette.blackTint[10],
    "Border-Secondary": palette.blackTint[40],
    "Skeleton-01": palette.blackTint[20],
    "Skeleton-02": palette.blackTint[30],
    Error: palette.red[40],
  },
  // Updated section colors to match The Sun website exactly
  Section: {
    // Main sections
    News: "#E03A3A", // Red for News section
    Sport: "#00A54F", // Green for Sport section
    TV: "#9C27B0", // Purple for TV section
    Showbiz: "#FF0099", // Pink for Showbiz section
    Fabulous: "#FF0099", // Same pink for Fabulous section
    Money: "#00A54F", // Green for Money section (same as Sport)
    Travel: "#FF9500", // Orange for Travel section
    Tech: "#00BCD4", // Cyan for Tech section
    Motors: "#E03A3A", // Red for Motors section (same as News)
    Health: "#00BCD4", // Cyan for Health section (same as Tech)

    // News subsections
    "UK News": "#E03A3A", // Same as News
    "World News": "#E03A3A", // Same as News
    "Irish News": "#E03A3A", // Same as News
    "Scottish News": "#E03A3A", // Same as News
    Politics: "#E03A3A", // Same as News
    "Royal Family": "#E03A3A", // Same as News
    "US News": "#E03A3A", // Same as News
    Opinion: "#E03A3A", // Same as News

    // Sport subsections
    Football: "#00A54F", // Same as Sport
    Boxing: "#00A54F", // Same as Sport
    Racing: "#00A54F", // Same as Sport
    UFC: "#00A54F", // Same as Sport
    F1: "#00A54F", // Same as Sport
    Cricket: "#00A54F", // Same as Sport
    Rugby: "#00A54F", // Same as Sport
    Golf: "#00A54F", // Same as Sport
    Tennis: "#00A54F", // Same as Sport
    NFL: "#00A54F", // Same as Sport
    "Dream Team": "#00A54F", // Same as Sport

    // TV subsections
    Soaps: "#9C27B0", // Same as TV
    "Reality TV": "#9C27B0", // Same as TV
    "TV News": "#9C27B0", // Same as TV

    // Showbiz subsections
    Celebrity: "#FF0099", // Same as Showbiz
    Music: "#FF0099", // Same as Showbiz
    Film: "#FF0099", // Same as Showbiz

    // Fabulous subsections
    Fashion: "#FF0099", // Same as Fabulous
    Beauty: "#FF0099", // Same as Fabulous
    Food: "#FF0099", // Same as Fabulous
    Parenting: "#FF0099", // Same as Fabulous

    // Money subsections
    Property: "#00A54F", // Same as Money
    Bills: "#00A54F", // Same as Money
    Banking: "#00A54F", // Same as Money
    Pensions: "#00A54F", // Same as Money

    // Travel subsections
    "Beach Holidays": "#FF9500", // Same as Travel
    "UK Holidays": "#FF9500", // Same as Travel
    "City Breaks": "#FF9500", // Same as Travel
    Cruises: "#FF9500", // Same as Travel

    // Tech subsections
    Phones: "#00BCD4", // Same as Tech
    Gaming: "#00BCD4", // Same as Tech
    Science: "#00BCD4", // Same as Tech

    // Motors subsections
    "New Cars": "#E03A3A", // Same as Motors
    "Used Cars": "#E03A3A", // Same as Motors

    // Health subsections
    Fitness: "#00BCD4", // Same as Health
    Diet: "#00BCD4", // Same as Health
    "Health News": "#00BCD4", // Same as Health

    // Other sections
    Puzzles: "#9C27B0", // Same as TV
    "Dear Deidre": "#FF0099", // Same as Showbiz/Fabulous
    "Sun Bingo": "#FF9500", // Orange like Travel
    "Sun Vegas": "#FFD700", // Gold
    "Sun Savers": "#FFD700", // Gold
    "Sun Casino": "#FFD700", // Gold
    "Sun Win": "#FFD700", // Gold
    "Sun Selects": "#E03A3A", // Same as News
  },
}

