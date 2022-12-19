const { Avalanche, BinTools, BN, evm } = require("avalanche")

// Importing node details and Private key from the config file.
const { evmBase, pBase, xBase, cBase, privKey } = require("../configs/config")

// For encoding and decoding to CB58 and buffers.
const bintools = BinTools.getInstance()

// Avalanche instance with 3rd party API endpoints
const skip = (num) => new Array(num);
const avalanche = new Avalanche(...skip(3), 5, ...skip(2), "fuji")

const platform = avalanche.PChain()
platform.setBaseURL(pBase)
const xchain = avalanche.XChain()
xchain.setBaseURL(xBase)
const cchain = avalanche.CChain()
cchain.setBaseURL(cBase)

// Avalanche instance with independent node
// const avalanche = new Avalanche(
//   "0.0.0.0", // ip
//   14760, // port
//   "http", // protocol
//   5, // fuji: 43113, mainnet: 43114, local: 1337
// )
//
// const platform = avalanche.PChain()
// const xchain = avalanche.XChain()
// const cchain = avalanche.CChain()

const info = avalanche.Info()
info.setBaseURL(cBase)

// Keychain for signing transactions
const pKeyChain = platform.keyChain()
pKeyChain.importKey(privKey)
const pAddressStrings = pKeyChain.getAddressStrings()

// UTXOs for spending unspent outputs
const utxoSet = async () => {
  const platformUTXOs = await platform.getUTXOs(pAddressStrings)
  return platformUTXOs.utxos
}

// Exporting these for other files to use
module.exports = {
  platform,
  info,
  pKeyChain,
  pAddressStrings,
  bintools,
  utxoSet,
  BN,
  xchain,
  cchain,
}