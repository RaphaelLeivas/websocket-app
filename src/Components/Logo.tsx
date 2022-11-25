import React from 'react'
import { View, Image } from 'react-native'
import { useTheme } from '@/Hooks'

interface LogoProps {
  height?: number | string
  width?: number | string
  mode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center'
}

const Logo = ({ height, width, mode }: LogoProps) => {
  const { Layout, Images } = useTheme()

  return (
    <View style={{ height, width }}>
      <Image style={Layout.fullSize} source={Images.logo} resizeMode={mode} />
    </View>
  )
}

Logo.defaultProps = {
  height: 200,
  mode: 'contain',
  width: 200,
}

Logo.otherProps = {
  height: 100,
  mode: 'contain',
  width: 100,
}

export default Logo
