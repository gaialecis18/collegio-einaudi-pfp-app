import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, getNotificationGroups } from '../data';

function NotifCard({ notif, navigation }) {
  return (
    <TouchableOpacity style={styles.notifCard} activeOpacity={0.85}>
      <View style={[styles.notifIcon, { backgroundColor: notif.color + '20' }]}>
        <Ionicons name={notif.icon} size={22} color={notif.color} />
      </View>
      <View style={styles.notifContent}>
        <View style={styles.notifHeader}>
          <Text style={styles.notifTitle}>{notif.title}</Text>
          <Text style={styles.notifTime}>{notif.time}</Text>
        </View>
        <Text style={styles.notifMsg}>{notif.message}</Text>
        {notif.hasImage && (
          <TouchableOpacity
            style={styles.notifDetails}
            onPress={() => notif.course && navigation.navigate('CourseDetail', { course: notif.course })}
          >
            <View style={styles.notifImageBox}>
              <Ionicons name="globe-outline" size={32} color="rgba(255,255,255,0.7)" />
            </View>
            <View style={styles.notifDetailsText}>
              <View style={styles.newArrivalBadge}>
                <Text style={styles.newArrivalText}>{notif.detailBadge}</Text>
              </View>
              <Text style={styles.notifDetailTitle} numberOfLines={2}>
                {notif.detailTitle}{'\n'}
                <Text style={styles.notifDetailSub}>{notif.detailSubtitle}</Text>
              </Text>
              <TouchableOpacity
                style={styles.detailsBtn}
                onPress={() => notif.course && navigation.navigate('CourseDetail', { course: notif.course })}
              >
                <Text style={styles.detailsBtnText}>DETAILS →</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function NotificationsScreen({ navigation }) {
  const notificationGroups = getNotificationGroups();

  return (
    <SafeAreaView style={styles.container} edges={ ['left', 'right']}>
      {/* Header */}
      <ScrollView showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic">
        {notificationGroups.map(group => (
          <View key={group.title}>
            <Text style={styles.dayLabel}>{group.title}</Text>
            {group.data.map(n => (
              <NotifCard key={n.id} notif={n} navigation={navigation} />
            ))}
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  hero: { paddingHorizontal: 20, paddingBottom: 8 },
  dayLabel: {
    fontSize: 11, fontWeight: '700', color: COLORS.textLight,
    letterSpacing: 1.2, paddingHorizontal: 20, marginTop: 16, marginBottom: 8,
  },
  notifCard: {
    flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: '#F5F5F5',
  },
  notifIcon: {
    width: 44, height: 44, borderRadius: 22,
    alignItems: 'center', justifyContent: 'center', marginRight: 14, flexShrink: 0,
  },
  notifContent: { flex: 1 },
  notifHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  notifTitle: { fontSize: 14, fontWeight: '700', color: COLORS.dark, flex: 1, marginRight: 8 },
  notifTime: { fontSize: 11, color: COLORS.textLight },
  notifMsg: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 18 },
  notifDetails: {
    flexDirection: 'row', marginTop: 12, borderRadius: 12, overflow: 'hidden',
    borderWidth: 1, borderColor: COLORS.border,
  },
  notifImageBox: {
    width: 80, height: 80, backgroundColor: '#1A1A2E',
    alignItems: 'center', justifyContent: 'center',
  },
  notifDetailsText: { flex: 1, padding: 10 },
  newArrivalBadge: {
    backgroundColor: COLORS.primary, borderRadius: 6,
    paddingHorizontal: 6, paddingVertical: 2, alignSelf: 'flex-start', marginBottom: 4,
  },
  newArrivalText: { color: '#fff', fontSize: 8, fontWeight: '700', letterSpacing: 0.5 },
  notifDetailTitle: { fontSize: 12, fontWeight: '700', color: COLORS.dark, marginBottom: 6 },
  notifDetailSub: { fontSize: 11, color: COLORS.textSecondary, fontWeight: '400' },
  detailsBtn: {},
  detailsBtnText: { fontSize: 11, color: COLORS.primary, fontWeight: '700', letterSpacing: 0.5 },
});
