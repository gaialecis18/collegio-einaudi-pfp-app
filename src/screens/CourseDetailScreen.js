import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  COLORS,
  getCategoryMeta,
  getCourseEnrollmentState,
} from '../data';

function LessonCalendarItem({ lesson, index, accentBg, accentColor }) {
  const [month, day] = lesson.date.split(' ');

  return (
    <View style={styles.lessonCard}>
      <View style={[styles.lessonDateBlock, { backgroundColor: accentBg }]}>
        <Text style={[styles.lessonMonth, { color: accentColor }]}>{month}</Text>
        <Text style={styles.lessonDay}>{day}</Text>
      </View>
      <View style={styles.lessonContent}>
        <Text style={styles.lessonTitle}>Lesson {index + 1}</Text>
        <View style={styles.lessonMetaRow}>
          <Ionicons name="calendar-outline" size={14} color={COLORS.textLight} />
          <Text style={styles.lessonMetaText}>{lesson.date}</Text>
          <Ionicons name="time-outline" size={14} color={COLORS.textLight} />
          <Text style={styles.lessonMetaText}>{lesson.time}</Text>
        </View>
      </View>
    </View>
  );
}

export default function CourseDetailScreen({ route, navigation }) {
  const { course } = route.params;
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const { isEnrolled, enrollmentClosed } = getCourseEnrollmentState(course.id, enrolledCourseIds);

  const handleEnroll = () => {
    if (isEnrolled || enrollmentClosed) {
      return;
    }

    Alert.alert('Enroll', `Enroll in "${course.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Enroll',
        onPress: () => {
          setEnrolledCourseIds(prev => [...prev, course.id]);
          Alert.alert('Success', 'You are now enrolled!');
        },
      },
    ]);
  };

  const cc = getCategoryMeta(course.category);

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.navigate('Tabs', { screen: 'Home' });
  };

  return (
    <SafeAreaView style={styles.container} edges={ ['left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic">
        {/* Hero image */}
        <View style={[styles.heroImage, {
          backgroundColor: cc.heroBg
        }]}>
          {course.image ? (
            <Image source={course.image} style={styles.heroArtwork} resizeMode="cover" />
          ) : (
            <Ionicons
              name={cc.icon}
              size={60} color="rgba(255,255,255,0.15)"
            />
          )}
        </View>

        <View style={styles.body}>
          {/* Tags */}
          <View style={styles.tagsRow}>
            {course.tags.map((tag, i) => (
              <View key={i} style={[styles.tag, i === 0 ? { backgroundColor: cc.bg } : styles.tagOutline]}>
                <Text style={[styles.tagText, { color: i === 0 ? cc.text : COLORS.primary }]}>{tag.toUpperCase()}</Text>
              </View>
            ))}
          </View>

          {/* Title */}
          <Text style={styles.title}>{course.title}</Text>
          <Text style={styles.description}>{course.description}</Text>

          {/* Professor */}
          <View style={styles.professorRow}>
            <View style={styles.professorAvatar}>
              <Ionicons name="person" size={20} color="#fff" />
            </View>
            <View>
              <Text style={styles.professorName}>{course.professor}</Text>
              <Text style={styles.professorTitle}>{course.professorTitle}</Text>
            </View>
          </View>

          {/* Enroll button */}
          <TouchableOpacity
            style={[
              styles.enrollBtn,
              isEnrolled && styles.enrolledBtn,
              enrollmentClosed && styles.enrollmentClosedBtn,
            ]}
            onPress={handleEnroll}
            disabled={isEnrolled || enrollmentClosed}
            accessibilityState={{ disabled: isEnrolled || enrollmentClosed }}
          >
            <Text style={styles.enrollBtnText}>
              {isEnrolled ? 'Already on Your List' : enrollmentClosed ? 'Enrollment Closed' : 'Enroll in Course'}
            </Text>
            {isEnrolled ? (
              <Ionicons name="checkmark-circle" size={17} color="#fff" style={{ marginLeft: 8 }} />
            ) : !enrollmentClosed ? (
              <Ionicons name="bookmark-outline" size={16} color="#fff" style={{ marginLeft: 8 }} />
            ) : null}
          </TouchableOpacity>

          {/* Info row */}
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="location-outline" size={16} color={COLORS.textLight} />
              <Text style={styles.infoText}>Venue: {course.location}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="business-outline" size={16} color={COLORS.textLight} />
              <Text style={styles.infoText}>Building: {course.building}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={16} color={COLORS.textLight} />
              <Text style={styles.infoText}>{course.schedule}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={16} color={COLORS.textLight} />
              <Text style={styles.infoText}>{course.duration}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="people-outline" size={16} color={COLORS.textLight} />
              <Text style={styles.infoText}>{course.enrolled} enrolled</Text>
            </View>
          </View>

          {/* Lesson calendar */}
          {!!course.lessons?.length && (
            <View style={styles.calendarSection}>
              <View style={styles.calendarTitleRow}>
                <Text style={styles.calendarTitle}>Lesson Calendar</Text>
                <View style={[styles.lessonCountBadge, { backgroundColor: cc.bg }]}>
                  <Text style={[styles.lessonCountText, { color: cc.text }]}>
                    {course.lessons.length} lessons
                  </Text>
                </View>
              </View>
              {course.lessons.map((lesson, i) => (
                <LessonCalendarItem
                  key={`${course.id}-${lesson.date}-${lesson.time}`}
                  lesson={lesson}
                  index={i}
                  accentBg={cc.bg}
                  accentColor={cc.text}
                />
              ))}
            </View>
          )}

          {/* Modules */}
          <Text style={styles.modulesTitle}>Course Modules</Text>
          {course.modules.map((mod, i) => (
            <View key={i} style={styles.moduleCard}>
              <Text style={styles.moduleTitle}>{mod.title}</Text>
              <Text style={styles.moduleDesc}>{mod.desc}</Text>
            </View>
          ))}

          {/* Quote */}
          {course.quote && (
            <View style={styles.quoteBox}>
              <Text style={styles.quoteText}>{course.quote}</Text>
            </View>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  heroImage: {
    height: 200, alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
  },
  heroArtwork: { width: '100%', height: '100%' },
  body: { padding: 20 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  tag: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  tagOutline: { borderWidth: 1, borderColor: COLORS.primary },
  tagText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  title: { fontSize: 26, fontWeight: '800', color: COLORS.dark, lineHeight: 32, marginBottom: 10 },
  description: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 20, marginBottom: 20 },
  professorRow: {
    flexDirection: 'row', alignItems: 'center',
    marginBottom: 20, padding: 14, borderRadius: 12, backgroundColor: '#F8F8F8',
  },
  professorAvatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#7F8C8D', alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  professorName: { fontSize: 14, fontWeight: '700', color: COLORS.dark },
  professorTitle: { fontSize: 12, color: COLORS.textSecondary },
  enrollBtn: {
    backgroundColor: COLORS.primary, borderRadius: 12,
    paddingVertical: 14, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', marginBottom: 16,
  },
  enrolledBtn: { backgroundColor: COLORS.success },
  enrollmentClosedBtn: { backgroundColor: COLORS.textLight },
  enrollBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  infoRow: { flexDirection: 'row', marginBottom: 8, gap: 20 },
  infoItem: { flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1 },
  infoText: { fontSize: 13, color: COLORS.textSecondary },
  calendarSection: { marginTop: 22 },
  calendarTitleRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: 12,
  },
  calendarTitle: { fontSize: 18, fontWeight: '700', color: COLORS.dark },
  lessonCountBadge: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  lessonCountText: { fontSize: 11, fontWeight: '700' },
  lessonCard: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.border, borderRadius: 12,
    padding: 12, marginBottom: 10, backgroundColor: '#FAFAFA',
  },
  lessonDateBlock: {
    width: 52, height: 52, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  lessonMonth: { fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },
  lessonDay: { fontSize: 20, fontWeight: '800', color: COLORS.dark },
  lessonContent: { flex: 1 },
  lessonTitle: { fontSize: 14, fontWeight: '700', color: COLORS.dark, marginBottom: 5 },
  lessonMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 5, flexWrap: 'wrap' },
  lessonMetaText: { fontSize: 12, color: COLORS.textSecondary, marginRight: 8 },
  modulesTitle: { fontSize: 18, fontWeight: '700', color: COLORS.dark, marginTop: 20, marginBottom: 12 },
  moduleCard: {
    borderWidth: 1, borderColor: COLORS.border, borderRadius: 12,
    padding: 14, marginBottom: 10, backgroundColor: '#FAFAFA',
  },
  moduleTitle: { fontSize: 14, fontWeight: '700', color: COLORS.dark, marginBottom: 4 },
  moduleDesc: { fontSize: 12, color: COLORS.textSecondary },
  quoteBox: {
    borderLeftWidth: 3, borderLeftColor: COLORS.primary,
    paddingLeft: 16, marginTop: 24,
  },
  quoteText: { fontSize: 13, color: COLORS.textSecondary, fontStyle: 'italic', lineHeight: 20 },
});
