# Execute Trades with ArthSwap V3 SDK

## Overview

Welcome to the ArthSwap V3 Trading Guide! This guide provides a step-by-step example of executing a quoted swap trade on the Astar network using a wallet connection. The core functionality of this example is encapsulated in the [`trading.ts`](./src/libs/trading.ts) file.

## Configuration

This application is designed to interact with the Astar network and an in-browser wallet. To switch between these environments, you can modify the `Environment` in the [example configuration](./src/config.ts) file. The configuration controls the environment and inputs to the example's functionality. No further code modifications should be necessary for the application to function properly.

## Setup

### Installing Dependencies

1. Run `yarn install` to install the project dependencies.
2. Execute `yarn install:chain` to download and install Foundry, which is necessary for running the Astar blockchain locally.

### Running Your Local Chain

In a separate terminal session, run `yarn start:chain` to start up a copy of the Astar blockchain locally.

### Selecting Your Wallet

This example uses the first sample wallet offered by Foundry (listed in the terminal output upon starting your local chain). If you'd like to use a different wallet, modify the `address` and `privateKey` in the [config](./src/config.ts) file. Note that these are not used when configured to use a wallet extension.

### Setting Up a Wallet Browser Extension

1. Install a wallet browser extension.
2. Add a new manual/local network to your wallet local chain using `http://localhost:8545` for your RPC URL and `1337` for your chain ID, and `ASTR` for your currency.
3. Import your selected wallet using your private key (e.g., `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` from Foundry's example wallets).

### Launching the Web Interface

To start the web interface, run `yarn start` and navigate to [http://localhost:3000/](http://localhost:3000/)