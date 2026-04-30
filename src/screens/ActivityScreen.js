import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  ACTIVITY_TABS,
  COLORS,
  getActivityItemsByTab,
  getStudentProfile,
} from '../data';

function ActivityCard({ item, navigation }) {
  const { course } = item;

  return (
    <TouchableOpacity
      style={[styles.actCard, item.status === 'bookmarked' && styles.actCardBookmarked]}
      onPress={() => navigation.navigate('CourseDetail', { course })}
      activeOpacity={0.85}
    >
      <View style={styles.actCardHeader}>
        <View style={[styles.actStatusBadge, {
          backgroundColor: item.status === 'completed' ? '#E8F8F0' :
            item.status === 'bookmarked' ? '#FDF3E8' : '#E8F4FD'
        }]}>
          <Text style={[styles.actStatusText, {
            color: item.status === 'completed' ? '#27AE60' :
              item.status === 'bookmarked' ? '#E67E22' : '#2980B9'
          }]}>
            {item.status === 'completed' ? 'COMPLETED' :
              item.status === 'bookmarked' ? 'BOOKMARKED' : 'ATTENDING'}
          </Text>
        </View>
        <Text style={styles.actDate}>{item.startDate} — {item.endDate}</Text>
      </View>
      <Text style={styles.actTitle}>{item.title}</Text>
      <Text style={styles.actCategory}>{item.category}</Text>
      <View style={styles.actFooter}>
        <View style={styles.actHoursRow}>
          <Text style={styles.actHoursLabel}>CURRENT PROGRESS</Text>
          <Text style={styles.actHours}>{item.hours}</Text>
          <Text style={styles.actPct}>{item.progressPct}</Text>
        </View>
        {item.status === 'bookmarked' && (
          <TouchableOpacity style={styles.manageBtn}
            onPress={() => navigation.navigate('CourseDetail', { course })}>
            <Text style={styles.manageBtnText}>MANAGE</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function ActivityScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('In Progress');
  const student = getStudentProfile();
  const items = getActivityItemsByTab(activeTab);

  return (
    <SafeAreaView style={styles.container} edges={ ['left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic">
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Activity History</Text>
          <Text style={styles.heroSub}>Chronological record of your academic journey and merit achievements within the Einaudi community.</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {ACTIVITY_TABS.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{student.totalHours}</Text>
            <Text style={styles.statLabel}>TOTAL SPENT</Text>
          </View>
          <View style={styles.statBox}>
            <TouchableOpacity style={styles.certBtn}>
              <Ionicons name="ribbon-outline" size={14} color={COLORS.primary} />
              <Text style={styles.certText}>Certificate</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Activity dot indicator */}
        <View style={styles.dotIndicator}>
          <View style={styles.dot} />
        </View>

        {/* Cards */}
        {items.map(item => (
          <ActivityCard key={item.id} item={item} navigation={navigation} />
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 14,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  logoSmall: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', marginRight: 8,
  },
  headerTitle: { fontSize: 15, fontWeight: '700', color: COLORS.dark },
  heroSection: { paddingHorizontal: 20, paddingBottom: 20 },
  heroTitle: { fontSize: 26, fontWeight: '800', color: COLORS.dark, marginBottom: 8 },
  heroSub: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 20 },
  tabRow: {
    flexDirection: 'row', paddingHorizontal: 20, marginBottom: 16,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  tab: { marginRight: 20, paddingBottom: 10, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: COLORS.primary },
  tabText: { fontSize: 14, color: COLORS.textLight, fontWeight: '500' },
  tabTextActive: { color: COLORS.primary, fontWeight: '700' },
  statsRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, marginBottom: 16,
  },
  statBox: {},
  statNum: { fontSize: 28, fontWeight: '800', color: COLORS.dark },
  statLabel: { fontSize: 10, color: COLORS.textLight, letterSpacing: 1, fontWeight: '600' },
  certBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderWidth: 1, borderColor: COLORS.primary, borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  certText: { fontSize: 13, color: COLORS.primary, fontWeight: '600' },
  dotIndicator: { paddingHorizontal: 20, marginBottom: 8 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.primary },
  actCard: {
    marginHorizontal: 20, marginBottom: 16, borderRadius: 14,
    borderWidth: 1, borderColor: COLORS.border,
    padding: 16, backgroundColor: '#FAFAFA',
  },
  actCardBookmarked: { backgroundColor: '#FFF9F0', borderColor: '#F5DEB3' },
  actCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  actStatusBadge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  actStatusText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  actDate: { fontSize: 11, color: COLORS.textLight },
  actTitle: { fontSize: 16, fontWeight: '700', color: COLORS.dark, marginBottom: 4 },
  actCategory: { fontSize: 11, color: COLORS.textLight, marginBottom: 12, letterSpacing: 0.5 },
  actFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  actHoursRow: {},
  actHoursLabel: { fontSize: 10, color: COLORS.textLight, letterSpacing: 0.8, fontWeight: '600', marginBottom: 2 },
  actHours: { fontSize: 22, fontWeight: '800', color: COLORS.dark },
  actPct: { fontSize: 12, color: COLORS.textSecondary },
  manageBtn: {
    backgroundColor: COLORS.primary, borderRadius: 8,
    paddingHorizontal: 16, paddingVertical: 8,
  },
  manageBtnText: { color: '#fff', fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  archiveBtn: {
    backgroundColor: COLORS.primary, borderRadius: 12, marginHorizontal: 20,
    paddingVertical: 14, alignItems: 'center', marginTop: 8,
  },
  archiveBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
});
