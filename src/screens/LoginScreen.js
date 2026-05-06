import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../data';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleLogin = () => {
    if (email && password) {
      navigation.replace('Main');
    } else {
      Alert.alert('Error', 'Please enter your credentials.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.logoBox}>
            <View style={styles.logoCircle}>
              <Ionicons name="school" size={36} color="#fff" />
            </View>
            <Text style={styles.logoTitle}>Collegio Einaudi</Text>
            <Text style={styles.logoSub}>STUDENT FORMATION PORTAL</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>EMAIL</Text>
            <View style={styles.inputRow}>
              <Ionicons name="person-outline" size={18} color={COLORS.textLight} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="n.lastname@gmail.it"
                placeholderTextColor={COLORS.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <Text style={styles.cardLabel}>PASSWORD</Text>
            <View style={styles.inputRow}>
              <Ionicons name="lock-closed-outline" size={18} color={COLORS.textLight} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="••••••••••"
                placeholderTextColor={COLORS.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPass}
              />
              <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={18} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot your password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
              <Text style={styles.loginBtnText}>Login →</Text>
            </TouchableOpacity>

            <View style={styles.registerRow}>
              <Text style={styles.registerText}>You don't have credentials yet? </Text>
              <TouchableOpacity>
                <Text style={styles.registerLink}>Open a ticket</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity>
              <Text style={styles.footerLink}>AIUTO</Text>
            </TouchableOpacity>
            <Text style={styles.footerSep}>  ·  </Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>POLICY</Text>
            </TouchableOpacity>
            <Text style={styles.footerSep}>  ·  </Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>SECURITY</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomIcon}>
            <Ionicons name="power-outline" size={20} color={COLORS.textLight} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flexGrow: 1, paddingHorizontal: 28, paddingTop: 40, paddingBottom: 20 },
  logoBox: { alignItems: 'center', marginBottom: 32 },
  logoCircle: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center',
    marginBottom: 12,
  },
  logoTitle: { fontSize: 20, fontWeight: '700', color: COLORS.dark, letterSpacing: 0.5 },
  logoSub: { fontSize: 10, color: COLORS.textLight, letterSpacing: 1.5, marginTop: 2 },
  card: {
    backgroundColor: '#fff', borderRadius: 16,
    borderWidth: 1, borderColor: COLORS.border,
    padding: 24, shadowColor: '#000', shadowOpacity: 0.06,
    shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3,
  },
  cardLabel: { fontSize: 10, fontWeight: '600', color: COLORS.textLight, letterSpacing: 1.2, marginBottom: 6, marginTop: 8 },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.border, borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 10, marginBottom: 6,
  },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, fontSize: 14, color: COLORS.dark },
  forgotText: { fontSize: 12, color: COLORS.primary, textAlign: 'right', marginTop: 4, marginBottom: 20 },
  loginBtn: {
    backgroundColor: COLORS.primary, borderRadius: 8,
    paddingVertical: 14, alignItems: 'center', marginBottom: 16,
  },
  loginBtnText: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },
  registerRow: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' },
  registerText: { fontSize: 12, color: COLORS.textSecondary },
  registerLink: { fontSize: 12, color: COLORS.primary, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 32 },
  footerLink: { fontSize: 11, color: COLORS.textLight, letterSpacing: 0.8 },
  footerSep: { color: COLORS.textLight },
  bottomIcon: { alignItems: 'center', marginTop: 24 },
});
