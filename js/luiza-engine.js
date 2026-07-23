/* =====================================================================
   Luiza — engine de atendimento (extraída do demo joalheria-bots)
   Catálogo, filiais, preços e fotos: dados públicos do site coliseu.com.br
   ===================================================================== */
function pushVenda(){}
function pushAgenda(){}
let pedidoSeq = 2482;

const $  = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const fmtBRL = v => v.toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0});
const fmtBRL2 = v => v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const fmtInt = v => v.toLocaleString('pt-BR');

const USERS = [
  { email:'diretoria@coliseu.com.br', pass:'diretor123', nome:'Ricardo Vontobel', role:'diretor',
    cargo:'Diretoria · Rede Coliseu', filial:null },
  { email:'gerente.iguatemi@coliseu.com.br', pass:'gerente123', nome:'Camila Fraga', role:'gerente',
    cargo:'Gerente · Coliseu Iguatemi', filial:'iguatemi' }
];

/* ---------- 14 lojas reais da rede (site: coliseu.com.br/onde-encontrar) ---------- */
const FILIAIS = [
  { id:'iguatemi',    nome:'Coliseu Iguatemi',           shopping:'Iguatemi Porto Alegre',      end:'Av. João Wallig, 1800 — Passo D\'Areia', cidade:'Porto Alegre', uf:'RS', fone:'(51) 99971-9894', consultora:'Camila F.',  leads:152, vendas:29, receita:84200,  zonas:['iguatemi','passo d areia','zona norte'] },
  { id:'praiadebelas',nome:'Coliseu Praia de Belas',     shopping:'Praia de Belas Shopping',    end:'Av. Praia de Belas, 1181', cidade:'Porto Alegre', uf:'RS', fone:'(51) 98408-8226', consultora:'Renata S.',  leads:138, vendas:25, receita:71900,  zonas:['praia de belas','centro sul','menino deus'] },
  { id:'barrasul',    nome:'Coliseu Barra Sul',          shopping:'BarraShoppingSul',           end:'Av. Diário de Notícias, 300 — Cristal', cidade:'Porto Alegre', uf:'RS', fone:'(51) 99740-5082', consultora:'Vanessa R.', leads:121, vendas:21, receita:58300,  zonas:['barra','cristal','zona sul','ipanema','tristeza'] },
  { id:'moinhos',     nome:'Coliseu Moinhos',            shopping:'Moinhos Shopping',           end:'R. Olavo Barreto Viana, 36 — Moinhos de Vento', cidade:'Porto Alegre', uf:'RS', fone:'(51) 99600-1395', consultora:'Luiza T.',   leads:104, vendas:19, receita:55100,  zonas:['moinhos','independencia','auxiliadora'] },
  { id:'ipiranga',    nome:'Coliseu Bourbon Ipiranga',   shopping:'Bourbon Shopping Ipiranga',  end:'Av. Ipiranga, 5200 — Jardim Botânico', cidade:'Porto Alegre', uf:'RS', fone:'(51) 98408-8229', consultora:'Débora K.',  leads:98,  vendas:17, receita:48600,  zonas:['ipiranga','jardim botanico','partenon'] },
  { id:'country',     nome:'Coliseu Bourbon Country',    shopping:'Bourbon Country',            end:'Av. Túlio de Rose, 80 — Passo D\'Areia', cidade:'Porto Alegre', uf:'RS', fone:'(51) 98407-9861', consultora:'Marina C.',  leads:92,  vendas:15, receita:43900,  zonas:['country','tulio'] },
  { id:'wallig',      nome:'Coliseu Bourbon Wallig',     shopping:'Bourbon Shopping Wallig',    end:'Av. Assis Brasil, 2611 — Cristo Redentor', cidade:'Porto Alegre', uf:'RS', fone:'(51) 99615-6978', consultora:'Patrícia G.',leads:88,  vendas:14, receita:39400,  zonas:['wallig','assis brasil','cristo redentor'] },
  { id:'parkcanoas',  nome:'Coliseu Park Canoas',        shopping:'ParkShopping Canoas',        end:'Av. Farroupilha, 4545 — Canoas', cidade:'Canoas', uf:'RS', fone:'(51) 98408-8227', consultora:'Fernanda L.',leads:84,  vendas:13, receita:36800,  zonas:['canoas','park canoas'] },
  { id:'andradas',    nome:'Coliseu Andradas',           shopping:'Loja histórica — desde 1968',end:'R. dos Andradas, 1593 — Centro Histórico', cidade:'Porto Alegre', uf:'RS', fone:'(51) 99747-7162', consultora:'Paulo M.',   leads:79,  vendas:12, receita:33500,  zonas:['andradas','centro historico','rua da praia'] },
  { id:'villagio',    nome:'Coliseu Villagio',           shopping:'Shopping Villagio Caxias',   end:'Rod. RSC 453, 2780 — Caxias do Sul', cidade:'Caxias do Sul', uf:'RS', fone:'(54) 99601-5860', consultora:'Bruna P.',   leads:74,  vendas:11, receita:30200,  zonas:['caxias','villagio','serra'] },
  { id:'bourbonnh',   nome:'Coliseu Bourbon NH',         shopping:'Bourbon Novo Hamburgo',      end:'Av. Nações Unidas, 2001 — Novo Hamburgo', cidade:'Novo Hamburgo', uf:'RS', fone:'(51) 99674-1304', consultora:'Aline W.',   leads:68,  vendas:10, receita:27700,  zonas:['novo hamburgo','vale dos sinos','sao leopoldo','nh'] },
  { id:'camboriu',    nome:'Coliseu Balneário Camboriú', shopping:'Balneário Camboriú',         end:'Av. Santa Catarina, 01 — Estados', cidade:'Balneário Camboriú', uf:'SC', fone:'(48) 99111-1713', consultora:'Carol D.',   leads:62,  vendas:10, receita:29400,  zonas:['camboriu','balneario','bc'] },
  { id:'joinville',   nome:'Coliseu Joinville',          shopping:'Joinville',                  end:'Av. Rolf Wiest, 333 — Bom Retiro', cidade:'Joinville', uf:'SC', fone:'(47) 99160-7392', consultora:'Tatiane H.', leads:56,  vendas:9,  receita:26100,  zonas:['joinville'] },
  { id:'passofundo',  nome:'Coliseu Passo Fundo',        shopping:'Passo Fundo',                end:'Av. Presidente Vargas, 1610 — Vila Rodrigues', cidade:'Passo Fundo', uf:'RS', fone:'(54) 99699-1667', consultora:'Jéssica M.', leads:51,  vendas:9,  receita:27300,  zonas:['passo fundo','planalto'] }
];
const filialById = id => FILIAIS.find(f => f.id === id);

