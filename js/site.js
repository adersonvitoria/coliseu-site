/* ===== Coliseu site demo — vitrine + integração do atendimento WhatsApp ===== */

const ZAP_SVG = '<svg viewBox="0 0 32 32"><path fill="currentColor" d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-1.6c1.2.4 2.5.6 3.8.6 6.6 0 12-5.4 12-12S22.6 3 16 3zm6.6 17c-.3.8-1.6 1.5-2.2 1.6-.6.1-1.3.4-4.2-.9-3.5-1.5-5.8-5-6-5.3-.2-.2-1.4-1.9-1.4-3.5 0-1.7.9-2.5 1.2-2.8.3-.3.6-.4.9-.4h.6c.2 0 .5-.1.7.5.3.7.9 2.3 1 2.4.1.2.1.4 0 .6-.1.2-.2.4-.4.6-.2.2-.4.5-.5.6-.2.2-.4.4-.2.7.2.4.9 1.5 1.9 2.4 1.3 1.2 2.4 1.5 2.7 1.7.3.2.5.1.7-.1.2-.2.8-.9 1-1.2.2-.4.5-.3.8-.2.3.1 2 1 2.4 1.1.4.2.6.3.7.4.1.3.1.9-.2 1.8z"/></svg>';

/* ---------- vitrines a partir do catálogo real ---------- */
function cardProduto(p){
  const nome = p.nome.length > 44 ? p.nome.slice(0, 44).trimEnd() + '…' : p.nome;
  return `<div class="prod" data-peca="${p.id}" title="${p.nome.replace(/"/g, '&quot;')}">
    <img src="${p.img}" alt="${p.nome.replace(/"/g, '&quot;')}" loading="lazy">
    <div class="nm">${nome}</div>
    <div class="pr">${fmtBRL(p.preco)}</div>
    <div class="pc">até 12x de ${fmtBRL2(Math.round(p.preco / 12 * 100) / 100)} sem juros</div>
    <button class="zbt" type="button">${ZAP_SVG} Comprar pelo WhatsApp</button>
  </div>`;
}
function renderVitrines(){
  document.querySelectorAll('[data-grid]').forEach(g => {
    const cat = g.dataset.grid;
    const itens = PRODUTOS
      .filter(p => p.cat === cat && p.img)
      .sort((a, b) => (b.hero ? 1 : 0) - (a.hero ? 1 : 0) || b.preco - a.preco)
      .slice(0, 8);
    g.innerHTML = itens.map(cardProduto).join('');
  });
}
function renderLojas(){
  document.getElementById('gridLojas').innerHTML = FILIAIS.map(f => `
    <div class="loja">
      <b>${f.nome}</b>
      <span class="sh">${f.shopping}</span>
      <span class="en">${f.end} — ${f.cidade}/${f.uf}<br>📱 ${f.fone}</span>
    </div>`).join('');
}

/* ---------- hero slider ---------- */
(function(){
  const slides = document.querySelectorAll('.hero .slide');
  const dots = document.querySelectorAll('.dots i');
  let atual = 0;
  setInterval(() => {
    atual = (atual + 1) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('on', i === atual));
    dots.forEach((d, i) => d.classList.toggle('on', i === atual));
  }, 5200);
})();

/* ---------- janela do WhatsApp ---------- */
const zapPop = document.getElementById('zapPop');
const zapFab = document.getElementById('zapFab');
const zapBadge = document.getElementById('zapBadge');
let zapIniciado = false;

function abrirZap(){
  zapPop.classList.add('on');
  zapBadge.style.display = 'none';
  if (!zapIniciado){ zapIniciado = true; resetChat(); }
  setTimeout(() => chatInput && chatInput.focus(), 350);
}
function fecharZap(){ zapPop.classList.remove('on'); }

zapFab.addEventListener('click', () => zapPop.classList.contains('on') ? fecharZap() : abrirZap());
document.getElementById('zapFechar').addEventListener('click', fecharZap);

const esperarBot = async () => {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  await wait(250);
  for (let i = 0; i < 90; i++){
    if (!botBusy && chipsRow.children.length) break;
    await wait(160);
  }
};

/* clique em produto → detalhe direto na conversa */
async function comprarPeloZap(id){
  const p = PRODUTOS.find(x => x.id === id);
  if (!p) return;
  abrirZap();
  await esperarBot();
  if (botBusy) return;
  botBusy = true;
  try {
    addMsg('out', `Olá! Vi no site e me interessei: <b>${p.nome}</b>`);
    chat.lastList = [p];
    const d = detalhes(p);
    await botSay(d.msgs, d.chips);
  } finally {
    botBusy = false;
  }
}
document.addEventListener('click', e => {
  const card = e.target.closest('.prod');
  if (card) comprarPeloZap(parseInt(card.dataset.peca, 10));
});

/* elementos com data-zap → abre conversa (com mensagem opcional) */
document.querySelectorAll('[data-zap]').forEach(el => {
  el.addEventListener('click', async ev => {
    if (el.tagName === 'A' && el.getAttribute('href') === '#') ev.preventDefault();
    const msg = el.dataset.zap;
    abrirZap();
    if (msg){
      await esperarBot();
      sendUser(msg);
    }
  });
});

/* busca e sacola também demonstram o atendimento */
document.getElementById('btnBusca').addEventListener('click', async () => {
  abrirZap(); await esperarBot();
  sendUser('Quero ver o catálogo');
});
document.getElementById('btnSacola').addEventListener('click', async () => {
  abrirZap(); await esperarBot();
  sendUser('Quero finalizar uma compra');
});

/* ---------- boot ---------- */
renderVitrines();
renderLojas();
