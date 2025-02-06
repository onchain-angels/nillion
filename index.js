import 'dotenv/config';
import { SecretVaultWrapper } from 'nillion-sv-wrappers';
import { orgConfig } from './nillionOrgConfig.js';

// Use postSchema.js to create a new collection schema
// Update SCHEMA_ID to the schema id of your new collection
const SCHEMA_ID = process.env.NILLION_SCHEMA_ID;

// Web3 Experience Survey Data to add to the collection
// $allot signals that the name years_in_web3 field will be encrypted
// Each node will have a different encrypted $share of encrypted field

const sampleData = [
    {
        timestamp: 1738828412,
        wallet: "0xfE76A5EB3becFF9B0Bfb774faC7D6AF164820094",
        chain_id: 1,
        farcaster_handle: { $allot: "farcaster_handle" },
        twitter_handle: { $allot: "twitter_handle" },
        portfolio: {
            stables: {
                before: "1.85",
                current: "9.7",
                change: "7.85",
                target: "20",
                deviation: "-10.3"
            },
            majors: {
                before: "98.15",
                current: "90.3",
                change: "7.85",
                target: "60",
                deviation: "30.3"
            },
            alts: {
                before: "0",
                current: "0",
                change: "0",
                target: "15",
                deviation: "-15"
            },
            memes: {
                before: "0",
                current: "0",
                change: "0",
                target: "5",
                deviation: "-5"
            }
        },
        recent_operations: [
            {
                symbol: "eth",
                name: "Ethereum",
                category: "majors",
                coingecko_id: "ethereum",
                chain_id: 8453,
                coingecko_chain_id: "base",
                description: "Ethereum is a global, open-source platform for decentralized applications. In other words, the vision is to create a world computer that anyone can build applications in a decentralized manner; while all states and data are distributed and publicly accessible. Ethereum supports smart contracts in which developers can write code in order to program digital value. Examples of decentralized apps (dapps) that are built on Ethereum includes tokens, non-fungible tokens, decentralized finance apps, lending protocol, decentralized exchanges, and much more.\r\n\r\nOn Ethereum, all transactions and smart contract executions require a small fee to be paid. This fee is called Gas. In technical terms, Gas refers to the unit of measure on the amount of computational effort required to execute an operation or a smart contract. The more complex the execution operation is, the more gas is required to fulfill that operation. Gas fees are paid entirely in Ether (ETH), which is the native coin of the blockchain. The price of gas can fluctuate from time to time depending on the network demand.\nCoingecko categories: Smart Contract Platform;Layer 1 (L1);Ethereum Ecosystem;FTX Holdings;Multicoin Capital Portfolio;Proof of Stake (PoS);Alameda Research Portfolio;Andreessen Horowitz (a16z) Portfolio;GMCI Layer 1 Index;GMCI 30 Index;Delphi Ventures Portfolio;Galaxy Digital Portfolio;GMCI Index;World Liberty Financial Portfolio",
                logo_url: "https://coin-images.coingecko.com/coins/images/279/small/ethereum.png?1696501628",
                amount: "0.03973840493262283",
                usd_value: "110.24298942461436",
                type: "decreased_position"
            },
            {
                symbol: "usdc",
                name: "USDC",
                category: "stables",
                coingecko_id: "usd-coin",
                chain_id: 8453,
                coingecko_chain_id: "base",
                description: "USDC is a fully collateralized US dollar stablecoin. USDC is the bridge between dollars and trading on cryptocurrency exchanges. The technology behind CENTRE makes it possible to exchange value between people, businesses and financial institutions just like email between mail services and texts between SMS providers. We believe by removing artificial economic borders, we can create a more inclusive global economy.\nCoingecko categories: Stablecoins;USD Stablecoin;Solana Ecosystem;Avalanche Ecosystem;Polygon Ecosystem;Near Protocol Ecosystem;Arbitrum Ecosystem;Celo Ecosystem;Ethereum Ecosystem;Algorand Ecosystem;Optimism Ecosystem;Aptos Ecosystem;ZkSync Ecosystem;Sui Ecosystem;Base Ecosystem;Tron Ecosystem;Hedera Ecosystem;Stellar Ecosystem;Fiat-backed Stablecoin;Made in USA",
                logo_url: "https://coin-images.coingecko.com/coins/images/6319/small/usdc.png?1696506694",
                amount: "0.9999999999999998",
                usd_value: "0.9999999999999998",
                type: "decreased_position"
            },
        ]
    }
];

async function main() {
    try {
        // Create a secret vault wrapper and initialize the SecretVault collection to use
        const collection = new SecretVaultWrapper(
            orgConfig.nodes,
            orgConfig.orgCredentials,
            SCHEMA_ID
        );
        await collection.init();

        // await collection.deleteSchema("xxxxx-xxxx-xxxx-xxxx-xxxxx");

        const schemas = await collection.getSchemas()
        console.log(
            '👀 Schemas:',
            JSON.stringify(schemas, null, 2)
        );

        // Write collection data to nodes encrypting the specified fields ahead of time
        const dataWritten = await collection.writeToNodes(sampleData);
        console.log(
            '👀 Data written to nodes:',
            JSON.stringify(dataWritten, null, 2)
        );

        // Get the ids of the SecretVault records created
        const newIds = [
            ...new Set(dataWritten.map((item) => item.result.data.created).flat()),
        ];
        console.log('uploaded record ids:', newIds);

        // Read all collection data from the nodes, decrypting the specified fields
        const decryptedCollectionData = await collection.readFromNodes({});

        // Log first 5 records
        console.log(
            'Most recent records',
            decryptedCollectionData.slice(0, 5)
        );

    } catch (error) {
        console.error('❌ SecretVaultWrapper error:', error.message);
        process.exit(1);
    }
}

main();