import { Validator } from '@helium/http'
import React, { memo, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native-gesture-handler'
import Box from '../../components/Box'
import Text from '../../components/Text'
import { useBorderRadii, useSpacing } from '../../theme/themeHooks'

type Reward = {
  type: string
  gateway: string
  amount: number
  account: string
  block: number
}
type Props = { validator?: Validator }
const ValidatorDetailsConsensus = ({ validator }: Props) => {
  const { t } = useTranslation()
  const { lm } = useBorderRadii()
  const { m } = useSpacing()

  const data = useMemo(() => {
    return [
      {
        type: 'consensus',
        gateway: '112cHyRCaMcCSTpG7HP4hKHtmHDXGY9d7PYbD1SHKUtYC9h1L7Lt',
        amount: 242248062,
        account: '13SrU9gEwghUrwgvpQfihLz3uzAQBXsccvpUhH5vf3P2mAQdENB',
        block: 1234,
      },
      {
        type: 'consensus',
        gateway: '112cHyRCaMcCSTpG7HP4hKHtmHDXGY9d7PYbD1SHKUtYC9h1L7Lt',
        amount: 242248062,
        account: '13SrU9gEwghUrwgvpQfihLz3uzAQBXsccvpUhH5vf3P2mAQdENB',
        block: 1234,
      },
      {
        type: 'consensus',
        gateway: '112cHyRCaMcCSTpG7HP4hKHtmHDXGY9d7PYbD1SHKUtYC9h1L7Lt',
        amount: 242248062,
        account: '13SrU9gEwghUrwgvpQfihLz3uzAQBXsccvpUhH5vf3P2mAQdENB',
        block: 1234,
      },
      {
        type: 'consensus',
        gateway: '112cHyRCaMcCSTpG7HP4hKHtmHDXGY9d7PYbD1SHKUtYC9h1L7Lt',
        amount: 242248062,
        account: '13SrU9gEwghUrwgvpQfihLz3uzAQBXsccvpUhH5vf3P2mAQdENB',
        block: 1234,
      },
      {
        type: 'consensus',
        gateway: '112cHyRCaMcCSTpG7HP4hKHtmHDXGY9d7PYbD1SHKUtYC9h1L7Lt',
        amount: 242248062,
        account: '13SrU9gEwghUrwgvpQfihLz3uzAQBXsccvpUhH5vf3P2mAQdENB',
        block: 1234,
      },
      {
        type: 'consensus',
        gateway: '112cHyRCaMcCSTpG7HP4hKHtmHDXGY9d7PYbD1SHKUtYC9h1L7Lt',
        amount: 242248062,
        account: '13SrU9gEwghUrwgvpQfihLz3uzAQBXsccvpUhH5vf3P2mAQdENB',
        block: 1234,
      },
    ]
  }, [])

  type RewardItem = { index: number; item: Reward }
  const renderItem = useCallback(
    ({ index, item }: RewardItem) => {
      const isFirst = index === 0
      const isLast =
        validator?.penalties?.length && index === validator.penalties.length - 1
      return (
        <Box
          backgroundColor="grayPurpleLight"
          marginBottom="xxxs"
          flexDirection="row"
          borderTopLeftRadius={isFirst ? 'm' : 'none'}
          borderTopRightRadius={isFirst ? 'm' : 'none'}
          borderBottomLeftRadius={isLast ? 'm' : 'none'}
          borderBottomRightRadius={isLast ? 'm' : 'none'}
          padding="m"
          alignItems="center"
        >
          <Box flex={1}>
            <Text color="purpleMediumText" variant="medium" fontSize={15}>
              {t('validator_details.consensus_group')}
            </Text>
            <Text color="purpleMediumText" variant="regular" fontSize={13}>
              {t('validator_details.block_elected', {
                block: item.block,
              })}
            </Text>
          </Box>
          <Text variant="medium" color="grayDarkText" fontSize={15}>
            HNT
          </Text>
        </Box>
      )
    },
    [t, validator],
  )

  const keyExtractor = useCallback((item, index) => {
    const { block } = item as Reward
    return `${block}.${index}`
  }, [])

  const contentContainerStyle = useMemo(() => ({ paddingBottom: 32 }), [])
  const style = useMemo(() => ({ borderRadius: lm, marginTop: m }), [lm, m])
  return (
    <FlatList
      style={style}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={contentContainerStyle}
    />
  )
}

export default memo(ValidatorDetailsConsensus)
