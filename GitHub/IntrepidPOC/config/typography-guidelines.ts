/**
 * Typography Guidelines
 *
 * This file establishes standards for typography usage across the application.
 * All text should use the Typography component with appropriate variants.
 */

// Default typography variants for different UI elements
export const defaultTypographyVariants = {
  // Headers and titles
  screenTitle: "h3",
  sectionTitle: "h5",
  cardTitle: "h6",
  modalTitle: "h5",

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
  audioPlayer: {
    title: "subtitle-02",
    category: "subtitle-02",
    duration: "body-02",
  },
  bundleCard: {
    title: "h5",
    subtitle: "body-02",
    count: "body-02",
  },
  cardCatchUp: {
    title: "subtitle-01",
    subtitle: "body-02",
    count: "annotation",
  },
  comments: {
    title: "h5",
    author: "subtitle-02",
    comment: "body-02",
    action: "body-02",
  },
  flag: {
    text: "overline",
  },
  header: {
    title: "h6",
    largeTitle: "h3",
    button: "button",
  },
  topNav: {
    title: "subtitle-01",
    exploreTitle: "h3",
    button: "button",
  },
}

/**
 * Guidelines for Typography Usage:
 *
 * 1. All text should use the Typography component
 * 2. Components should accept typography variant props with sensible defaults
 * 3. Screen-level overrides should be possible
 * 4. Use the appropriate variant for the context (see defaultTypographyVariants)
 *
 * Example usage in a component:
 *
 * interface MyComponentProps {
 *   title: string;
 *   description: string;
 *   titleVariant?: "h5" | "h6";
 *   descriptionVariant?: "body-01" | "body-02";
 * }
 *
 * const MyComponent = ({
 *   title,
 *   description,
 *   titleVariant = "h5",
 *   descriptionVariant = "body-02"
 * }: MyComponentProps) => {
 *   return (
 *     <View>
 *       <Typography variant={titleVariant}>{title}</Typography>
 *       <Typography variant={descriptionVariant}>{description}</Typography>
 *     </View>
 *   );
 * };
 */
