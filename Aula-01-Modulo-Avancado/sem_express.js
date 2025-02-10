const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });

    res.write("Deu tudo certo!\n"); // Continua escrevendo no corpo da resposta
    res.end("Olá, meu servidor JS está rodando, uhuuuuu!!!"); // Finaliza a resposta
});

// Definindo a porta e iniciando o servidor
server.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
