- First you have to install dependencies `npm install`.
- You have to write in message.txt and do not delete it.

# rsa-example-1
- Run through `node index.cjs`.
- Code generates files:
  - private-key
  - public-key
- Check in console encrypted and decrypted message.
- Code generates file:
  - cyphered-message.txt

# rsa-example-2
- Cypher:
  - Run through `node rsa --cifrar <mensaje>`.
    - Example: `node rsa --cifrar message`.
  - Code generate files:
    - llavePrivada.pem
    - llavePublica.pem
    - cifrado.txt
- Decypher:
  - Run through `node rsa --descifrar <archivo> --llavePrivada <archivoLLavePrivada>`.
    - Example: `node rsa --descifrar cifrado.txt --llavePrivada llavePrivada.pem`.
  - Code generate file:
    - Descifrado.txt

# Combined
- You should decypher cyphered-message.txt from rsa-example-1 with rsa-example-2 doing:
  - First run `node index.cjs`.
  - After that run `node rsa --descifrar cyphered-text.txt --llavePrivada private-key`.
  - Check Descifrado.txt.
    - It must be equal to message.txt
