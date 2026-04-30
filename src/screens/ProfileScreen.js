import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  COLORS,
  getStudentCurrentCourses,
  getStudentProfile,
} from '../data';

export default function ProfileScreen({ navigation }) {
  const student = getStudentProfile();
  const currentCourses = getStudentCurrentCourses();
  const progress = student.progress;

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color="#fff" />
            </View>
            <View style={styles.avatarBadge}>
              <Ionicons name="checkmark" size={10} color="#fff" />
            </View>
          </View>

          <Text style={styles.profileName}>{student.name}</Text>

          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{student.section}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{student.year}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons
              name="settings-outline"
              size={16}
              color={COLORS.primary}
            />
            <Text style={styles.settingsBtnText}>Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Academic Progress */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Academic Progress</Text>
            <Text style={styles.progressPct}>{Math.round(progress * 100)}%</Text>
          </View>

          <Text style={styles.subLabel}>HOURS ACCESSED</Text>

          <View style={styles.progressBarBg}>
            <View
              style={[styles.progressBarFill, { width: `${progress * 100}%` }]}
            />
          </View>

          <View style={styles.hoursRow}>
            <Text style={styles.hoursNum}>{student.hoursAccessed}</Text>
            <Text style={styles.hoursTotal}> / {student.hoursTotal} hrs</Text>
          </View>

          <Text style={styles.totalEventLabel}>TOTAL SPENT</Text>

          <View style={styles.totalRow}>
            <Text style={styles.totalHrs}>{student.totalHours}</Text>
            <TouchableOpacity style={styles.certBtn}>
              <Ionicons
                name="ribbon-outline"
                size={13}
                color={COLORS.primary}
              />
              <Text style={styles.certText}>Certificate</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Current Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Current Courses</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Activity')}>
              <Text style={styles.viewSchedule}>View Schedule</Text>
            </TouchableOpacity>
          </View>

          {currentCourses.map((c) => (
            <TouchableOpacity
              key={c.id}
              style={styles.courseRow}
              onPress={() => navigation.navigate('CourseDetail', { course: c.course })}
            >
              <View style={styles.courseRowLeft}>
                <View style={styles.courseRowDot} />
                <View>
                  <Text style={styles.courseRowTitle} numberOfLines={1}>
                    {c.title}
                  </Text>
                  <Text style={styles.courseRowProf}>
                    {c.professor} • {c.location}
                  </Text>
                </View>
              </View>
              <Text style={styles.courseRowTime}>{c.nextSession}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#7F8C8D',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  settingsBtn: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  settingsBtnText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
  },
  section: {
    marginHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.dark,
  },
  progressPct: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
  },
  subLabel: {
    fontSize: 10,
    color: COLORS.textLight,
    letterSpacing: 1.2,
    marginBottom: 8,
    fontWeight: '600',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#EEE',
    borderRadius: 4,
    marginBottom: 6,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  hoursNum: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.dark,
  },
  hoursTotal: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  totalEventLabel: {
    fontSize: 10,
    color: COLORS.textLight,
    letterSpacing: 1.2,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalHrs: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.dark,
  },
  certBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  certText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
  },
  viewSchedule: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
  },
  courseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  courseRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  courseRowDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginRight: 12,
  },
  courseRowTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.dark,
    maxWidth: 200,
  },
  courseRowProf: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  courseRowTime: {
    fontSize: 11,
    color: COLORS.textLight,
  },
});
