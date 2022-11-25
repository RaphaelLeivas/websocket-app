import React, { useEffect } from 'react'
import { View, StyleSheet, Animated, Easing } from 'react-native'
import { Icon } from 'react-native-elements'

import { useTheme } from '@/Hooks'
import { AppText } from '@/Components'

interface AnimatedSyncProps {
  animationRef: Animated.Value
  synchronizing: boolean
}

const AnimatedSync = ({ animationRef, synchronizing }: AnimatedSyncProps) => {
  const { Colors } = useTheme()

  const _startSyncAnimation = () => {
    Animated.loop(
      Animated.timing(animationRef, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start()
  }

  const _stopSyncAnimation = () => {
    animationRef.setValue(0)
    animationRef.stopAnimation()
  }

  useEffect(() => {
    if (synchronizing) {
      _startSyncAnimation()
    } else {
      _stopSyncAnimation()
    }
  }, [synchronizing])

  return synchronizing ? (
    <View style={{ ...styles.syncContainer, borderColor: Colors.text }}>
      <Animated.View
        style={{
          transform: [
            {
              rotate: animationRef.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        }}
      >
        <Icon
          name={'sync-alt'}
          type={'font-awesome-5'}
          size={16}
          color={Colors.text}
          style={{ padding: 0, margin: 0 }}
          containerStyle={{ padding: 0, margin: 0 }}
          tvParallaxProperties // usado em iOS
        />
      </Animated.View>
      <AppText style={{ marginLeft: 8 }}>{'teste'}</AppText>
    </View>
  ) : (
    <React.Fragment />
  )
}

const styles = StyleSheet.create({
  syncContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 32,
    borderColor: 'black',
    borderWidth: 0.5,
    padding: 8,
    alignItems: 'center',
  },
})

export default AnimatedSync
