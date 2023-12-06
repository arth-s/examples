// This file contains code to easily connect to and get information from a wallet on chain

import { Currency } from '@arth-s/sdk-core'
import { BigNumber, ethers } from 'ethers'
import { providers } from 'ethers'
import { ERC20_ABI, WASTR_ABI, WASTR_CONTRACT_ADDRESS } from './constants'
import { toReadableAmount } from './conversion'
import JSBI from 'jsbi'
import { getProvider, getWalletAddress, sendTransaction } from './providers'

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
  const walletContract = new ethers.Contract(
    currency.address,
    ERC20_ABI,
    provider
  )
  const balance: number = await walletContract.balanceOf(address)
  const decimals: number = await walletContract.decimals()

  // Format with proper units (approximate)
  return toReadableAmount(balance, decimals).toString()
}

// wraps ASTR (rounding up to the nearest ASTR for decimal places)
export async function wrapASTR(astr: number) {
  const provider = getProvider()
  const address = getWalletAddress()
  if (!provider || !address) {
    throw new Error('Cannot wrap ASTR without a provider and wallet address')
  }

  const wethContract = new ethers.Contract(
    WASTR_CONTRACT_ADDRESS,
    WASTR_ABI,
    provider
  )

  const transaction = {
    data: wethContract.interface.encodeFunctionData('deposit'),
    value: ethers.utils.parseEther(astr.toString()).toHexString(),
    from: address,
    to: WASTR_CONTRACT_ADDRESS,
  }

  await sendTransaction(transaction)
}

// unwraps ASTR (rounding up to the nearest ASTR for decimal places)
export async function unwrapASTR(eth: number) {
  const provider = getProvider()
  const address = getWalletAddress()
  if (!provider || !address) {
    throw new Error('Cannot unwrap ASTR without a provider and wallet address')
  }

  const wethContract = new ethers.Contract(
    WASTR_CONTRACT_ADDRESS,
    WASTR_ABI,
    provider
  )

  const transaction = {
    data: wethContract.interface.encodeFunctionData('withdraw', [
      BigNumber.from(Math.ceil(eth))
        .mul(JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18)).toString())
        .toString(),
    ]),
    from: address,
    to: WASTR_CONTRACT_ADDRESS,
  }

  await sendTransaction(transaction)
}
