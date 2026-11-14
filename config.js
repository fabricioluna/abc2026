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

// Dia da formatura, no formato ANO-MÊS-DIA (por exemplo "2026-12-12").
// Depois do fim desse dia (meia-noite de Brasília), o planejador mostra
// "Planejamento encerrado". Use a mesma data da função aberto() no firestore.rules.
window.FORMATURA = "AAAA-MM-DD";
