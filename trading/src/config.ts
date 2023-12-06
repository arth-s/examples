import { Token } from '@arth-s/sdk-core'
import { FeeAmount } from '@arth-s/v3-sdk'

import { ARSW_TOKEN, WASTR_TOKEN } from './libs/constants'

// Sets if the example should run locally or on chain
export enum Environment {
  LOCAL,
  ASTAR,
  WALLET_EXTENSION,
}

// Inputs that configure this example to run
export interface ExampleConfig {
  env: Environment
  rpc: {
    local: string
    astar: string
  }
  wallet: {
    address: string
    privateKey: string
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
  env: Environment.WALLET_EXTENSION,
  rpc: {
    local: 'http://localhost:8545',
    astar: 'https://astar.api.onfinality.io/public',
  },
  wallet: {
    address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    privateKey:
      '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
  },
  tokens: {
    in: WASTR_TOKEN,
    amountIn: 0.01,
    out: ARSW_TOKEN,
    poolFee: FeeAmount.MEDIUM,
  },
}
