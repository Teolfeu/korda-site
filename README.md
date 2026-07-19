# korda-site

Landing do [Korda](https://github.com/Teolfeu/korda) em
<https://teolfeu.github.io/korda-site/>.

## Stack

HTML + CSS estáticos (tema claro, alinhado ao app). Sem React.

- `publish/index.html`
- `publish/styles.css`
- `publish/assets/` — logo, ícone, OG e screenshots do produto

## Local

```bash
npm run serve
# http://localhost:4177
```

## Publicar

```bash
npm run deploy
```

## Release

Ao publicar uma versão nova do app, atualize em `publish/index.html`:

- badge / título do download
- links do AppImage
- exemplos `chmod` / execução
