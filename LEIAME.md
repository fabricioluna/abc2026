# Planejador do salão 37 × 15 m

Planejador em 2D (Planta) e 3D do salão, com mesas, palco, pista e itens com medidas reais. Publicado no GitHub Pages, ele ganha um link público. Ligado ao Firebase, todo mundo que abre o mesmo link edita o mesmo plano, ao vivo.

São três arquivos:

- `index.html`: o planejador.
- `config.js`: onde você cola a configuração do Firebase.
- `firestore.rules`: as regras de segurança do banco.

Faça a parte 1 primeiro, porque ela gera os dados que vão no `config.js`.

## Parte 1: Firebase (onde o plano fica guardado)

1. Entre em https://console.firebase.google.com com uma conta Google e crie um projeto, por exemplo `planejador-salao`. O Google Analytics pode ficar desligado.
2. No menu da esquerda, abra **Criação > Firestore Database** e clique em **Criar banco de dados**. Escolha o local **southamerica-east1 (São Paulo)** e o **modo de produção**.
3. Antes de colar as regras, abra o `firestore.rules` e, na função `aberto()`, troque `AAAA, MM, DD` pela data da formatura, por exemplo `timestamp.date(2026, 12, 12)`. Sem isso o console não aceita as regras. Depois, no Firestore, abra a aba **Regras**, apague o que estiver lá, cole todo o conteúdo do arquivo e clique em **Publicar**.
4. Clique na engrenagem ao lado de "Visão geral do projeto" e entre em **Configurações do projeto**. Em **Seus apps**, clique no ícone **</>** (Web), dê um apelido e registre. Não precisa marcar o Firebase Hosting. Vai aparecer um bloco `firebaseConfig` com seis valores. Abra o `config.js` e troque cada `COLE_AQUI` pelo valor correspondente, mantendo as aspas. No fim do mesmo arquivo, troque `"AAAA-MM-DD"` pela data da formatura, por exemplo `"2026-12-12"` (a mesma do passo 3).

Os nomes dos menus podem mudar um pouco, mas o caminho é esse.

## Parte 2: GitHub Pages (o link público)

5. No GitHub, crie um repositório **público**, por exemplo `planejador-salao`.
6. Clique em **Add file > Upload files**, envie `index.html`, `config.js` (já preenchido) e este `LEIAME.md`, e confirme em **Commit changes**. O `firestore.rules` pode ir junto, só para ficar guardado.
7. Em **Settings > Pages**, escolha **Deploy from a branch**, branch **main**, pasta **/ (root)**, e salve. Em um ou dois minutos o endereço aparece no topo dessa página, algo como `https://SEU-USUARIO.github.io/planejador-salao/`.

## Parte 3: usar com a equipe

8. Abra o endereço. O planejador cria um evento sozinho e o link ganha um `?evento=código` no final. A bolinha verde ao lado do número de mesas indica que está sincronizado.
9. Toque em **Evento > Copiar link** (ou **Enviar pelo celular**) e mande para a decoradora e a cerimonialista. O que uma pessoa muda aparece para as outras em poucos segundos.

## Ferramentas

- **Adicionar > Criar item com medidas próprias:** qualquer peça do fornecedor, com nome, formato, largura, profundidade, altura, cor e lugares. As medidas podem ser corrigidas depois no próprio item.
- **Medir:** toque em dois pontos do chão e aparece a distância em metros.
- **Item selecionado:** mostra as medidas e a distância até cada parede.
- **Planta:** visão de cima, em escala. Cada piso do chão equivale a 1 m.
- **Evento > Versões salvas:** guarde versões antes de mudanças grandes. Elas ficam no evento, visíveis para todos que têm o link.
- **Evento > Compartilhar esta versão:** mostra o plano a alguém que não deve editar, como a família. Dê um nome à versão e diga quem está enviando (o nome fica guardado no aparelho). Sai um link `?ver=...` com uma cópia congelada do plano daquele momento. Quem abre pode girar o 3D, ver a Planta e medir, mas não move, não adiciona, não exclui e não chega ao evento, porque a cópia não leva o código do evento. Mudanças feitas depois no plano não aparecem nesse link: para mostrar de novo, gere outro.
- **Versões compartilhadas:** na mesma folha aparecem todas as versões enviadas a partir do evento, com quem enviou e quando. **Ver link** mostra o link de novo. **Aplicar ao plano principal** troca o plano do evento por aquela versão (toque duas vezes para confirmar). Se foi engano, use **Desfazer**.
- **Desfazer:** volta a última ação de quem tocou no botão, sem desmanchar o que as outras pessoas fizeram em outros itens.
- **Evento > Baixar plano:** baixa dois arquivos. O `plano-salao-DATA.json` guarda o plano completo. A `planta-salao-DATA.png` é a Planta vista de cima, com as mesas numeradas do bar para o palco e o nome de cada item. No celular, os arquivos vão para Downloads (ou Arquivos, no iPhone). Se só um baixar, aparecem links para baixar cada um.
- **Evento > Abrir arquivo de plano:** abre um `.json` baixado antes. O plano abre separado do evento, só neste aparelho: dá para ver e até mexer, mas nada vai para as outras pessoas. **Fechar o arquivo**, no topo, volta ao evento.

## Fim do planejamento

Depois do fim do dia da formatura (meia-noite de Brasília), o Firebase recusa tudo: ninguém lê nem grava o evento nem as versões compartilhadas. Isso é garantido pelas regras do Firestore, não só pelo planejador. Quem abrir o link vê a mensagem "Planejamento encerrado", com o botão **Abrir arquivo de plano**. Quem abrir um link de versão vê "Link encerrado".

**Antes da formatura, baixe o plano** (Evento > Baixar plano) e guarde o `.json` e a `.png`. Depois do encerramento, abra o planejador e toque em **Abrir arquivo de plano** para continuar vendo. O aparelho que usou o evento por último também oferece **Ver a cópia guardada neste aparelho**.

**Para encerrar antes da data:**

1. No console do Firebase, abra **Firestore Database > Regras**.
2. Na função `aberto()`, troque a data por uma que já passou, por exemplo a de ontem, e clique em **Publicar**. A partir daí o banco recusa tudo.
3. Para a mensagem aparecer certinha também para quem nunca abriu o evento, troque a data no `config.js` pela mesma e envie o arquivo de novo ao GitHub. Sem isso o acesso fica bloqueado do mesmo jeito, mas quem abrir pela primeira vez vê um aviso de acesso recusado em vez de "Planejamento encerrado".

Quem está com o planejador aberto recebe o aviso na próxima vez que mexer em algo ou voltar para a aba.

**Para reabrir** (por exemplo, se a festa mudou de data): coloque uma data futura na função `aberto()` das regras e publique. Se mudou o `config.js`, coloque a mesma data nele e envie de novo. Nada é apagado no encerramento, então o plano volta inteiro.

## Cuidados

- Quem tem o link pode editar. Não poste em grupos grandes. Para cortar o acesso de alguém, use **Evento > Criar outro evento** (ele começa com uma cópia do plano atual) e mande o link novo só para quem deve continuar.
- A `apiKey` do `config.js` não é senha. Em sites com Firebase ela fica pública mesmo, e quem protege os dados são as regras do passo 3.
- O plano gratuito do Firebase sobra para esse uso.
- Se a bolinha ficar vermelha e aparecer um aviso de acesso recusado, confira se as regras do passo 3 foram publicadas e se a data da função `aberto()` ainda não passou.
- Para atualizar o planejador no futuro, basta substituir o `index.html` no GitHub. O `config.js` continua o mesmo.
