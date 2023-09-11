import axios from "axios";
import { serverAddress } from "../config";

export async function mintOrder(file, params, setError, setMintTxData) {
  try {
    const formData = new FormData();
    const newData = Object.entries(params);
    newData.forEach((item) => formData.append(item[0], item[1]));
    formData.append("data", file);

    const { data } = await axios.post(
      serverAddress + "nft/mintOrder",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
    setMintTxData(data);
    return data;
  } catch (error) {
    console.log(error);
    setError(error.response.data.error);
  }
}
