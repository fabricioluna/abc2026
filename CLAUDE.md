# Planejador do salão 37 × 15 m

Planejador 2D (Planta) e 3D de um salão de festas real, usado para montar a festa junto com a decoradora e a cerimonialista. Publicado no GitHub Pages, com edição compartilhada em tempo real pelo Firebase (Firestore).

## Arquivos

- `index.html`: o aplicativo inteiro (HTML, CSS e JavaScript num arquivo só). Usa three.js 0.128.0 e OrbitControls por CDN, e o Firebase compat 10.12.2.
- `config.js`: configuração do Firebase e `window.PLANEJAMENTO_ENCERRADO` (false ou true). A apiKey é pública por natureza; a proteção está nas regras.
- Encerramento manual (a formatura é em 06/12/2026; o usuário avisa quando encerrar): a função `aberto()` do `firestore.rules` vale para eventos e versões compartilhadas. Para encerrar, `aberto()` passa a `return false;` e `PLANEJAMENTO_ENCERRADO` a `true`. O app usa a variável só para mostrar "Planejamento encerrado" sem tentar conectar; quem garante o bloqueio são as regras.
- `firestore.rules`: regras do banco. Cada evento é o documento `eventos/{codigo}`, com os campos `items`, `fixed`, `versoes`, `compartilhados`, `criadoEm`, `atualizadoEm`. Se criar campo novo no documento, atualize o `hasOnly` das regras.
- Versões compartilhadas por link ficam em `compartilhados/{codigo}` (código de 24 caracteres), com `nome`, `autor`, `dados` (o plano serializado, texto JSON) e `criadoEm`. Só podem ser criadas e lidas por código; nunca alteradas, apagadas ou listadas. Não guardam o código do evento. O evento guarda em `compartilhados.<codigo>` só `{nome, autor, em}` para a lista.
- `LEIAME.md`: passo a passo de publicação para o usuário.

## O salão (coordenadas em metros)

- Eixo x no comprimento (−18,5 parede do bar e banheiros, +18,5 parede do palco). Eixo z na largura (+7,5 parede da entrada principal, −7,5 parede do jardim).
- Duas colunas de pedra soltas no eixo central: x = −12,6 e x = 0,6, ambas em z = 0.
- Pé direito de 6,4 m até a faixa preta, treliças acima.
- Parede atrás da estrutura preta do palco é fechada. Itens fixos que podem ser ocultados: estrutura preta do palco e lustres. O balcão de granito e o móvel coberto de preto foram tirados do modelo a pedido do usuário; planos antigos ainda têm `fixed.balcao` e `fixed.movel`, que são ignorados.

## Como o código está organizado

- Cada item do plano tem `uid` estável. A sincronização envia só os itens que mudaram, com `update` em `items.<uid>`, para duas pessoas editarem itens diferentes ao mesmo tempo sem uma apagar a outra.
- Desfazer reverte apenas os itens da última ação local.
- `?ver=codigo` liga o modo só visualização (`readOnly`, classe `so-ver` no body): `save`, `commit` e `undo` não fazem nada, o arraste é bloqueado e não se lê nem grava o plano do aparelho. Toda função nova que altere o plano precisa respeitar `readOnly`.
- `?arquivo=1` é o modo arquivo: abre o plano guardado em `salao37x15:arquivo` (vindo de Abrir arquivo de plano ou da cópia do aparelho), editável, salvo só no aparelho e sem sincronizar. Não confundir com `salao37x15:atual`, que é a cópia local do evento.
- Arquivo baixado: `{tipo:'planejador-salao-37x15', formato:1, salvoEm, plano}`, em que `plano` é o mesmo formato de `serialize()`. A leitura também aceita o `serialize()` puro. A imagem da Planta é renderizada com câmera ortográfica num render target (`plantaPNG`), com os nomes desenhados num canvas 2D.
- Uma aba parada não percebe mudança nas regras pelo ouvinte do Firestore. Por isso o app faz uma gravação mínima de `atualizadoEm` ao voltar para a aba e a cada 10 minutos; se for recusada, mostra o aviso de encerramento.

## Testes

Dá para testar sem mexer no projeto real com o emulador do Firestore (`firebase emulators:start --only firestore --project demo-...`), servindo o `config.js` com `emulador:{host:'127.0.0.1',port:8080}` no `FIREBASE_CONFIG`. Com esse campo o app chama `useEmulator`. Para testar o encerramento, use uma cópia do `firestore.rules` e troque `aberto()` entre `true` e `false` (o emulador recarrega sozinho).
- Medidas sempre em metros reais. Item personalizado usa o tipo `custom` com nome, formato, largura, profundidade, altura, cor e lugares.
- Mesa com nome usa o tipo `mesap` (`table:true`) com `n` (nome), `sh` (`ret` ou `redondo`), `w` (comprimento ou diâmetro), `d` (largura) e `s` (cadeiras, 0 a 40). As cadeiras são posicionadas no `build`. O Distribuir não a remove ao trocar mesas, e a imagem da Planta mostra o nome em vez de "Mesa N".

## Regras para mudanças

- Manter tudo funcionando no celular primeiro (toque, telas estreitas, área segura).
- Interface e textos em português do Brasil. Não usar travessão (—) nos textos.
- Não quebrar planos já salvos: mudanças no formato dos dados precisam ler o formato antigo.
- Testar localmente com um servidor (por exemplo a extensão Live Server) antes de fazer commit.
