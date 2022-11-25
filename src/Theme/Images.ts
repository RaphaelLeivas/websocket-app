import { ThemeImages, ThemeVariables } from '@/Theme/theme.type'

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function ({}: ThemeVariables): ThemeImages {
  return {
    logo: require('@/Assets/Images/Logo.png'),
    treatment: require('@/Assets/Images/Treatment.png'),
    patients: require('@/Assets/Images/Patients.png'),
    information: require('@/Assets/Images/Information.png'),
    protocols: require('@/Assets/Images/Protocols.png'),
    maintenance: require('@/Assets/Images/Maintenance.png'),
  }
}
