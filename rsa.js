const NodeRSA = require('node-rsa');
const fs = require('fs');

const key = new NodeRSA({b: 512});

if(obtenerParametro('--cifrar') != null){
	
	let key = generarKey(fs);
	
	let textoCifrar = obtenerParametro('--cifrar');
	
	const textoCifrado = cifrar(key,textoCifrar);
	escribirArchivo('cifrado.txt',textoCifrado,fs);
	console.log('Mensaje cifrado: ' + 'cifrado.txt');
	exportarLlavePublica(key,'llavePublica');
	exportarLlavePrivada(key,'llavePrivada');
	
	
}else if (obtenerParametro('--descifrar')!=null){
	if(obtenerParametro('--llavePrivada')!=null){
		let archivoCifrado = obtenerParametro('--descifrar');
		let mensajeCifrado = leerArchivo(archivoCifrado,fs);
		let key = obtenerLlavePrivada(obtenerParametro('--llavePrivada'),fs);
		let descifrado = descifrar(key,mensajeCifrado);
		console.log('Mensaje descifrado: ' + descifrado);
		escribirArchivo('Descifrado.txt',descifrado,fs);
		console.log('Mensaje guardado en: ' + 'Descifrado.txt');
	}else{
		console.log('Especifique el archivo de la lave privada con el parametro --llavePrivada');
		console.log('ingrese el parametro --help para ver las opciones.');
	}
	
	
	
}else if(existeParametro('--help')){
	imprimirAyuda();
}
else{
	console.log('Especifique si se desa cifrar o descifrar, ingrese el parametro --help para ver las opciones.');
}

function obtenerLlavePrivada(url, fs){
	 let txtArchivo = leerArchivo(url,fs);
	 let key = new NodeRSA(txtArchivo.toString('utf8'));
	 return key;
}

function obtenerLlavePublica(url, fs){
	 let txtArchivo = leerArchivo(url,fs);
	 return new NodeRSA(txtArchivo.toString('utf8'),'pkcs8');
}

function leerArchivo(url, fs){
	console.log(url);
	let j = fs.readFileSync(url);
	return j.toString('utf8');
}

function cifrar(publicKey,textoCifrar){
	return publicKey.encrypt(textoCifrar, 'base64');
}

function descifrar(privateKey,textoDescifrar){
	return privateKey.decrypt(textoDescifrar, 'utf8');
}

function exportarLlavePublica(Key,nombreArchivo){
	let b = Key.exportKey('pkcs1-public-pem');
	fs.writeFileSync(nombreArchivo+'.pem', b.toString('base64'));
	console.log('Llave publica generada: ' + nombreArchivo+'.pem');
}

function exportarLlavePrivada(Key,nombreArchivo){
	let b = Key.exportKey('pkcs1-private-pem');
	fs.writeFileSync(nombreArchivo+'.pem', b.toString('base64'));
	console.log('Llave privada generada: ' + nombreArchivo+'.pem');
}

function escribirArchivo(nombreArchivo,texto,fs){
	fs.writeFileSync(nombreArchivo, texto.toString('base64'));
}

function obtenerParametro(parametro){
	for(let i = 0;i<process.argv.length;i++){
		if(process.argv[i] == parametro){
			return process.argv[i+1];
		}
	}
	return null;
}

function existeParametro(parametro){
	for(let i = 0;i<process.argv.length;i++){
			return process.argv[i+1];
		if(process.argv[i] == parametro){
		return true;
		}
	}
	return false;
}

function generarKey(fs){
	return obtenerParametro('llavePublica')?obtenerLlavePublica(obtenerParametro('llavePublica'),fs):new NodeRSA({b: 512});
}

function imprimirAyuda(){
	console.log('-- HERRAMIENTA CIFRADO/DESCIFRADO RSA --\n',
				'Para cifrar:\n',
				'	rsa --cifrar <mensaje>\n',
				'	Ejemplo: rsa --cifrar "Hola mundo!"\n',
				'	Al cifrar se generan 3 archivos, la llave publica, privada y el mensaje codificado.\n',
				'Para descifrar:\n',
				'	rsa --descifrar <nombre_archivo> --llavePrivada <archivo_llave_privada>\n',
				'	Ejemplo: rsa --descifrar cifrado.txt --llavePrivada llavePrivada.pem\n',
				'	Al descifrar se genera un archivo con el mensaje descifrado.')
}