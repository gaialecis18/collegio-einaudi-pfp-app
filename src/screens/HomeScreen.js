import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  COLORS,
  COURSE_CATEGORIES,
  getCategoryMeta,
  getCourseEnrollmentState,
  getStudentCurrentCourses,
  getUpcomingCourses,
} from '../data';

function CategoryChip({ label, color, bg, selected, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, { backgroundColor: selected ? color : bg }, selected && { borderColor: color }]}
    >
      <Text style={[styles.chipText, { color: selected ? '#fff' : color }]}>{label}</Text>
    </TouchableOpacity>
  );
}

function CourseCard({ course, onPress }) {
  const c = getCategoryMeta(course.category);
  const { alreadyOnList, enrollmentClosed } = getCourseEnrollmentState(course.id);
  const buttonLabel = alreadyOnList ? 'On Your List' : enrollmentClosed ? 'Closed' : 'Enroll Now';

  return (
    <TouchableOpacity style={styles.courseCard} onPress={onPress} activeOpacity={0.85}>
      <View style={[styles.courseCardImage, { backgroundColor: course.id === '2' ? '#2C3E50' : '#1A1A2E' }]}>
        <View style={styles.courseCardOverlay}>
          <View style={[styles.catTag, { backgroundColor: c.bg }]}>
            <Text style={[styles.catTagText, { color: c.text }]}>{course.category}</Text>
          </View>
          <Text style={styles.cardDateText}>{course.date}</Text>
        </View>
      </View>
      <View style={styles.courseCardBody}>
        <Text style={styles.courseCardTitle} numberOfLines={2}>{course.title}</Text>
        <Text style={styles.courseCardDesc} numberOfLines={2}>{course.description}</Text>
        <View style={styles.courseCardFooter}>
          <View style={styles.enrollRow}>
            <Ionicons name="people-outline" size={13} color={COLORS.textLight} />
            <Text style={styles.enrollText}>{course.enrolled}</Text>
            <Ionicons name="star" size={13} color="#F39C12" style={{ marginLeft: 8 }} />
            <Text style={styles.enrollText}>{course.rating}</Text>
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
      </View>
    </TouchableOpacity>
  );
}

function CurrentCourseItem({ course, onPress }) {
  return (
    <TouchableOpacity style={styles.currentCourseItem} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.currentCourseDot} />
      <View style={{ flex: 1 }}>
        <Text style={styles.currentCourseTitle} numberOfLines={1}>{course.title}</Text>
        <Text style={styles.currentCourseProf}>{course.professor} • {course.location}</Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${course.progress * 100}%` }]} />
        </View>
      </View>
      <Text style={styles.currentCourseTime}>{course.nextSession}</Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState(null);

  const currentCourses = getStudentCurrentCourses();
  const upcoming = getUpcomingCourses({ query: search, category: selectedCat });

  return (
    <SafeAreaView style={styles.container} edges={ ['left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic">
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroText}>
            Expand Your{'\n'}
            <Text style={styles.heroRed}>Intellectual{'\n'}Horizon</Text>
          </Text>
          <Text style={styles.heroSub}>
            Access curated courses designed for excellence. From soft skills to masterclasses.
          </Text>
        </View>

        {/* Thematic Areas */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Thematic Areas</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
          {COURSE_CATEGORIES.map(item => (
            <CategoryChip
              key={item.cat}
              label={item.label}
              color={item.color}
              bg={item.bg}
              selected={selectedCat === item.cat}
              onPress={() => setSelectedCat(selectedCat === item.cat ? null : item.cat)}
            />
          ))}
        </ScrollView>
    

        {/* Current Courses */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Current Courses</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Activity')}>
            <Text style={styles.viewAll}>View Schedule</Text>
          </TouchableOpacity>
        </View>
        {currentCourses.map(course => (
          <CurrentCourseItem
            key={course.id}
            course={course}
            onPress={() => navigation.navigate('CourseDetail', { course: course.course })}
          />
        ))}

        {/* Upcoming Courses */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Courses</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>
        {upcoming.map(course => (
          <CourseCard
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
  hero: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 20 },
  heroText: { fontSize: 30, fontWeight: '800', color: COLORS.dark, lineHeight: 38 },
  heroRed: { color: COLORS.primary },
  heroSub: { fontSize: 13, color: COLORS.textSecondary, marginTop: 10, lineHeight: 20 },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, marginBottom: 12, marginTop: 8,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.dark },
  viewAll: { fontSize: 13, color: COLORS.primary, fontWeight: '600' },
  chipsRow: { paddingLeft: 20, marginBottom: 16 },
  chip: {
    borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8,
    marginRight: 8, borderWidth: 1, borderColor: 'transparent',
  },
  chipText: { fontSize: 13, fontWeight: '600' },
  currentCourseItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  currentCourseDot: {
    width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary,
    marginRight: 12, marginTop: 2,
  },
  currentCourseTitle: { fontSize: 13, fontWeight: '600', color: COLORS.dark, marginBottom: 2 },
  currentCourseProf: { fontSize: 11, color: COLORS.textSecondary, marginBottom: 6 },
  progressBarBg: { height: 4, backgroundColor: '#EEE', borderRadius: 2 },
  progressBarFill: { height: 4, backgroundColor: COLORS.primary, borderRadius: 2 },
  currentCourseTime: { fontSize: 11, color: COLORS.textLight, marginLeft: 12 },
  courseCard: {
    marginHorizontal: 20, marginBottom: 16, borderRadius: 14, overflow: 'hidden',
    borderWidth: 1, borderColor: COLORS.border,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  courseCardImage: { height: 130, justifyContent: 'flex-end' },
  courseCardOverlay: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end',
    padding: 12,
  },
  catTag: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  catTagText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  cardDateText: { fontSize: 12, color: '#fff', fontWeight: '600' },
  courseCardBody: { backgroundColor: '#fff', padding: 14 },
  courseCardTitle: { fontSize: 15, fontWeight: '700', color: COLORS.dark, marginBottom: 4 },
  courseCardDesc: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 18, marginBottom: 12 },
  courseCardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  enrollRow: { flexDirection: 'row', alignItems: 'center' },
  enrollText: { fontSize: 12, color: COLORS.textSecondary, marginLeft: 4 },
  enrollBtn: { backgroundColor: COLORS.primary, borderRadius: 8, paddingHorizontal: 16, paddingVertical: 8 },
  enrollBtnListed: { backgroundColor: COLORS.success },
  enrollBtnClosed: { backgroundColor: COLORS.textLight },
  enrollBtnText: { color: '#fff', fontSize: 12, fontWeight: '700' },
});
