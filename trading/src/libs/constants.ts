// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's

import { ChainId, Token } from '@arth-s/sdk-core'

// Addresses

export const QUOTER_CONTRACT_ADDRESS =
  '0xAFb98ab0394C32dA8E42039ea276E50CBE0144b7'
export const SWAP_ROUTER_ADDRESS = '0xB3611B945dfEB1f91aE2Af62a6b0868C30D13c58'
export const WASTR_CONTRACT_ADDRESS =
  '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720'

// Currencies and Tokens

export const WASTR_TOKEN = new Token(
  ChainId.ASTAR,
  '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
  18,
  'WASTR',
  'Wrapped Astar'
)

export const ARSW_TOKEN = new Token(
  ChainId.ASTAR,
  '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
  18,
  'ARSW',
  'ArthSwap Token'
)

// ABI's

export const ERC20_ABI = [
  // Read-Only Functions
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function allowance(address owner, address spender) view returns (uint256)',

  // Authenticated Functions
  'function transfer(address to, uint amount) returns (bool)',
  'function approve(address _spender, uint256 _value) returns (bool)',

  // Events
  'event Transfer(address indexed from, address indexed to, uint amount)',
]

export const WASTR_ABI = [
  // Wrap ASTR
  'function deposit() payable',

  // Unwrap ASTR
  'function withdraw(uint wad) public',
]

// Transactions

export const TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER = 0.01
