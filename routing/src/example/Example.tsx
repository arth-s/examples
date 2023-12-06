import React, { useCallback, useEffect, useState } from 'react'
import './Example.css'
import { Environment, CurrentConfig } from '../config'
import { getCurrencyBalance, wrapASTR } from '../libs/wallet'
import {
  connectBrowserExtensionWallet,
  getProvider,
  getWalletAddress,
  setWalletAddress,
  TransactionState,
  wallets,
} from '../libs/providers'
import { executeRoute, generateRoute } from '../libs/routing'
import { SwapRoute } from '@arth-s/smart-order-router'

const useOnBlockUpdated = (callback: (blockNumber: number) => void) => {
  useEffect(() => {
    const subscription = getProvider()?.on('block', callback)
    return () => {
      subscription?.removeAllListeners()
    }
  })
}

const Example = () => {
  const [tokenInBalance, setTokenInBalance] = useState<string>()
  const [walletIndex, setWalletIndex] = useState<number>(0)
  const [tokenOutBalance, setTokenOutBalance] = useState<string>()
  const [txState, setTxState] = useState<TransactionState>(TransactionState.New)
  const [blockNumber, setBlockNumber] = useState<number>(0)

  const [route, setRoute] = useState<SwapRoute | null>(null)

  // Listen for new blocks and update the wallet
  useOnBlockUpdated(async (blockNumber: number) => {
    refreshBalances()
    setBlockNumber(blockNumber)
  })

  // Update wallet state given a block number
  const refreshBalances = useCallback(async () => {
    const provider = getProvider()
    const address = getWalletAddress()
    if (!address || !provider) {
      return
    }

    setTokenInBalance(
      await getCurrencyBalance(provider, address, CurrentConfig.tokens.in)
    )
    setTokenOutBalance(
      await getCurrencyBalance(provider, address, CurrentConfig.tokens.out)
    )
  }, [])

  // Event Handlers

  const onConnectWallet = useCallback(async () => {
    if (await connectBrowserExtensionWallet()) {
      refreshBalances()
    }
  }, [refreshBalances])

  const onCreateRoute = useCallback(async () => {
    setRoute(await generateRoute())
  }, [])

  const executeSwap = useCallback(async (route: SwapRoute | null) => {
    if (!route) {
      return
    }
    setTxState(TransactionState.Sending)
    setTxState(await executeRoute(route))
  }, [])

  return (
    <div className="App">
      {CurrentConfig.rpc.astar === '' && (
        <h2 className="error">Please set your mainnet RPC URL in config.ts</h2>
      )}
      {CurrentConfig.env === Environment.WALLET_EXTENSION &&
        getProvider() === null && (
          <h2 className="error">
            Please install a wallet to use this example configuration
          </h2>
        )}
      <h3>{`Wallet Address: ${getWalletAddress()}`}</h3>
      {CurrentConfig.env === Environment.WALLET_EXTENSION &&
        !getWalletAddress() && (
          <button onClick={onConnectWallet}>Connect Wallet</button>
        )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}>
        {CurrentConfig.env === Environment.WALLET_EXTENSION &&
          wallets &&
          wallets.map((wallet, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="radio"
                id={`wallet-${index}`}
                name="wallet"
                value={index}
                checked={walletIndex === index}
                onChange={() => {
                  setWalletAddress(wallets[index])
                  setWalletIndex(index)
                  refreshBalances()
                }}
              />
              <label htmlFor={`wallet-${index}`}>{wallet}</label>
            </div>
          ))}
      </div>

      <h3>{`Block Number: ${blockNumber + 1}`}</h3>
      <h3>{`Transaction State: ${txState}`}</h3>
      <h3>{`Token In (${CurrentConfig.tokens.in.symbol}) Balance: ${tokenInBalance}`}</h3>
      <h3>{`Token Out (${CurrentConfig.tokens.out.symbol}) Balance: ${tokenOutBalance}`}</h3>
      <button
        onClick={onCreateRoute}
        disabled={
          txState === TransactionState.Sending ||
          getProvider() === null ||
          CurrentConfig.rpc.astar === ''
        }>
        <p>Create Route</p>
      </button>
      <h3>
        {route &&
          `Route: ${CurrentConfig.tokens.amountIn} ${
            CurrentConfig.tokens.in.symbol
          } to ${route.quote.toExact()} ${
            route.quote.currency.symbol
          } using $${route.estimatedGasUsedUSD.toExact()} worth of gas`}
      </h3>
      <h3>
        {route &&
          route.route
            .map((r) => r.tokenPath.map((t) => t.symbol).join(' -> '))
            .join(', ')}
      </h3>
      <button
        onClick={() => wrapASTR(CurrentConfig.tokens.amountIn)}
        disabled={getProvider() === null || CurrentConfig.rpc.astar === ''}>
        <p>Wrap Astar</p>
      </button>
      <button
        onClick={() => executeSwap(route)}
        disabled={
          txState === TransactionState.Sending ||
          getProvider() === null ||
          CurrentConfig.rpc.astar === '' ||
          route === null
        }>
        <p>Swap Using Route</p>
      </button>
    </div>
  )
}

export default Example