/* ---------- Catálogo (peças e preços reais do e-commerce) ---------- */
const PRODUTOS = [
  { id:1,  cat:'joia',    art:'anel',     quem:'ela', img:'pecas/p1.webp',  nome:'Anel Way ouro 18k',            desc:'Três linhas delicadas com 15 pts de Diamantes — Coleção Way', preco:5990, hero:true },
  { id:2,  cat:'joia',    art:'colar',    quem:'ela', img:'pecas/p2.webp',  nome:'Gargantilha Way ouro 18k',     desc:'Linhas delicadas com 8 pts de Diamantes', preco:6290 },
  { id:3,  cat:'joia',    art:'brinco',   quem:'ela', img:'pecas/p3.webp',  nome:'Brinco Way Ear Cuff ouro 18k', desc:'Duas linhas com Diamantes e gota de Esmeralda', preco:9900 },
  { id:4,  cat:'joia',    art:'anel',     quem:'ela', img:'pecas/p4.webp',  nome:'Anel Way aro delicado',        desc:'Ouro 18k com 9 pts de Diamantes — entrada da coleção', preco:3390 },
  { id:5,  cat:'joia',    art:'colar',    quem:'ela', img:'pecas/p5.webp',  nome:'Gargantilha Way ouro branco',  desc:'Duas linhas de Diamantes com gota de Safira Azul', preco:8990 },
  { id:6,  cat:'prata',   art:'colar',    quem:'ela', img:'pecas/p6.webp',  nome:'Gargantilha Bubble prata 925', desc:'Módulos circulares com bolhas de Zircônias — For Me by Coliseu', preco:1190 },
  { id:7,  cat:'prata',   art:'anel',     quem:'ela', img:'pecas/p7.webp',  nome:'Anel Bubble prata dourada',    desc:'Prata 925 com banho dourado e Zircônias brancas', preco:990 },
  { id:8,  cat:'prata',   art:'brinco',   quem:'ela', img:'pecas/p8.webp',  nome:'Brinco Bubble Ear Cuff',       desc:'Prata 925 banho dourado, bolhas de Zircônias', preco:790 },
  { id:9,  cat:'prata',   art:'pingente', quem:'ela', img:'pecas/p9.webp',  nome:'Gargantilha Bubble gravatinha',desc:'Prata 925 banho dourado, módulos pendentes de Zircônias', preco:990 },
  { id:10, cat:'prata',   art:'pulseira', quem:'ela', img:'pecas/p10.webp', nome:'Pulseira Bubble de elos',      desc:'Prata 925 dourada, módulos com Zircônias', preco:990 },
  { id:11, cat:'relogio', art:'relogio',  quem:'ele', img:'pecas/p11.webp', nome:'Orient Bambino Automatic',     desc:'Automático, mostrador verde — clássico elegante', preco:2799 },
  { id:12, cat:'relogio', art:'relogio',  quem:'ele', img:'pecas/p12.webp', nome:'Orient Sun & Moon Automatic',  desc:'Mostrador marfim com fases sol/lua — dress watch', preco:4599 },
  { id:13, cat:'relogio', art:'relogio',  quem:'ele', img:'pecas/p13.webp', nome:'Seiko Prospex Shogu-Rai',      desc:'Edição limitada 145 anos — colecionável', preco:5499, hero:true },
  { id:14, cat:'relogio', art:'relogio',  quem:'ele', img:'pecas/p14.webp', nome:'Bulova Snorkel Ed. Brasil',    desc:'Edição limitada Brasil, mergulho, verde', preco:3490 },
  { id:20, cat:'relogio', art:'relogio',  quem:'ela', img:'pecas/p20.webp', nome:'Orient Bambino Automatic Azul',desc:'Automático, mostrador azul — elegante no pulso feminino', preco:2599 },
  { id:15, cat:'oculos',  art:'oculos',   quem:'ela', img:'pecas/p15.webp', nome:'Óculos de grau Miu Miu',       desc:'Acetato marrom mesclado polido — 0MU 03ZV', preco:2980 },
  { id:16, cat:'oculos',  art:'oculos',   quem:'ele', img:'pecas/p16.webp', nome:'Óculos de grau Persol',        desc:'Acetato bordô — 0PO3343V, ícone italiano', preco:1990 },
  { id:17, cat:'oculos',  art:'oculos',   quem:'ele', img:'pecas/p17.webp', nome:'Óculos Salvatore Ferragamo',   desc:'Acetato preto mesclado — SF3011', preco:2770 },
  { id:18, cat:'alianca', art:'alianca',  quem:'casal', img:'pecas/p18.webp', nome:'Alianças Sable ouro 18k',      desc:'Par anatômico frisado — Coleção Sable, gravação gratuita', preco:4990, aPartir:true },
  { id:19, cat:'alianca', art:'alianca',  quem:'casal', img:'pecas/p19.webp', nome:'Alianças Amore c/ Diamantes',  desc:'Par côncavo anatômico ouro 18k com Diamantes — Coleção Amore', preco:7490, aPartir:true },

/* ---- catálogo completo importado do site (jul/2026) ---- */
  { id:21, cat:"joia", art:"anel", quem:"ela", img:"pecas/c2141178.webp", nome:"Anel Colosseo de Tanzanita oval em ouro branco 18k…", desc:"Ouro branco 18k · Diamantes · Tanzanita", preco:24900 },
  { id:22, cat:"joia", art:"anel", quem:"ela", img:"pecas/c2133299.webp", nome:"Anel geométrico em ouro 18k espiral polido", desc:"Ouro 18k", preco:2995 },
  { id:23, cat:"joia", art:"anel", quem:"ela", img:"pecas/c2128328.webp", nome:"Anel aparador em ouro branco 18k cinco flores…", desc:"Ouro branco 18k · Diamantes", preco:9995 },
  { id:24, cat:"joia", art:"anel", quem:"ela", img:"pecas/c2128297.webp", nome:"Anel aro duplo assimétrico em ouro branco 18k…", desc:"Ouro branco 18k · Diamantes", preco:8995 },
  { id:25, cat:"joia", art:"anel", quem:"ela", img:"pecas/c2128269.webp", nome:"Anel Triplo flores em ouro branco 18k cravejado com…", desc:"Ouro branco 18k · Diamantes", preco:12495 },
  { id:26, cat:"joia", art:"anel", quem:"ela", img:"pecas/c2128250.webp", nome:"Anel halo retangular ouro 18k com Esmeralda e…", desc:"Ouro 18k · Diamantes · Esmeralda", preco:7995 },
  { id:27, cat:"joia", art:"anel", quem:"ela", img:"pecas/c2128206.webp", nome:"Anel geométrico oval ouro 18k com 27,5pts de…", desc:"Ouro 18k · Diamantes", preco:6995 },
  { id:28, cat:"joia", art:"anel", quem:"ela", img:"pecas/c2128171.webp", nome:"Anel solitário geométrico em ouro 18k com 8pts de…", desc:"Ouro 18k · Diamantes", preco:3495 },
  { id:29, cat:"joia", art:"anel", quem:"ela", img:"pecas/c2127589.webp", nome:"Anel solitário em ouro 18k com 10pts de Diamantes", desc:"Ouro 18k · Diamantes", preco:4745 },
  { id:30, cat:"joia", art:"anel", quem:"ela", img:"pecas/c2127452.webp", nome:"Anel chuveiro em ouro 18k flor com 7,5pts de…", desc:"Ouro 18k · Diamantes", preco:4345 },
  { id:31, cat:"joia", art:"anel", quem:"ela", img:"pecas/c2127438.webp", nome:"Anel Chuveiro em ouro 18k flor com 10pts de…", desc:"Ouro 18k · Diamantes", preco:4345 },
  { id:32, cat:"joia", art:"anel", quem:"ela", img:"pecas/c2127364.webp", nome:"Anel chuveiro em ouro branco 18k flor com 65,6pts…", desc:"Ouro branco 18k · Diamantes", preco:18450 },
  { id:33, cat:"joia", art:"anel", quem:"ela", img:"pecas/c2127319.webp", nome:"Anel Chuveiro em ouro 18k solitário e aro com 6pts…", desc:"Ouro 18k · Diamantes", preco:4495 },
  { id:34, cat:"joia", art:"anel", quem:"ela", img:"pecas/c2127272.webp", nome:"Anel aparador em ouro 18k com flor 6 pontos de…", desc:"Ouro 18k · Diamantes", preco:4745 },
  { id:35, cat:"joia", art:"anel", quem:"ela", img:"pecas/c2127257.webp", nome:"Anel aparador sobreposto ouro 18k com 16,6pts de…", desc:"Ouro 18k · Diamantes", preco:6345 },
  { id:36, cat:"joia", art:"anel", quem:"ela", img:"pecas/c2109230.webp", nome:"Anel Nido Diamonds ninho esférico de fios em ouro…", desc:"Ouro 18k · Diamantes", preco:32900 },
  { id:37, cat:"joia", art:"anel", quem:"ela", img:"pecas/c2106085.webp", nome:"Anel Way em ouro branco 18k linhas delicadas de…", desc:"Ouro branco 18k · Diamantes · Safira", preco:7290 },
  { id:38, cat:"joia", art:"anel", quem:"ela", img:"pecas/c2106076.webp", nome:"Anel Way em ouro 18k três aros com linhas delicadas…", desc:"Ouro 18k · Diamantes · Rubi", preco:7290 },
  { id:39, cat:"joia", art:"anel", quem:"ela", img:"pecas/c2106074.webp", nome:"Anel Way em ouro 18k linhas delicadas com Diamantes…", desc:"Ouro 18k · Diamantes · Esmeralda", preco:7590 },
  { id:40, cat:"joia", art:"anel", quem:"ela", img:"pecas/c2106041.webp", nome:"Anel Way de Pérola em ouro 18k aro linha delicada…", desc:"Ouro 18k · Diamantes · Perola", preco:4999 },
  { id:41, cat:"joia", art:"anel", quem:"ela", img:"pecas/c2105894.webp", nome:"Anel Way em ouro 18k linhas delicadas com Diamantes…", desc:"Ouro 18k · Diamantes · Safira", preco:7290 },
  { id:42, cat:"joia", art:"anel", quem:"ela", img:"pecas/c2104356.webp", nome:"Anel Way em ouro branco 18k linhas delicadas com…", desc:"Ouro branco 18k · Diamantes", preco:5990 },
  { id:43, cat:"joia", art:"brinco", quem:"ela", img:"pecas/c2141193.webp", nome:"Brinco Colosseo de Tanzanita oval em ouro branco…", desc:"Ouro branco 18k · Diamantes · Tanzanita", preco:39000 },
  { id:44, cat:"joia", art:"brinco", quem:"ela", img:"pecas/c2140399.webp", nome:"Brinco infantil coração em ouro 18k de Zircônia…", desc:"Ouro 18k · Zirconia", preco:899 },
  { id:45, cat:"joia", art:"brinco", quem:"ela", img:"pecas/c2140367.webp", nome:"Brinco infantil trevo em ouro 18k com Zircônias…", desc:"Ouro 18k · Zirconias", preco:1590 },
  { id:46, cat:"joia", art:"brinco", quem:"ela", img:"pecas/c2140258.webp", nome:"Brinco infantil coração em ouro 18k com Zircônias…", desc:"Ouro 18k · Zirconias", preco:999 },
  { id:47, cat:"joia", art:"brinco", quem:"ela", img:"pecas/c2140213.webp", nome:"Brinco Infantil trevo em ouro 18k com Zircônias…", desc:"Ouro 18k · Zirconias", preco:1590 },
  { id:48, cat:"joia", art:"brinco", quem:"ela", img:"pecas/c2140211.webp", nome:"Brinco Juvenil borboleta em ouro 18k com pingente…", desc:"Ouro 18k · Diamante · Perola", preco:1699 },
  { id:49, cat:"joia", art:"brinco", quem:"ela", img:"pecas/c2140209.webp", nome:"Brinco infantil em ouro 18k solitário de Zircônia…", desc:"Ouro 18k · Zirconia", preco:999 },
  { id:50, cat:"joia", art:"brinco", quem:"ela", img:"pecas/c2140195.webp", nome:"Brinco infantil em ouro 18k solitário de Zircônia…", desc:"Ouro 18k · Zirconia", preco:799 },
  { id:51, cat:"joia", art:"brinco", quem:"ela", img:"pecas/c2140192.webp", nome:"Brinco infantil solitário ouro 18k de Zircônia…", desc:"Ouro 18k · Zirconia", preco:699 },
  { id:52, cat:"joia", art:"brinco", quem:"ela", img:"pecas/c2140190.webp", nome:"Brinco infantil anjo em ouro branco 18k com…", desc:"Ouro branco 18k · Zirconias", preco:2999 },
  { id:53, cat:"joia", art:"brinco", quem:"ela", img:"pecas/c2140178.webp", nome:"Brinco infantil anjo em ouro 18k com Zircônias…", desc:"Ouro 18k · Zirconias", preco:2999 },
  { id:54, cat:"joia", art:"brinco", quem:"ela", img:"pecas/c2140173.webp", nome:"Brinco infantil Borboleta em ouro branco 18k…", desc:"Ouro branco 18k · Zirconias", preco:3990 },
  { id:55, cat:"joia", art:"brinco", quem:"ela", img:"pecas/c2140160.webp", nome:"Brinco Infantil Borboleta em ouro 18k cravejado de…", desc:"Ouro 18k · Zirconias", preco:3990 },
  { id:56, cat:"joia", art:"brinco", quem:"ela", img:"pecas/c2140142.webp", nome:"Brinco Infantil laço em ouro 18k com Zircônias…", desc:"Ouro 18k · Zirconias", preco:2199 },
  { id:57, cat:"joia", art:"brinco", quem:"ela", img:"pecas/c2140113.webp", nome:"Brinco Infantil borboleta em ouro 18k bolinhas…", desc:"Ouro 18k · Zirconias", preco:2199 },
  { id:58, cat:"joia", art:"brinco", quem:"ela", img:"pecas/c2140081.webp", nome:"Brinco Juvenil Pets em ouro 18k patinha esmaltada…", desc:"Ouro 18k", preco:1499 },
  { id:59, cat:"joia", art:"brinco", quem:"ela", img:"pecas/c2140079.webp", nome:"Brinco Infantil Pets em ouro 18k patinha esmaltada…", desc:"Ouro 18k", preco:1499 },
  { id:60, cat:"joia", art:"brinco", quem:"ela", img:"pecas/c2128444.webp", nome:"Pingente Printemps flor filigrana ouro 18k miolo…", desc:"Ouro 18k · Esmeralda", preco:1799 },
  { id:61, cat:"joia", art:"brinco", quem:"ela", img:"pecas/c2128427.webp", nome:"Brinco longo pingente em ouro 18k navete de…", desc:"Ouro 18k · Diamantes", preco:5345 },
  { id:62, cat:"joia", art:"brinco", quem:"ela", img:"pecas/c2127552.webp", nome:"Brinco Stud chuveiro ouro branco 18k flor com…", desc:"Ouro branco 18k · Diamantes", preco:9495 },
  { id:63, cat:"joia", art:"brinco", quem:"ela", img:"pecas/c2127474.webp", nome:"Brinco Stud chuveiro ouro 18k flor com Diamantes…", desc:"Ouro 18k · Diamantes", preco:5450 },
  { id:64, cat:"joia", art:"brinco", quem:"ela", img:"pecas/c2124910.webp", nome:"Brinco Stud Pets em ouro 18k patinhas vazadas polido", desc:"Ouro 18k", preco:2299 },
  { id:65, cat:"joia", art:"brinco", quem:"ela", img:"pecas/c2124714.webp", nome:"Brinco Stud círculo ouro 18k vazado texturizado…", desc:"Ouro 18k", preco:1899 },
  { id:66, cat:"joia", art:"brinco", quem:"ela", img:"pecas/c2124140.webp", nome:"Brinco Stud redondo ouro 18k chuveiro de Zircônias…", desc:"Ouro 18k · Zirconias", preco:2790 },
  { id:67, cat:"joia", art:"pingente", quem:"ela", img:"pecas/c2140990.webp", nome:"Pingente letra \"S\" em ouro 18k com Zircônias…", desc:"Ouro 18k · Zirconias", preco:699 },
  { id:68, cat:"joia", art:"pingente", quem:"ela", img:"pecas/c2140946.webp", nome:"Pingente infantil em ouro 18k gota de Zircônia…", desc:"Ouro 18k · Zirconia", preco:349 },
  { id:69, cat:"joia", art:"pingente", quem:"ela", img:"pecas/c2140384.webp", nome:"Pingente infantil coração em ouro 18k com Zircônia…", desc:"Ouro 18k · Zirconia", preco:399 },
  { id:70, cat:"joia", art:"pingente", quem:"ela", img:"pecas/c2140369.webp", nome:"Pingente infantil coração em ouro 18k com Zircônia…", desc:"Ouro 18k · Zirconia", preco:299 },
  { id:71, cat:"joia", art:"pingente", quem:"ela", img:"pecas/c2140352.webp", nome:"Pingente infantil trevo em ouro 18k com Zircônias…", desc:"Ouro 18k · Zirconias", preco:649 },
  { id:72, cat:"joia", art:"pingente", quem:"ela", img:"pecas/c2140350.webp", nome:"Pingente infantil trevo em ouro 18k com Zircônias…", desc:"Ouro 18k · Zirconias", preco:649 },
  { id:73, cat:"joia", art:"pingente", quem:"ela", img:"pecas/c2140348.webp", nome:"Pingente Pets gato vazado em ouro 18k com uma…", desc:"Ouro 18k · Zirconia", preco:899 },
  { id:74, cat:"joia", art:"pingente", quem:"ela", img:"pecas/c2140333.webp", nome:"Pingente infantil anjo em ouro branco 18k com…", desc:"Ouro branco 18k · Zirconias", preco:2499 },
  { id:75, cat:"joia", art:"pingente", quem:"ela", img:"pecas/c2140330.webp", nome:"Pingente infantil anjo em ouro 18k com Zircônias…", desc:"Ouro 18k · Zirconias", preco:2499 },
  { id:76, cat:"joia", art:"pingente", quem:"ela", img:"pecas/c2140316.webp", nome:"Pingente infantil borboleta em ouro branco 18k com…", desc:"Ouro branco 18k · Zirconias", preco:2099 },
  { id:77, cat:"joia", art:"pingente", quem:"ela", img:"pecas/c2140311.webp", nome:"Pingente Infantil borboleta em ouro 18k com…", desc:"Ouro 18k · Zirconias", preco:2099 },
  { id:78, cat:"joia", art:"pingente", quem:"ela", img:"pecas/c2140297.webp", nome:"Pingente Pets em ouro 18k patinha esmaltada rosa", desc:"Ouro 18k", preco:899 },
  { id:79, cat:"joia", art:"pingente", quem:"ela", img:"pecas/c2140269.webp", nome:"Pingente Pets juvenil ouro 18k patinha esmaltada…", desc:"Ouro 18k", preco:899 },
  { id:80, cat:"joia", art:"pingente", quem:"ela", img:"pecas/c2128387.webp", nome:"Pingente geométrico em ouro 18k solitário com 8pts…", desc:"Ouro 18k · Diamantes", preco:1995 },
  { id:81, cat:"joia", art:"pingente", quem:"ela", img:"pecas/c2128151.webp", nome:"Pingente chuveiro em ouro branco 18k flor com…", desc:"Ouro branco 18k · Diamantes", preco:3995 },
  { id:82, cat:"joia", art:"pingente", quem:"ela", img:"pecas/c2127569.webp", nome:"Pingente Chuveiro ouro 18k flor com 7,5pts de…", desc:"Ouro 18k · Diamantes", preco:1995 },
  { id:83, cat:"joia", art:"pingente", quem:"ela", img:"pecas/c2127567.webp", nome:"Pingente Chuveiro ouro 18k flor com 13pts de…", desc:"Ouro 18k · Diamantes", preco:2495 },
  { id:84, cat:"joia", art:"pingente", quem:"ela", img:"pecas/c2124922.webp", nome:"Pingente Religiosos medalha redonda ouro 18k ornato…", desc:"Ouro 18k", preco:2299 },
  { id:85, cat:"joia", art:"pingente", quem:"ela", img:"pecas/c2124845.webp", nome:"Pingente Religiosos medalha redonda ouro 18k ornato…", desc:"Ouro 18k", preco:2199 },
  { id:86, cat:"joia", art:"pingente", quem:"ela", img:"pecas/c2124829.webp", nome:"Pingente filhos boneco em ouro 18k menino rosto e…", desc:"Ouro 18k", preco:690 },
  { id:87, cat:"joia", art:"pingente", quem:"ela", img:"pecas/c2124827.webp", nome:"Pingente Religiosos medalha ouro 18k ornato de…", desc:"Ouro 18k", preco:2199 },
  { id:88, cat:"joia", art:"pingente", quem:"ela", img:"pecas/c2124813.webp", nome:"Pingente Religiosos medalha redonda ouro 18k ornato…", desc:"Ouro 18k", preco:2199 },
  { id:89, cat:"joia", art:"pingente", quem:"ela", img:"pecas/c2124784.webp", nome:"Pingente filhos boneca ouro 18k menina vazada com…", desc:"Ouro 18k", preco:990 },
  { id:90, cat:"joia", art:"pingente", quem:"ela", img:"pecas/c2124763.webp", nome:"Pingente amuleto Árvore da Vida ouro 18k vazada com…", desc:"Ouro 18k", preco:1899 },
  { id:91, cat:"joia", art:"colar", quem:"ela", img:"pecas/c2141208.webp", nome:"Gargantilha Colosseo pingente Tanzanita em ouro…", desc:"Ouro branco 18k · Diamantes · Tanzanita", preco:22900 },
  { id:92, cat:"joia", art:"colar", quem:"ela", img:"pecas/c2124125.webp", nome:"Gargantilha corrente em ouro 18k intercalada com 9…", desc:"Ouro 18k · Perolas", preco:4990 },
  { id:93, cat:"joia", art:"colar", quem:"ela", img:"pecas/c2109095.webp", nome:"Gargantilha Colosseo ouro branco 18k pingente…", desc:"Ouro branco 18k · Diamantes", preco:13900 },
  { id:94, cat:"joia", art:"colar", quem:"ela", img:"pecas/c2109080.webp", nome:"Gargantilha Colosseo ouro branco 18k pingente…", desc:"Ouro branco 18k · Diamantes", preco:19000 },
  { id:95, cat:"joia", art:"colar", quem:"ela", img:"pecas/c2106089.webp", nome:"Gargantilha Way corrente em ouro 18k duas linhas de…", desc:"Ouro 18k · Diamantes · Safira", preco:8990 },
  { id:96, cat:"joia", art:"colar", quem:"ela", img:"pecas/c2106087.webp", nome:"Gargantilha Way corrente em ouro 18k duas linhas de…", desc:"Ouro 18k · Diamantes · Esmeralda", preco:8990 },
  { id:97, cat:"joia", art:"colar", quem:"ela", img:"pecas/c2106083.webp", nome:"Gargantilha Way corrente ouro 18k duas linhas de…", desc:"Ouro 18k · Diamantes · Rubi", preco:8990 },
  { id:98, cat:"joia", art:"colar", quem:"ela", img:"pecas/c2105911.webp", nome:"Gargantilha Way corrente em ouro 18k linhas…", desc:"Ouro 18k · Diamantes · Perola", preco:7990 },
  { id:99, cat:"joia", art:"colar", quem:"ela", img:"pecas/c2104996.webp", nome:"Gargantilha Way em ouro branco 18k linhas de…", desc:"Ouro branco 18k · Diamantes · Esmeralda", preco:8990 },
  { id:100, cat:"joia", art:"colar", quem:"ela", img:"pecas/c2104980.webp", nome:"Gargantilha Way em ouro branco 18k linhas com…", desc:"Ouro branco 18k · Diamantes · Perola", preco:7990 },
  { id:101, cat:"joia", art:"colar", quem:"ela", img:"pecas/c2104968.webp", nome:"Gargantilha Way corrente em ouro branco 18k linhas…", desc:"Ouro branco 18k · Diamantes", preco:6290 },
  { id:102, cat:"joia", art:"colar", quem:"ela", img:"pecas/c2104940.webp", nome:"Gargantilha Way gravatinha em ouro branco 18k…", desc:"Ouro branco 18k · Diamantes", preco:6990 },
  { id:103, cat:"joia", art:"colar", quem:"ela", img:"pecas/c2104171.webp", nome:"Gargantilha Versailles corrente ouro 18k com 5…", desc:"Ouro 18k · Diamantes · Perolas", preco:9490 },
  { id:104, cat:"joia", art:"colar", quem:"ela", img:"pecas/c2104169.webp", nome:"Gargantilha Versailles corrente ouro 18k com 2…", desc:"Ouro 18k · Diamantes · Perolas", preco:7990 },
  { id:105, cat:"joia", art:"colar", quem:"ela", img:"pecas/c2104114.webp", nome:"Gargantilha Versailles corrente ouro branco 18k com…", desc:"Ouro branco 18k · Diamantes · Perolas", preco:9490 },
  { id:106, cat:"joia", art:"colar", quem:"ela", img:"pecas/c2104097.webp", nome:"Gargantilha Versailles corrente ouro branco 18k com…", desc:"Ouro branco 18k · Diamantes · Perolas", preco:7990 },
  { id:107, cat:"joia", art:"colar", quem:"ela", img:"pecas/c2098217.webp", nome:"Corrente Elo Português ouro 18k polida 50CM", desc:"Ouro 18k", preco:10900 },
  { id:108, cat:"joia", art:"colar", quem:"ela", img:"pecas/c2098106.webp", nome:"Corrente malha Veneziana alongada ouro 18k polida…", desc:"Ouro 18k", preco:9900 },
  { id:109, cat:"joia", art:"colar", quem:"ela", img:"pecas/c2098102.webp", nome:"Corrente elo Groumet alternado 3x1 ouro 18k oca…", desc:"Ouro 18k", preco:6590 },
  { id:110, cat:"joia", art:"colar", quem:"ela", img:"pecas/c2082503.webp", nome:"Corrente malha veneziana torcida ouro 18k polida…", desc:"Ouro 18k", preco:7990 },
  { id:111, cat:"joia", art:"colar", quem:"ela", img:"pecas/c2076427.webp", nome:"Gargantilha pingente 5 esferas ouro 18k diamantadas…", desc:"Ouro 18k", preco:6995 },
  { id:112, cat:"joia", art:"colar", quem:"ela", img:"pecas/c2075517.webp", nome:"Corrente elo Cadeado curta ouro 18k polida 50CM", desc:"Ouro 18k", preco:4990 },
  { id:113, cat:"joia", art:"pulseira", quem:"ela", img:"pecas/c2122491.webp", nome:"Pulseira Infantojuvenil melindrosa ouro 18k com…", desc:"Ouro 18k · Topazio · Perola", preco:3990 },
  { id:114, cat:"joia", art:"pulseira", quem:"ela", img:"pecas/c2098198.webp", nome:"Pulseira elo Português ouro 18k polida 19CM", desc:"Ouro 18k", preco:9690 },
  { id:115, cat:"joia", art:"pulseira", quem:"ela", img:"pecas/c2079151.webp", nome:"Pulseira elo Groumet ouro 18k polida 19CM", desc:"Ouro 18k", preco:3199 },
  { id:116, cat:"joia", art:"pulseira", quem:"ela", img:"pecas/c2073905.webp", nome:"Pulseira de elos ouro 18k com medalha de São Miguel…", desc:"Ouro 18k", preco:4490 },
  { id:117, cat:"joia", art:"pulseira", quem:"ela", img:"pecas/c2073839.webp", nome:"Pulseira de elos ouro 18k com medalha dupla face…", desc:"Ouro 18k", preco:5690 },
  { id:118, cat:"joia", art:"pulseira", quem:"ela", img:"pecas/c2073837.webp", nome:"Pulseira de elos ouro 18k com medalha de São Bento…", desc:"Ouro 18k", preco:3990 },
  { id:119, cat:"joia", art:"pulseira", quem:"ela", img:"pecas/c2073826.webp", nome:"Pulseira de elos ouro 18k com medalha de Nossa…", desc:"Ouro 18k", preco:3199 },
  { id:120, cat:"joia", art:"pulseira", quem:"ela", img:"pecas/c2069616.webp", nome:"Pulseira Waves bracelete tubular aro duplo ouro 18k…", desc:"Ouro 18k", preco:22990 },
  { id:121, cat:"joia", art:"pulseira", quem:"ela", img:"pecas/c2033667.webp", nome:"Pulseira Pavês Amare bracelete ouro branco 18k com…", desc:"Ouro branco 18k · Diamantes", preco:39900 },
  { id:122, cat:"joia", art:"pulseira", quem:"ela", img:"pecas/c2016877.webp", nome:"Pulseira Nido Orientais Riviera ouro 18k ninhos com…", desc:"Ouro 18k · Esmeralda", preco:69000 },
  { id:123, cat:"joia", art:"pulseira", quem:"ela", img:"pecas/c2016860.webp", nome:"Pulseira Nido Orientais regulável ninho ouro 18k…", desc:"Ouro 18k · Esmeralda", preco:10690 },
  { id:124, cat:"joia", art:"pulseira", quem:"ela", img:"pecas/c2016426.webp", nome:"Pulseira Nido Orientais regulável ninho ouro 18k…", desc:"Ouro 18k · Rubi", preco:8990 },
  { id:125, cat:"joia", art:"pulseira", quem:"ela", img:"pecas/c2016400.webp", nome:"Pulseira Nido Orientais regulável ninho ouro 18k…", desc:"Ouro 18k · Safira", preco:8990 },
  { id:126, cat:"joia", art:"pulseira", quem:"ela", img:"pecas/c1996337.webp", nome:"Pulseira The Icons veneziana ouro 18k com gota…", desc:"Ouro 18k · Diamantes", preco:4490 },
  { id:127, cat:"joia", art:"pulseira", quem:"ela", img:"pecas/c1996296.webp", nome:"Pulseira The Icons regulável ouro 18k com borboleta…", desc:"Ouro 18k · Diamantes", preco:5990 },
  { id:128, cat:"joia", art:"pulseira", quem:"ela", img:"pecas/c1995230.webp", nome:"Pulseira The Icons veneziana dupla ouro 18k com…", desc:"Ouro 18k · Diamantes", preco:5990 },
  { id:129, cat:"joia", art:"pulseira", quem:"ela", img:"pecas/c1995211.webp", nome:"Pulseira The Icons veneziana dupla ouro 18k…", desc:"Ouro 18k · Diamantes", preco:3490 },
  { id:130, cat:"joia", art:"pulseira", quem:"ela", img:"pecas/c1994354.webp", nome:"Pulseira The Icons veneziana dupla ouro 18k flor…", desc:"Ouro 18k · Diamantes", preco:5490 },
  { id:131, cat:"joia", art:"pulseira", quem:"ela", img:"pecas/c1994326.webp", nome:"Pulseira The Icons regulável ouro 18k com mini flor…", desc:"Ouro 18k · Diamantes", preco:2990 },
  { id:132, cat:"joia", art:"pulseira", quem:"ela", img:"pecas/c1993888.webp", nome:"Pulseira The Icons veneziana dupla ouro 18k coração…", desc:"Ouro 18k · Diamantes", preco:4590 },
  { id:133, cat:"joia", art:"pulseira", quem:"ela", img:"pecas/c1993595.webp", nome:"Pulseira The Icons regulável de elos ouro 18k…", desc:"Ouro 18k · Diamantes", preco:3990 },
  { id:134, cat:"joia", art:"pulseira", quem:"ela", img:"pecas/c1991384.webp", nome:"Pulseira The Icons veneziana dupla ouro branco 18k…", desc:"Ouro branco 18k · Diamantes", preco:5690 },
  { id:135, cat:"joia", art:"pulseira", quem:"ela", img:"pecas/c1991056.webp", nome:"Pulseira The Icons veneziana dupla ouro branco 18k…", desc:"Ouro branco 18k · Diamantes", preco:4290 },
  { id:136, cat:"joia", art:"pulseira", quem:"ela", img:"pecas/c1990508.webp", nome:"Pulseira The Icons regulável ouro branco 18k mini…", desc:"Ouro branco 18k · Diamantes", preco:2990 },
  { id:137, cat:"alianca", art:"alianca", quem:"casal", img:"pecas/c1717286.webp", nome:"Aliança quadrada frisada prata 925 rodinada fosca…", desc:"Prata 925", preco:1399 },
  { id:138, cat:"alianca", art:"alianca", quem:"casal", img:"pecas/c1717264.webp", nome:"Aliança quadrada frisada prata 925 dourada fosca e…", desc:"Prata 925 dourada", preco:1399 },
  { id:139, cat:"alianca", art:"alianca", quem:"casal", img:"pecas/c1717260.webp", nome:"Aliança quadrada frisada prata 925 dourada com…", desc:"Prata 925 dourada", preco:1399 },
  { id:140, cat:"alianca", art:"alianca", quem:"casal", img:"pecas/c1717257.webp", nome:"Aliança quadrada frisada prata 925 com banho de…", desc:"Prata 925", preco:1399 },
  { id:141, cat:"alianca", art:"alianca", quem:"casal", img:"pecas/c1717240.webp", nome:"Aliança quadrada frisada prata 925 com banho de…", desc:"Prata 925 · Onix", preco:1599 },
  { id:142, cat:"alianca", art:"alianca", quem:"casal", img:"pecas/c1717220.webp", nome:"Aliança quadrada frisada prata 925 dourada com…", desc:"Prata 925 dourada · Onix", preco:1599 },
  { id:143, cat:"alianca", art:"alianca", quem:"casal", img:"pecas/c1717217.webp", nome:"Aliança quadrada frisada prata 925 rodinada fosca…", desc:"Prata 925 · Onix", preco:1599 },
  { id:144, cat:"alianca", art:"alianca", quem:"casal", img:"pecas/c1717181.webp", nome:"Aliança quadrada frisada prata 925 dourada fosca…", desc:"Prata 925 dourada · Onix", preco:1599 },
  { id:145, cat:"alianca", art:"alianca", quem:"casal", img:"pecas/c1278701.webp", nome:"Aliança Sable ouro 18k anatômica meia cana frisada…", desc:"Ouro 18k", preco:23990 },
  { id:146, cat:"alianca", art:"alianca", quem:"casal", img:"pecas/c1278699.webp", nome:"Aliança Sable ouro 18k anatômica meia cana frisada…", desc:"Ouro 18k · Diamante", preco:22990 },
  { id:147, cat:"alianca", art:"alianca", quem:"casal", img:"pecas/c1276968.webp", nome:"Aliança Sable ouro 18k anatômica meia cana frisada…", desc:"Ouro 18k · Diamante", preco:12290 },
  { id:148, cat:"alianca", art:"alianca", quem:"casal", img:"pecas/c1274658.webp", nome:"Aliança prata 925 abaulada polida 6MM", desc:"Prata 925", preco:699 },
  { id:149, cat:"alianca", art:"alianca", quem:"casal", img:"pecas/c1274656.webp", nome:"Aliança prata 925 abaulada polida com Topázio…", desc:"Prata 925 · Topazio", preco:499 },
  { id:150, cat:"alianca", art:"alianca", quem:"casal", img:"pecas/c1274643.webp", nome:"Aliança prata 925 quadrada polida com Topázio…", desc:"Prata 925 · Topazio", preco:499 },
  { id:151, cat:"alianca", art:"alianca", quem:"casal", img:"pecas/c1274630.webp", nome:"Aliança prata 925 abaulado polida 5MM", desc:"Prata 925", preco:499 },
  { id:152, cat:"alianca", art:"alianca", quem:"casal", img:"pecas/c1274628.webp", nome:"Aliança prata 925 abaulada polida 4MM", desc:"Prata 925", preco:490 },
  { id:153, cat:"alianca", art:"alianca", quem:"casal", img:"pecas/c1274626.webp", nome:"Aliança prata 925 abaulada polida 3MM", desc:"Prata 925", preco:329 },
  { id:154, cat:"alianca", art:"alianca", quem:"casal", img:"pecas/c1274615.webp", nome:"Aliança prata 925 quadrada polida 6MM", desc:"Prata 925", preco:799 },
  { id:155, cat:"alianca", art:"alianca", quem:"casal", img:"pecas/c1274611.webp", nome:"Aliança prata 925 quadrada polida 4MM", desc:"Prata 925", preco:490 },
  { id:156, cat:"alianca", art:"alianca", quem:"casal", img:"pecas/c1274582.webp", nome:"Aliança prata 925 reta trabalhada 5MM", desc:"Prata 925", preco:399 },
  { id:157, cat:"alianca", art:"alianca", quem:"casal", img:"pecas/c1274571.webp", nome:"Aliança prata 925 reta trabalhada 7MM", desc:"Prata 925", preco:599 },
  { id:158, cat:"alianca", art:"alianca", quem:"casal", img:"pecas/c1228546.webp", nome:"Aliança Endless Love reta ouro 18k fosca friso com…", desc:"Ouro 18k · Diamantes", preco:21990 },
  { id:159, cat:"prata", art:"anel", quem:"ela", img:"pecas/c2121455.webp", nome:"Anel Bubble assimétrico em prata 925 com 7 bolhas…", desc:"Prata 925 · Zirconias", preco:690 },
  { id:160, cat:"prata", art:"anel", quem:"ela", img:"pecas/c2117203.webp", nome:"Anel Bubble assimétrico em prata 925 com12 módulos…", desc:"Prata 925 · Zirconias", preco:990 },
  { id:161, cat:"prata", art:"anel", quem:"ela", img:"pecas/c2117175.webp", nome:"Anel Bubble assimétrico em prata 925 banho dourado…", desc:"Prata 925 · banho dourado · Zirconias", preco:690 },
  { id:162, cat:"prata", art:"anel", quem:"ela", img:"pecas/c2117171.webp", nome:"Anel Bubble em prata 925 módulos com bolhas de…", desc:"Prata 925 · Zirconias · Perola", preco:890 },
  { id:163, cat:"prata", art:"anel", quem:"ela", img:"pecas/c2103289.webp", nome:"Anel Bubble em prata 925 banho dourado módulos com…", desc:"Prata 925 · banho dourado · Zirconias · Perola", preco:890 },
  { id:164, cat:"prata", art:"anel", quem:"ela", img:"pecas/c2103286.webp", nome:"Anel Bubble trilogia em prata 925 módulos…", desc:"Prata 925 · Zirconias", preco:499 },
  { id:165, cat:"prata", art:"anel", quem:"ela", img:"pecas/c2103257.webp", nome:"Anel Bubble em prata 925 banho dourado módulos com…", desc:"Prata 925 · banho dourado · Zirconias", preco:499 },
  { id:166, cat:"prata", art:"anel", quem:"ela", img:"pecas/c2069686.webp", nome:"Anel For me aro prata 925 dourada com gemas de…", desc:"Prata 925 dourada · Topazio", preco:699 },
  { id:167, cat:"prata", art:"anel", quem:"ela", img:"pecas/c1991914.webp", nome:"Anel For me Signature coração polido prata 925 com…", desc:"Prata 925 · Zirconias", preco:690 },
  { id:168, cat:"prata", art:"anel", quem:"ela", img:"pecas/c1991900.webp", nome:"Anel For me Signature  coração prata 925 com banho…", desc:"Prata 925", preco:490 },
  { id:169, cat:"prata", art:"anel", quem:"ela", img:"pecas/c1978136.webp", nome:"Anel For me Signature quadrado prata 925 com banho…", desc:"Prata 925", preco:1290 },
  { id:170, cat:"prata", art:"anel", quem:"ela", img:"pecas/c1977475.webp", nome:"Anel For me Gem flor prata 925 chuveiro de…", desc:"Prata 925 · Zirconias", preco:799 },
  { id:171, cat:"prata", art:"anel", quem:"ela", img:"pecas/c1977467.webp", nome:"Anel For me Gem flor prata 925 dourada chuveiro de…", desc:"Prata 925 dourada · Zirconias", preco:799 },
  { id:172, cat:"prata", art:"anel", quem:"ela", img:"pecas/c1974275.webp", nome:"Anel For me Signature quadrado de mingo prata 925…", desc:"Prata 925", preco:1290 },
  { id:173, cat:"prata", art:"anel", quem:"ela", img:"pecas/c1974272.webp", nome:"Anel For me Signature oval de mingo prata 925…", desc:"Prata 925", preco:1390 },
  { id:174, cat:"prata", art:"anel", quem:"ela", img:"pecas/c1974267.webp", nome:"Anel For me Signature oval de mingo prata 925 com…", desc:"Prata 925 · banho dourado", preco:890 },
  { id:175, cat:"prata", art:"anel", quem:"ela", img:"pecas/c1974263.webp", nome:"Anel For me Signature coração de mingo prata 925…", desc:"Prata 925 · banho dourado", preco:990 },
  { id:176, cat:"prata", art:"anel", quem:"ela", img:"pecas/c1974256.webp", nome:"Anel For me Signature retangular prata 925 banho…", desc:"Prata 925 · banho dourado", preco:690 },
  { id:177, cat:"prata", art:"anel", quem:"ela", img:"pecas/c1974246.webp", nome:"Anel For me Signature redondo prata 925 dourado com…", desc:"Prata 925 · Zirconias", preco:590 },
  { id:178, cat:"prata", art:"anel", quem:"ela", img:"pecas/c1974241.webp", nome:"Anel For me Signature coração polido prata 925…", desc:"Prata 925 · Zirconias", preco:690 },
  { id:179, cat:"prata", art:"anel", quem:"ela", img:"pecas/c1974226.webp", nome:"Anel For me Signature oval prata 925 dourado polido", desc:"Prata 925", preco:490 },
  { id:180, cat:"prata", art:"anel", quem:"ela", img:"pecas/c1974224.webp", nome:"Anel For me Signature redondo prata 925 banho…", desc:"Prata 925 · banho dourado", preco:490 },
  { id:181, cat:"prata", art:"anel", quem:"ela", img:"pecas/c1974220.webp", nome:"Anel For me Signature coração prata 925 com banho…", desc:"Prata 925 · banho dourado", preco:490 },
  { id:182, cat:"prata", art:"brinco", quem:"ela", img:"pecas/c2121451.webp", nome:"Brinco Bubble pingente prata 925 módulos circulares…", desc:"Prata 925 · Zirconias", preco:1990 },
  { id:183, cat:"prata", art:"brinco", quem:"ela", img:"pecas/c2119079.webp", nome:"Brinco Bubble Ear cuff com pingente prata 925…", desc:"Prata 925 · Zirconias", preco:2290 },
  { id:184, cat:"prata", art:"brinco", quem:"ela", img:"pecas/c2118823.webp", nome:"Brinco Bubble pingente corrente em prata 925…", desc:"Prata 925 · Zirconias · Perola", preco:1090 },
  { id:185, cat:"prata", art:"brinco", quem:"ela", img:"pecas/c2118809.webp", nome:"Brinco Bubble pingente corrente em prata 925 banho…", desc:"Prata 925 · banho dourado · Zirconias · Perola", preco:1090 },
  { id:186, cat:"prata", art:"brinco", quem:"ela", img:"pecas/c2116522.webp", nome:"Brinco Bubble Ear Cuff em prata 925 módulos…", desc:"Prata 925 · Zirconias · Perola", preco:1990 },
  { id:187, cat:"prata", art:"brinco", quem:"ela", img:"pecas/c2116475.webp", nome:"Brinco Bubble Ear Cuff em prata 925 banho dourado…", desc:"Prata 925 · banho dourado · Zirconias · Perola", preco:1990 },
  { id:188, cat:"prata", art:"brinco", quem:"ela", img:"pecas/c2116457.webp", nome:"Brinco Ear Cuff Bubble prata 925 módulos circulares…", desc:"Prata 925 · Zirconias · Perola", preco:1290 },
  { id:189, cat:"prata", art:"brinco", quem:"ela", img:"pecas/c2116450.webp", nome:"Brinco Bubble Ear Cuff em prata 925 banho dourado…", desc:"Prata 925 · banho dourado · Zirconias · Perola", preco:1290 },
  { id:190, cat:"prata", art:"brinco", quem:"ela", img:"pecas/c2116431.webp", nome:"Brinco Bubble pingente em prata 925 dourada módulos…", desc:"Prata 925 dourada · Zirconias", preco:1990 },
  { id:191, cat:"prata", art:"brinco", quem:"ela", img:"pecas/c2116413.webp", nome:"Brinco Bubble argola click em prata 925 com módulos…", desc:"Prata 925 · Zirconias", preco:1490 },
  { id:192, cat:"prata", art:"brinco", quem:"ela", img:"pecas/c2116402.webp", nome:"Brinco Bubble argola click em prata 925 dourada…", desc:"Prata 925 dourada · Zirconias", preco:1490 },
  { id:193, cat:"prata", art:"brinco", quem:"ela", img:"pecas/c2116368.webp", nome:"Brinco Bubble Ear cuff pingente em prata 925…", desc:"Prata 925 dourada · Zirconias", preco:1790 },
  { id:194, cat:"prata", art:"brinco", quem:"ela", img:"pecas/c2116364.webp", nome:"Brinco Bubble Ear cuff pingente em prata 925…", desc:"Prata 925 · Zirconias", preco:1790 },
  { id:195, cat:"prata", art:"brinco", quem:"ela", img:"pecas/c2116347.webp", nome:"Brinco Bubble Ear cuff com pingente em prata 925…", desc:"Prata 925 dourada · Zirconias", preco:2290 },
  { id:196, cat:"prata", art:"brinco", quem:"ela", img:"pecas/c2116283.webp", nome:"Brinco Bubble em prata 925 dourada módulos com…", desc:"Prata 925 dourada · Zirconias", preco:590 },
  { id:197, cat:"prata", art:"brinco", quem:"ela", img:"pecas/c2116281.webp", nome:"Brinco Bubble prata 925 módulos circulares bolhas…", desc:"Prata 925 · Zirconias", preco:590 },
  { id:198, cat:"prata", art:"brinco", quem:"ela", img:"pecas/c2103255.webp", nome:"Brinco Bubble Ear cuff em prata 925 banho dourado…", desc:"Prata 925 · banho dourado · Zirconias", preco:790 },
  { id:199, cat:"prata", art:"brinco", quem:"ela", img:"pecas/c2103238.webp", nome:"Brinco Bubble Ear cuff prata 925 módulos circulares…", desc:"Prata 925 · Zirconias", preco:790 },
  { id:200, cat:"prata", art:"brinco", quem:"ela", img:"pecas/c2103215.webp", nome:"Brinco Bubble Ear cuff prata 925 módulos circulares…", desc:"Prata 925 · Zirconias", preco:1190 },
  { id:201, cat:"prata", art:"brinco", quem:"ela", img:"pecas/c2091052.webp", nome:"Brinco For me mini argola click prata 925 dourada…", desc:"Prata 925 dourada", preco:499 },
  { id:202, cat:"prata", art:"brinco", quem:"ela", img:"pecas/c1997665.webp", nome:"Brinco For me Signature argola prata 925 com…", desc:"Prata 925 · Zirconias · Perola", preco:1390 },
  { id:203, cat:"prata", art:"brinco", quem:"ela", img:"pecas/c1992215.webp", nome:"Brinco For me Signature argola prata 925 dourada…", desc:"Prata 925 dourada · Zirconia", preco:1390 },
  { id:204, cat:"prata", art:"brinco", quem:"ela", img:"pecas/c1992200.webp", nome:"Brinco For me Signature argola prata 925 dourada…", desc:"Prata 925 dourada · Ametista · Zirconia", preco:1390 },
  { id:205, cat:"prata", art:"colar", quem:"ela", img:"pecas/c2118841.webp", nome:"Gargantilha Bubble assimétrica corrente prata 925…", desc:"Prata 925 · Zirconias", preco:1890 },
  { id:206, cat:"prata", art:"colar", quem:"ela", img:"pecas/c2118825.webp", nome:"Gargantilha Bubble gravatinha assimétrica prata 925…", desc:"Prata 925 · banho dourado · Zirconias", preco:1890 },
  { id:207, cat:"prata", art:"colar", quem:"ela", img:"pecas/c2117375.webp", nome:"Gargantilha Bubble em prata 925 módulos circulares…", desc:"Prata 925 · Zirconias", preco:1190 },
  { id:208, cat:"prata", art:"colar", quem:"ela", img:"pecas/c2117345.webp", nome:"Gargantilha Bubble gravatinha em prata 925 módulos…", desc:"Prata 925 · Zirconias", preco:990 },
  { id:209, cat:"prata", art:"colar", quem:"ela", img:"pecas/c2117328.webp", nome:"Gargantilha Bubble curva em prata 925 constelação…", desc:"Prata 925 · Zirconias", preco:2490 },
  { id:210, cat:"prata", art:"colar", quem:"ela", img:"pecas/c2117317.webp", nome:"Gargantilha Bubble curva em prata 925 banho dourado…", desc:"Prata 925 · banho dourado · Zirconias", preco:2490 },
  { id:211, cat:"prata", art:"colar", quem:"ela", img:"pecas/c2117311.webp", nome:"Gargantilha Bubble gravatinha prata 925 módulos…", desc:"Prata 925 · Zirconias", preco:999 },
  { id:212, cat:"prata", art:"colar", quem:"ela", img:"pecas/c2117309.webp", nome:"Gargantilha Bubble gravatinha em prata 925 banho…", desc:"Prata 925 · banho dourado · Zirconias", preco:999 },
  { id:213, cat:"prata", art:"colar", quem:"ela", img:"pecas/c1999179.webp", nome:"Corrente For me veneziana em prata 925 dourada…", desc:"Prata 925 dourada", preco:990 },
  { id:214, cat:"prata", art:"colar", quem:"ela", img:"pecas/c1998133.webp", nome:"Corrente For me malha Cordão prata 925 dourada 50CM", desc:"Prata 925 dourada", preco:2990 },
  { id:215, cat:"prata", art:"colar", quem:"ela", img:"pecas/c1998125.webp", nome:"Corrente For me elo Groumet 3X1 prata 925 rodinada…", desc:"Prata 925", preco:1900 },
  { id:216, cat:"prata", art:"colar", quem:"ela", img:"pecas/c1998116.webp", nome:"Corrente For me veneziana em prata 925 dourada…", desc:"Prata 925 dourada", preco:1199 },
  { id:217, cat:"prata", art:"colar", quem:"ela", img:"pecas/c1998112.webp", nome:"Corrente For me elo Groumet prata 925 rodinada…", desc:"Prata 925", preco:2290 },
  { id:218, cat:"prata", art:"colar", quem:"ela", img:"pecas/c1998107.webp", nome:"Corrente For me elo Groumet 3x1 prata 925 rodinada…", desc:"Prata 925", preco:3290 },
  { id:219, cat:"prata", art:"colar", quem:"ela", img:"pecas/c1998104.webp", nome:"Corrente For me elo oval grande prata 925 dourada…", desc:"Prata 925 dourada", preco:7990 },
  { id:220, cat:"prata", art:"colar", quem:"ela", img:"pecas/c1998088.webp", nome:"Corrente For me de elos ovais prata 925 dourada…", desc:"Prata 925 dourada", preco:3900 },
  { id:221, cat:"prata", art:"colar", quem:"ela", img:"pecas/c1998077.webp", nome:"Corrente For me elo Groumet prata 925 dourada…", desc:"Prata 925 dourada", preco:1990 },
  { id:222, cat:"prata", art:"colar", quem:"ela", img:"pecas/c1997958.webp", nome:"Corrente rabo de rato oca prata 925 com banho de…", desc:"Prata 925", preco:1590 },
  { id:223, cat:"prata", art:"colar", quem:"ela", img:"pecas/c1982968.webp", nome:"Gargantilha Gem corrente prata 925 pingente…", desc:"Prata 925 · Zirconias", preco:999 },
  { id:224, cat:"prata", art:"colar", quem:"ela", img:"pecas/c1976705.webp", nome:"Gargantilha Gem com pingente prata 925 dourada…", desc:"Prata 925 dourada · Zirconias", preco:999 },
  { id:225, cat:"prata", art:"colar", quem:"ela", img:"pecas/c1967769.webp", nome:"Gargantilha For Love corrente de elos prata 925 com…", desc:"Prata 925 · banho dourado", preco:7990 },
  { id:226, cat:"prata", art:"colar", quem:"ela", img:"pecas/c1946101.webp", nome:"Corrente For me elo Cadeado prata 925 banho dourado…", desc:"Prata 925 · banho dourado", preco:549 },
  { id:227, cat:"prata", art:"pingente", quem:"ela", img:"pecas/c2121457.webp", nome:"Pingente Bubble em prata 925 banho dourado módulos…", desc:"Prata 925 · banho dourado · Zirconias", preco:990 },
  { id:228, cat:"prata", art:"pingente", quem:"ela", img:"pecas/c2121374.webp", nome:"Pingente Bubble em prata 925 módulos circulares com…", desc:"Prata 925 · Zirconias", preco:490 },
  { id:229, cat:"prata", art:"pingente", quem:"ela", img:"pecas/c2121330.webp", nome:"Pingente Bubble prata 925 banho dourado módulos com…", desc:"Prata 925 · banho dourado · Zirconias", preco:490 },
  { id:230, cat:"prata", art:"pingente", quem:"ela", img:"pecas/c2119042.webp", nome:"Pingente Bubble prata 925 módulos circulares bolhas…", desc:"Prata 925 · Zirconias", preco:990 },
  { id:231, cat:"prata", art:"pingente", quem:"ela", img:"pecas/c1974302.webp", nome:"Piercing de orelha For me Signature gancho prata…", desc:"Prata 925 dourada · Perola", preco:390 },
  { id:232, cat:"prata", art:"pingente", quem:"ela", img:"pecas/c1974288.webp", nome:"Piercing de orelha For me Signature prata 925…", desc:"Prata 925 · Zirconia · Perola", preco:390 },
  { id:233, cat:"prata", art:"pingente", quem:"ela", img:"pecas/c1974286.webp", nome:"Piercing de orelha For me Signature coração prata…", desc:"Prata 925", preco:390 },
  { id:234, cat:"prata", art:"pingente", quem:"ela", img:"pecas/c1970992.webp", nome:"Pingente For me Serpent prata 925 dourada com…", desc:"Prata 925 dourada · Zirconias", preco:990 },
  { id:235, cat:"prata", art:"pingente", quem:"ela", img:"pecas/c1970986.webp", nome:"Piercing de orelha For me Serpent prata 925 dourada…", desc:"Prata 925 dourada · Zirconias", preco:490 },
  { id:236, cat:"prata", art:"pingente", quem:"ela", img:"pecas/c1970949.webp", nome:"Pingente For me Serpent prata 925 dourada com olhos…", desc:"Prata 925 dourada · Zirconia", preco:390 },
  { id:237, cat:"prata", art:"pingente", quem:"ela", img:"pecas/c1970932.webp", nome:"Piercing de orelha For me Serpent gancho prata 925…", desc:"Prata 925 dourada · Zirconias", preco:290 },
  { id:238, cat:"prata", art:"pingente", quem:"ela", img:"pecas/c1915806.webp", nome:"Pingente For Love coração dupla face prata 925…", desc:"Prata 925 dourada · Zirconias", preco:2990 },
  { id:239, cat:"prata", art:"pingente", quem:"ela", img:"pecas/c1905115.webp", nome:"Pingente For Love prata 925 coração dupla face com…", desc:"Prata 925 · Zirconias", preco:2990 },
  { id:240, cat:"prata", art:"pingente", quem:"ela", img:"pecas/c1904618.webp", nome:"Pingente For Love coração dupla face prata 925…", desc:"Prata 925 dourada", preco:1690 },
  { id:241, cat:"prata", art:"pingente", quem:"ela", img:"pecas/c1895072.webp", nome:"Piercing de orelha For me Triangle prata 925 com…", desc:"Prata 925 · Zirconias", preco:299 },
  { id:242, cat:"prata", art:"pingente", quem:"ela", img:"pecas/c1895062.webp", nome:"Piercing de orelha For me Triangle prata 925…", desc:"Prata 925 dourada · Zirconias", preco:299 },
  { id:243, cat:"prata", art:"pingente", quem:"ela", img:"pecas/c1891637.webp", nome:"Piercing de orelha For me Planet prata 925 pingente…", desc:"Prata 925 · Zirconias", preco:259 },
  { id:244, cat:"prata", art:"pingente", quem:"ela", img:"pecas/c1802603.webp", nome:"Piercing de orelha trançado prata 925 dourada com…", desc:"Prata 925 dourada", preco:359 },
  { id:245, cat:"prata", art:"pingente", quem:"ela", img:"pecas/c1802597.webp", nome:"Piercing de orelha trançado prata 925 dourada com…", desc:"Prata 925 dourada · Topazio", preco:359 },
  { id:246, cat:"prata", art:"pingente", quem:"ela", img:"pecas/c1799227.webp", nome:"Pingente letra \"P\" prata 925 com Topázios brancos…", desc:"Prata 925 · Topazio", preco:145 },
  { id:247, cat:"prata", art:"pingente", quem:"ela", img:"pecas/c1799219.webp", nome:"Pingente letra \"M\" para 925 cravejada de Topázios…", desc:"Topazio", preco:249 },
  { id:248, cat:"prata", art:"pingente", quem:"ela", img:"pecas/c1799196.webp", nome:"Pingente cavalo unicórnio prata 925 com esmaltado…", desc:"Prata 925", preco:110 },
  { id:249, cat:"prata", art:"pulseira", quem:"ela", img:"pecas/c2121453.webp", nome:"Pulseira Bubble de elos em prata 925 pingentes…", desc:"Prata 925 · Zirconias", preco:990 },
  { id:250, cat:"prata", art:"pulseira", quem:"ela", img:"pecas/c2121386.webp", nome:"Pulseira Bubble de elos em prata 925 módulos…", desc:"Prata 925 · Zirconias", preco:1190 },
  { id:251, cat:"prata", art:"pulseira", quem:"ela", img:"pecas/c2117377.webp", nome:"Pulseira Bubble de elos em prata 925 dourada…", desc:"Prata 925 dourada · Zirconias", preco:1190 },
  { id:252, cat:"prata", art:"pulseira", quem:"ela", img:"pecas/c1999225.webp", nome:"Pulseira For me elo Groumet prata 925 rodinada com…", desc:"Prata 925", preco:2499 },
  { id:253, cat:"prata", art:"pulseira", quem:"ela", img:"pecas/c1999211.webp", nome:"Pulseira For me elo Groumet prata 925 rodinada…", desc:"Prata 925", preco:2290 },
  { id:254, cat:"prata", art:"pulseira", quem:"ela", img:"pecas/c1999206.webp", nome:"Pulseira For me elo Groumet 3x1 prata 925 rodinada…", desc:"Prata 925", preco:2499 },
  { id:255, cat:"prata", art:"pulseira", quem:"ela", img:"pecas/c1946194.webp", nome:"Pulseira For me Mystic Mão de Fátima prata 925…", desc:"Prata 925 dourada · Zirconias", preco:559 },
  { id:256, cat:"prata", art:"pulseira", quem:"ela", img:"pecas/c1939664.webp", nome:"Pulseira de elos bolinhas polidas ouro 18k com…", desc:"Ouro 18k · Perola", preco:2499 },
  { id:257, cat:"prata", art:"pulseira", quem:"ela", img:"pecas/c1927396.webp", nome:"Pulseira For Love prata 925 dourada com pingentes…", desc:"Prata 925 dourada · Topazio", preco:790 },
  { id:258, cat:"prata", art:"pulseira", quem:"ela", img:"pecas/c1923557.webp", nome:"Pulseira For me Organic de elos prata 925 com…", desc:"Prata 925", preco:699 },
  { id:259, cat:"prata", art:"pulseira", quem:"ela", img:"pecas/c1923479.webp", nome:"Pulseira For me Organic de elos prata 925 dourada…", desc:"Prata 925 dourada", preco:699 },
  { id:260, cat:"prata", art:"pulseira", quem:"ela", img:"pecas/c1923477.webp", nome:"Pulseira For me Organic de elos prata 925 com…", desc:"Prata 925 · Topazio", preco:1199 },
  { id:261, cat:"prata", art:"pulseira", quem:"ela", img:"pecas/c1923475.webp", nome:"Pulseira For me Organic de elos prata 925 dourada e…", desc:"Prata 925 dourada · Topazio", preco:1199 },
  { id:262, cat:"prata", art:"pulseira", quem:"ela", img:"pecas/c1923473.webp", nome:"Pulseira For me Organic de elos prata 925 com…", desc:"Prata 925 · Topazio", preco:799 },
  { id:263, cat:"prata", art:"pulseira", quem:"ela", img:"pecas/c1923471.webp", nome:"Pulseira For me Organic de elos prata 925 dourada…", desc:"Prata 925 dourada · Topazio", preco:799 },
  { id:264, cat:"prata", art:"pulseira", quem:"ela", img:"pecas/c1917674.webp", nome:"Pulseira For me Organic Bailarina prata 925 com…", desc:"Prata 925 · Topazio", preco:799 },
  { id:265, cat:"prata", art:"pulseira", quem:"ela", img:"pecas/c1917670.webp", nome:"Pulseira For me Organic Bailarina prata 925 dourada…", desc:"Prata 925 dourada · Topazio", preco:799 },
  { id:266, cat:"prata", art:"pulseira", quem:"ela", img:"pecas/c1908912.webp", nome:"Pulseira For Love prata 925 dourada pingentes e…", desc:"Prata 925 dourada · Zirconias", preco:1390 },
  { id:267, cat:"prata", art:"pulseira", quem:"ela", img:"pecas/c1908085.webp", nome:"Pulseira For Love de elos prata 925 dourada com 7…", desc:"Prata 925 dourada", preco:699 },
  { id:268, cat:"prata", art:"pulseira", quem:"ela", img:"pecas/c1908081.webp", nome:"Pulseira For Love prata 925 dourada pingentes…", desc:"Prata 925 dourada", preco:790 },
  { id:269, cat:"prata", art:"pulseira", quem:"ela", img:"pecas/c1908068.webp", nome:"Pulseira For Love corrente elos prata 925 dourada…", desc:"Prata 925 dourada", preco:790 },
  { id:270, cat:"prata", art:"pulseira", quem:"ela", img:"pecas/c1907930.webp", nome:"Pulseira For Love prata 925 dourada com pingentes…", desc:"Prata 925 dourada", preco:1990 },
  { id:271, cat:"prata", art:"pulseira", quem:"ela", img:"pecas/c1904810.webp", nome:"Pulseira For Love articulada prata 925 dourada…", desc:"Prata 925 dourada · Zirconias", preco:2990 },
  { id:272, cat:"prata", art:"alianca", quem:"ela", img:"pecas/c998051.webp", nome:"Aliança prata 925 anatômica reta fosca 5,90MM", desc:"Prata 925", preco:445 },
  { id:273, cat:"prata", art:"alianca", quem:"ela", img:"pecas/c998047.webp", nome:"Aliança prata 925 polida com Zircônia 6MM", desc:"Prata 925 · Zirconia", preco:799 },
  { id:274, cat:"prata", art:"alianca", quem:"ela", img:"pecas/c998045.webp", nome:"Aliança prata 925 polida 6MM", desc:"Prata 925", preco:790 },
  { id:275, cat:"prata", art:"alianca", quem:"ela", img:"pecas/c998043.webp", nome:"Aliança de Prata 925 com Zircônia 5MM", desc:"Prata 925 · Zirconia", preco:599 },
  { id:276, cat:"prata", art:"alianca", quem:"ela", img:"pecas/c998041.webp", nome:"Aliança prata 925 polida abaulada 5MM", desc:"Prata 925", preco:590 },

/* ---- relógios e óculos importados do site (jul/2026) ---- */
  { id:277, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c1921381.webp", nome:"Relógio Emporio Armani Feminino - AR11585B1 A3SX…", desc:"Emporio Armani", preco:2199 },
  { id:278, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c1143489.webp", nome:"Relógio Oslo Feminino - OFTSSS9T0040 S1GX", desc:"Relojoaria", preco:959 },
  { id:279, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c994544.webp", nome:"Relógio Oslo Slim Feminino - OFTSSS9T0001-G1GX", desc:"Relojoaria", preco:959 },
  { id:280, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c1094331.webp", nome:"Relógio Orient Eternal Feminino - FGSS0159 B1KB", desc:"Orient", preco:899 },
  { id:281, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c1143499.webp", nome:"Relógio Oslo Feminino - OFTSSS9T0046 B1SX", desc:"Relojoaria", preco:939 },
  { id:282, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c1921231.webp", nome:"Relógio Emporio Armani Feminino - AR11663B1 C3KX…", desc:"Emporio Armani", preco:2799 },
  { id:283, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c2007321.webp", nome:"Relógio Emporio Armani Mia Feminino - AR11609 C1KX…", desc:"Emporio Armani", preco:2699 },
  { id:284, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c1991929.webp", nome:"Relógio Orient Solartech Elite Elegance - FGSS1264…", desc:"Orient · Solar", preco:1099 },
  { id:285, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c1451367.webp", nome:"Relógio Skagen Freja Feminino - SKW3017B1 S1SX", desc:"Relojoaria", preco:1199 },
  { id:286, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c1187626.webp", nome:"Relógio Michael Kors Feminino - MK7296/1MN", desc:"Michael Kors", preco:2659 },
  { id:287, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c1858087.webp", nome:"Relógio Orient Eternal Feminino - FGSS0236 G1KX…", desc:"Orient", preco:799 },
  { id:288, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c1717380.webp", nome:"Relógio Armani Exchange A|X Lady Hampton Feminino -…", desc:"Armani Exchange", preco:1599 },
  { id:289, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c1443515.webp", nome:"Relógio Oslo Feminino Misto - OFTSSS9T0067 S1SR", desc:"Relojoaria", preco:1199 },
  { id:290, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c1234905.webp", nome:"Relógio Guess Feminino - GW0544L2", desc:"Guess", preco:1739 },
  { id:291, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c1598330.webp", nome:"Relógio Guess Feminino - GW0601L1 Dourado", desc:"Guess", preco:1659 },
  { id:292, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c1012033.webp", nome:"Relógio Oslo Masculino - OMGSSS9U0001-S2KX", desc:"Relojoaria", preco:899 },
  { id:293, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c2007335.webp", nome:"Relógio Emporio Armani Gianni Feminino - AR11223B1…", desc:"Emporio Armani", preco:2899 },
  { id:294, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c1565937.webp", nome:"Relógio Michael Kors Camille Feminino - MK7255/1DN…", desc:"Michael Kors", preco:2319 },
  { id:295, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c1337285.webp", nome:"Relógio Guess Multifunção Feminino - GW0620L2", desc:"Guess", preco:1199 },
  { id:296, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c1908057.webp", nome:"Relógio Emporio Armani Feminino - AR11609B1 C1KX…", desc:"Emporio Armani", preco:2699 },
  { id:297, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c1876048.webp", nome:"Relógio Orient Eternal Clássico Feminino - FGSS1228…", desc:"Orient", preco:599 },
  { id:298, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c1187560.webp", nome:"Relógio Michael Kors Cronógrafo Feminino -…", desc:"Michael Kors · Cronógrafo", preco:4129 },
  { id:299, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c1701133.webp", nome:"Relógio Orient Eternal Feminino - FBSC0023 P3PX…", desc:"Orient", preco:559 },
  { id:300, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c1853476.webp", nome:"Relógio Michael Kors Addyson Feminino - MK2947/5JN…", desc:"Michael Kors", preco:2300 },
  { id:301, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2148749.webp", nome:"Relógio Orient Special Caliber Automatic - YN6SC035…", desc:"Orient", preco:1799 },
  { id:302, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2148734.webp", nome:"Relógio Orient Special Caliber Automatic - YN6SS030…", desc:"Orient", preco:2599 },
  { id:303, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2148732.webp", nome:"Relógio Orient Special Caliber Automatic - YN6SS030…", desc:"Orient", preco:2599 },
  { id:304, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2148678.webp", nome:"Relógio Orient Special Caliber Automatic - YN6GC035…", desc:"Orient", preco:1899 },
  { id:305, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2148570.webp", nome:"Relógio Orient Special Caliber Automatic - YN6SC030…", desc:"Orient", preco:2399 },
  { id:306, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2148542.webp", nome:"Relógio Orient Special Caliber Automatic - YN6SS033…", desc:"Orient", preco:2599 },
  { id:307, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2148538.webp", nome:"Relógio Orient Special Caliber Automatic - YN6SS033…", desc:"Orient", preco:2599 },
  { id:308, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2148510.webp", nome:"Relógio Orient Solartech Elite Land Cronógrafo -…", desc:"Orient · Solar · Cronógrafo", preco:1699 },
  { id:309, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2147902.webp", nome:"Relógio Orient Bambino Automatic - RA AC0M01S30B…", desc:"Orient", preco:2999 },
  { id:310, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2147846.webp", nome:"Relógio Orient Symphony III Automatic - RA…", desc:"Orient", preco:2199 },
  { id:311, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2147834.webp", nome:"Relógio Orient Bambino Automático - RA AC0P01E30B…", desc:"Orient · Automático", preco:2799 },
  { id:312, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2147786.webp", nome:"Relógio Orient Bambino Automatic - RA AC0P04Y30B…", desc:"Orient", preco:2999 },
  { id:313, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2142860.webp", nome:"Relógio Orient Special Caliber Automatic - YN6SC033…", desc:"Orient", preco:2399 },
  { id:314, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2142828.webp", nome:"Relógio Orient Special Caliber Automatic - YN6SC030…", desc:"Orient", preco:2399 },
  { id:315, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2142814.webp", nome:"Relógio Orient Special Caliber Automatic - YN6GC030…", desc:"Orient", preco:2599 },
  { id:316, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2142776.webp", nome:"Relógio Orient Special Caliber Automatic - YN6GC033…", desc:"Orient", preco:2399 },
  { id:317, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2142770.webp", nome:"Relógio Orient Special Caliber Automatic - YN6MC035…", desc:"Orient", preco:1799 },
  { id:318, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2141007.webp", nome:"Relógio Citizen Tsuyosa 60 Automático - NK0023 57LN…", desc:"Citizen · Automático", preco:4990 },
  { id:319, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2140992.webp", nome:"Relógio Citizen Terra Force Eco-Drive Cronógrafo -…", desc:"Citizen · Cronógrafo", preco:3990 },
  { id:320, cat:"relogio", art:"relogio", quem:null, img:"pecas/c2139471.webp", nome:"Relógio Citizen Tsuyosa Automatic - NJ0150 56ZN…", desc:"Citizen", preco:3990 },
  { id:321, cat:"relogio", art:"relogio", quem:null, img:"pecas/c2134410.webp", nome:"Relógio Orient 3 Stars Sport Sea Automatic -…", desc:"Orient", preco:1899 },
  { id:322, cat:"relogio", art:"relogio", quem:null, img:"pecas/c2134396.webp", nome:"Relógio Orient Special Caliber Automatic - YN6SS035…", desc:"Orient", preco:1999 },
  { id:323, cat:"relogio", art:"relogio", quem:null, img:"pecas/c2134388.webp", nome:"Relógio Orient Special Caliber Automatic - YN6SS035…", desc:"Orient", preco:1999 },
  { id:324, cat:"relogio", art:"relogio", quem:null, img:"pecas/c2134371.webp", nome:"Relógio Orient Special Caliber Automatic - YN6SS031…", desc:"Orient", preco:1999 },
  { id:325, cat:"relogio", art:"relogio", quem:null, img:"pecas/c2002036.webp", nome:"Relógio Seiko Digital Rotocall - SMGG21P1 Azul", desc:"Seiko · Digital", preco:4399 },
  { id:326, cat:"relogio", art:"relogio", quem:null, img:"pecas/c1999221.webp", nome:"Relógio Seiko Digital Rotocall - SMGG19B1 BXSX…", desc:"Seiko · Digital", preco:4399 },
  { id:327, cat:"relogio", art:"relogio", quem:null, img:"pecas/c1999214.webp", nome:"Relógio Seiko Digital Rotocall - SMGG17B1 BXSX…", desc:"Seiko · Digital", preco:4399 },
  { id:328, cat:"relogio", art:"relogio", quem:null, img:"pecas/c1941632.webp", nome:"Relógio X-Watch Mini-X Digital Unissex - XKPPD099…", desc:"Relojoaria · Digital", preco:269 },
  { id:329, cat:"relogio", art:"relogio", quem:null, img:"pecas/c1941626.webp", nome:"Relógio X-Watch XPort Digital Unissex - XKPPD122…", desc:"Relojoaria · Digital", preco:269 },
  { id:330, cat:"relogio", art:"relogio", quem:null, img:"pecas/c1941598.webp", nome:"Relógio X-Watch Mini-X Digital Unissex - XKPPD067W…", desc:"Relojoaria · Digital", preco:259 },
  { id:331, cat:"relogio", art:"relogio", quem:null, img:"pecas/c1250098.webp", nome:"Relógio Mormaii AcquaForce Analógico Digital -…", desc:"Relojoaria · Digital", preco:439 },
  { id:332, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c1250000.webp", nome:"Relógio Mormaii Wave Digital Masculino - MO2019/8R", desc:"Relojoaria · Digital", preco:239 },
  { id:333, cat:"relogio", art:"relogio", quem:null, img:"pecas/c1246493.webp", nome:"Relógio Mormaii Action Analógico Digital - MO0949/8U", desc:"Relojoaria · Digital", preco:389 },
  { id:334, cat:"relogio", art:"relogio", quem:null, img:"pecas/c1195851.webp", nome:"Relógio Mormaii Urban Analógico Digital -…", desc:"Relojoaria · Digital", preco:439 },
  { id:335, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c1195827.webp", nome:"Relógio Mormaii Wave Digital Masculino - MO3415/8C", desc:"Relojoaria · Digital", preco:249 },
  { id:336, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c1195825.webp", nome:"Relógio Mormaii Wave Digital Masculino - MO3790AA/8P", desc:"Relojoaria · Digital", preco:249 },
  { id:337, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c1195720.webp", nome:"Relógio Mormaii Wave Digital Masculino - MO8090AD/8R", desc:"Relojoaria · Digital", preco:239 },
  { id:338, cat:"relogio", art:"relogio", quem:null, img:"pecas/c1195694.webp", nome:"Relógio Mormaii Acqua Analógico digital -…", desc:"Relojoaria · Digital", preco:459 },
  { id:339, cat:"relogio", art:"relogio", quem:null, img:"pecas/c1195689.webp", nome:"Relógio Mormaii Acqua Analógico digital -…", desc:"Relojoaria · Digital", preco:439 },
  { id:340, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c1195358.webp", nome:"Relógio Mormaii Acqua Wave Masculino - MO2019AC/8P", desc:"Relojoaria", preco:249 },
  { id:341, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c1195352.webp", nome:"Relógio Mormaii Digital Acqua Force Masculino -…", desc:"Relojoaria · Digital", preco:629 },
  { id:342, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c1195351.webp", nome:"Relógio Mormaii Digital Action Masculino -…", desc:"Relojoaria · Digital", preco:299 },
  { id:343, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c1194928.webp", nome:"Relógio Mormaii Digital Action Masculino -…", desc:"Relojoaria · Digital", preco:299 },
  { id:344, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c1191161.webp", nome:"Relógio Mormaii Digital Masculino - MO1105B/8J", desc:"Relojoaria · Digital", preco:329 },
  { id:345, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2134323.webp", nome:"Relógio Orient Eternal Tank Masculino - GBSS1059…", desc:"Orient", preco:999 },
  { id:346, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2134254.webp", nome:"Relógio Orient Eternal Tank Masculino - GBSC1014…", desc:"Orient", preco:799 },
  { id:347, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2134239.webp", nome:"Relógio Orient Eternal Tank Masculino - GGSC1003…", desc:"Orient", preco:899 },
  { id:348, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2134153.webp", nome:"Relógio Orient Eternal Tank Masculino - GBSS1059…", desc:"Orient", preco:999 },
  { id:349, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2133584.webp", nome:"Relógio Orient Eternal Tank Masculino - GBSS1059…", desc:"Orient", preco:999 },
  { id:350, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2133567.webp", nome:"Relógio Orient Eternal Tank Masculino - GRSC1004…", desc:"Orient", preco:899 },
  { id:351, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c2130202.webp", nome:"Relógio Orient Mini Feminino - FBSS0150 W1SX…", desc:"Orient", preco:599 },
  { id:352, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c2129326.webp", nome:"Relógio Orient Mini Feminino - LBSS0089 R1SX Rosa", desc:"Orient", preco:599 },
  { id:353, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c2129272.webp", nome:"Relógio Orient Eternal Tank Feminino - LGSC1006…", desc:"Orient", preco:899 },
  { id:354, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c2129268.webp", nome:"Relógio Orient Solartech Eternal Feminino -…", desc:"Orient · Solar", preco:699 },
  { id:355, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2129119.webp", nome:"Relógio Orient Eternal Tank Masculino - GGSC1002…", desc:"Orient", preco:899 },
  { id:356, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c2110950.webp", nome:"Relógio Bulova Super Seville Mini Feminino - 97L189…", desc:"Bulova", preco:4490 },
  { id:357, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c2110306.webp", nome:"Relógio Bulova Super Seville Mini Feminino - 96L353…", desc:"Bulova", preco:3990 },
  { id:358, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2104359.webp", nome:"Relógio Guess Walker Multifunção Masculino -…", desc:"Guess", preco:1379 },
  { id:359, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c2104349.webp", nome:"Relógio Guess Victoria Multifunção Feminino -…", desc:"Guess", preco:1439 },
  { id:360, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c2104330.webp", nome:"Relógio Guess Hazel Feminino - GW1018L4 Rose", desc:"Guess", preco:1439 },
  { id:361, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c2104303.webp", nome:"Relógio Guess Charlotte Feminino - GW0767L4 Verde", desc:"Guess", preco:1079 },
  { id:362, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c2104285.webp", nome:"Relógio Guess Birdie Multifunção Feminino -…", desc:"Guess", preco:1439 },
  { id:363, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c2104146.webp", nome:"Relógio Guess Multifunção Feminino - GW1037L2…", desc:"Guess", preco:1599 },
  { id:364, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2104127.webp", nome:"Relógio Guess Palmer Multifunção Masculino -…", desc:"Guess", preco:1299 },
  { id:365, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2104125.webp", nome:"Relógio Guess Arthur Cronógrafo Masculino -…", desc:"Guess · Cronógrafo", preco:1539 },
  { id:366, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c2104108.webp", nome:"Relógio Guess Sasha Feminino - GW0939L2 Dourado", desc:"Guess", preco:1319 },
  { id:367, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c2104087.webp", nome:"Relógio Guess Alice Feminino - GW0934L5 Bordo", desc:"Guess", preco:1319 },
  { id:368, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c2103439.webp", nome:"Relógio Guess Pixie Feminino - GW0931L4 Rose", desc:"Guess", preco:1399 },
  { id:369, cat:"relogio", art:"relogio", quem:null, img:"pecas/c2140934.webp", nome:"Relógio Citizen Terra Force Eco-Drive - CA4746 08XN…", desc:"Citizen", preco:3990 },
  { id:370, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2140171.webp", nome:"Relógio Citizen Aviator Eco-Drive Masculino -…", desc:"Citizen", preco:2990 },
  { id:371, cat:"relogio", art:"relogio", quem:null, img:"pecas/c2140139.webp", nome:"Relógio Citizen Promaster Navihawk AT Eco-Drive -…", desc:"Citizen", preco:6990 },
  { id:372, cat:"relogio", art:"relogio", quem:null, img:"pecas/c2139499.webp", nome:"Relógio Citizen Promaster Aqualand Diver’s - BN2038…", desc:"Citizen", preco:7490 },
  { id:373, cat:"relogio", art:"relogio", quem:"ela", img:"pecas/c2139456.webp", nome:"Relógio Citizen Lady Classic Feminino - EM1140 80DN…", desc:"Citizen", preco:3990 },
  { id:374, cat:"relogio", art:"relogio", quem:null, img:"pecas/c2139319.webp", nome:"Relógio Citizen Endeavour Chrono Eco-Drive - CA4730…", desc:"Citizen", preco:5490 },
  { id:375, cat:"relogio", art:"relogio", quem:null, img:"pecas/c2139302.webp", nome:"Relógio Citizen Calendrier Moon Phase - BU0082 06PN…", desc:"Citizen", preco:5490 },
  { id:376, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2139290.webp", nome:"Relógio Citizen Marine Eco-Drive Masculino - AW1810…", desc:"Citizen", preco:2990 },
  { id:377, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2139266.webp", nome:"Relógio Citizen Corso Eco-Drive Masculino - AO9000…", desc:"Citizen", preco:2990 },
  { id:378, cat:"relogio", art:"relogio", quem:null, img:"pecas/c2139251.webp", nome:"Relógio Citizen Promaster Navihawk Cronógrafo -…", desc:"Citizen · Cronógrafo", preco:4990 },
  { id:379, cat:"relogio", art:"relogio", quem:null, img:"pecas/c2139232.webp", nome:"Relógio Citizen Promaster Diver’s Edição Limitada -…", desc:"Citizen · Edição Limitada", preco:4490 },
  { id:380, cat:"relogio", art:"relogio", quem:null, img:"pecas/c2136907.webp", nome:"Relógio Citizen Promaster Diver’s Eco-Drive -…", desc:"Citizen", preco:3990 },
  { id:381, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2136864.webp", nome:"Relógio Citizen Endeavor Chrono Masculino - CA4733…", desc:"Citizen", preco:5790 },
  { id:382, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2136761.webp", nome:"Relógio Citizen Sports Eco-Drive Masculino - AW1526…", desc:"Citizen", preco:2990 },
  { id:383, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2136746.webp", nome:"Relógio Citizen Corso Eco-Drive Masculino - AW1232…", desc:"Citizen", preco:2490 },
  { id:384, cat:"relogio", art:"relogio", quem:null, img:"pecas/c2136718.webp", nome:"Relógio Citizen Promaster Blue Angels Eco-Drive -…", desc:"Citizen", preco:5490 },
  { id:385, cat:"relogio", art:"relogio", quem:"ele", img:"pecas/c2129315.webp", nome:"Relógio Orient Solartech Masculino - MPSS1068 G2PX…", desc:"Orient · Solar", preco:1399 },
  { id:386, cat:"relogio", art:"relogio", quem:null, img:"pecas/c2129300.webp", nome:"Relógio Orient Solartech Elite Elegance - MBSSC309…", desc:"Orient · Solar", preco:1599 },
  { id:387, cat:"relogio", art:"relogio", quem:null, img:"pecas/c2129245.webp", nome:"Relógio Orient Solartech Elite Land - MBSSC308 D2SX…", desc:"Orient · Solar", preco:1399 },
  { id:388, cat:"relogio", art:"relogio", quem:null, img:"pecas/c2129227.webp", nome:"Relógio Orient Solartech Elite Elegance - MBSCC072…", desc:"Orient · Solar", preco:1399 },
  { id:389, cat:"relogio", art:"relogio", quem:null, img:"pecas/c2129147.webp", nome:"Relógio Orient Solartech Elite Air - MBSSC310 D1SX…", desc:"Orient · Solar", preco:1599 },
  { id:390, cat:"relogio", art:"relogio", quem:null, img:"pecas/c2129104.webp", nome:"Relógio Orient Solartech Elite Sea - MBSS1538 D1SX…", desc:"Orient · Solar", preco:1399 },
  { id:391, cat:"relogio", art:"relogio", quem:null, img:"pecas/c1849062.webp", nome:"Smartwatch X-Watch Unissex - XSWUQPI001A PXPX Preto", desc:"Relojoaria · Smartwatch", preco:299 },
  { id:392, cat:"relogio", art:"relogio", quem:null, img:"pecas/c1360541.webp", nome:"Smartwatch Mormaii Force - MOFORCEAC/8C", desc:"Relojoaria · Smartwatch", preco:899 },
  { id:393, cat:"relogio", art:"relogio", quem:null, img:"pecas/c1360539.webp", nome:"Smartwatch Mormaii Force - MOFORCEAB/8V", desc:"Relojoaria · Smartwatch", preco:899 },
  { id:394, cat:"relogio", art:"relogio", quem:null, img:"pecas/c1254549.webp", nome:"SmartWatch Technos Connect Max Unissex - TMAXAB/5K", desc:"Relojoaria · Smartwatch", preco:999 },
  { id:395, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2134168.webp", nome:"Óculos de Sol Tom Ford FT1349_5828F Metal Rose com…", desc:"Óculos de sol", preco:3130 },
  { id:396, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2134138.webp", nome:"Óculos de Sol Roberto Cavalli SRC113V 57700Y…", desc:"Óculos de sol", preco:3089 },
  { id:397, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2133537.webp", nome:"Óculos de Sol Maxmara MM0190_6030P Metal Dourado…", desc:"Óculos de sol", preco:1339 },
  { id:398, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2127240.webp", nome:"Óculos de Sol Prada 0PR D51S 5AK20I55 Metal Dourado…", desc:"Prada · Óculos de sol", preco:3800 },
  { id:399, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2123210.webp", nome:"Óculos de Sol Chopard SCHM60S 59594X Metal Dourado…", desc:"Óculos de sol", preco:5889 },
  { id:400, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2121531.webp", nome:"Óculos de Sol Prada 0PR D50S 5AK20I57 Metal Dourado…", desc:"Prada · Óculos de sol", preco:3800 },
  { id:401, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2121414.webp", nome:"Óculos de Sol Roberto Cavalli SRC142M5409AJ Acetato…", desc:"Óculos de sol", preco:2819 },
  { id:402, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2112068.webp", nome:"Óculos de Sol Moschino MOS180/S 1ED 559K S Acetato…", desc:"Óculos de sol", preco:1990 },
  { id:403, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2112066.webp", nome:"Óculos de Sol Moschino MOS177/S 010 57UR S Metal…", desc:"Óculos de sol", preco:1940 },
  { id:404, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2112045.webp", nome:"Óculos de Sol Moschino MOS156/S 807 549O S Acetato…", desc:"Óculos de sol", preco:1990 },
  { id:405, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2112043.webp", nome:"Óculos de Sol Moschino MOS146/S 05L 55HA S Acetato…", desc:"Óculos de sol", preco:1990 },
  { id:406, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2129945.webp", nome:"Óculos de Sol Ray-Ban 0RB3445 006/P261 Metal Preto…", desc:"Ray-Ban · Óculos de sol", preco:1190 },
  { id:407, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2128442.webp", nome:"Óculos de Sol Infantil Silmo Kids SK-11010 C13 46…", desc:"Óculos de sol · Infantil", preco:399 },
  { id:408, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2128423.webp", nome:"Óculos de Sol Infantil Silmo Kids SK-11001 C1 45…", desc:"Óculos de sol · Infantil", preco:399 },
  { id:409, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2128409.webp", nome:"Óculos de Sol Infantil Silmo Kids SK-11003 C1 42…", desc:"Óculos de sol · Infantil", preco:399 },
  { id:410, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2128404.webp", nome:"Óculos de Sol Infantil Silmo Kids SK-11010 C7 46…", desc:"Óculos de sol · Infantil", preco:399 },
  { id:411, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2128389.webp", nome:"Óculos de Sol Infantil Silmo Kids SK-11001 C6 45…", desc:"Óculos de sol · Infantil", preco:399 },
  { id:412, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2121529.webp", nome:"Óculos de Sol Ray-Ban Round Titanium 0RB8247…", desc:"Ray-Ban · Óculos de sol", preco:1390 },
  { id:413, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2112070.webp", nome:"Óculos de Sol Moschino MOS187/S 6AK 56IR S Acetato…", desc:"Óculos de sol", preco:1990 },
  { id:414, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2112063.webp", nome:"Óculos de Sol Moschino MOS183/S 003 619O S Acetato…", desc:"Óculos de sol", preco:1990 },
  { id:415, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2112053.webp", nome:"Óculos de Sol Moschino MOS175/S 807 559O S Acetato…", desc:"Óculos de sol", preco:1990 },
  { id:416, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2112047.webp", nome:"Óculos de Sol Moschino MOS175/S 086 559K S Acetato…", desc:"Óculos de sol", preco:1990 },
  { id:417, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2110947.webp", nome:"Óculos de Sol Hugo Boss HG 1314/S 807 55AO S…", desc:"Hugo Boss · Óculos de sol", preco:990 },
  { id:418, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2110933.webp", nome:"Óculos de Sol Hugo Boss HG 1286/S B88 51IR Acetato…", desc:"Hugo Boss · Óculos de sol", preco:990 },
  { id:419, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2110931.webp", nome:"Óculos de Sol David Beckham DB 7132/S WR9 56QT S…", desc:"Óculos de sol", preco:1790 },
  { id:420, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2110928.webp", nome:"Óculos de Sol David Beckham DB 7136/S 6C5 569O S…", desc:"Óculos de sol", preco:1790 },
  { id:421, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2110917.webp", nome:"Óculos de Sol David Beckham DB 1177/S M5Z 53IR S…", desc:"Óculos de sol", preco:1490 },
  { id:422, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2110912.webp", nome:"Óculos de Sol David Beckham DB 7126/S EX4 51KU S…", desc:"Óculos de sol", preco:1560 },
  { id:423, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2110910.webp", nome:"Óculos de Sol David Beckham DB 7000/S FLAT 807 54KE…", desc:"Óculos de sol", preco:1690 },
  { id:424, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2110880.webp", nome:"Óculos de Sol Carrera VICTORY C 08/S 7C5 5608 S…", desc:"Carrera · Óculos de sol", preco:890 },
  { id:425, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2110331.webp", nome:"Óculos de Sol Carrera VICTORY C 08/S 003 5686 S…", desc:"Carrera · Óculos de sol", preco:890 },
  { id:426, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2110219.webp", nome:"Óculos de Sol Hugo BOSS 1765/G/S PJP 55IR S Acetato…", desc:"Hugo Boss · Óculos de sol", preco:1990 },
  { id:427, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2110194.webp", nome:"Óculos de Sol Hugo BOSS 1647/S PJP 55IR S Acetato…", desc:"Hugo Boss · Óculos de sol", preco:1390 },
  { id:428, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2110192.webp", nome:"Óculos de Sol Hugo BOSS 1628/S 807 54IR S Acetato…", desc:"Hugo Boss · Óculos de sol", preco:1990 },
  { id:429, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2110180.webp", nome:"Óculos de Sol Hugo BOSS 1619/F/S 003 58IR S Metal…", desc:"Hugo Boss · Óculos de sol", preco:1990 },
  { id:430, cat:"oculos", art:"oculos", quem:null, img:"pecas/c1999773.webp", nome:"Óculos de Sol Ray-Ban Junior Disney Lilo & Stitch…", desc:"Ray-Ban · Óculos de sol · Infantil", preco:630 },
  { id:431, cat:"oculos", art:"oculos", quem:null, img:"pecas/c1999771.webp", nome:"Óculos de Sol Ray-Ban Junior…", desc:"Ray-Ban · Óculos de sol · Infantil", preco:520 },
  { id:432, cat:"oculos", art:"oculos", quem:null, img:"pecas/c1714157.webp", nome:"Óculos de Sol Ray-Ban Junior Burbank Kids Infantil…", desc:"Ray-Ban · Óculos de sol · Infantil", preco:499 },
  { id:433, cat:"oculos", art:"oculos", quem:null, img:"pecas/c1205922.webp", nome:"Óculos de Sol Infantil Dolce & Gabbana Junior…", desc:"Dolce & Gabbana · Óculos de sol · Infantil", preco:909 },
  { id:434, cat:"oculos", art:"oculos", quem:null, img:"pecas/c1131748.webp", nome:"Óculos de Sol Infantil Ray-Ban Junior 0RJ9069S…", desc:"Ray-Ban · Óculos de sol · Infantil", preco:430 },
  { id:435, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2150965.webp", nome:"Óculos de Grau Tom Ford FT6135-B_56052 Acetato…", desc:"Óculos de grau", preco:2639 },
  { id:436, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2133572.webp", nome:"Óculos de Grau MaxMara MM5235_53052 Acetato Marrom…", desc:"Óculos de grau", preco:1229 },
  { id:437, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2133565.webp", nome:"Óculos de Grau MaxMara MM5232_54046 Acetato Castanho", desc:"Óculos de grau", preco:959 },
  { id:438, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2128344.webp", nome:"Óculos de Grau Infantil Silmo Kids SK-4000 PINK 47…", desc:"Óculos de grau · Infantil", preco:499 },
  { id:439, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2128233.webp", nome:"Óculos de Grau Infantil Silmo Kids SK-3203 BLUE 52…", desc:"Óculos de grau · Infantil", preco:499 },
  { id:440, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2128227.webp", nome:"Óculos de Grau Infantil Silmo Kids SK-3200 ROSE 48…", desc:"Óculos de grau · Infantil", preco:499 },
  { id:441, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2127505.webp", nome:"Óculos de Grau Infantil Silmo Kids SK-3106 TEAL 50…", desc:"Óculos de grau · Infantil", preco:499 },
  { id:442, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2127494.webp", nome:"Óculos de Grau Infantil Silmo Kids SK-3106 ROSE 50…", desc:"Óculos de grau · Infantil", preco:499 },
  { id:443, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2127488.webp", nome:"Óculos de Grau Infantil Silmo Kids Feminino no…", desc:"Óculos de grau · Infantil", preco:499 },
  { id:444, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2127476.webp", nome:"Óculos de Grau Silmo Kids SK-3102 D.PURPLE 52…", desc:"Óculos de grau", preco:499 },
  { id:445, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2127467.webp", nome:"Óculos de Grau Infantil Silmo Kids SK-3101 RED 51…", desc:"Óculos de grau · Infantil", preco:499 },
  { id:446, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2127450.webp", nome:"Óculos de Grau Infantil Silmo Kids SK-3101 D.PURPLE…", desc:"Óculos de grau · Infantil", preco:499 },
  { id:447, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2127433.webp", nome:"Óculos de Grau Infantil Silmo Kids SK-3101 PINK 51…", desc:"Óculos de grau · Infantil", preco:499 },
  { id:448, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2127338.webp", nome:"Óculos de Grau Infantil Silmo Kids SK-3902 VIOLETA…", desc:"Óculos de grau · Infantil", preco:499 },
  { id:449, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2127304.webp", nome:"Óculos de Grau Infantil Silmo Kids SK-3901 PINK 44…", desc:"Óculos de grau · Infantil", preco:499 },
  { id:450, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2127289.webp", nome:"Óculos de Grau Infantil Silmo Kids SK-3900 VIOLET…", desc:"Óculos de grau · Infantil", preco:499 },
  { id:451, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2121437.webp", nome:"Óculos de Grau Furla VFUA98 550718 Acetato Vermelho", desc:"Óculos de grau", preco:899 },
  { id:452, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2121433.webp", nome:"Óculos de Grau Furla VFUA97 510C10 Acetato Marrom…", desc:"Óculos de grau", preco:899 },
  { id:453, cat:"oculos", art:"oculos", quem:"ela", img:"pecas/c2121421.webp", nome:"Óculos de Grau Furla VFUA97 5106UU Acetato Rosa", desc:"Óculos de grau", preco:899 },
  { id:454, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2150950.webp", nome:"Óculos de Grau Tom Ford FT5532-B_5252N Acetato…", desc:"Óculos de grau", preco:3849 },
  { id:455, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2130756.webp", nome:"Óculos de Grau Lozza VL4351 510700 Acetato Preto", desc:"Óculos de grau", preco:1079 },
  { id:456, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2128374.webp", nome:"Óculos de Grau Infantil Silmo Kids SK-3103…", desc:"Óculos de grau · Infantil", preco:499 },
  { id:457, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2128367.webp", nome:"Óculos de Grau Infantil Silmo Kids SK-4001 CRYSTAL…", desc:"Óculos de grau · Infantil", preco:499 },
  { id:458, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2128280.webp", nome:"Óculos de Grau Infantil Silmo Kids SK-3210 BLUE 46…", desc:"Óculos de grau · Infantil", preco:499 },
  { id:459, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2128263.webp", nome:"Óculos de Grau Infantil Silmo Kids SK-3210 BLACK 46…", desc:"Óculos de grau · Infantil", preco:499 },
  { id:460, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2128244.webp", nome:"Óculos de Grau Infantil Silmo Kids SK-3209 BLUE 47…", desc:"Óculos de grau · Infantil", preco:499 },
  { id:461, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2128210.webp", nome:"Óculos de Grau Infantil Silmo Kids SK-3119 BLUE 47…", desc:"Óculos de grau · Infantil", preco:499 },
  { id:462, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2128176.webp", nome:"Óculos de Grau Infantil Silmo Kids SK-3112 GREEN 47…", desc:"Óculos de grau · Infantil", preco:499 },
  { id:463, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2128153.webp", nome:"Óculos de Grau Infantil Silmo Kids SK-3111 BLACK 47…", desc:"Óculos de grau · Infantil", preco:499 },
  { id:464, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2128139.webp", nome:"Óculos de Grau Infantil Silmo Kids SK-3110 TEAL 52…", desc:"Óculos de grau · Infantil", preco:499 },
  { id:465, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2127534.webp", nome:"Óculos de Grau Infantil Silmo Kids SK-3107 GREEN 52…", desc:"Óculos de grau · Infantil", preco:499 },
  { id:466, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2127366.webp", nome:"Óculos de Grau Infantil Silmo Kids SK-3907 GREY 50…", desc:"Óculos de grau · Infantil", preco:499 },
  { id:467, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2127278.webp", nome:"Óculos de Grau Infantil Silmo Kids com Clip-On 6503…", desc:"Óculos de grau · Infantil", preco:499 },
  { id:468, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2121655.webp", nome:"Óculos de Grau Hugo Boss HG 1342/G 0A4 5616 R…", desc:"Hugo Boss · Óculos de grau", preco:990 },
  { id:469, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2116506.webp", nome:"Óculos de Grau Moschino MOS645 807 5418 R Acetato…", desc:"Óculos de grau", preco:1880 },
  { id:470, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2116489.webp", nome:"Óculos de Grau Montblanc MB0376OJ-002 54 Acetato…", desc:"Óculos de grau", preco:2270 },
  { id:471, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2116250.webp", nome:"Óculos de Grau Marc Jacobs MARC 607 2W8 5617 R…", desc:"Óculos de grau", preco:1590 },
  { id:472, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2116168.webp", nome:"Óculos de Grau Marc Jacobs MARC 471 807 5814 R…", desc:"Óculos de grau", preco:1490 },
  { id:473, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2116130.webp", nome:"Óculos de Grau Hugo Boss HG 1343 R80 5617 R Metal…", desc:"Hugo Boss · Óculos de grau", preco:990 },
  { id:474, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2116119.webp", nome:"Óculos de Grau Hugo Boss HG 1317 807 5519 R Acetato…", desc:"Hugo Boss · Óculos de grau", preco:790 },
  { id:475, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2116113.webp", nome:"Óculos de Grau Hugo Boss HG 1317 PJP 5519 R Acetato…", desc:"Hugo Boss · Óculos de grau", preco:790 },
  { id:476, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2116098.webp", nome:"Óculos de Grau Hugo Boss HG 1315 807 5020 R Acetato…", desc:"Hugo Boss · Óculos de grau", preco:890 },
  { id:477, cat:"oculos", art:"oculos", quem:"ele", img:"pecas/c2115563.webp", nome:"Óculos de Grau Hugo Boss HG 1315 KB7 5020 R Acetato…", desc:"Hugo Boss · Óculos de grau", preco:840 },
  { id:478, cat:"oculos", art:"oculos", quem:null, img:"pecas/c2128134.webp", nome:"Óculos de Grau Infantil Silmo Kids SK-3110 GREY 52…", desc:"Óculos de grau · Infantil", preco:499 },
  { id:479, cat:"oculos", art:"oculos", quem:null, img:"pecas/c2127584.webp", nome:"Óculos de Grau Infantil Silmo Kids SK-3109 GREY 48…", desc:"Óculos de grau · Infantil", preco:499 },
];
const pecaIMG = p => p.img
  ? `<img class="pc-img" src="${p.img}" alt="${p.nome}" loading="lazy">`
  : jewelArt(p.art);


/* ================= ARTE DAS PEÇAS (SVG linha dourada) ================= */
const ART = {
  anel: `<circle cx="100" cy="76" r="32"/><circle cx="100" cy="76" r="26" opacity=".4"/>
         <path d="M88 34l6-11h12l6 11-12 14z" stroke="#a97c14"/><path d="M88 34h24M94 23l6 11 6-11" stroke="#a97c14" stroke-width="1.3"/>`,
  colar:`<path d="M42 20q58 74 116 0" /><circle cx="42" cy="18" r="3.5"/><circle cx="158" cy="18" r="3.5"/>
         <path d="M100 57v10"/><circle cx="100" cy="54" r="3" opacity=".6"/>
         <path d="M91 76l9-9 9 9-9 13z" stroke="#a97c14"/><path d="M91 76h18" stroke="#a97c14" stroke-width="1.3"/>`,
  brinco:`<path d="M62 22c9 1 9 13 0 14" /><path d="M66 36v12"/><path d="M57 58l9-10 9 10-9 14z" stroke="#a97c14"/>
          <path d="M128 22c9 1 9 13 0 14"/><path d="M132 36v12"/><path d="M123 58l9-10 9 10-9 14z" stroke="#a97c14"/>`,
  pingente:`<path d="M58 14l42 36 42-36"/><circle cx="100" cy="55" r="4.5"/>
            <path d="M89 74l11-11 11 11-11 16z" stroke="#a97c14"/><path d="M89 74h22M96 63l4 11 4-11" stroke="#a97c14" stroke-width="1.2"/>`,
  pulseira:`<ellipse cx="100" cy="58" rx="55" ry="25"/><ellipse cx="100" cy="58" rx="48" ry="19" opacity=".35"/>
            <circle cx="45" cy="58" r="4"/><circle cx="155" cy="58" r="4"/><circle cx="100" cy="83" r="4"/>
            <path d="M100 87v8"/><path d="M94 99l6-6 6 6-6 9z" stroke="#a97c14"/>`,
  relogio:`<rect x="86" y="6" width="28" height="16" rx="5"/><rect x="86" y="98" width="28" height="16" rx="5"/>
           <circle cx="100" cy="60" r="31"/><circle cx="100" cy="60" r="25" opacity=".4"/>
           <path d="M100 60V43M100 60l11 9" stroke="#a97c14"/><rect x="133" y="55" width="7" height="10" rx="2.5"/>
           <path d="M100 39v3M100 78v3M81 60h3M116 60h3" stroke-width="1.4"/>`,
  oculos:`<rect x="30" y="44" width="58" height="38" rx="15"/><rect x="112" y="44" width="58" height="38" rx="15"/>
          <path d="M88 56c5-7 19-7 24 0"/><path d="M30 54H16m154 0h14"/>`,
  alianca:`<circle cx="80" cy="64" r="30"/><circle cx="80" cy="64" r="24" opacity=".4"/>
           <circle cx="120" cy="64" r="30"/><circle cx="120" cy="64" r="24" opacity=".4"/>
           <path d="M116 30l4-6 4 6-4 5z" stroke="#a97c14"/>`
};
function jewelArt(kind){
  return `<svg viewBox="0 0 200 122" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="#c49a37" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${ART[kind]||ART.anel}</g>
    <g stroke="#a97c14" stroke-width="1.5" stroke-linecap="round" fill="none" opacity=".85">
      <path d="M168 20v11M162.5 25.5h11"/><path d="M34 12v8M30 16h8"/><path d="M176 92v7M172.5 95.5h7" opacity=".6"/>
    </g></svg>`;
}
function qrSVG(seed){
  let s = seed; const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  const N = 21, M = 6, T = N * M;
  const ehFinder = (x, y) => (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12);
  let cells = '';
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++){
    if (ehFinder(x, y)) continue;
    const timing = (x === 6 || y === 6);
    const on = timing ? (x + y) % 2 === 0 : rnd() > .5;
    if (on) cells += `<rect x="${x*M}" y="${y*M}" width="${M}" height="${M}"/>`;
  }
  const f = (px, py) => `<rect x="${px*M}" y="${py*M}" width="${7*M}" height="${7*M}" fill="#111"/>` +
    `<rect x="${(px+1)*M}" y="${(py+1)*M}" width="${5*M}" height="${5*M}" fill="#fff"/>` +
    `<rect x="${(px+2)*M}" y="${(py+2)*M}" width="${3*M}" height="${3*M}" fill="#111"/>`;
  return `<svg viewBox="0 0 ${T} ${T}" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">` +
    `<rect width="${T}" height="${T}" fill="#fff"/><g fill="#111">${cells}${f(0,0)}${f(14,0)}${f(0,14)}</g></svg>`;
}

/* ================= PLUMBING DO CHAT ================= */
const CAT_LABEL = { joia:'Ouro 18k · Diamantes', prata:'For Me · Prata 925', relogio:'Relojoaria', oculos:'Eyewear', alianca:'Alianças · Ouro 18k' };
const TIPS = [
  'Quero um presente pra minha esposa',
  'Vocês têm alianças de casamento?',
  'Quanto custa um relógio bom?',
  'Tem loja em Caxias do Sul?',
  'Óculos de grau de marca',
  'Achei caro 😅',
  'Vou pensar e te falo',
  'Isso é original mesmo?',
  'Meu relógio parou, vocês consertam?',
  'Como funciona a troca?',
  'Ganho pontos Livelo?',
  'Quero falar com uma consultora'
];
let chat = null;
const chatBox = $('#chatBox'), chipsRow = $('#chipsRow'), chatInput = $('#chatInput');
const hora = () => new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
const sleep = ms => new Promise(r => setTimeout(r, ms));

function chatScroll(){ chatBox.scrollTop = chatBox.scrollHeight; }
function addDay(t){ chatBox.insertAdjacentHTML('beforeend', `<div class="wa-day">${t}</div>`); }
function addMsg(side, html){
  chatBox.insertAdjacentHTML('beforeend', `<div class="msg ${side}">${html}<span class="t">${hora()}${side==='out'?' ✓✓':''}</span></div>`);
  chatScroll();
}
function setChips(list){
  chipsRow.innerHTML = (list || []).map(c => `<button type="button" class="chip">${c}</button>`).join('');
  chipsRow.querySelectorAll('.chip').forEach(b => b.addEventListener('click', () => sendUser(b.textContent)));
  chatScroll();
}
async function botSay(msgs, chips){
  setChips([]);
  for (const m of msgs){
    chatBox.insertAdjacentHTML('beforeend','<div class="typing" id="typingDot"><i></i><i></i><i></i></div>');
    chatScroll();
    await sleep(480 + Math.min(m.length * 5, 850));
    const td = document.getElementById('typingDot'); if (td) td.remove();
    addMsg('in', m);
  }
  setChips(chips);
}
function prodCardHTML(p, n){
  return `<div class="pcard">
    <span class="pc-tag">${CAT_LABEL[p.cat]}</span>
    <b>${n ? n + '. ' : ''}${p.nome}</b>
    <div class="pc-art">${pecaIMG(p)}</div>
    <span class="pc-desc">${p.desc}</span>
    <span class="pc-price">${p.aPartir ? 'a partir de ' : ''}${fmtBRL(p.preco)}<small>ou 12x de ${fmtBRL2(Math.round(p.preco/12*100)/100)} sem juros 💳</small></span>
  </div>`;
}
function lojaCardHTML(f){
  return `<div class="loja-card"><b>📍 ${f.nome}</b>
    <span class="lc-l">${f.shopping} — ${f.cidade}/${f.uf}</span>
    <span class="lc-l">${f.end}</span>
    <span class="lc-l">📱 ${f.fone} · 👩‍💼 Consultora: <b>${f.consultora}</b></span>
    <span class="lc-l">🕐 Seg–Sáb 10h–22h · Dom 14h–20h (horário do shopping)</span></div>`;
}

function resetChat(){
  chat = { quem:null, ocasiao:null, budget:null, min:null, cat:null, art:null, termo:null,
           lastList:[], sel:null, fase:null, after:null, filial:null,
           entrega:null, pgto:null, consertoItem:null };
  chatBox.innerHTML = '';
  addDay('Hoje');
  botSay([
    'Oi, tudo bem? 😊 Eu sou a <b>Luiza</b>, atendente da <b>Coliseu Joalheria</b> — joias, relógios e eyewear <b>desde 1968</b> 💛',
    'Pode me contar sem pressa o que você está buscando, tá? Eu te ajudo em tudo: <b>escolher um presente</b> 🎁, ver <b>alianças</b> 💍, <b>relógios</b> ⌚ e <b>óculos</b> 🕶️, <b>agendar um atendimento VIP</b> ou achar a <b>loja mais próxima</b> de você — são <b>14 lojas no RS e SC</b> 📍<br><br>Me conta: o que você procura hoje?'
  ], ['Quero um presente 🎁','Alianças 💍','Relógios ⌚','Óculos 🕶️','Loja mais próxima 📍']);
}

/* ================= DETECTORES ================= */
function detectQuem(t){
  if (/esposa|namorada|minha mulher|\bmae\b|filha|irma\b|amiga|sogra|madrinha|\bela\b|feminino|pra ela/.test(t)) return 'ela';
  if (/marido|namorado|esposo|\bpai\b|filho\b|irmao|amigo\b|padrinho|\bele\b|masculino|pra ele/.test(t)) return 'ele';
  if (/pra mim|para mim|é pra mim|e pra mim|meu presente/.test(t)) return 'mim';
  return null;
}
function detectOcasiao(t){
  if (/pedido de casamento|noivado|pedir em casamento|vou pedir/.test(t)) return 'pedido';
  if (/aniversario de casamento|bodas/.test(t)) return 'bodas';
  if (/aniversario|niver/.test(t)) return 'aniversario';
  if (/nascimento|bebe|maternidade|batizado/.test(t)) return 'nascimento';
  if (/formatura/.test(t)) return 'formatura';
  if (/natal/.test(t)) return 'natal';
  if (/sem ocasiao|mimo|so porque sim|nenhuma/.test(t)) return 'mimo';
  return null;
}
function detectBudget(t){
  if (/me surpreende|surpreenda|tanto faz|sem limite/.test(t)) return { open:true };
  const nums = (t.replace(/\./g,'').match(/\d+/g) || []).map(n => parseInt(n,10)).filter(n => n > 0);
  if (!nums.length) return null;
  const mil = /mil|k\b/.test(t);
  const vals = nums.map(n => (mil && n < 1000) ? n * 1000 : n).filter(n => n >= 200);
  if (!vals.length) return null;
  const max = Math.max(...vals);
  if (/acima|mais de|a partir/.test(t)) return { min:max };
  return { max };
}
const CIDADES = [
  { re:/canoas/, id:'parkcanoas' },
  { re:/caxias|serra gaucha|villagio/, id:'villagio' },
  { re:/novo hamburgo|\bnh\b|sao leopoldo|vale dos sinos|campo bom|estancia velha/, id:'bourbonnh' },
  { re:/passo fundo/, id:'passofundo' },
  { re:/camboriu|balneario|\bbc\b|itajai|itapema/, id:'camboriu' },
  { re:/joinville|blumenau/, id:'joinville' },
  { re:/iguatemi|passo d areia|zona norte/, id:'iguatemi' },
  { re:/praia de belas|menino deus|centro sul/, id:'praiadebelas' },
  { re:/moinhos|auxiliadora|independencia|floresta/, id:'moinhos' },
  { re:/barra|cristal|zona sul|ipanema|tristeza|cavalhada/, id:'barrasul' },
  { re:/ipiranga|jardim botanico|partenon|intercap/, id:'ipiranga' },
  { re:/country|tulio de rose/, id:'country' },
  { re:/wallig|assis brasil|cristo redentor|sarandi/, id:'wallig' },
  { re:/andradas|centro historico|rua da praia|\bcentro\b/, id:'andradas' }
];
function detectCidade(t){
  for (const c of CIDADES) if (c.re.test(t)) return filialById(c.id);
  return null;
}
const isPOA = t => /porto alegre|poa\b/.test(t);
const outraCidade = t => /outra cidade|outro estado|florianopolis|curitiba|sao paulo|rio de janeiro|litoral|interior|nao moro|longe/.test(t);

/* ================= CATÁLOGO NO CHAT ================= */
function pickList(){
  let pool = PRODUTOS.filter(p => p.cat !== 'alianca');
  if (chat.art) pool = pool.filter(p => p.art === chat.art);
  if (chat.cat) pool = pool.filter(p => p.cat === chat.cat);
  if (chat.termo){
    const comTermo = pool.filter(p => norm(p.nome + ' ' + (p.desc || '')).replace(/-/g, ' ').includes(chat.termo));
    if (comTermo.length) pool = comTermo;
  }
  if (chat.quem === 'ela') pool = pool.filter(p => p.quem !== 'ele');
  if (chat.quem === 'ele') pool = pool.filter(p => p.quem !== 'ela');
  if (chat.min) pool = pool.filter(p => p.preco >= chat.min * 0.9);
  let dentro = chat.budget ? pool.filter(p => p.preco <= chat.budget * 1.15) : pool;
  let estourou = false;
  if (!dentro.length){ estourou = true; dentro = pool.sort((a,b) => a.preco - b.preco).slice(0,2); }
  dentro.sort((a,b) => b.preco - a.preco);
  if (!chat.budget && !chat.min) dentro.sort((a,b) => (b.hero?1:0) - (a.hero?1:0) || b.preco - a.preco);
  return { list: dentro.slice(0,3), estourou };
}
const OCASIAO_LINHA = {
  pedido:      'Um pedido de casamento pede um anel inesquecível 💍✨',
  bodas:       'Bodas pedem ouro e diamantes — momentos assim merecem peça de guardar 💛',
  aniversario: 'Aniversário é a desculpa perfeita pra uma joia de verdade 🎂✨',
  nascimento:  'Nascimento é clássico de pingente e corrente — vira lembrança pra vida toda 👶💛',
  formatura:   'Formatura pede uma peça que marque a conquista 🎓✨',
  natal:       'Presente de Natal da Coliseu chega em embalagem premium de presente 🎄',
  mimo:        'Um mimo sem ocasião é o melhor tipo de presente 😄✨'
};
function listar(introExtra){
  const { list, estourou } = pickList();
  chat.lastList = list;
  const msgs = [];
  if (estourou){
    msgs.push('Nesse valor exato o catálogo aperta um pouco, mas olha que opções lindas <b>bem pertinho</b> do seu orçamento — e tudo em <b>12x sem juros</b> 😉');
  } else {
    const oc = chat.ocasiao && OCASIAO_LINHA[chat.ocasiao] ? OCASIAO_LINHA[chat.ocasiao] + '<br>' : '';
    msgs.push(`${oc}${introExtra || 'Separei essas pra você'} — peças do nosso catálogo oficial:`);
  }
  list.forEach((p,i) => msgs.push(prodCardHTML(p, i+1)));
  msgs.push('Digite o <b>número</b> da peça pra ver detalhes, condições e como garantir a sua 😊');
  return { msgs, chips: list.map((p,i) => String(i+1)).concat(['Ver outras opções','Atendimento VIP na loja 🥂']) };
}
function detalhes(p){
  chat.sel = p;
  return { msgs: [
    `<div class="pc-art pc-art-lg">${pecaIMG(p)}</div><span class="pc-cap">${p.nome} — ${CAT_LABEL[p.cat]} · foto oficial do catálogo</span>`,
    `<b>${p.nome}</b> ✨<br>${p.desc}.<br><br>💎 Acompanha <b>certificado de autenticidade</b> e nota fiscal<br>🎁 Embalagem premium de presente <b>sem custo</b><br>🔄 Troca em até <b>30 dias</b> com frete grátis`,
    `💰 <b>${p.aPartir ? 'a partir de ' : ''}${fmtBRL(p.preco)}</b> — ou <b>12x de ${fmtBRL2(Math.round(p.preco/12*100)/100)} sem juros</b> 💳<br>Também acumula <b>pontos Livelo</b> 💛<br><br>Como prefere?`
  ], chips: ['Comprar agora 🛍️','Reservar na loja por 48h 📍','Atendimento VIP na loja 🥂','Ver outras opções'] };
}

/* ================= FLUXOS DE LOJA / AGENDA / PAGAMENTO ================= */
const DATAS = ['Hoje 18h','Amanhã 11h','Amanhã 16h','Sábado 15h'];
function askCidade(after, linha){
  chat.fase = 'cidade'; chat.after = after;
  return { msgs: [ (linha || 'Perfeito!') + ' Em qual <b>cidade</b> (ou bairro de Porto Alegre) você está? Assim te direciono pra loja mais próxima 📍' ],
           chips: ['Porto Alegre','Canoas','Caxias do Sul','Novo Hamburgo','Passo Fundo','Balneário Camboriú','Joinville','Outra cidade'] };
}
const TIPO_AGENDA = {
  alianca:  'Experiência Alianças 🥂',
  vip:      'Atendimento VIP — presente',
  reserva:  'Reserva — prova da peça',
  conserto: 'Avaliação de conserto',
  visita:   'Atendimento VIP'
};
function aposFilial(){
  const f = chat.filial;
  const cartao = lojaCardHTML(f);
  if (chat.after === 'retirada'){
    chat.fase = 'pagamento';
    return { msgs: [ cartao,
      `Prontinho! Sua peça fica disponível pra <b>retirada em até 2h</b> após a confirmação, com a consultora <b>${f.consultora}</b> te esperando 🛍️<br><br>Como prefere pagar?` ],
      chips: ['PIX à vista 💚','Link 12x sem juros 💳','Sinal PIX + saldo na loja'] };
  }
  chat.fase = 'agendar_data';
  const intro = {
    alianca: `Essa é a loja perfeita pra vocês 💍 A <b>Experiência Alianças</b> dura cerca de 40 min: espumante 🥂, medidor de aro, teste das ligas de ouro e <b>gravação gratuita</b> a laser. Quando fica bom?`,
    vip:     `A consultora <b>${f.consultora}</b> prepara um atendimento reservado, com as peças já separadas pelo seu perfil ✨ Quando fica bom pra você?`,
    reserva: `Deixo a peça <b>reservada por 48h</b> com a <b>${f.consultora}</b> — sem compromisso. Quando você quer vir provar?`,
    conserto:`Nossa relojoaria própria faz a avaliação <b>na hora e sem custo</b> ⚙️ Quando fica bom levar a peça?`,
    visita:  `A consultora <b>${f.consultora}</b> vai adorar te receber ✨ Quer já deixar um horário reservado (sem compromisso)?`
  }[chat.after || 'visita'];
  return { msgs: [cartao, intro], chips: DATAS.concat('Prefiro só passar lá') };
}
function confirmaAgenda(quando){
  const f = chat.filial, tipo = TIPO_AGENDA[chat.after || 'visita'];
  pushAgenda({ quando: quando.replace(/(hoje|amanha|amanhã|sabado|sábado)/i, m => m[0].toUpperCase() + m.slice(1) ) + '', cliente:'Você (teste) ✨', tipo, filial:f.id, status:'confirmado' });
  chat.fase = null;
  const extra = chat.after === 'alianca' ? '<br>🥂 O espumante já fica gelando!' : '';
  chat.after = null;
  return { msgs: [
    `Agendado! ✅ <b>${quando}</b> — ${f.nome}.<br>👩‍💼 A consultora <b>${f.consultora}</b> te espera com tudo preparado.${extra}`,
    `Te mando um lembrete aqui no WhatsApp 1 dia antes 😉<br><br><i>💡 Na operação real, este agendamento cai na hora no painel da loja e na agenda da consultora.</i>`
  ], chips: ['Ver mais peças','Quero comprar agora 🛍️','Cadastrar data especial 📅','Encerrar 😊'] };
}
function fluxoPagamento(t){
  const p = chat.sel || PRODUTOS[0];
  if (/pix/.test(t) && !/sinal/.test(t)){
    chat.pgto = 'PIX à vista';
    return { msgs: [
      `Fechado! 💚 No <b>PIX à vista</b> você ainda garante <b>prioridade de separação</b> da peça. Aqui está o QR Code:`,
      `<div class="pay-card"><b>PIX · Coliseu Joalheria</b><span class="pay-sub">${p.nome}</span>
       <div class="qr">${qrSVG(p.preco + p.id)}</div>
       <div class="pay-val">${fmtBRL2(p.preco)}</div>
       <div class="pix-copia"><input class="px-inp" readonly value="${pixCodigo(p.preco, p.id)}"><button class="btn-copiar" type="button">Copiar código</button></div>
       <span class="pay-obs">PIX copia e cola · pagamento instantâneo</span></div>`,
      'Assim que o pagamento cair eu já te confirmo por aqui ⚡'
    ], chips: ['Já paguei ✅','Prefiro link 12x','Falar com consultora'] , fase:'pix_pendente' };
  }
  if (/sinal/.test(t)){
    chat.pgto = 'Sinal PIX + saldo na loja';
    const sv = Math.round(p.preco * 0.2);
    return { msgs: [
      `Ótima escolha! Com um <b>sinal de 20% (${fmtBRL(sv)})</b> a peça fica <b>garantida no seu nome</b> e você finaliza na loja com calma 😊`,
      `<div class="pay-card"><b>PIX · Sinal de reserva</b><span class="pay-sub">${p.nome}</span>
       <div class="qr">${qrSVG(sv + 7)}</div>
       <div class="pay-val">${fmtBRL2(sv)}</div>
       <div class="pix-copia"><input class="px-inp" readonly value="${pixCodigo(sv, p.id)}"><button class="btn-copiar" type="button">Copiar código</button></div>
       <span class="pay-obs">Sinal de 20% · saldo na retirada</span></div>`
    ], chips: ['Já paguei ✅','Mudei de ideia'], fase:'pix_pendente' };
  }
  if (/12x|link|cartao|credito|parcel/.test(t)){
    chat.pgto = 'Link 12x sem juros';
    return { msgs: [
      `Perfeito! 💳 Em <b>12x de ${fmtBRL2(Math.round(p.preco/12*100)/100)} sem juros</b>. Gerei seu link de pagamento seguro:`,
      `<div class="link-card"><b>🔒 Pagamento seguro · Coliseu</b><span class="pay-sub">${p.nome} — ${fmtBRL2(p.preco)} em até 12x</span>
       <div class="pix-copia"><input class="px-inp" readonly value="https://pay.coliseu.com.br/c/${(p.id*7333).toString(36)}9x"><button class="btn-copiar" type="button">Copiar link</button></div></div>`,
      'O link expira em 24h. Assim que aprovar, te confirmo aqui na hora ⚡'
    ], chips: ['Paguei no link ✅','Prefiro PIX à vista','Falar com consultora'], fase:'pix_pendente' };
  }
  return null;
}
function confirmaPagamento(){
  const p = chat.sel || PRODUTOS[0];
  const f = chat.filial || filialById('iguatemi');
  const num = 'CL-' + (pedidoSeq++);
  const entrega = chat.entrega || (chat.after === 'retirada' || chat.pgto === 'Sinal PIX + saldo na loja' ? 'Retirada em loja' : 'Entrega expressa');
  pushVenda({ num, cliente:'Você (teste) ✨', peca:p.nome, filial:f.id, entrega, valor: p.preco, pgto: chat.pgto || 'PIX à vista' });
  chat.fase = null; chat.after = null;
  return { msgs: [
    'Pagamento confirmado! 🎉💛',
    `<div class="cert-card"><div class="cc-t">✦ Certificado de Autenticidade ✦</div>
     <div class="cc-n">${p.nome}<br>Pedido ${num} · NF-e emitida</div>
     <div class="cc-l">Coliseu Joalheria — desde 1968<br>Garantia + troca em até 30 dias</div></div>`,
    `${entrega === 'Retirada em loja'
        ? `🛍️ Sua peça estará pronta pra retirada <b>em até 2h</b> na <b>${f.nome}</b> — é só dizer seu nome à consultora <b>${f.consultora}</b>.`
        : '🚚 Entrega expressa com <b>frete grátis</b>, embalagem premium de presente e… um chocolatinho da casa 🍫😄'}<br><br><i>💡 Pedido <b>${num}</b> registrado — na operação real ele cai em tempo real no painel da loja.</i>`,
    'Quer que eu <b>cadastre uma data especial</b> (aniversário, bodas…) pra eu te lembrar com sugestões 15 dias antes? 📅'
  ], chips: ['Cadastrar data especial 📅','Ver mais peças','Encerrar 😊'] };
}

/* ================= CÉREBRO ================= */
/* intents fortes que "escapam" de qualquer fase pendente (cidade, data, presente…) */
const FUGA = /troca|devolu|livelo|humano|consultora|atendente|falar com|horario|frete\b|conserto|quebrou|catalogo|alianca|relogio|oculos|prata|\bjoias?\b|presente|\bcaro\b|vou pensar|original|corporativ|\bloja\b|filial/;
/* marcas e termos buscáveis no nome das peças */
const TERMOS = /michael kors|armani exchange|emporio armani|jimmy choo|ray-?ban|miu miu|de sol|de grau|orient|seiko|bulova|citizen|diesel|fossil|guess|casio|smartwatch|solar\b|digital|cronografo|automatico|mergulho|persol|ferragamo|gucci|prada|versace|dior|burberry|oakley|carrera|fendi|celine|way\b|bubble|colosseo|tanzanita|esmeralda|safira|rubi|perola|zirconia/;
const termoDe = t2 => { const m = t2.match(TERMOS); return m ? m[0].replace(/-/g, ' ') : null; };
function responder(raw){
  const t = norm(raw);

  /* ---- pagamento pendente ---- */
  if (chat.fase === 'pix_pendente'){
    if (/paguei|pago|feito|transferi|aprovad|caiu|pronto|ja fiz/.test(t)) return confirmaPagamento();
    if (/mudei|cancelar|desisti/.test(t)){ chat.fase = null; return { msgs:['Sem problema nenhum! 😊 A peça segue no catálogo. Quer ver outras opções ou prefere pensar com calma?'], chips:['Ver outras opções','Cadastrar data especial 📅','Encerrar 😊'] }; }
    const alt = fluxoPagamento(t);
    if (alt){ if (alt.fase) chat.fase = alt.fase; return alt; }
  }
  if (chat.fase === 'pagamento'){
    const r = fluxoPagamento(t);
    if (r){ chat.fase = r.fase || 'pagamento'; return r; }
  }
  if (chat.fase === 'entrega'){
    if (/retir|na loja|buscar|pegar/.test(t)){ chat.entrega = 'Retirada em loja'; return askCidade('retirada','Ótimo, retirada é rapidinho! 🛍️'); }
    if (/entrega|expressa|casa|receber|enviar|correio|sedex/.test(t)){
      chat.entrega = 'Entrega expressa'; chat.fase = 'pagamento';
      return { msgs:[ 'Fechado! 🚚 <b>Entrega expressa com frete grátis</b> — precisa de menos de 7 dias úteis? A gente prioriza por aqui.<br><br>Como prefere pagar?' ], chips:['PIX à vista 💚','Link 12x sem juros 💳'] };
    }
  }

  /* ---- escolha de cidade/loja pendente ---- */
  if (chat.fase === 'cidade'){
    const f = detectCidade(t);
    if (f){ chat.filial = f; return aposFilial(); }
    if (isPOA(t)) return { msgs:['Porto Alegre tem <b>8 lojas Coliseu</b> 😄 Qual região fica melhor pra você?'], chips:['Iguatemi','Moinhos','Praia de Belas','Barra Sul','Bourbon Ipiranga','Centro (Andradas)'] };
    if (outraCidade(t)){
      chat.fase = chat.sel ? 'entrega' : null;
      return { msgs:[ 'Sem problema! 🚚 Nosso e-commerce entrega em <b>todo o Brasil com frete grátis</b> — e o atendimento continua comigo aqui no WhatsApp, do pedido à entrega ✨' ],
               chips: chat.sel ? ['Entrega expressa 🚚','Ver outras opções'] : ['Ver catálogo','Quero um presente 🎁','Encerrar 😊'] };
    }
    if (!FUGA.test(t)) return { msgs:['Me diz a cidade (ou o bairro, se for Porto Alegre) que eu encontro a Coliseu mais perto de você 📍'], chips:['Porto Alegre','Canoas','Caxias do Sul','Novo Hamburgo','Passo Fundo','Balneário Camboriú','Joinville','Outra cidade'] };
    chat.fase = null; chat.after = null;
  }

  /* ---- data do agendamento pendente ---- */
  if (chat.fase === 'agendar_data'){
    if (/so passar|sem hora|qualquer hora|nao precisa/.test(t)){
      chat.fase = null; const f = chat.filial;
      return { msgs:[`Combinado! A <b>${f.nome}</b> te espera — Seg–Sáb 10h–22h, Dom 14h–20h. Vou avisar a consultora <b>${f.consultora}</b> que você aparece por lá 😊`], chips:['Ver catálogo','Quero comprar agora 🛍️','Encerrar 😊'] };
    }
    const m = raw.match(/hoje\s*\d{1,2}h?|amanh[aã]\s*\d{1,2}h?|s[aá]b(ado)?\s*\d{1,2}h?|\d{1,2}h(\d{2})?/i);
    if (m || /hoje|amanha|sabado|domingo|segunda|terca|quarta|quinta|sexta/.test(t)){
      return confirmaAgenda(m ? m[0] : raw.trim());
    }
    if (!FUGA.test(t)) return { msgs:['Só me confirma o melhor dia e horário 🗓️'], chips: DATAS.concat('Prefiro só passar lá') };
    chat.fase = null;
  }

  /* ---- conserto: descrição pendente ---- */
  if (chat.fase === 'conserto_desc'){
    if (/humano|consultora|atendente|falar com/.test(t)){ chat.fase = null; }
    else {
      chat.consertoItem = raw; chat.fase = null;
      return askCidade('conserto', `Anotei: <b>"${raw}"</b> ✍️ Nossa relojoaria e ourivesaria própria resolve isso — avaliação <b>gratuita e na hora</b>.`);
    }
  }

  /* ---- lembrete de data ---- */
  if (chat.fase === 'lembrete_data' && /humano|consultora|atendente|falar com/.test(t)) chat.fase = null;
  if (chat.fase === 'lembrete_data'){
    chat.fase = null;
    return { msgs: [
      `Anotado! 📅 <b>${raw}</b> ficou salvo no seu perfil.`,
      '15 dias antes eu te chamo aqui com sugestões escolhidas pro seu histórico — assim você <b>nunca mais corre atrás de presente em cima da hora</b> 😄💛<br><br><i>💡 É assim que o robô transforma datas em recompra: cada cliente vira um relacionamento de longo prazo.</i>'
    ], chips: ['Ver catálogo','Quero um presente 🎁','Encerrar 😊'] };
  }

  /* ---- atendimento humano ---- */
  if (/humano|atendente|consultora|consultor|pessoa|gente de verdade|falar com alguem|falar com uma/.test(t)){
    const f = chat.filial || filialById('iguatemi');
    return { msgs: [
      `Claro, imagina! 👩‍💼 Vou te passar pra minha colega <b>${f.consultora}</b>, da ${f.nome}. Ela continua daqui em instantes <b>com todo o histórico do nosso papo</b> — você não vai precisar repetir nada, tá?`,
      '<i>— Na operação real é aqui que o time humano recebe o lead já qualificado, com peça, orçamento e loja anotados. Pode continuar testando! 😉</i>'
    ], chips: ['Ver catálogo','Quero um presente 🎁','Alianças 💍'] };
  }

  /* ---- objeções ---- */
  if (/caro|carinho|salgado|desconto|mais barato|baixar|abaixa/.test(t)){
    chat.cat = 'prata'; chat.art = null;
    const alt = pickList().list[0];
    chat.cat = null;
    return { msgs: [
      'Te entendo perfeitamente 😊 Joia é investimento — e tem 3 caminhos pra caber no bolso <b>sem perder o brilho</b>:',
      `1️⃣ <b>12x sem juros</b> em qualquer peça 💳<br>2️⃣ A linha <b>For Me em prata 925</b> tem o mesmo DNA Coliseu a partir de <b>R$ 490</b> ✨<br>3️⃣ Suas compras acumulam <b>pontos Livelo</b> 💛`,
      alt ? prodCardHTML(alt) : 'Olha a linha For Me: prata 925 com design autoral 💛',
      'E se quiser, a consultora monta <b>condições especiais na loja</b> — quer que eu agende?'
    ], chips: ['Ver linha For Me (prata)','Atendimento VIP na loja 🥂','12x me atende 💳'] };
  }
  if (/vou pensar|te falo depois|depois eu|mais tarde|outro dia|deixa pra depois/.test(t)){
    return { msgs: [
      'Claro, joia é decisão do coração — sem pressa nenhuma 💛',
      'Só um cuidado: peças como as da <b>coleção Way</b> são <b>produção limitada</b>. Posso <b>reservar por 48h sem compromisso</b> no seu nome, ou te mandar um <b>resumo com as peças e valores</b> pra decidir com calma. O que prefere?'
    ], chips: ['Reservar por 48h 📍','Me manda o resumo 📋','Cadastrar data especial 📅'] };
  }
  if (/resumo/.test(t)){
    const l = chat.lastList.length ? chat.lastList : [PRODUTOS[0], PRODUTOS[12]];
    return { msgs: [
      `📋 <b>Seu resumo Coliseu</b><br>${l.map(p => `• ${p.nome} — ${fmtBRL(p.preco)} (12x de ${fmtBRL2(Math.round(p.preco/12*100)/100)})`).join('<br>')}<br><br>Fica salvo aqui no nosso chat — quando decidir, é só me chamar que finalizo em 2 minutos 😉`,
    ], chips: ['Quero comprar agora 🛍️','Reservar por 48h 📍','Encerrar 😊'] };
  }
  if (/original|falsific|autentic|confia|seguro|golpe|verdade|procedencia|banhado|banho/.test(t)){
    return { msgs: [
      'Pode ficar tranquilo(a) 💛 A Coliseu está no mercado <b>desde 1968</b> — são 14 lojas físicas nos principais shoppings do RS e SC.',
      '✦ Toda peça sai com <b>certificado de autenticidade + nota fiscal</b><br>✦ Ouro <b>18k</b> e prata <b>925</b> com teor garantido — nada de banho que sai<br>✦ Relógios e óculos são de <b>distribuição oficial</b> das marcas<br>✦ Troca em até <b>30 dias</b> e devolução em 7, com frete grátis<br><br>E se preferir ver pessoalmente, te recebo em qualquer loja com um cafezinho ☕😄'
    ], chips: ['Atendimento VIP na loja 🥂','Ver catálogo','Loja mais próxima 📍'] };
  }

  /* ---- políticas / institucional ---- */
  if (/troca|devolu|arrepend|nao serviu|tamanho errado/.test(t)){
    return { msgs: ['Nossa política <b>Super Trocas</b> é das mais tranquilas do Brasil 😊<br><br>🔄 <b>Troca em até 30 dias</b><br>↩️ <b>Devolução em até 7 dias</b><br>🚚 Sempre com <b>frete grátis</b> e atendimento humano<br><br>Anéis e alianças ainda têm <b>ajuste de aro</b> na nossa ourivesaria própria ✨'], chips: ['Ver catálogo','Loja mais próxima 📍','Encerrar 😊'] };
  }
  if (/livelo|pontos|milhas/.test(t)){
    return { msgs: ['Sim! 💛 A Coliseu é parceira <b>Livelo</b>: suas compras <b>acumulam pontos</b> que viram viagens, produtos e mais. É só informar seu CPF na finalização — vale no site, no WhatsApp e nas lojas ✨'], chips: ['Ver catálogo','Quero um presente 🎁'] };
  }
  if (/horario|que horas|abre|fecha|funciona|aberto|domingo/.test(t)){
    return { msgs: ['🕐 Nossas lojas seguem o horário dos shoppings: <b>Seg–Sáb 10h–22h · Dom 14h–20h</b> (a Andradas, no Centro Histórico, tem horário de rua).<br><br>Mas <b>eu atendo 24h</b> — pode comprar agora que a loja fecha, eu não 😄✨'], chips: ['Loja mais próxima 📍','Ver catálogo'] };
  }
  if (/frete|entrega|prazo|chega|envio|correio/.test(t) && !chat.sel){
    return { msgs: ['🚚 <b>Frete grátis para todo o Brasil</b>, sempre.<br>⚡ Precisa <b>em menos de 7 dias úteis</b>? Me avisa que a gente prioriza.<br>🛍️ E tem <b>compre e retire</b>: pedido pronto <b>em 2h</b> em qualquer uma das 14 lojas.<br><br>📦 Tudo vai em embalagem premium de presente — com direito a chocolatinho 🍫😄'], chips: ['Ver catálogo','Loja mais próxima 📍'] };
  }
  if (/corporativ|empresa|brinde|funcionario|equipe|cnpj|homenagem/.test(t)){
    return { msgs: ['Temos um <b>atendimento corporativo</b> dedicado 👔 — presentes para equipes, homenagens de tempo de casa e brindes premium, com condições especiais por volume e faturamento para CNPJ.','Vou acionar nosso especialista corporativo com seu contato, e ele te chama ainda hoje. Enquanto isso, quer ver ideias de presente?'], chips: ['Ver relógios ⌚','Ver canetas… ops, joias 😄','Falar com consultora'] };
  }

  /* ---- lembrete (gatilho direto) ---- */
  if (/data especial|lembrete|me lembra|aniversario dela|aniversario dele|cadastrar data/.test(t)){
    chat.fase = 'lembrete_data';
    return { msgs: ['Adoro isso! 📅 Me conta a <b>data e a ocasião</b> — por exemplo: <i>"12/09 — aniversário da Júlia"</i> ou <i>"03/11 — bodas de 10 anos"</i>.'], chips: ['12/09 — aniversário da Júlia','03/11 — bodas de 10 anos'] };
  }

  /* ---- conserto ---- */
  if (/consert|quebrou|parou|arrumar|manutencao|bateria|pulseira soltou|ajuste|solda|banho novo|restaur/.test(t)){
    chat.fase = 'conserto_desc';
    return { msgs: ['Consertamos sim! ⚙️ Temos <b>relojoaria e ourivesaria própria</b> — troca de bateria, ajuste de pulseira, solda, ajuste de aro, banho e restauração.<br><br>Me conta rapidinho: <b>qual é a peça e o que aconteceu?</b>'], chips: ['Relógio parou de funcionar','Ajustar aro de anel','Corrente arrebentou'] };
  }

  /* ---- loja mais próxima / cidades citadas soltas ---- */
  const fDireta = detectCidade(t);
  if (/loja|filial|unidade|endereco|onde (tem|fica|encontro)|mais proxima|perto de/.test(t) || fDireta){
    if (fDireta){
      chat.filial = fDireta; chat.after = chat.after || 'visita';
      return { msgs: [ 'Temos sim! 😄 Olha que pertinho de você:', lojaCardHTML(fDireta), `Quer que eu já deixe um <b>atendimento reservado</b> com a consultora ${fDireta.consultora}? Sem compromisso nenhum ✨` ],
               chips: ['Agendar atendimento VIP 🥂','Ver catálogo','Quero um presente 🎁'] };
    }
    return askCidade('visita','Claro! São <b>14 lojas</b> nos principais shoppings do RS e SC 📍');
  }

  /* ---- fases do fluxo de presente ---- */
  if (chat.fase === 'presente_quem'){
    const q = detectQuem(t);
    if (q){
      chat.quem = q;
      if (chat.ocasiao && (chat.budget || chat.min)){ chat.fase = null; return listar('Com o que você me contou, separei essas'); }
      if (chat.ocasiao){ chat.fase = 'presente_budget';
        return { msgs: ['E até <b>quanto</b> você pensa em investir? 💎'], chips: ['Até R$ 1.000','R$ 1.000 a 3.000','R$ 3.000 a 7.000','Acima de R$ 7.000','Me surpreende ✨'] };
      }
      chat.fase = 'presente_ocasiao';
      return { msgs: ['Ótimo! E qual é a <b>ocasião</b>? ✨'], chips: ['Aniversário','Aniversário de casamento','Pedido de casamento 💍','Nascimento','Sem ocasião — um mimo 😄'] };
    }
    if (!FUGA.test(t)) return { msgs: ['Me conta pra quem é o presente 🎁 — assim acerto em cheio no estilo.'], chips: ['Pra ela 💛','Pra ele','É pra mim 😄'] };
    chat.fase = null;
  }
  if (chat.fase === 'presente_ocasiao'){
    const oc = detectOcasiao(t);
    if (!oc && FUGA.test(t)){
      chat.fase = null;
    } else {
      chat.ocasiao = oc || 'mimo';
      if (oc === 'pedido'){ chat.cat = 'joia'; chat.art = 'anel'; }
      if (oc === 'nascimento' && !chat.art){ chat.art = 'pingente'; }
      if (chat.budget || chat.min){ chat.fase = null; return listar('Com o que você me contou, separei essas'); }
      chat.fase = 'presente_budget';
      return { msgs: ['Perfeito 💛 E até <b>quanto</b> você pensa em investir? Temos opções lindas do clássico ao inesquecível 💎'],
               chips: ['Até R$ 1.000','R$ 1.000 a 3.000','R$ 3.000 a 7.000','Acima de R$ 7.000','Me surpreende ✨'] };
    }
  }
  if (chat.fase === 'presente_budget'){
    const b = detectBudget(t);
    chat.fase = null;
    if (b){ chat.budget = b.max || null; chat.min = b.min || null; }
    if (b || !FUGA.test(t)) return listar('Com base no que você me contou, separei essas');
  }

  /* ---- alianças ---- */
  if (/experiencia alianca|agendar experiencia/.test(t)){
    chat.after = 'alianca';
    if (chat.filial) return aposFilial();
    return askCidade('alianca','Vai ser lindo! 🥂');
  }
  if (/gravacao|gravar/.test(t)){
    return { msgs: ['A <b>gravação interna é gratuita</b> ✨ — nomes, data ou uma frase de vocês, feita a laser na hora, na própria loja. Muitos casais gravam as coordenadas de onde se conheceram 🥹💛'], chips: ['Agendar Experiência Alianças 🥂','Ver alianças 💍'] };
  }
  if (/alianca|noiv|vamos casar|casar\b|pedido de casamento/.test(t) && !/aniversario de casamento|bodas/.test(t)){
    chat.cat = 'alianca'; chat.art = null;
    const par = PRODUTOS.filter(p => p.cat === 'alianca').slice(0, 3);
    chat.lastList = par;
    return { msgs: [
      'Que momento especial! 💍✨ Nossas alianças são em <b>ouro 18k</b>, feitas na nossa ourivesaria, com <b>gravação interna gratuita</b> a laser.',
      ...par.map((p,i) => prodCardHTML(p, i+1)),
      `O ideal é viverem a <b>Experiência Alianças</b> na loja: espumante 🥂, medidor de aro e teste das ligas — <b>sem compromisso</b>. Temos <b>${PRODUTOS.filter(p => p.cat === 'alianca').length} modelos</b> no catálogo — quer ver outros ou já agendar?`
    ], chips: ['Agendar Experiência Alianças 🥂','1','2','3','Ver outras opções'] };
  }

  /* ---- início do fluxo de presente (não sequestra perguntas com produto explícito) ---- */
  const temTipoProduto = /relogio|smartwatch|oculos|armacao|gargantilha|colar|corrente|\banel\b|aneis|brinco|pingente|pulseira|alianca|\bjoias?\b|\bprata\b|\bouro\b/.test(t);
  if (/presente|presentear|surpresa|mimo|surpreender/.test(t) || (detectQuem(t) && !temTipoProduto)){
    const q = detectQuem(t);
    if (q) chat.quem = q;
    const oc = detectOcasiao(t);
    if (oc) chat.ocasiao = oc;
    const b = detectBudget(t);
    if (b){ chat.budget = b.max || null; chat.min = b.min || null; }
    /* captura tipo de peça e material já citados no pedido */
    const artHit = /gargantilha|colar|corrente/.test(t) ? 'colar'
                 : /\banel\b|aneis/.test(t) ? 'anel'
                 : /brinco/.test(t) ? 'brinco'
                 : /pingente/.test(t) ? 'pingente'
                 : /pulseira/.test(t) ? 'pulseira' : null;
    if (artHit) chat.art = artHit;
    if (/relogio|smartwatch/.test(t)){ chat.cat = 'relogio'; chat.art = null; }
    else if (/oculos|armacao/.test(t)){ chat.cat = 'oculos'; chat.art = null; }
    else if (/\bouro\b|18k|diamante/.test(t)) chat.cat = 'joia';
    else if (/prata|925|for me/.test(t)) chat.cat = 'prata';
    const tHit = termoDe(t); if (tHit) chat.termo = tHit;
    if (!chat.quem){ chat.fase = 'presente_quem';
      return { msgs: ['Amo presentear! 🎁 Pra quem é o presente?'], chips: ['Pra ela 💛','Pra ele','É pra mim 😄'] };
    }
    if (!chat.ocasiao){ chat.fase = 'presente_ocasiao';
      return { msgs: [`${chat.quem === 'ela' ? 'Ela vai amar 💛' : chat.quem === 'ele' ? 'Ele vai amar 👌' : 'Autopresente é dos melhores 😄'} E qual é a <b>ocasião</b>?`],
               chips: ['Aniversário','Aniversário de casamento','Pedido de casamento 💍','Nascimento','Sem ocasião — um mimo 😄'] };
    }
    if (!chat.budget && !chat.min){ chat.fase = 'presente_budget';
      return { msgs: ['E até <b>quanto</b> você pensa em investir? 💎'], chips: ['Até R$ 1.000','R$ 1.000 a 3.000','R$ 3.000 a 7.000','Acima de R$ 7.000','Me surpreende ✨'] };
    }
    return listar('Com o que você me contou, separei essas');
  }

  /* ---- categorias diretas ---- */
  if (/relogio|orient|seiko|bulova|pulso|automatico|mergulho|michael kors|armani|citizen|diesel|fossil|guess\b|smartwatch|cronografo/.test(t)){
    chat.cat = 'relogio'; chat.art = null; chat.termo = termoDe(t);
    if (/femin|dela|esposa|mulher/.test(t)) chat.quem = 'ela';
    else if (/masculin|homem|marido|\bpai\b|esposo/.test(t)) chat.quem = 'ele';
    const b = detectBudget(t); if (b){ chat.budget = b.max || null; chat.min = b.min || null; }
    return listar('⌚ Design, precisão e exclusividade — do clássico ao colecionável. Olha só');
  }
  if (/oculos|armacao|grau|de sol|miu miu|persol|ferragamo|lente|ray-?ban|gucci|prada|versace|dior|burberry|oakley|carrera|jimmy choo|fendi|celine/.test(t)){
    chat.cat = 'oculos'; chat.art = null; chat.termo = termoDe(t);
    if (/femin|dela|esposa|mulher/.test(t)) chat.quem = 'ela';
    else if (/masculin|homem|marido|\bpai\b|esposo/.test(t)) chat.quem = 'ele';
    return listar('🕶️ Nosso eyewear é de distribuição oficial — e as lojas têm ótica própria pras lentes de grau. Destaques');
  }
  const catDaFrase = t2 => /\bouro\b|18k|diamante/.test(t2) ? 'joia' : /prata|925|for me|bubble|zirconia/.test(t2) ? 'prata' : null;
  if (/gargantilha|colar|corrente/.test(t)){ chat.art = 'colar'; chat.cat = catDaFrase(t); chat.termo = termoDe(t); return listar('Colares e gargantilhas que separei'); }
  if (/\banel\b|aneis|solitario/.test(t)){ chat.art = 'anel'; chat.cat = catDaFrase(t); chat.termo = termoDe(t); return listar('Anéis que separei pra você'); }
  if (/brinco|ear cuff/.test(t)){ chat.art = 'brinco'; chat.cat = catDaFrase(t); chat.termo = termoDe(t); return listar('Brincos que separei'); }
  if (/pingente/.test(t)){ chat.art = 'pingente'; chat.cat = catDaFrase(t); chat.termo = termoDe(t); return listar('Pingentes que separei'); }
  if (/pulseira/.test(t)){ chat.art = 'pulseira'; chat.cat = catDaFrase(t); chat.termo = termoDe(t); return listar('Pulseiras que separei'); }
  if (/prata|for me|bubble|zirconia|925/.test(t)){
    chat.cat = 'prata'; chat.art = null; chat.termo = termoDe(t);
    return listar('✨ <b>For Me by Coliseu</b> — prata 925 com design autoral, a porta de entrada do universo Coliseu');
  }
  if (/joia|ouro|diamante|esmeralda|safira|rubi|way\b|18k/.test(t)){
    chat.cat = 'joia'; chat.art = null; chat.termo = termoDe(t);
    const b = detectBudget(t); if (b){ chat.budget = b.max || null; chat.min = b.min || null; }
    return listar('💎 Ouro 18k e diamantes das nossas coleções autorais — olha só');
  }
  if (/catalogo|ver tudo|opcoes|opcao|mostra|sugest|novidade|lancamento|ver mais|outras opcoes|ver outra/.test(t)){
    if (/outras opcoes|ver outra|ver mais/.test(t) && chat.lastList.length){
      const atuais = chat.lastList.map(p => p.id);
      const resto = PRODUTOS.filter(p => p.cat !== 'alianca' && !atuais.includes(p.id) && (chat.cat ? p.cat === chat.cat : true)).slice(0,3);
      if (resto.length){ chat.lastList = resto;
        return { msgs: ['Claro! Mais algumas que valem o olhar 👀', ...resto.map((p,i) => prodCardHTML(p, i+1)), 'Algum número te conquistou? 😊'],
                 chips: resto.map((p,i) => String(i+1)).concat('Atendimento VIP na loja 🥂') };
      }
    }
    chat.cat = null; chat.art = null; chat.budget = null; chat.min = null; chat.termo = null;
    return listar('Destaques do catálogo agora');
  }

  /* ---- seleção por número ---- */
  const mNum = t.match(/^\s*([1-4])\s*$/) || t.match(/numero\s*([1-4])/) || t.match(/opcao\s*([1-4])/);
  if (mNum && chat.lastList.length){
    const p = chat.lastList[parseInt(mNum[1],10)-1];
    if (p) return detalhes(p);
  }

  /* ---- ações sobre a peça selecionada ---- */
  if (/comprar|fechar|quero ess|vou levar|finalizar|pode ser ess/.test(t)){
    if (!chat.sel && chat.lastList.length === 1) chat.sel = chat.lastList[0];
    if (!chat.sel){
      const r = listar('Me diz qual dessas você quer garantir');
      r.msgs.unshift('Vamos lá! 🛍️');
      return r;
    }
    chat.fase = 'entrega';
    return { msgs: [`Excelente escolha! ✨ <b>${chat.sel.nome}</b> — ${fmtBRL(chat.sel.preco)} (ou 12x sem juros).<br><br>Como você prefere receber?`],
             chips: ['Entrega expressa 🚚','Retirar na loja em 2h 🛍️'] };
  }
  if (/reservar|reserva|separa|guardar/.test(t)){
    if (!chat.sel && chat.lastList.length) chat.sel = chat.lastList[0];
    chat.after = 'reserva';
    if (chat.filial) return aposFilial();
    return askCidade('reserva','Deixo reservada por <b>48h, sem compromisso</b> 📍');
  }
  if (/vip|atendimento na loja|experiencia|agendar|visita|conhecer a loja|cafe/.test(t)){
    chat.after = chat.cat === 'alianca' ? 'alianca' : 'vip';
    if (chat.filial) return aposFilial();
    return askCidade(chat.after,'Vai ser um prazer te receber! 🥂');
  }

  /* ---- orçamento solto ---- */
  const bSolo = detectBudget(t);
  if (bSolo && (bSolo.max || bSolo.min)){
    chat.budget = bSolo.max || null; chat.min = bSolo.min || null;
    if (chat.quem || chat.cat || chat.art) return listar('Com esse valor, olha o que separei');
    chat.fase = 'presente_quem';
    return { msgs: ['Boa! E é presente <b>pra quem</b>? 🎁'], chips: ['Pra ela 💛','Pra ele','É pra mim 😄'] };
  }

  /* ---- despedida / saudação ---- */
  if (/encerrar|tchau|obrigad|valeu|ate mais|so isso/.test(t)){
    return { msgs: ['Foi um prazer falar contigo! 💛 Qualquer coisa me chama, <b>eu fico por aqui 24h</b>, todos os dias 😊<br><br><i>Luiza · Coliseu Joalheria — o Melhor Atendimento do Mundo, agora também digital ✦</i>'], chips: ['Recomeçar conversa','Quero um presente 🎁'] };
  }
  if (/recomecar|reiniciar|comecar de novo/.test(t)){ resetChat(); return null; }
  if (/^(oi+|ola+|bom dia|boa tarde|boa noite|opa|eai|hey|hello)[!,. 😊🙂👋]*$/.test(t)){
    return { msgs: ['Oi, tudo bem? 😊 Eu sou a <b>Luiza</b>, atendente da Coliseu 💛 Posso te ajudar com <b>presentes</b>, <b>alianças</b>, <b>relógios</b>, <b>óculos</b>, <b>consertos</b> ou achar a <b>loja mais próxima</b>. Por onde a gente começa?'],
             chips: ['Quero um presente 🎁','Alianças 💍','Relógios ⌚','Loja mais próxima 📍'] };
  }

  /* ---- fallback ---- */
  return { msgs: ['Te entendi! 😊 Quero resolver isso direitinho pra você — já anotei aqui e, se precisar, uma colega do time te confirma os detalhes. Enquanto isso, me deixa te ajudar com:'],
           chips: ['Quero um presente 🎁','Alianças 💍','Relógios ⌚','Óculos 🕶️','Loja mais próxima 📍','Falar com consultora'] };
}


/* ================= ENVIO ================= */
let botBusy = false;
async function sendUser(text){
  if (botBusy || !text.trim()) return;
  addMsg('out', text.trim());
  chatInput.value = '';
  botBusy = true;
  try {
    const r = responder(text.trim());
    if (r){
      if (r.fase) chat.fase = r.fase;
      await botSay(r.msgs, r.chips);
    }
  } finally { botBusy = false; }
}
$('#btnSend').addEventListener('click', () => sendUser(chatInput.value));
chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendUser(chatInput.value); });
$('#btnReset').addEventListener('click', resetChat);
/* código PIX copia-e-cola + botão copiar */
function pixCodigo(valor, id){
  const v = Number(valor).toFixed(2);
  return '00020126580014BR.GOV.BCB.PIX0136coliseu-' + id + '-demo52040000530398654' +
    String(v).length + v + '5802BR5917COLISEU JOALHERIA6012PORTO ALEGRE6304DEMO';
}
chatBox.addEventListener('click', e => {
  const b = e.target.closest('.btn-copiar'); if (!b) return;
  const inp = b.parentElement.querySelector('.px-inp'); if (!inp) return;
  if (!b.dataset.rotulo) b.dataset.rotulo = b.textContent;
  inp.focus(); inp.select(); inp.setSelectionRange(0, 99999);
  const feito = () => {
    b.textContent = 'Copiado ✓'; b.classList.add('ok');
    setTimeout(() => { b.textContent = b.dataset.rotulo; b.classList.remove('ok'); }, 2400);
  };
  const fallback = () => { try { document.execCommand('copy'); } catch (err) {} feito(); };
  if (navigator.clipboard && navigator.clipboard.writeText)
    navigator.clipboard.writeText(inp.value).then(feito).catch(fallback);
  else fallback();
});

$('#suggRow').innerHTML = TIPS.map(s => `<button type="button">${s}</button>`).join('');
$$('#suggRow button').forEach(b => b.addEventListener('click', () => sendUser(b.textContent)));

