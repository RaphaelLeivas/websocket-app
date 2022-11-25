/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

import {
  ThemeColors,
  ThemeFontSize,
  ThemeMetricsSizes,
  ThemeNavigationColors,
  ThemeFontStyle,
} from '@/Theme/theme.type'

/**
 * Colors
 */
export const Colors: ThemeColors = {
  // Example colors:
  transparent: 'rgba(0,0,0,0)',
  inputBackground: '#F4F2F2',
  black: '#000000',
  white: '#ffffff',
  blue: '#35baf6',
  cian: '#00ffff',
  magent: '#ff00ff',
  yellow: '#ffff00',
  strongBlue: '#036bfc',
  text: '#212529',
  primary: '#E14032',
  fadePrimary: '#E14032BB',
  lightPrimary: '#E1403233',
  success: '#28a745',
  error: '#dc3545',
  warning: '#ebcc2f',
  gray: '#ccc8c8',
  drawerIcon: '#000000',
  button: '#ffffff',
  cardText: '#212529',
  protocolIcons: '#212529',
  searchButton: '#000000',
  card: '#ffffff',
  radioButtons: '#5E5E5E',
  textInputs: '#ffffff',
  picker: '#ffffff',
  electrodeImages: '#ccc8c8',
  switch: '#ffffff',
  treatmentResultText: '#000000',
  circularProgress: '#ffffff',
  channelOneTwo: '#ffffff',
  channelTreeFour: '#1E90FF',
  channelFiveSix: '#3CB371',
  channelSevenEigth: '#FFFF00',
}

export const NavigationColors: Partial<ThemeNavigationColors> = {
  primary: Colors.primary,
}

/**
 * FontSize
 */
export const FontSize: ThemeFontSize = {
  small: 16,
  regular: 20,
  large: 40,
}

/**
 * Metrics Sizes
 */
const tiny = 5 // 10
const small = tiny * 2 // 10
const regular = tiny * 3 // 15
const large = regular * 2 // 30
export const MetricsSizes: ThemeMetricsSizes = {
  tiny,
  small,
  regular,
  large,
}

export const FontStyle: ThemeFontStyle = {
  regular: 'sans-serif-light',
}

export const LAYOUT_MAXIMUM_WIDTH = 550

export const LAYOUT_HORIZONTAL_PADDING = 32

export const LAYOUT_VERTICAL_PADDING = 8

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
  FontStyle,
}
