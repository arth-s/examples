// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's

import { ChainId, Token } from '@arth-s/sdk-core'

// Addresses

export const QUOTER_CONTRACT_ADDRESS =
  '0xAFb98ab0394C32dA8E42039ea276E50CBE0144b7'

// Currencies and Tokens

export const WASTR_TOKEN = new Token(
  ChainId.ASTAR,
  '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
  18,
  'WASTR',
  'Wrapped Astar'
)

export const USDT_TOKEN = new Token(
  ChainId.ASTAR,
  '0xfFFfffFF000000000000000000000001000007C0',
  6,
  'USDT',
  'Tether USD'
)
