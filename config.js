// Configuração do Firebase para a edição compartilhada.
// Troque os valores abaixo pelos do seu projeto (passo 4 do LEIAME).
// Enquanto estiver com "COLE_AQUI", o planejador funciona só no aparelho de quem abrir.
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyDhJs7dpPfwfgX58Gg-vGuVyqpa0qpxNrw",
  authDomain: "planejador-salao-abc2026.firebaseapp.com",
  projectId: "planejador-salao-abc2026",
  storageBucket: "planejador-salao-abc2026.firebasestorage.app",
  messagingSenderId: "980510180965",
  appId: "1:980510180965:web:e15487704177cd6b8de88c"
};

// Encerramento do planejamento. Deixe false enquanto a equipe estiver usando.
// Ao encerrar, troque para true (e a função aberto() do firestore.rules para false):
// o planejador passa a mostrar "Planejamento encerrado" sem tentar conectar.
window.PLANEJAMENTO_ENCERRADO = false;
