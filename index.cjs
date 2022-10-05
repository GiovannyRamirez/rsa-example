const NodeRSA = require("encrypt-rsa").default;
const fs = require("fs");
const path = require("path");

const nodeRSA = new NodeRSA();

// Create public and private keys
const getKeys = () => {
  const pathPublicKey = path.join(__dirname, "./public-key");
  const pathPrivateKey = path.join(__dirname, "./private-key");

  // Check if files exists
  let savedPublicKey = fs.existsSync(pathPublicKey);
  let savedPrivateKey = fs.existsSync(pathPrivateKey);
  
  if (!savedPublicKey || !savedPrivateKey) {
    // If not exists, nodeRSA generates both and write and save both keys into folder
    const { privateKey, publicKey } = nodeRSA.createPrivateAndPublicKeys();
    savedPublicKey = publicKey;
    savedPrivateKey = privateKey;
    
    fs.writeFileSync("./private-key", privateKey);
    fs.writeFileSync("./public-key", publicKey);
  }

  // Read the values of keys
  savedPublicKey = fs.readFileSync(pathPublicKey, { encoding: "utf8" });
  savedPrivateKey = fs.readFileSync(pathPrivateKey, { encoding: "utf8" });

  return { 
    privateKey: savedPrivateKey,
    publicKey: savedPublicKey,
  }
}

const { privateKey, publicKey } = getKeys();

// Read message file
const pathMessage = path.join(__dirname, "./message.txt");
const inputText = fs.readFileSync(pathMessage, { encoding: "utf8" });

// Encrypt and save message.txt into folder
const encryptedText = nodeRSA.encryptStringWithRsaPublicKey({ 
  text: inputText, 
  publicKey,
});

console.log({ encryptedText });
fs.writeFileSync("./cyphered-message.txt", encryptedText);

// Decrypt cyphered-message.txt
const decryptedText = nodeRSA.decryptStringWithRsaPrivateKey({ 
  text: encryptedText, 
  privateKey,
});

console.log({ decryptedText });
