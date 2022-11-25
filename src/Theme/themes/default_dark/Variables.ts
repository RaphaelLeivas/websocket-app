import { ThemeColors, ThemeNavigationColors } from '@/Theme/theme.type'

const Colors: ThemeColors = {
  primary: '#E14032',
  text: 'white',
  inputBackground: '#1c1e21',
  transparent: 'rgba(0,0,0,0)',
  black: '#ffffff',
  white: '#000000',
  blue: '#35baf6',
  strongBlue: '#036bfc',
  fadePrimary: '#E14032BB',
  success: '#28a745',
  error: '#dc3545',
  warning: '#ebcc2f',
  gray: '#E6E8E6',
  drawerIcon: '#EBF2FA',
  button: '#ffffff',
  cardText: '#ffffff',
  protocolIcons: '#ffffff',
  searchButton: '#E6E8E6',
  card: '#5E5E5E',
  radioButtons: '#E6E8E6',
  textInputs: '#5E5E5E',
  picker: '#5E5E5E',
  electrodeImages: '#484349',
  switch: '#484349',
  treatmentResultText: '#ffffff',
  circularProgress: '#ffffff',
  input: '#ffffff',
}

const NavigationColors: Partial<ThemeNavigationColors> = {
  primary: Colors.primary,
}

export default {
  Colors,
  NavigationColors,
}
