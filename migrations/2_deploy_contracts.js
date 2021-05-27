var SupplyChainContract = artifacts.require("./SupplyChain.sol");
var ManufacturerContract = artifacts.require("./Manufacturer.sol")

module.exports = function(deployer) {
  deployer.deploy(ManufacturerContract);
  deployer.deploy(SupplyChainContract, {gas: 15555555});
};
