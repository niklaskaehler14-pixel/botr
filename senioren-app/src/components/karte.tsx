import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { type ReactNode } from 'react';

import { AppText } from './text';
import { useSettings } from '@/lib/settings';
import { MinTouchSize, Radius, Spacing } from '@/constants/theme';

type Props = {
  titel: string;
  untertitel?: string;
  /** Emoji oder kurzes Symbol links. */
  symbol?: string;
  onPress?: () => void;
  abgeschlossen?: boolean;
  fussnote?: string;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

/** Antippbare Kachel für Kurse, Lektionen und Hilfe-Themen. */
export function Karte({ titel, untertitel, symbol, onPress, abgeschlossen, fussnote, children, style }: Props) {
  const { colors, scale, fontSize } = useSettings();

  const inhalt = (
    <>
      <View style={styles.kopf}>
        {symbol ? (
          <AppText variante="title" style={styles.symbol} accessibilityElementsHidden importantForAccessibility="no">
            {symbol}
          </AppText>
        ) : null}
        <View style={styles.text}>
          <AppText variante="heading">{titel}</AppText>
          {untertitel ? (
            <AppText variante="body" gedaempft style={styles.untertitel}>
              {untertitel}
            </AppText>
          ) : null}
          {fussnote ? (
            <AppText variante="caption" gedaempft style={styles.untertitel}>
              {fussnote}
            </AppText>
          ) : null}
        </View>
        {abgeschlossen ? (
          <MaterialIcons name="check-circle" size={scale(30)} color={colors.success} style={styles.haken} />
        ) : onPress ? (
          <MaterialIcons name="chevron-right" size={fontSize('title')} color={colors.textMuted} />
        ) : null}
      </View>
      {children}
    </>
  );

  if (!onPress) {
    return (
      <View style={[styles.karte, { backgroundColor: colors.surface, borderColor: colors.border }, style]}>{inhalt}</View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={[titel, untertitel, abgeschlossen ? 'Abgeschlossen' : undefined].filter(Boolean).join('. ')}
      onPress={onPress}
      style={({ pressed }) => [
        styles.karte,
        {
          minHeight: scale(MinTouchSize),
          backgroundColor: pressed ? colors.surfaceStrong : colors.surface,
          borderColor: colors.border,
        },
        style,
      ]}>
      {inhalt}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  karte: {
    borderRadius: Radius.md,
    borderWidth: 2,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  kopf: { flexDirection: 'row', alignItems: 'center' },
  symbol: { marginRight: Spacing.md },
  text: { flex: 1 },
  untertitel: { marginTop: Spacing.xs },
  haken: { marginLeft: Spacing.sm },
});
