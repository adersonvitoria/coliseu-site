# Coliseu — Site de demonstração com atendimento IA no WhatsApp

Réplica da vitrine da **Coliseu Joalheria** (coliseu.com.br) com o **atendimento por IA integrado no WhatsApp**: o botão verde abre a **Íris**, concierge digital que conhece o catálogo completo (479 peças reais, com fotos e preços do site público), qualifica presentes, apresenta alianças, roteia o cliente para a mais próxima das 14 lojas (RS/SC), agenda experiências, contorna objeções e fecha a venda com PIX ou link 12x.

**Objetivo:** demonstração comercial da funcionalidade de atendimento via WhatsApp para a diretoria da Coliseu. Em produção, a mesma conversa roda no WhatsApp oficial da loja (ex.: Evolution API / WhatsApp Cloud API) — aqui ela roda no navegador para a apresentação.

## Onde tocar para ver o robô

- Botão flutuante do WhatsApp (canto inferior direito);
- **Comprar pelo WhatsApp** em qualquer produto (abre a conversa já com a peça);
- CTAs do hero ("coleção Nido/Colosseo"), busca, sacola, links do rodapé (troca, Livelo, consertos, corporativo) — tudo demonstra um fluxo diferente da Íris.

## Rodar localmente

É estático (HTML/CSS/JS puro):

```bash
python -m http.server 8769
# http://localhost:8769
```

## Estrutura

- `index.html` — vitrine (header, hero com banners oficiais, categorias, 4 grades do catálogo real, faixa MAM, 14 lojas, rodapé) + janela do WhatsApp;
- `js/iris-engine.js` — engine da Íris (catálogo `PRODUTOS`, lojas `FILIAIS`, cérebro `responder()`), extraída do projeto irmão `joalheria-bots`;
- `js/site.js` — vitrines dinâmicas, slider, controle da janela e "comprar pelo WhatsApp";
- `pecas/` — fotos oficiais das peças; `img/` — banners de campanha; `logo.webp` — logo oficial.

> **Aviso:** demonstração não oficial para apresentação comercial à própria Coliseu. Fotos, preços, endereços e marca pertencem à Coliseu Joalheria (dados do site público, jul/2026). Página com `noindex`; nenhum pagamento real é processado.
