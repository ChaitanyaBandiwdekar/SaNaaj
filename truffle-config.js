const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {  
      host: "localhost",
      port: 8545,
      network_id: "*"
    },
    // truffle console --network=ganache
    // compile -all
    // migrate --reset 
    // https://youtu.be/YYJgeV7sOvM
    ganache: {
      host: "localhost",
      port: 8545,
      network_id: "5777", // Match any network id
    }
  },
  solc: {
    optimizer: {
        enabled: true,
        runs: 1,
    }
}
};
