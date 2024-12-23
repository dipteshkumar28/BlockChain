const { ethers } = require("hardhat");
const { assert, expect } = require("chai");

describe("", () => {
  let simpleStoragefactory, simpleStorage;
  beforeEach(async function () {
    simpleStoragefactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStoragefactory.deploy();
  });
  it("Should start with favourite number 0", async function () {
    const currentvalue = await simpleStorage.retrieve();
    const expectedvalue = 0;

    assert.equal(currentvalue.toString(), expectedvalue);
  });
  it("Should updated when we call store ",async function () {
    const expectedvalue1=7;
    const transresponse1=await simpleStorage.store(expectedvalue1);
    await transresponse1.wait(1);

    const UpdatedValue1=await simpleStorage.retrieve();
    assert.equal(UpdatedValue1.toString(),expectedvalue1);
    });
});
