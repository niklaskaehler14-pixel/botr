import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router/js-tabs';

import { useSettings } from '@/lib/settings';

export default function TabLayout() {
  const { colors, fontSize, scale } = useSettings();
  const symbolGroesse = scale(28);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 2,
          height: scale(76),
          paddingTop: 6,
          paddingBottom: 10,
        },
        // Die Beschriftung wird nach oben begrenzt, damit auch das lange Wort
        // „Einstellungen“ auf schmalen Geräten vollständig lesbar bleibt.
        tabBarLabelStyle: { fontSize: Math.min(fontSize('caption'), 15), fontWeight: '700' },
        tabBarItemStyle: { paddingVertical: 4 },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Start',
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={symbolGroesse} color={color} />,
        }}
      />
      <Tabs.Screen
        name="lernen"
        options={{
          title: 'Lernen',
          tabBarIcon: ({ color }) => <MaterialIcons name="menu-book" size={symbolGroesse} color={color} />,
        }}
      />
      <Tabs.Screen
        name="hilfe"
        options={{
          title: 'Hilfe',
          tabBarIcon: ({ color }) => <MaterialIcons name="health-and-safety" size={symbolGroesse} color={color} />,
        }}
      />
      <Tabs.Screen
        name="einstellungen"
        options={{
          title: 'Einstellungen',
          // Kurze Beschriftung, damit sie auch auf kleinen Geräten vollständig
          // sichtbar bleibt – die Überschrift der Seite lautet weiterhin „Einstellungen“.
          tabBarLabel: 'Einstellen',
          tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={symbolGroesse} color={color} />,
        }}
      />
    </Tabs>
  );
}
