# korda-site

Landing page do [Korda](https://github.com/Teolfeu/korda), publicada em
<https://teolfeu.github.io/korda-site/>.

## Stack

HTML e CSS estáticos (tema escuro), com um pequeno script para o menu mobile.
Sem React, sem bundler na publicação.

Arquivos servidos:

- `publish/index.html`
- `publish/styles.css`
- `publish/korda-mark.png`
- `publish/assets/` (ícone e Open Graph)

## Local

```bash
npm run serve
# http://localhost:4177
```

## Publicar

```bash
npm run deploy
```

Isso envia o conteúdo de `publish/` para a branch `gh-pages`.

## Conteúdo

Os textos e o link de download devem acompanhar a release atual do app
(`Korda-0.1.1-x86_64.AppImage` na v0.1.1). Ao lançar uma versão nova, atualize
badge, exemplos de `chmod` e os botões de download em `publish/index.html`.
