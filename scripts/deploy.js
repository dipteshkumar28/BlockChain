const { ethers, run, network } = require("hardhat");
require("dotenv").config();

async function main() {
  const simplestoragefactory = await ethers.getContractFactory("SimpleStorage");
  console.log("deploying contract...");
  const simpleStorage = await simplestoragefactory.deploy();
  await simpleStorage.waitForDeployment();
  console.log(`Deployed Address to: ${simpleStorage.target}`);
  // console.log(network.config);
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deploymentTransaction().wait(6);
    await verify(simpleStorage.target, []);
    console.log("Contract Verified");
  }

  const currentvalue = await simpleStorage.retrieve();
  console.log(`CurrentValue: ${currentvalue}`);

  const transresponse = await simpleStorage.store(7);
  await transresponse.wait(1);
  const updated = await simpleStorage.retrieve();
  console.log(`UpdatedValue: ${updated}`);
}

async function verify(contractAddress, args) {
  console.log("Contract Verifying....");
  try {
    await run("verify:verify", {
      address: contractAddress,
      contructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("Already Verified")) {
      console.log("Already Verified");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
