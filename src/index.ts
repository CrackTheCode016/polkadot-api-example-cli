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
    const program = new Command();
    console.log(chalk.white.dim(figlet.textSync('Polkadot Account Watcher')))

    program.version('0.0.1').description('Polkadot Account Watcher - A simple CLI tool to watch for remarks on Polkadot network')
        .option('-a, --account <account>', 'Account to watch')
        .parse(process.argv);

    const options = program.opts();

    if (options.account) {
        console.log(chalk.black.bgRed("Watching account:"), chalk.bold.whiteBright(options.account));
        const lightClient = await withLightClient();
        const dotApi = lightClient.getTypedApi(wnd);
        dotApi.event.System.Remarked.watch().subscribe((event) => {
            // We look for a specific hash, indicating that its our address + an email
            const { sender, hash } = event.payload;
            const calculatedHash = bytesToHex(blake2b(`${options.account}+email`, { dkLen: 32 }));
            if (`0x${calculatedHash}` == hash.asHex()) {
                sound.play("youve-got-mail-sound.mp3")
                console.log(chalk.black.bgRed(`You got mail!`));
                console.log(chalk.black.bgCyan("From:"), chalk.bold.whiteBright(sender.toString()));
                console.log(chalk.black.bgBlue("Hash:"), chalk.bold.whiteBright(hash.asHex()));
            }
        });
    } else {
        console.error('Account is required');
        return;
    }
}

main()