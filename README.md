# Onchain Angels - Nillion SecretVault

## 📝 Documentation
For detailed information on how to use SecretVault, check out the [Nillion SecretVault Quick Start Guide](https://docs.nillion.com/build/secret-vault-quickstart).

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- NPM or Yarn

### Setup Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   - Create a new org with Nillion [here](https://sv-sda-registration.replit.app/))
   - Create a `.env` file in the root directory
   - Use `.env.example` as a reference
   - Fill in `NILLION_SECRET_KEY` and `NILLION_ORG_DID` variables with your Nillion credentials 

3. **Create schema**
   ```bash
   node postSchema.js
   ```

4. **Configure Schema ID**
   - Add the generated schema ID to your `.env` file as `NILLION_SCHEMA_ID`

5. **Run the application**
   - Run the sample application by executing the `index.js` file:
    ```bash
    node index.js
    ```