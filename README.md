# Instructions to configure the project

## CDK/Backend

**Note: Make sure that you have `awscli` and `aws-cdk` installed and configured correctly**

- Go to `infra/constants.ts` and change the variables according to project.
- Open Terminal at `/backend`.
- Run `yarn setup`.
- Run `cdk-bootstrap`.
- Run `cdk-synth`.
- Run `cdk-deploy`.
- This should output the `cdk-outputs.json` in the top-level directory.

## Web3

- Open Terminal at `/web3`.
- Run `yarn`.
- Change the `.env` according to your credentials.
- Change the contract specific information in `/web3/scripts/deploy.js`.
- Run `yarn deploy`.
- Note and save the Contract Address in env under `NEXT_PUBLIC_CONTRACT_ADDRESS`.
- Run `yarn verify` with contract number and arguments intially provided to the constructor to verify the contract on EtherScan.

## Frontend

- Run `yarn`.
- Go to `utils/constants.ts` and configure the key with project name from `cdk-outputs.json`.
- Change all other application-specific keys in environment from `.env`.
- Run `yarn build` & `yarn start` to generate and serve a static build.

## Additional Notes

- All the component modules can be configured under `theme.ts`.
- All the colors can be changed by changing css variables under `styles/globals.css`.
