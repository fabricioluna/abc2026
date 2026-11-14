// Configuração do Firebase para a edição compartilhada.
// Troque os valores abaixo pelos do seu projeto (passo 4 do LEIAME).
// Enquanto estiver com "COLE_AQUI", o planejador funciona só no aparelho de quem abrir.
window.FIREBASE_CONFIG = {
  apiKey: "COLE_AQUI",
  authDomain: "COLE_AQUI",
  projectId: "COLE_AQUI",
  storageBucket: "COLE_AQUI",
  messagingSenderId: "COLE_AQUI",
  appId: "COLE_AQUI"
};

// Encerramento do planejamento. Deixe false enquanto a equipe estiver usando.
// Ao encerrar, troque para true (e a função aberto() do firestore.rules para false):
// o planejador passa a mostrar "Planejamento encerrado" sem tentar conectar.
window.PLANEJAMENTO_ENCERRADO = false;
