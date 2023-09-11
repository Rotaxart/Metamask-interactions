import * as ethers from "ethers";
import { onChainParams } from "../config";

let signer = null;
let provider;

export async function connectMetaMask(setSigner, setProvider) {
  if (window.ethereum == null) {
    // If MetaMask is not installed, we use the default provider,
    // which is backed by a variety of third-party services (such
    // as INFURA). They do not have private keys installed so are
    // only have read-only access
    console.log("MetaMask not installed; using read-only defaults");
    provider = ethers.getDefaultProvider();
  } else {
    // Connect to the MetaMask EIP-1193 object. This is a standard
    // protocol that allows Ethers access to make all read-only
    // requests through MetaMask.
    try {
      console.log("switch");
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: onChainParams.network.chainId }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [onChainParams.network],
          });
        } catch (error) {
          // handle "add" error
          console.error(error);
        }
      }
      // handle other "switch" errors
    }

    provider = new ethers.BrowserProvider(window.ethereum);

    // It also provides an opportunity to request access to write
    // operations, which will be performed by the private key
    // that MetaMask manages for the user.
    signer = await provider.getSigner();
    setSigner(signer);
    setProvider(provider);
  }
}

export { signer, provider };
