const NodeRSA = require("encrypt-rsa").default;
const fs = require("fs");
const path = require("path");

const nodeRSA = new NodeRSA();

// Create public and private keys
const getKeys = () => {
  const pathPublicKey = path.join(__dirname, "./public-key");
  const pathPrivateKey = path.join(__dirname, "./private-key");

  let savedPublicKey = fs.existsSync(pathPublicKey);
  let savedPrivateKey = fs.existsSync(pathPrivateKey);
  
  if (!savedPublicKey || !savedPrivateKey) {
    const { privateKey, publicKey } = nodeRSA.createPrivateAndPublicKeys();
    savedPublicKey = publicKey;
    savedPrivateKey = privateKey;
    
    fs.writeFileSync("./private-key", privateKey);
    fs.writeFileSync("./public-key", publicKey);
  }

  savedPublicKey = fs.readFileSync(pathPublicKey, { encoding: "utf8" });
  savedPrivateKey = fs.readFileSync(pathPrivateKey, { encoding: "utf8" });

  return { 
    privateKey: savedPrivateKey,
    publicKey: savedPublicKey,
  }
}

const { privateKey, publicKey } = getKeys();

const pathMessage = path.join(__dirname, "./message.txt");
const inputText = fs.readFileSync(pathMessage, { encoding: "utf8" });

const encryptedText = nodeRSA.encryptStringWithRsaPublicKey({ 
  text: inputText, 
  publicKey,
});

console.log({ encryptedText });
fs.writeFileSync("./cyphered-message", encryptedText);

const decryptedText = nodeRSA.decryptStringWithRsaPrivateKey({ 
  text: encryptedText, 
  privateKey,
});

console.log({ decryptedText });
