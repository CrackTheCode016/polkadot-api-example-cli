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
    const relayChain = smoldot.addChain({ chainSpec: westEndChainSpec })
    return createClient(
        getSmProvider(relayChain)
    );
}

async function main() {
    const program = new Command();
    console.log(chalk.white.dim(figlet.textSync("Web3 Mail Watcher")))

    program
        .version('0.0.1')
        .description('Web3 Mail Watcher - A simple CLI tool to watch for remarks on Polkadot network')
        .option('-a, --account <account>', 'Account to watch')
        .parse(process.argv);

    // CLI Arguments from commander
    const options = program.opts();

    // We check for the --account flag, if its not provided we exit
    if (options.account) {
        console.log(chalk.black.bgRed("Watching account:"), chalk.bold.whiteBright(options.account));
        // We create a light client to connect to the Polkadot (Westend) network
        const lightClient = await withLightClient();
        // We get the typed API to interact with the network
        const dotApi = lightClient.getTypedApi(wnd);
        // We subscribe to the System.Remarked event and watch for remarks from our account
        dotApi.event.System.Remarked.watch().subscribe((event) => {
            // We look for a specific hash, indicating that its our address + an email
            const { sender, hash } = event.payload;
            // We calculate the hash of our account + email
            const calculatedHash = bytesToHex(blake2b(`${options.account}+email`, { dkLen: 32 }));
            // If the hash matches, we play a sound and log the message - You got mail!
            if (`0x${calculatedHash}` == hash.asHex()) {
                sound.play("youve-got-mail-sound.mp3")
                console.log(chalk.black.bgRed(`You've got mail!`));
                console.log(chalk.black.bgCyan("From:"), chalk.bold.whiteBright(sender.toString()));
                console.log(chalk.black.bgBlue("Hash:"), chalk.bold.whiteBright(hash.asHex()));
            }
        });
    } else {
        // If the account is not provided, we exit
        console.error('Account is required');
        return;
    }
}

main()