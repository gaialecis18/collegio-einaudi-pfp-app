import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, getStudentProfile } from '../data';

function SettingsRow({ icon, iconBg, label, value, onPress, hasArrow, isSwitch, switchVal, onSwitch, danger }) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.rowIcon, { backgroundColor: iconBg || '#F0F0F0' }]}>
        <Ionicons name={icon} size={18} color={danger ? COLORS.primary : COLORS.dark} />
      </View>
      <View style={styles.rowContent}>
        <Text style={[styles.rowLabel, danger && { color: COLORS.primary }]}>{label}</Text>
      </View>
      {value ? <Text style={styles.rowValue}>{value}</Text> : null}
      {isSwitch ? (
        <Switch
          value={switchVal === true}
          onValueChange={(v) => onSwitch(v)}
          trackColor={{ false: '#D0D0D0', true: COLORS.primary }}
          thumbColor={'#FFFFFF'}
          ios_backgroundColor="#D0D0D0"
        />
      ) : null}
      {hasArrow && !isSwitch ? (
        <Ionicons name="chevron-forward" size={16} color={COLORS.textLight} />
      ) : null}
    </TouchableOpacity>
  );
}

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const student = getStudentProfile();

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic">
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Settings</Text>
          <Text style={styles.heroSub}>Manage your academic profile and preferences</Text>
        </View>

        <Text style={styles.sectionLabel}>ACCOUNT</Text>
        <View style={styles.section}>
          <SettingsRow
            icon="person-outline"
            iconBg="#EEF5FF"
            label="Profile"
            value={student.name}
            hasArrow={true}
            onPress={() => navigation.navigate('Profile')}
          />
          <View style={styles.divider} />
          <SettingsRow
            icon="mail-outline"
            iconBg="#EEF5FF"
            label="Email"
            value={student.email}
            hasArrow={true}
            onPress={() => {}}
          />
        </View>

        <Text style={styles.sectionLabel}>PREFERENCES</Text>
        <View style={styles.section}>
          <SettingsRow
            icon="notifications-outline"
            iconBg="#FFF0F0"
            label="Notifications"
            isSwitch={true}
            switchVal={notifications}
            onSwitch={(v) => setNotifications(v)}
            onPress={() => {}}
          />
        </View>

        <Text style={styles.sectionLabel}>SUPPORT</Text>
        <View style={styles.section}>
          <SettingsRow
            icon="help-circle-outline"
            iconBg="#E8F8F0"
            label="Help Center"
            hasArrow={true}
            onPress={() => Alert.alert('Help Center', 'Contact: support@collegio-einaudi.it')}
          />
          <View style={styles.divider} />
          <SettingsRow
            icon="document-text-outline"
            iconBg="#E8F8F0"
            label="Legal & Privacy"
            hasArrow={true}
            onPress={() => Alert.alert('Legal & Privacy', 'Privacy policy and terms of service.')}
          />
        </View>

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() =>
            Alert.alert('Logout', 'Are you sure?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Logout', style: 'destructive', onPress: () => navigation.replace('Login') },
            ])
          }
        >
          <Ionicons name="log-out-outline" size={18} color="#fff" />
          <Text style={styles.logoutText}>Logout from Account</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Collegio Einaudi App v1.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 14, backgroundColor: '#fff',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  logoSmall: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', marginRight: 8,
  },
  headerTitle: { fontSize: 15, fontWeight: '700', color: COLORS.dark },
  hero: { paddingHorizontal: 20, paddingVertical: 20 },
  heroTitle: { fontSize: 28, fontWeight: '800', color: COLORS.dark, marginBottom: 4 },
  heroSub: { fontSize: 13, color: COLORS.textSecondary },
  sectionLabel: {
    fontSize: 11, fontWeight: '700', color: COLORS.textLight,
    letterSpacing: 1.2, paddingHorizontal: 20, marginBottom: 6, marginTop: 8,
  },
  section: {
    backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 14,
    marginBottom: 8, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.border,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 1,
  },
  row: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14,
  },
  rowIcon: {
    width: 36, height: 36, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  rowContent: { flex: 1 },
  rowLabel: { fontSize: 15, color: COLORS.dark, fontWeight: '500' },
  rowValue: { fontSize: 13, color: COLORS.textSecondary, marginRight: 8 },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginLeft: 64 },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.primary, borderRadius: 14, marginHorizontal: 16,
    paddingVertical: 14, marginTop: 16, gap: 8,
  },
  logoutText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  version: { textAlign: 'center', fontSize: 12, color: COLORS.textLight, marginTop: 16 },
});
