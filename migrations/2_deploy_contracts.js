var SimpleStorage = artifacts.require("../SimpleStorage.sol");
var Sanaaj = artifacts.require("./Sanaaj.sol");
var Test = artifacts.require("./Test.sol")

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage, "kaju katli");
  deployer.deploy(Sanaaj, "Demo grain", 0, "Customer", "Merchant");
  deployer.deploy(Test);
};
