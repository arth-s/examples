import { Token, TradeType } from '@arth-s/sdk-core'
import { Trade } from '@arth-s/v3-sdk'
import { BigNumber, ethers } from 'ethers'

const MAX_DECIMALS = 4

export function fromReadableAmount(
  amount: number,
  decimals: number
): BigNumber {
  return ethers.utils.parseUnits(amount.toString(), decimals)
}

export function toReadableAmount(rawAmount: number, decimals: number): string {
  return Number(ethers.utils.formatUnits(rawAmount, decimals)).toLocaleString(
    undefined,
    {
      maximumSignificantDigits: MAX_DECIMALS,
    }
  )
}

export function displayTrade(trade: Trade<Token, Token, TradeType>): string {
  return `${trade.inputAmount.toExact()} ${
    trade.inputAmount.currency.symbol
  } for ${trade.outputAmount.toExact()} ${trade.outputAmount.currency.symbol}`
}
