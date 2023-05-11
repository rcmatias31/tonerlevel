function getTonerLevel(printerName) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:631/printers/" + printerName, true);
  xhr.setRequestHeader("Content-Type", "application/ipp");

  // Cria o comando IPP para obter as informações de toner
  var ippRequest = new Uint8Array([
    0x01, 0x01, 0x00, 0x0A, 0x47, 0x45, 0x54, 0x2D, 0x50, 0x52, 0x49, 0x4E, 0x54, 0x45, 0x52, 0x53, 0x00, 
    0x01, 0x03, 0x00, 0x17, 0x00, 0x00, 0x00, 0x07, 0x49, 0x6E, 0x71, 0x75, 0x69, 0x72, 0x65, 0x00,
    0x47, 0x65, 0x74, 0x54, 0x6F, 0x6E, 0x65, 0x72, 0x00, 0x02, 0x03, 0x00, 0x01, 0x2A, 0x04, 0x82,
    0x01, 0x7F, 0x48, 0x01, 0x2A, 0x01, 0x42, 0x04, 0x00, 0x00, 0x00, 0x00
  ]);
  var ippRequestLength = ippRequest.length;
  var ippRequestBuffer = new ArrayBuffer(ippRequestLength);
  var ippRequestView = new Uint8Array(ippRequestBuffer);
  ippRequestView.set(ippRequest, 0);

  xhr.send(ippRequestBuffer);

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Lê a resposta da impressora com as informações de toner
        var response = xhr.response;
        var toner = parseInt(response[22]);

        // Retorna o nível de toner em percentual
        console.log("O nível de toner da impressora é " + toner + "%");
      } else {
        console.log("Erro ao obter as informações de toner da impressora.");
      }
    }
  }
}

// Exemplo de uso da função
getTonerLevel("Nome da Impressora");