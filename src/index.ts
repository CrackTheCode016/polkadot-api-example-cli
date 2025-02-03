// `dot` is the name we gave to `npx papi add`
import { wnd } from "@polkadot-api/descriptors"
import { createClient, PolkadotClient } from "polkadot-api"
import { getSmProvider } from "polkadot-api/sm-provider";
import { chainSpec as westEndChainSpec } from "polkadot-api/chains/westend2";
import { start } from "polkadot-api/smoldot";
import figlet from "figlet";
import { Command } from "commander";
import chalk from "chalk";

async function withLightClient(): Promise<PolkadotClient> {
    // Start the light client
    const smoldot = start();
    // The Polkadot Relay Chain
    const relayChain = await smoldot.addChain({ chainSpec: westEndChainSpec })
    return createClient(
        getSmProvider(relayChain)
    );
}

async function main() {
    const program = new Command();

    console.log(chalk.white.dim(figlet.textSync('Polkadot Account Watcher')))

    program.version('0.0.1').description('Polkadot Account Watcher - A simple CLI tool to watch account balance on Polkadot network')
        .option('-a, --account <account>', 'Account to watch')
        .parse(process.argv);

    const options = program.opts();

    if (options.account) {
        console.log(chalk.black.bgRed("Watching account:"), chalk.bold.whiteBright(options.account));
        const lightClient = await withLightClient();
        const dotApi = lightClient.getTypedApi(wnd);
        dotApi.event.Balances.Transfer.watch().subscribe((event) => {
            const { from, to, amount } = event.payload;
            if (from.toString() == options.account || to.toString() == options.account) {
                console.log(chalk.black.bgRed(`Transfer occurred!`));
                console.log(chalk.black.bgCyan("From:"), chalk.bold.whiteBright(from.toString()));
                console.log(chalk.black.bgBlue("To:"), chalk.bold.whiteBright(to.toString()));
                console.log(chalk.black.bgGreen("Amount:"), chalk.bold.whiteBright(amount.toString()));
            }
        });
    } else {
        console.error('Account is required');
        return;
    }
}

main()