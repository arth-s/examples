// This file contains code to easily connect to and get information from a wallet on chain

import { Currency } from '@arth-s/sdk-core'
import { BigNumber, ethers } from 'ethers'
import { providers } from 'ethers'
import JSBI from 'jsbi'

import { ERC20_ABI, WASTR_ABI, WASTR_CONTRACT_ADDRESS } from './constants'
import { getProvider, getWalletAddress, sendTransaction } from './providers'
import { fromReadableAmount, toReadableAmount } from './utils'

export async function getCurrencyBalance(
  provider: providers.Provider,
  address: string,
  currency: Currency
): Promise<string> {
  // Handle ASTR directly
  if (currency.isNative) {
    return ethers.utils.formatEther(await provider.getBalance(address))
  }

  // Get currency otherwise
  const ERC20Contract = new ethers.Contract(
    currency.address,
    ERC20_ABI,
    provider
  )
  const balance: number = await ERC20Contract.balanceOf(address)
  const decimals: number = await ERC20Contract.decimals()

  // Format with proper units (approximate)
  return toReadableAmount(balance, decimals)
}

// wraps ASTR (rounding up to the nearest ASTR for decimal places)
export async function wrapASTR(astr: number) {
  const provider = getProvider()
  const address = getWalletAddress()
  if (!provider || !address) {
    throw new Error('Cannot wrap ASTR without a provider and wallet address')
  }

  const wastrContract = new ethers.Contract(
    WASTR_CONTRACT_ADDRESS,
    WASTR_ABI,
    provider
  )

  const transaction = {
    data: wastrContract.interface.encodeFunctionData('deposit'),
    value: fromReadableAmount(astr, 18).toHexString(),
    from: address,
    to: WASTR_CONTRACT_ADDRESS,
  }

  await sendTransaction(transaction)
}

// unwraps ASTR (rounding up to the nearest ASTR for decimal places)
export async function unwrapASTR(astr: number) {
  const provider = getProvider()
  const address = getWalletAddress()
  if (!provider || !address) {
    throw new Error('Cannot unwrap ASTR without a provider and wallet address')
  }

  const wastrContract = new ethers.Contract(
    WASTR_CONTRACT_ADDRESS,
    WASTR_ABI,
    provider
  )

  const transaction = {
    data: wastrContract.interface.encodeFunctionData('withdraw', [
      BigNumber.from(Math.ceil(astr))
        .mul(JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18)).toString())
        .toString(),
    ]),
    from: address,
    to: WASTR_CONTRACT_ADDRESS,
  }

  await sendTransaction(transaction)
}
