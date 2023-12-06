import IArthSwapV3PoolABI from '@arth-s/v3-core/artifacts/contracts/interfaces/IArthSwapV3Pool.sol/IArthSwapV3Pool.json'
import { computePoolAddress, FACTORY_ADDRESS } from '@arth-s/v3-sdk'
import { ethers } from 'ethers'

import { CurrentConfig } from '../config'
import { getProvider } from './providers'

interface PoolInfo {
  token0: string
  token1: string
  fee: number
  tickSpacing: number
  sqrtPriceX96: ethers.BigNumber
  liquidity: ethers.BigNumber
  tick: number
}

export async function getPoolInfo(): Promise<PoolInfo> {
  const provider = getProvider()
  if (!provider) {
    throw new Error('No provider')
  }

  const currentPoolAddress = computePoolAddress({
    factoryAddress: FACTORY_ADDRESS,
    tokenA: CurrentConfig.tokens.in,
    tokenB: CurrentConfig.tokens.out,
    fee: CurrentConfig.tokens.poolFee,
  })

  const poolContract = new ethers.Contract(
    currentPoolAddress,
    IArthSwapV3PoolABI.abi,
    provider
  )

  const [token0, token1, fee, tickSpacing, liquidity, slot0] =
    await Promise.all([
      poolContract.token0(),
      poolContract.token1(),
      poolContract.fee(),
      poolContract.tickSpacing(),
      poolContract.liquidity(),
      poolContract.slot0(),
    ])

  return {
    token0,
    token1,
    fee,
    tickSpacing,
    liquidity,
    sqrtPriceX96: slot0[0],
    tick: slot0[1],
  }
}
