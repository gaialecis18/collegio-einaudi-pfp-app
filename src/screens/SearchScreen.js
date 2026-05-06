import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  COLORS,
  SEARCH_FILTERS,
  getCategoryMeta,
  getCourseEnrollmentState,
  getFilteredCourses,
} from '../data';

function CourseResultCard({ course, onPress }) {
  const categoryMeta = getCategoryMeta(course.category);
  const { alreadyOnList, enrollmentClosed } = getCourseEnrollmentState(course.id);
  const buttonLabel = alreadyOnList ? 'On Your List' : enrollmentClosed ? 'Closed' : 'Enroll Now';

  return (
    <TouchableOpacity style={styles.resultCard} onPress={onPress} activeOpacity={0.85}>
      <View
        style={[
          styles.resultCardImg,
          { backgroundColor: course.image ? '#fff' : categoryMeta.cardBg },
        ]}
      >
        {course.image ? (
          <>
            <Image source={course.image} style={styles.resultCardImage} resizeMode="cover" />
            <View style={styles.resultCardImageScrim} />
          </>
        ) : (
          <Ionicons name={categoryMeta.icon} size={28} color="rgba(255,255,255,0.5)" />
        )}
        {course.id === '7' && (
          <View style={styles.newWorkshopBadge}>
            <Text style={styles.newWorkshopText}>NEW WORKSHOP</Text>
          </View>
        )}
      </View>
      <View style={styles.resultCardBody}>
        <Text style={styles.resultCardTitle}>{course.title}</Text>
        <Text style={styles.resultCardDur}>{course.duration} • {course.building}</Text>
        <Text style={styles.resultCardDesc} numberOfLines={3}>{course.description}</Text>
        <View style={styles.resultCardFooter}>
          <View style={styles.resultEnrollRow}>
            <Ionicons name="people-outline" size={13} color={COLORS.textLight} />
            <Text style={styles.resultEnrollText}>{course.enrolled}</Text>
            <Ionicons name="star" size={13} color="#F39C12" style={{ marginLeft: 8 }} />
            <Text style={styles.resultEnrollText}>{course.rating}</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.enrollBtn,
              alreadyOnList && styles.enrollBtnListed,
              enrollmentClosed && styles.enrollBtnClosed,
            ]}
            onPress={onPress}
            disabled={alreadyOnList || enrollmentClosed}
            accessibilityState={{ disabled: alreadyOnList || enrollmentClosed }}
          >
            <Text style={styles.enrollBtnText}>{buttonLabel}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.viewDetailsText}>VIEW COURSE DETAILS</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default function SearchScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState(['sustainability']);

  const toggleFilter = (f) => {
    setActiveFilters(prev =>
      prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
    );
  };

  const filtered = getFilteredCourses({ query: search, activeFilterIds: activeFilters });

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic">
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroLabel}>COURSE CATALOG</Text>
          <Text style={styles.heroTitle}>Explore Your{'\n'}Path.</Text>
        </View>

        {/* Search */}
        <View style={styles.searchRow}>
          <Ionicons name="search-outline" size={16} color={COLORS.textLight} style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for courses, skills, or credentials..."
            placeholderTextColor={COLORS.textLight}
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity style={styles.filterIconBtn}>
            <Ionicons name="options-outline" size={18} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Active Filters */}
        <View style={styles.filtersRow}>
          <Text style={styles.filtersLabel}>Active Filters</Text>
          <TouchableOpacity onPress={() => setActiveFilters([])}>
            <Text style={styles.clearAll}>Clear All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.filterChips}>
          {SEARCH_FILTERS.map(f => (
            <TouchableOpacity
              key={f.id}
              style={[styles.filterChip, activeFilters.includes(f.id) && styles.filterChipActive]}
              onPress={() => toggleFilter(f.id)}
            >
              <Text style={[styles.filterChipText, activeFilters.includes(f.id) && styles.filterChipTextActive]}>
                {f.label}
              </Text>
              {activeFilters.includes(f.id) && (
                <Ionicons name="close" size={12} color="#fff" style={{ marginLeft: 4 }} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Results count */}
        <Text style={styles.resultsCount}>{filtered.length} Results</Text>

        {/* Results */}
        {filtered.map(course => (
          <CourseResultCard
            key={course.id}
            course={course}
            onPress={() => navigation.navigate('CourseDetail', { course })}
          />
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  hero: { paddingHorizontal: 20, paddingBottom: 16 },
  heroLabel: { fontSize: 10, color: COLORS.primary, fontWeight: '700', letterSpacing: 1.5, marginBottom: 4 },
  heroTitle: { fontSize: 32, fontWeight: '900', color: COLORS.dark, lineHeight: 40 },
  searchRow: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 20, marginBottom: 16,
    backgroundColor: '#e1e0e0c2', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10,
  },
  searchInput: { flex: 1, fontSize: 13, color: COLORS.dark },
  filterIconBtn: { marginLeft: 8 },
  filtersRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, marginBottom: 10,
  },
  filtersLabel: { fontSize: 13, fontWeight: '600', color: COLORS.dark },
  clearAll: { fontSize: 12, color: COLORS.primary, fontWeight: '600' },
  filterChips: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 16, flexWrap: 'wrap', gap: 8 },
  filterChip: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6,
    backgroundColor: '#F0F0F0', borderWidth: 1, borderColor: '#E0E0E0',
  },
  filterChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterChipText: { fontSize: 12, color: COLORS.textSecondary, fontWeight: '600' },
  filterChipTextActive: { color: '#fff' },
  resultsCount: {
    paddingHorizontal: 20, fontSize: 18, fontWeight: '800', color: COLORS.dark, marginBottom: 16,
  },
  resultCard: {
    marginHorizontal: 20, marginBottom: 20, borderRadius: 14, overflow: 'hidden',
    borderWidth: 1, borderColor: COLORS.border,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  resultCardImg: {
    width: '100%',
    aspectRatio: 1672 / 941,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  resultCardImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  resultCardImageScrim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.22)' },
  newWorkshopBadge: { backgroundColor: COLORS.primary, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  newWorkshopText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  resultCardBody: { backgroundColor: '#fff', padding: 14 },
  resultCardTitle: { fontSize: 16, fontWeight: '700', color: COLORS.dark, marginBottom: 2 },
  resultCardDur: { fontSize: 11, color: COLORS.textLight, marginBottom: 8 },
  resultCardDesc: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 18, marginBottom: 12 },
  resultCardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  resultEnrollRow: { flexDirection: 'row', alignItems: 'center' },
  resultEnrollText: { fontSize: 12, color: COLORS.textSecondary, marginLeft: 4 },
  enrollBtn: { backgroundColor: COLORS.primary, borderRadius: 8, paddingHorizontal: 16, paddingVertical: 8 },
  enrollBtnListed: { backgroundColor: COLORS.success },
  enrollBtnClosed: { backgroundColor: COLORS.textLight },
  enrollBtnText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  viewDetailsText: { fontSize: 11, color: COLORS.primary, fontWeight: '700', letterSpacing: 0.5 },
});
