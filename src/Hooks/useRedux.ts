import { useSelector } from 'react-redux'
import { store } from '@/Store'

const storeState = store.getState()
type Store = typeof storeState

const useRedux = <T>(selector: (storeState: Store) => T) => useSelector(selector)

export default useRedux
