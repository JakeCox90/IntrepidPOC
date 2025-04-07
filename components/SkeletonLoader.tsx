"use client"
import type React from "react"
import { View, StyleSheet } from "react-native"
import SkeletonCardHero from "./SkeletonCardHero"
import SkeletonCardArticle from "./SkeletonCardArticle"
import SkeletonCardCatchUp from "./SkeletonCardCatchUp"
import SkeletonArticle from "./SkeletonArticle"
import Stack from "./Stack"
import Typography from "./Typography"
import { useTheme } from "../theme/ThemeProvider"

type SkeletonType = "today" | "allNews" | "search" | "article" | "catchUp" | "hero" | "horizontal"

interface SkeletonLoaderProps {
  type: SkeletonType
  count?: number
  showTitle?: boolean
  title?: string
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type, count = 3, showTitle = false, title = "" }) => {
  const theme = useTheme()

  // Render a specific number of skeleton items
  const renderItems = (SkeletonComponent: React.ComponentType<any>, itemCount: number) => {
    return Array(itemCount)
      .fill(0)
      .map((_, index) => <SkeletonComponent key={`skeleton-${index}`} />)
  }

  // Render a section with title and skeleton items
  const renderSection = (sectionTitle: string, SkeletonComponent: React.ComponentType<any>, itemCount: number) => {
    return (
      <View style={styles.section}>
        <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.sectionTitle}>
          {sectionTitle}
        </Typography>
        {renderItems(SkeletonComponent, itemCount)}
      </View>
    )
  }

  switch (type) {
    case "today":
      return (
        <>
          <View style={styles.section}>
            <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.sectionTitle}>
              Today&apos;s Catch Up
            </Typography>
            <Stack>{renderItems(SkeletonCardCatchUp, 3)}</Stack>
          </View>
          {renderSection("Top Stories", SkeletonCardHero, 1)}
          {renderItems(SkeletonCardArticle, 2)}
          {renderSection("All Stories", SkeletonCardArticle, count)}
        </>
      )

    case "allNews":
      return (
        <View style={styles.container}>
          {showTitle && title && (
            <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.sectionTitle}>
              {title}
            </Typography>
          )}
          {renderItems(SkeletonCardArticle, count)}
        </View>
      )

    case "search":
      return <View style={styles.container}>{renderItems(SkeletonCardArticle, count)}</View>

    case "article":
      return <SkeletonArticle />

    case "catchUp":
      return <Stack>{renderItems(SkeletonCardCatchUp, count)}</Stack>

    case "hero":
      return <SkeletonCardHero />

    case "horizontal":
      return renderItems(SkeletonCardArticle, count)

    default:
      return null
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    padding: 16,
    paddingBottom: 0,
  },
  sectionTitle: {
    marginBottom: 16,
  },
})

export default SkeletonLoader

