import { useCallback, useEffect } from 'react'
import useAppState from 'react-native-appstate-hook'
import { useSelector } from 'react-redux'
import accountSlice, {
  fetchAccountSettings,
  syncAccountSettings,
} from '../store/account/accountSlice'
import { RootState } from '../store/rootReducer'
import { useAppDispatch } from '../store/store'
import useMount from './useMount'

const settingsToTransfer = [
  'isFleetModeEnabled',
  'hasFleetModeAutoEnabled',
  'convertHntToCurrency',
]
export default () => {
  const dispatch = useAppDispatch()
  const transferRequired = useSelector(
    (state: RootState) => state.account.settingsTransferRequired,
  )
  const accountSettingsLoaded = useSelector(
    (state: RootState) => state.account.settingsLoaded,
  )
  const accountSettings = useSelector(
    (state: RootState) => state.account.settings,
  )

  const refreshAccountSettings = useCallback(
    () => dispatch(fetchAccountSettings()),
    [dispatch],
  )

  useMount(() => {
    refreshAccountSettings()
  })

  useAppState({
    onForeground: () => refreshAccountSettings(),
  })

  useEffect(() => {
    if (!accountSettingsLoaded || transferRequired !== undefined) return

    const allKeysFoundInApi = settingsToTransfer.every((s) =>
      Object.keys(accountSettings).includes(s),
    )

    dispatch(
      accountSlice.actions.updateSettingsTransferRequired(!allKeysFoundInApi),
    )
  }, [accountSettingsLoaded, accountSettings, transferRequired, dispatch])

  useEffect(() => {
    if (!transferRequired) return

    dispatch(syncAccountSettings())
  }, [dispatch, transferRequired])
}
