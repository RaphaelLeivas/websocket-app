import React, { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'

import { useTheme, useRedux, useDispatcher } from '@/Hooks'
import { Logo, AppText } from '@/Components'
import { setDefaultTheme, updateAppStatus } from '@/Store/Slices'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { TREATMENT_STATUS } from '@/Types'
import { Permissions } from '@/Services'
import { updateSettings, updateTreatment, logout } from '@/Store/Slices'

const Startup = () => {
  const { Layout, Gutters, Fonts, Colors } = useTheme()

  let token = useRedux((store) => store.session.token)
  const currentLanguage = useRedux((store) => store.settings.currentLanguage)
  let appVersion = useRedux((store) => store.settings?.appVersion) ?? ''

  const dispatcher = useDispatcher()

  const initializeApp = async () => {
    try {
      await Permissions.requestAllPermissions()

      setDefaultTheme({ theme: 'default', darkMode: false })
      setTimeout(() => {
        navigateAndSimpleReset('Home')
      }, 1000)
    } catch (error) {
      console.error('Erro ao inicializar app: ', error)

      setDefaultTheme({ theme: 'default', darkMode: false })
      setTimeout(() => {
        navigateAndSimpleReset('Home')
      }, 1000)
    }
  }

  useEffect(() => {
    initializeApp()
    // dispatcher(
    //   updateAppStatus({ type: 'lastSync', status: Date.now() - 44 * 24 * 3600 * 1000 })
    // )
  }, [])

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Logo />
      <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} color={Colors.primary} />
      <AppText style={Fonts.textCenter}>{'Welcome!'}</AppText>
    </View>
  )
}

export default Startup
