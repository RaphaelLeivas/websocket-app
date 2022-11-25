import moment from 'moment'
import { store } from '@/Store'

const databaseTable = (dataArray: object[]) => {
  console.log('')
  console.log('')
  console.log('')
  console.log('------ NEW TABLE ------')
  for (const [index, data] of dataArray.entries()) {
    console.log('Row number ', index)

    for (const key in data) {
      console.log(`-- ${key}: ${data[key]}`)
    }

    console.log('-----')
  }
}

const create = async (message: string, err?: boolean) => {
  // primeiro joga a mensagem no logcat
  const prefix = `[${moment().format('HH:mm:ss.SSS')}] `
  if (err) {
    console.error(prefix + message)
  } else {
    console.log(prefix + message)
  }
}

const logStoreState = () => {
  const {
    addProtocol,
    treatment,
    settings,
    appStatus,
    session,
    device,
    connection,
    selection,
    theme,
    channelIntensities,
  } = store.getState()

  console.log('--- STORE STATE ---')
  console.log('- ADD PROTOCOL -')
  console.log(addProtocol)
  console.log('')

  console.log('- TREATMENT -')
  console.log(treatment)
  console.log('')

  console.log('- APP INFO -')
  console.log(settings)
  console.log('')

  console.log('- APP STATUS -')
  console.log(appStatus)
  console.log('')

  console.log('- SESSION -')
  console.log(session)
  console.log('')

  console.log('- DEVICE -')
  console.log(device)
  console.log('')

  console.log('- CONNECTION -')
  console.log(connection)
  console.log('')

  console.log('- SELECTION -')
  console.log(selection)
  console.log('')

  console.log('- THEME -')
  console.log(theme)
  console.log('')

  console.log('- CHANNEL INTENSITIES -')
  console.log(channelIntensities)
  console.log('')
}

export default {
  databaseTable,
  create,
  logStoreState,
}
