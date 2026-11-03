# HSK 朗读 · Frases

PWA mobile-first para praticar leitura e escuta de frases em chinês (nível HSK 1).

## Funcionalidades

- **20 frases** iniciais com hanzi, pinyin e tradução em português
- **TTS nativo** do navegador com **destaque caractere a caractere** em tempo real
- Pinyin e tradução **ocultos** — clique para revelar
- Sistema de domínio: Novo → Aprendendo → Conhecido → Dominado
- Modos de estudo: Sequencial, Aleatório, Só as fracas
- Progresso visual + reset
- 100% offline após o primeiro load
- Instalável como app (PWA)
- Design dark premium com acento âmbar (estilo Strong/Hevy)

## Como usar

1. Abra `index.html` em um servidor estático (ou use Live Server / qualquer hosting)
2. No celular: adicione à tela inicial
3. Clique em uma frase → Ouça enquanto lê o destaque amarelo
4. Revele pinyin/tradução quando quiser
5. Marque seu nível de domínio

## Stack

- HTML5 + CSS3 puro (variáveis + Flexbox)
- JavaScript vanilla (ES6+)
- localStorage
- Service Worker + Manifest
- SweetAlert2 (única dependência externa via CDN)

## Estrutura

```
/
├── index.html
├── css/styles.css
├── js/app.js
├── icons/icon.svg
├── manifest.json
└── sw.js
```

## Futuro

- Importar mais frases via JSON
- Mais vozes / velocidade ajustável
- Modo “ditado” (ouvir e escrever)

---

Feito com cuidado para estudo de chinês.