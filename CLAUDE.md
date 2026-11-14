# Planejador do salão 37 × 15 m

Planejador 2D (Planta) e 3D de um salão de festas real, usado para montar a festa junto com a decoradora e a cerimonialista. Publicado no GitHub Pages, com edição compartilhada em tempo real pelo Firebase (Firestore).

## Arquivos

- `index.html`: o aplicativo inteiro (HTML, CSS e JavaScript num arquivo só). Usa three.js 0.128.0 e OrbitControls por CDN, e o Firebase compat 10.12.2.
- `config.js`: configuração do Firebase. A apiKey é pública por natureza; a proteção está nas regras.
- `firestore.rules`: regras do banco. Cada evento é o documento `eventos/{codigo}`, com os campos `items`, `fixed`, `versoes`, `compartilhados`, `criadoEm`, `atualizadoEm`. Se criar campo novo no documento, atualize o `hasOnly` das regras.
- Versões compartilhadas por link ficam em `compartilhados/{codigo}` (código de 24 caracteres), com `nome`, `autor`, `dados` (o plano serializado, texto JSON) e `criadoEm`. Só podem ser criadas e lidas por código; nunca alteradas, apagadas ou listadas. Não guardam o código do evento. O evento guarda em `compartilhados.<codigo>` só `{nome, autor, em}` para a lista.
- `LEIAME.md`: passo a passo de publicação para o usuário.

## O salão (coordenadas em metros)

- Eixo x no comprimento (−18,5 parede do bar e banheiros, +18,5 parede do palco). Eixo z na largura (+7,5 parede da entrada principal, −7,5 parede do jardim).
- Duas colunas de pedra soltas no eixo central: x = −12,6 e x = 0,6, ambas em z = 0.
- Pé direito de 6,4 m até a faixa preta, treliças acima.
- Parede atrás da estrutura preta do palco é fechada. Itens fixos que podem ser ocultados: estrutura preta do palco, balcão de granito, móvel coberto e lustres.

## Como o código está organizado

- Cada item do plano tem `uid` estável. A sincronização envia só os itens que mudaram, com `update` em `items.<uid>`, para duas pessoas editarem itens diferentes ao mesmo tempo sem uma apagar a outra.
- Desfazer reverte apenas os itens da última ação local.
- `?ver=codigo` liga o modo só visualização (`readOnly`, classe `so-ver` no body): `save`, `commit` e `undo` não fazem nada, o arraste é bloqueado e não se lê nem grava o plano do aparelho. Toda função nova que altere o plano precisa respeitar `readOnly`.
- Medidas sempre em metros reais. Item personalizado usa o tipo `custom` com nome, formato, largura, profundidade, altura, cor e lugares.

## Regras para mudanças

- Manter tudo funcionando no celular primeiro (toque, telas estreitas, área segura).
- Interface e textos em português do Brasil. Não usar travessão (—) nos textos.
- Não quebrar planos já salvos: mudanças no formato dos dados precisam ler o formato antigo.
- Testar localmente com um servidor (por exemplo a extensão Live Server) antes de fazer commit.
