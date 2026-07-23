/* ===== Coliseu site demo — vitrine (layout real) + atendimento WhatsApp ===== */

const ZAP_SVG = '<svg viewBox="0 0 32 32"><path fill="currentColor" d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-1.6c1.2.4 2.5.6 3.8.6 6.6 0 12-5.4 12-12S22.6 3 16 3zm6.6 17c-.3.8-1.6 1.5-2.2 1.6-.6.1-1.3.4-4.2-.9-3.5-1.5-5.8-5-6-5.3-.2-.2-1.4-1.9-1.4-3.5 0-1.7.9-2.5 1.2-2.8.3-.3.6-.4.9-.4h.6c.2 0 .5-.1.7.5.3.7.9 2.3 1 2.4.1.2.1.4 0 .6-.1.2-.2.4-.4.6-.2.2-.4.5-.5.6-.2.2-.4.4-.2.7.2.4.9 1.5 1.9 2.4 1.3 1.2 2.4 1.5 2.7 1.7.3.2.5.1.7-.1.2-.2.8-.9 1-1.2.2-.4.5-.3.8-.2.3.1 2 1 2.4 1.1.4.2.6.3.7.4.1.3.1.9-.2 1.8z"/></svg>';

const nnm = p => norm(p.nome + ' ' + (p.desc || ''));

/* ---------- cards de produto ---------- */
function cardProduto(p){
  const nome = p.nome.length > 46 ? p.nome.slice(0, 46).trimEnd() + '…' : p.nome;
  return `<div class="prod" data-peca="${p.id}" title="${p.nome.replace(/"/g, '&quot;')}">
    <span class="off">0%OFF</span>
    <img src="${p.img}" alt="${p.nome.replace(/"/g, '&quot;')}" loading="lazy">
    <div class="nm">${nome}</div>
    <div class="pr">${fmtBRL(p.preco)}</div>
    <div class="pc">12x de ${fmtBRL2(Math.round(p.preco / 12 * 100) / 100)}</div>
    <button class="zbt" type="button">${ZAP_SVG} Comprar pelo WhatsApp</button>
  </div>`;
}

/* ---------- carrosséis (como no site real: fileira com setas) ---------- */
const FILTROS_CARR = {
  way:      p => p.cat === 'joia' && nnm(p).includes('way'),
  armacoes: p => p.cat === 'oculos' && nnm(p).includes('grau'),
  relogios: p => p.cat === 'relogio',
  bubble:   p => p.cat === 'prata' && nnm(p).includes('bubble')
};
function renderCarrosseis(){
  document.querySelectorAll('[data-carr]').forEach(c => {
    const filtro = FILTROS_CARR[c.dataset.carr] || (() => false);
    const itens = PRODUTOS.filter(p => p.img && filtro(p))
      .sort((a, b) => (b.hero ? 1 : 0) - (a.hero ? 1 : 0) || b.preco - a.preco)
      .slice(0, 10);
    const box = document.createElement('div');
    box.className = 'carr-box wrap';
    c.parentNode.insertBefore(box, c);
    c.classList.remove('wrap');
    box.appendChild(c);
    c.innerHTML = itens.map(cardProduto).join('');
    const bE = document.createElement('button'); bE.className = 'c-seta e'; bE.textContent = '‹';
    const bD = document.createElement('button'); bD.className = 'c-seta d'; bD.textContent = '›';
    box.appendChild(bE); box.appendChild(bD);
    bE.addEventListener('click', () => c.scrollBy({ left: -c.clientWidth * .8, behavior: 'smooth' }));
    bD.addEventListener('click', () => c.scrollBy({ left: c.clientWidth * .8, behavior: 'smooth' }));
  });
}

