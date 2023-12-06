import { ethers } from 'ethers'
import { CurrentConfig } from '../config'
import { computePoolAddress, FACTORY_ADDRESS } from '@arth-s/v3-sdk'
import Quoter from '@arth-s/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json'
import IArthSwapV3PoolABI from '@arth-s/v3-core/artifacts/contracts/interfaces/IArthSwapV3Pool.sol/IArthSwapV3Pool.json'
import { QUOTER_CONTRACT_ADDRESS } from '../libs/constants'
import { getProvider } from '../libs/providers'
import { toReadableAmount, fromReadableAmount } from '../libs/conversion'

export async function quote(): Promise<string> {
  const quoterContract = new ethers.Contract(
    QUOTER_CONTRACT_ADDRESS,
    Quoter.abi,
    getProvider()
  )
  const poolConstants = await getPoolConstants()

  const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    {
      tokenIn: CurrentConfig.tokens.in.address,
      tokenOut: CurrentConfig.tokens.out.address,
      fee: poolConstants.fee,
      amountIn: fromReadableAmount(
        CurrentConfig.tokens.amountIn,
        CurrentConfig.tokens.in.decimals
      ).toString(),
      sqrtPriceLimitX96: 0,
    }
  )

  return toReadableAmount(
    quotedAmountOut.amountOut,
    CurrentConfig.tokens.out.decimals
  )
}

async function getPoolConstants(): Promise<{
  token0: string
  token1: string
  fee: number
}> {
  const currentPoolAddress = computePoolAddress({
    factoryAddress: FACTORY_ADDRESS,
    tokenA: CurrentConfig.tokens.in,
    tokenB: CurrentConfig.tokens.out,
    fee: CurrentConfig.tokens.poolFee,
  })

  const poolContract = new ethers.Contract(
    currentPoolAddress,
    IArthSwapV3PoolABI.abi,
    getProvider()
  )
  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ])

  return {
    token0,
    token1,
    fee,
  }
}
