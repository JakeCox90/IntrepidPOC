import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TopNav from '../components/TopNav';
import Tabs from '../components/Tabs';
import CardHero from '../components/CardHero';
import CardHorizontal from '../components/CardHorizontal';
import BottomNav from '../components/BottomNav';
import Typography from '../components/Typography';
import SkeletonLoader from '../components/SkeletonLoader';
import { createAllNewsScreenStyles } from './styles/AllNewsScreen.styles';
import { fetchSunNews, fetchNewsByCategory, SECTIONS } from '../services/sunNewsService';
import { Article } from '../types/article';

// Define the type for section keys
type SectionKey = keyof typeof SECTIONS;

const MAIN_TABS = Object.entries(SECTIONS).map(([key, value]) => ({ key: key as SectionKey, name: value.name }));
const CATEGORY_TABS: Record<SectionKey, string[]> = Object.entries(SECTIONS).reduce((acc, [key, value]) => {
  acc[key as SectionKey] = value.subsections || [];
  return acc;
}, {} as Record<SectionKey, string[]>);

const AllNewsScreen: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createAllNewsScreenStyles(theme), [theme]);
  const [mainTab, setMainTab] = useState<SectionKey>(MAIN_TABS[0].key);
  const [categoryTab, setCategoryTab] = useState<string>(CATEGORY_TABS[MAIN_TABS[0].key]?.[0] || '');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to transform section key to color token format
  const getSectionColorKey = useCallback((key: SectionKey): keyof typeof theme.colors.Section => {
    // Special cases for TV and Lifestyle
    if (key === 'TV') {
      return 'TV';
    }
    if (key === 'LIFESTYLE') {
      return 'Fabulous';
    }
    return key.charAt(0) + key.slice(1).toLowerCase() as keyof typeof theme.colors.Section;
  }, [theme.colors.Section]);

  // Fetch articles when mainTab or categoryTab changes
  const loadArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNewsByCategory(categoryTab);
      setArticles(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load articles');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [categoryTab]);

  useEffect(() => {
    // Reset category tab when mainTab changes
    setCategoryTab(CATEGORY_TABS[mainTab]?.[0] || '');
  }, [mainTab]);

  useEffect(() => {
    loadArticles();
  }, [categoryTab, loadArticles]);

  // Navigation handlers (replace with your navigation logic)
  const handleArticlePress = (article: Article) => {
    // TODO: Implement navigation to article detail
  };
  const handleBookmark = (id: string | number) => {};
  const handleShare = (id: string | number) => {};
  const handleTabPress = (tab: string) => setMainTab(tab as SectionKey);
  const handleCategoryTabPress = (tab: string) => setCategoryTab(tab);
  const handleBottomNavPress = (tab: string) => {
    // TODO: Implement bottom nav navigation
  };

  // Split articles for hero and horizontal cards
  const heroArticle = articles[0];
  const horizontalArticles = articles.slice(1, 3);
  const restArticles = articles.slice(3);

  return (
    <SafeAreaView style={styles.container}>
      {/* Extend section color behind the status bar */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: insets.top, backgroundColor: theme.colors.Section[getSectionColorKey(mainTab)], zIndex: 1 }} pointerEvents="none" />
      <Tabs
        tabs={MAIN_TABS.map(tab => tab.name)}
        activeTab={SECTIONS[mainTab].name}
        onTabPress={tabName => {
          const found = MAIN_TABS.find(tab => tab.name === tabName);
          if (found) setMainTab(found.key as SectionKey);
        }}
        variant="primary"
        backgroundColor={theme.colors.Section[getSectionColorKey(mainTab)]}
        activeTextColor={theme.colors.Text.Inverse}
        inactiveTextColor={theme.colors.Text.Inverse}
        textVariant="subtitle-02"
      />
      <Tabs
        tabs={CATEGORY_TABS[mainTab] || []}
        activeTab={categoryTab}
        onTabPress={handleCategoryTabPress}
        variant="secondary"
        backgroundColor={theme.colors.Surface.Primary}
        textVariant="subtitle-02"
      />
      {loading ? (
        <SkeletonLoader type="allNews" count={5} />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Typography variant="h6" color={theme.colors.Text.Error} style={styles.errorText}>
            {error}
          </Typography>
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={
            <>
              {heroArticle && (
                <CardHero
                  title={heroArticle.title}
                  subtitle={heroArticle.subheading}
                  imageUrl={heroArticle.imageUrl}
                  category={heroArticle.category}
                  flag={heroArticle.flag}
                  readTime={heroArticle.readTime}
                  onPress={() => handleArticlePress(heroArticle)}
                  onBookmark={() => handleBookmark(heroArticle.id)}
                  onShare={() => handleShare(heroArticle.id)}
                />
              )}
              <View style={{ flexDirection: 'row', gap: theme.space['40'], marginVertical: theme.space['40'], paddingHorizontal: theme.space['40'] }}>
                {horizontalArticles.map((item) => (
                  <CardHorizontal
                    key={item.id}
                    title={item.title}
                    imageUrl={item.imageUrl}
                    category={item.category}
                    flag={item.flag}
                    readTime={item.readTime}
                    onPress={() => handleArticlePress(item)}
                    onBookmark={() => handleBookmark(item.id)}
                    onShare={() => handleShare(item.id)}
                  />
                ))}
              </View>
            </>
          }
          data={restArticles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardHorizontal
              key={item.id}
              title={item.title}
              imageUrl={item.imageUrl}
              category={item.category}
              flag={item.flag}
              readTime={item.readTime}
              onPress={() => handleArticlePress(item)}
              onBookmark={() => handleBookmark(item.id)}
              onShare={() => handleShare(item.id)}
            />
          )}
          contentContainerStyle={styles.newsList}
        />
      )}
      <BottomNav activeTab="AllNews" onTabPress={handleBottomNavPress} />
    </SafeAreaView>
  );
};

export default AllNewsScreen;
