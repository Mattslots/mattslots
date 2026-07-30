const http = require("http");
function startHealthServer(client) {
  const port = Number(process.env.PORT || 10000);
  const server = http.createServer((req, res) => {
    if (req.url === "/health") {
      res.writeHead(client.isReady() ? 200 : 503, { "content-type": "application/json" });
      return res.end(JSON.stringify({ ok: client.isReady(), bot: client.user?.tag || null, uptime: process.uptime() }));
    }
    res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
    res.end("MattSlots Bot V5.1 est en ligne.");
  });
  server.listen(port, "0.0.0.0", () => console.log(`✅ Serveur de santé actif sur le port ${port}`));
}
module.exports = { startHealthServer };
