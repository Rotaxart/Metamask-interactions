import { useRef, useState } from "react";
import { mintOrder } from "./api/mintOrder";
import "./App.css";
import { onChainParams } from "./config";
import { connectMetaMask } from "./metamask/connect";
import { signTx } from "./metamask/signTx";

function App() {
  const [signer, setSigner] = useState();
  const [provider, setProvider] = useState();
  const [error, setError] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [mintTxData, setMintTxData] = useState();

  const file = useRef();

  return (
    <div className="App">
      <header className="App-header">
        {signer && <p>{"your address: " + signer.address}</p>}
        {error && <p style={{ color: "red" }}>{"error: " + error}</p>}
        <button onClick={() => connectMetaMask(setSigner, setProvider)}>
          Connect MetaMask
        </button>
        <span>Image:</span>
        <input type="file" accept="image/png" ref={file} />
        <span>Name:</span>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <span>Description:</span>
        <input type="text" onChange={(e) => setDescription(e.target.value)} />

        <button
          onClick={() => {
            mintOrder(
              file.current.files[0],
              {
                description,
                name,
                collection: onChainParams.defaultCollection,
                toAddress: signer.address,
              },
              setError,
              setMintTxData,
            );
          }}
        >
          Create Mint Order
        </button>
        {mintTxData && (
          <>
            <p>tokenId: {mintTxData.tokenId}</p>
            {/* <p>txData: {mintTxData.txData}</p> */}
            <p>mintPrice: {mintTxData.txData.value}</p>
          </>
        )}

        <button
          onClick={() =>
            signTx(mintTxData.txData, mintTxData.tokenUrlTxData, setError)
          }
        >
          Send transaction
        </button>
      </header>
    </div>
  );
}

export default App;
