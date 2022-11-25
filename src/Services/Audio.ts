//@ts-ignore
import clickAudioFile from '@/Assets/Audios/clickAudio.wav'
//@ts-ignore
import finishTreatmentAudioFile from '@/Assets/Audios/FinishTreatmentAudio.mp3'
//@ts-ignore
import bleConectionErrorFile from '@/Assets/Audios/bleConectionError.mp3'

var Sound = require('react-native-sound')
Sound.setCategory('Playback')

const AUDIO_PLAYBACK_TIME = 0.01

const treatmentAudio = new Sound(finishTreatmentAudioFile, (error: any) => {
  if (error) {
    console.error('Erro ao tocar o som', error)
    return
  }
})

const clickAudio = new Sound(clickAudioFile, (error: any) => {
  if (error) {
    console.error('Erro ao tocar o som', error)
    return
  }
})

const bleConectionErrorAudio = new Sound(bleConectionErrorFile, (error: any) => {
  if (error) {
    console.error('Erro ao tocar o som', error)
    return
  }
})

const playClickAudio = () => {
  clickAudio.setCurrentTime(AUDIO_PLAYBACK_TIME)
  clickAudio.play()
}

const playTreatmentAudio = () => {
  treatmentAudio.play()
}

const conectionBleErrorAudio = () => {
  bleConectionErrorAudio.play()
}

export default {
  playClickAudio,
  playTreatmentAudio,
  conectionBleErrorAudio,
}
