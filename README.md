# Korda Site

Landing page pública do Korda, uma interface local e visual para conectar e acompanhar agentes executados em terminais.

Este repositório contém somente o site institucional em React e Vite. Ele não contém o aplicativo desktop, seus processos PTY ou o runtime de orquestração.

## Desenvolvimento

Requer Node.js 22 ou versão compatível.

```bash
npm ci
npm run dev
```

## Build

```bash
npm run build
```

O resultado é gerado em `dist/`. O Vite usa `base: "./"`, permitindo publicar o mesmo build na raiz ou em um subdiretório do GitHub Pages.

## Publicação

O site é publicado no GitHub Pages a partir da branch `gh-pages`. Para enviar uma nova versão:

```bash
npm run deploy
```

O repositório publica somente a landing. O aplicativo desktop e seus binários permanecem separados. Este repositório não possui licença de reutilização e não deve ser descrito como open source.
