# Planet Plots - putting Mars on the Blockchain

Project uses:  
<img src='https://api.iconify.design/vscode-icons/file-type-reactjs.svg?color=%23555?width=30&height=30'> ReactJS  
<img src='https://api.iconify.design/simple-icons/solidity.svg?color=%23555?width=30&height=30'> Solidity  
<img src='https://api.iconify.design/simple-icons/chainlink.svg?width=30&height=30'> Chainlink

<br />

## Planet Plots is a decentralised application (dApp) that allows users to:

-   connect their Metamask wallet via the dApp's front-end
-   mint an NFT that represents a unique plot of land on Mars
-   view their plot and ownership certificate
    <br />

Planet Plots utilises the Chainlink VRF to bring randomness to the minting process (minters won't know which plot they will receive).
Each NFT represents an ownership certificate of a 10m * 10m plot of land on Mars - however, as this is only a 'proof-of-concept' project, the owner of the NFT will *probably\* not have a real claim to actual land on Mars ;)

<br />
<br />
<br />

![dapp](https://user-images.githubusercontent.com/28829008/180002396-42450924-d2ef-4d4f-92cf-aa6af9c1b823.gif)

<br />

## Hardhat Boilerplate

More information can be found in Hardhat's boilerplate README: https://github.com/NomicFoundation/hardhat-boilerplate

### Quick start (edit from Hardhat)

The first things you need to do are cloning this repository and installing its
dependencies:

```sh
git clone https://github.com/wardu/planet-plots.git
cd hardhat-boilerplate
npm install
```

Once installed, let's run Hardhat's testing network:

```sh
npx hardhat node
```

Then, on a new terminal, go to the repository's root folder and run this to
deploy your contract:

```sh
npx hardhat run scripts/deploy.js --network localhost
```

Finally, we can run the frontend with:

```sh
cd frontend
npm install
npm start
```

Open [http://localhost:3000/](http://localhost:3000/) to see the Dapp. You will
need to have [Metamask](https://metamask.io) installed and listening to
`localhost 8545`.

---

Mars background image by <a href="https://unsplash.com/@nuvaproductions?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Javier Miranda</a> on <a href="https://unsplash.com/s/photos/red-planet?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
