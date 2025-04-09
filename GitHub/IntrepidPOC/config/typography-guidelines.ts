/**
 * Typography Guidelines
 *
 * This configuration file establishes the typography standards for the application.
 * All text in the application MUST use the Typography component to ensure consistent
 * styling, accessibility, and maintainability.
 *
 * Guidelines:
 * 1. Always use the Typography component for any text content
 * 2. Configure appropriate variants based on the content's semantic meaning
 * 3. Components should accept variant and color props to allow customization
 * 4. Default variants should be specified at the component level
 * 5. Screen-level overrides should be possible via props
 */

// Default typography variants for common UI elements
export const defaultTypographyVariants = {
  // Headings
  pageTitle: "h3",
  sectionTitle: "h5",
  cardTitle: "h6",

  // Body text
  bodyText: "body-02",
  bodyTextLarge: "body-01",

  // UI elements
  button: "button",
  label: "subtitle-02",
  caption: "annotation",

  // Component-specific defaults
  accordion: {
    title: "h6",
    content: "body-02",
  },
  card: {
    title: "h6",
    subtitle: "subtitle-02",
    body: "body-02",
  },
  form: {
    label: "subtitle-02",
    helper: "annotation",
    error: "annotation",
  },
}

/**
 * Usage example:
 *
 * import { defaultTypographyVariants } from '../config/typography-guidelines';
 *
 * const MyComponent = ({ titleVariant = defaultTypographyVariants.accordion.title }) => {
 *   return (
 *     <Typography variant={titleVariant}>My Title</Typography>
 *   )
 * }
 */