/* ---------- cards de categoria com foto de produto ---------- */
function achaFoto(filtro){
  const p = PRODUTOS.find(x => x.img && filtro(x));
  return p ? p.img : 'pecas/p13.webp';
}
function renderRelCats(){
  const cats = [
    ['Relógios Masculinos', 'Quero ver relógios masculinos', p => p.cat === 'relogio' && p.quem === 'ele'],
    ['Relógios Femininos',  'Quero ver relógios femininos',  p => p.cat === 'relogio' && p.quem === 'ela'],
    ['Novidades',           'Quero ver relógios',            p => p.cat === 'relogio' && p.hero],
    ['Automáticos',         'Quero um relógio automático',   p => p.cat === 'relogio' && nnm(p).includes('automatic')],
    ['Smartwatch',          'Tem smartwatch?',               p => p.cat === 'relogio' && nnm(p).includes('smartwatch')],
    ['Relógios de Mergulho','Quero um relógio de mergulho',  p => p.cat === 'relogio' && nnm(p).includes('mergulho')]
  ];
  document.getElementById('relCats').innerHTML = cats.map(([t, msg, f]) =>
    `<button class="cardp" data-zap="${msg}"><img src="${achaFoto(f)}" alt="" loading="lazy" style="object-fit:contain;background:#fff;border:1px solid #f0f0f0"><span>${t}</span></button>`).join('');
}
function renderPrataCats(){
  const cats = [
    ['Anéis',      'Quero ver anéis de prata',       p => p.cat === 'prata' && p.art === 'anel'],
    ['Brincos',    'Quero ver brincos de prata',     p => p.cat === 'prata' && p.art === 'brinco'],
    ['Pulseiras',  'Quero ver pulseiras de prata',   p => p.cat === 'prata' && p.art === 'pulseira'],
    ['Alianças',   'Quero alianças de prata',        p => p.cat === 'prata' && p.art === 'alianca'],
    ['Pingentes',  'Quero ver pingentes de prata',   p => p.cat === 'prata' && p.art === 'pingente'],
    ['Correntes e Gargantilhas', 'Quero ver gargantilhas de prata', p => p.cat === 'prata' && p.art === 'colar']
  ];
  document.getElementById('prataCats').innerHTML = cats.map(([t, msg, f]) =>
    `<button class="cardp" data-zap="${msg}"><img src="${achaFoto(f)}" alt="" loading="lazy" style="object-fit:contain;background:#fff;border:1px solid #f0f0f0"><span>${t}</span></button>`).join('');
}
function renderEyewear(){
  document.getElementById('ebSol').src  = achaFoto(p => p.cat === 'oculos' && nnm(p).includes('sol'));
  document.getElementById('ebGrau').src = achaFoto(p => p.cat === 'oculos' && nnm(p).includes('grau'));
}
function renderLojas(){
  document.getElementById('gridLojas').innerHTML = FILIAIS.map(f => `
    <div class="loja">
      <b>${f.nome}</b>
      <span class="sh">${f.shopping}</span>
      <span class="en">${f.end} — ${f.cidade}/${f.uf}<br>📱 ${f.fone}</span>
    </div>`).join('');
}

/* ---------- hero slider com setas ---------- */
(function(){
  const slides = document.querySelectorAll('.hero .slide');
  const dots = document.querySelectorAll('#heroDots i');
  let atual = 0, timer;
  const vai = n => {
    atual = (n + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('on', i === atual));
    dots.forEach((d, i) => d.classList.toggle('on', i === atual));
  };
  const auto = () => { clearInterval(timer); timer = setInterval(() => vai(atual + 1), 6000); };
  document.getElementById('heroPrev').addEventListener('click', () => { vai(atual - 1); auto(); });
  document.getElementById('heroNext').addEventListener('click', () => { vai(atual + 1); auto(); });
  auto();
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
function ligaDataZap(){
  document.querySelectorAll('[data-zap]').forEach(el => {
    if (el.dataset.zapOk) return;
    el.dataset.zapOk = '1';
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
}

/* busca → pergunta direto pra Íris */
document.getElementById('formBusca').addEventListener('submit', async ev => {
  ev.preventDefault();
  const q = document.getElementById('inpBusca').value.trim();
  abrirZap();
  await esperarBot();
  sendUser(q || 'Quero ver o catálogo');
  document.getElementById('inpBusca').value = '';
});
document.getElementById('btnSacola').addEventListener('click', async () => {
  abrirZap(); await esperarBot();
  sendUser('Quero finalizar uma compra');
});
document.getElementById('formNews').addEventListener('submit', async ev => {
  ev.preventDefault();
  abrirZap(); await esperarBot();
  sendUser('Quero me cadastrar para receber as novidades');
});

/* ---------- boot ---------- */
renderCarrosseis();
renderRelCats();
renderPrataCats();
renderEyewear();
renderLojas();
ligaDataZap();
