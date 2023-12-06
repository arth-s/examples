# Find Ideal Swap Routes with ArthSwap V3 SDK

## Overview

Welcome to the ArthSwap V3 Routing Guide! This guide provides an example of finding an ideal swapping route on the Astar network using a wallet connection. The core functionality of this example is encapsulated in the `routing.ts` file.

## Configuration

This application is designed to interact with a locally deployed Astar fork, the Astar network, and an in-browser wallet (Astar or configured locally). To switch between these environments, you can modify the `Environment` in the example configuration file. The configuration controls the environment and inputs to the example's functionality. No further code modifications should be necessary for the application to function properly.

## Setup

### Installing Dependencies

1. Run `yarn install` to install the project dependencies.
2. Execute `yarn install:chain` to download and install Foundry, which is necessary for running the Astar blockchain locally.

### Running Your Local Chain

In a separate terminal session, run `yarn start:chain` to start up a copy of the Astar blockchain locally.

### Selecting Your Wallet

This example uses the first sample wallet offered by Foundry (listed in the terminal output upon starting your local chain). If you'd like to use a different wallet, modify the `address` and `privateKey` in the config file. Note that these are not used when configured to use a wallet extension.

### Setting Up a Wallet Browser Extension

1. Install a wallet browser extension.
2. Add a new manual/local network to your wallet local chain using `http://localhost:8545` for your RPC URL and `1337` for your chain ID, and `ASTR` for your currency.
3. Import your selected wallet using your private key (e.g., `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` from Foundry's example wallets).

### Launching the Web Interface

To start the web interface, run `yarn start` and navigate to http://localhost:3000/
