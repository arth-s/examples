import { ethers } from 'ethers'
import JSBI from 'jsbi'

const MAX_DECIMALS = 4

export function fromReadableAmount(amount: number, decimals: number): JSBI {
  const extraDigits = Math.pow(10, countDecimals(amount))
  const adjustedAmount = amount * extraDigits
  return JSBI.divide(
    JSBI.multiply(
      JSBI.BigInt(adjustedAmount),
      JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(decimals))
    ),
    JSBI.BigInt(extraDigits)
  )
}

export function toReadableAmount(rawAmount: number, decimals: number): string {
  return Number(ethers.utils.formatUnits(rawAmount, decimals)).toLocaleString(
    undefined,
    {
      maximumSignificantDigits: MAX_DECIMALS,
    }
  )
}

function countDecimals(x: number) {
  if (Math.floor(x) === x) {
    return 0
  }
  return x.toString().split('.')[1].length || 0
}
