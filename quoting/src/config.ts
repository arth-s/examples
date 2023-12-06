import { Token } from '@arth-s/sdk-core'
import { FeeAmount } from '@arth-s/v3-sdk'
import { USDT_TOKEN, WASTR_TOKEN } from './libs/constants'

// Inputs that configure this example to run
export interface ExampleConfig {
  rpc: {
    local: string
    astar: string
  }
  tokens: {
    in: Token
    amountIn: number
    out: Token
    poolFee: number
  }
}

// Example Configuration

export const CurrentConfig: ExampleConfig = {
  rpc: {
    local: 'http://localhost:8545',
    astar: 'https://astar.api.onfinality.io/public',
  },
  tokens: {
    in: USDT_TOKEN,
    amountIn: 1,
    out: WASTR_TOKEN,
    poolFee: FeeAmount.MEDIUM,
  },
}
