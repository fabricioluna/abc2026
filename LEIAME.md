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
3. Ainda no Firestore, abra a aba **Regras**, apague o que estiver lá, cole todo o conteúdo do arquivo `firestore.rules` e clique em **Publicar**.
4. Clique na engrenagem ao lado de "Visão geral do projeto" e entre em **Configurações do projeto**. Em **Seus apps**, clique no ícone **</>** (Web), dê um apelido e registre. Não precisa marcar o Firebase Hosting. Vai aparecer um bloco `firebaseConfig` com seis valores. Abra o `config.js` e troque cada `COLE_AQUI` pelo valor correspondente, mantendo as aspas.

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
- **Desfazer:** volta a última ação de quem tocou no botão, sem desmanchar o que as outras pessoas fizeram em outros itens.

## Cuidados

- Quem tem o link pode editar. Não poste em grupos grandes. Para cortar o acesso de alguém, use **Evento > Criar outro evento** (ele começa com uma cópia do plano atual) e mande o link novo só para quem deve continuar.
- A `apiKey` do `config.js` não é senha. Em sites com Firebase ela fica pública mesmo, e quem protege os dados são as regras do passo 3.
- O plano gratuito do Firebase sobra para esse uso.
- Se a bolinha ficar vermelha e aparecer um aviso de acesso recusado, confira se as regras do passo 3 foram publicadas.
- Para atualizar o planejador no futuro, basta substituir o `index.html` no GitHub. O `config.js` continua o mesmo.
