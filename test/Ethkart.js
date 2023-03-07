const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

// product detail
const ITEM = {
  id: 55,
  name: "Note7pro",
  category: "electronics",
  image: "img",
  cost: tokens(2),
  rating: 5,
  stock: 2,
};

let EthkartInstance, deployer, buyer;

before(async () => {
  //deploy
  [deployer, buyer] = await ethers.getSigners();
  const ethkart = await ethers.getContractFactory("Ethkart");
  EthkartInstance = await ethkart.deploy();
});

describe("owner", () => {
  it("owner is deployer", async () => {
    const name = await EthkartInstance.owner();
    expect(name).to.equal(deployer.address);
  });
});

describe("list product ", () => {
  let tranction;
  before(async () => {
    tranction = await EthkartInstance.connect(deployer).ListProduct(
      ITEM.id,
      ITEM.name,
      ITEM.category,
      ITEM.image,
      ITEM.cost,
      ITEM.stock,
      ITEM.rating
    );
    await tranction.wait();
  });

  it("check product", async () => {
    const item = await EthkartInstance.Items(ITEM.id);
    expect(item.id).to.equal(ITEM.id);
  });
});

describe("buy product ", () => {
  let tranction;
  before(async () => {
    tranction = await EthkartInstance.connect(deployer).ListProduct(
      ITEM.id,
      ITEM.name,
      ITEM.category,
      ITEM.image,
      ITEM.cost,
      ITEM.stock,
      ITEM.rating
    );
    await tranction.wait();
  });

  it("list product for buy ", async () => {
    const item = await EthkartInstance.Items(ITEM.id);
    expect(item.id).to.equal(ITEM.id);
  });

  before(async () => {
    let tranction;
    tranction = await EthkartInstance.connect(buyer).buy(ITEM.id, {
      value: ITEM.cost,
    });
    await tranction.wait();
  });
  it("ether", async () => {
    const result = await ethers.provider.getBalance(EthkartInstance.address);
    expect(result).to.equal(ITEM.cost);
  });
});
