import { wnd } from "@polkadot-api/descriptors"
import { createClient, PolkadotClient } from "polkadot-api"
import { getSmProvider } from "polkadot-api/sm-provider";
import { chainSpec as westEndChainSpec } from "polkadot-api/chains/westend2";
import { start } from "polkadot-api/smoldot";
import figlet from "figlet";
import { Command } from "commander";
import chalk from "chalk";
import sound from "sound-play"
import { blake2b } from "@noble/hashes/blake2b";
import { bytesToHex } from "@noble/hashes/utils";


async function withLightClient(): Promise<PolkadotClient> {
    // Start the light client
    const smoldot = start();
    // The Westend Relay Chain
    const relayChain = await smoldot.addChain({ chainSpec: westEndChainSpec })
    return createClient(
        getSmProvider(relayChain)
    );
}

async function main() {
    // CLI Code goes here...
}

main()