import { writeFile } from "fs/promises";
const PORT = 5173;
const HOST = 'localhost';
const TYPE = 'http://'
export default function () {
  return  {
    name: "file-transfrom",
    // enforce: 'post',
    transform() {

    },

    // configureServer(server) {
      
    // }
    async transformIndexHtml(html: string, { server }) {
      const { port, https, host } = server.config.server;
      console.log(port)
      const tPort = port || PORT;
      const tHost = !host ? 'localhost' : '127.0.0.1';
      const tType = https ? 'https://' : 'http://';
      const htmlExecs = /<script.*?>(.+?)<\/script>/s.exec(html);
      const data = new Uint8Array(Buffer.from(htmlExecs[1]));
      await writeFile('src/template/ex1.js', data);
      const prefix = `${tType}${tHost}:${tPort}`;
      const extensionHtml = html.replace(/<script.*?>(.+?)<\/script>/s, `<script type="module" src="/src/template/ex1.js"></script>`);
      const finalHtml = extensionHtml.replace(/src=["'](.*?)["']/sg, `src="${prefix}$1"`);
      await writeFile(
        'dist/index.html',
        new Uint8Array(Buffer.from(finalHtml))
      )
      return html;
    }
  }
}