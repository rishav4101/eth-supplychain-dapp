const SupplyChainContract = artifacts.require('SupplyChain.sol')

module.exports = function (deployer) {
  deployer.deploy(SupplyChainContract)
}
