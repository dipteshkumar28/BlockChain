const { task } = require("hardhat/config");

task("block-number", "Prints the current block number").setAction(
  async (taskargs, hre) => {
    const blocknumber = await hre.ethers.provider.getBlockNumber();
    console.log(`Current Block Numbers are ${blocknumber}`);
  }
);
