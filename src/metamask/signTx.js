import { ethers } from "ethers";
import { signer } from "./connect";

export async function signTx(txData, tokenUrlTxData, setError) {
  try {
    const tx = await signer.sendTransaction(txData);
    const tx2 = await signer.sendTransaction(tokenUrlTxData);
    const receipt = await tx.wait();
    const receipt2 = await tx2.wait();
    console.log(receipt, receipt2);
    return { receipt, receipt2 };
  } catch (error) {
    console.error(error);
    setError(error.message);
  }
}
