// Substitua pela URL do seu Google Apps Script após configurar a planilha
const SHEET_URL =
  "https://script.google.com/macros/s/AKfycby4niI9eXn6x6qfFf2kI6OyS7QBeRGRVtyiPfv1_HuBlGFH05GZwunsDCvVQkhNd6rp/exec";

document.getElementById("celular").addEventListener("input", function (e) {
  const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) { e.target.value = ""; return; }
  let v = "(" + digits.slice(0, 2);
  if (digits.length > 2) v += ") " + digits.slice(2, 7);
  if (digits.length > 7) v += "-" + digits.slice(7, 11);
  e.target.value = v;
});

const form = document.getElementById("rsvp-form");
const submitBtn = document.getElementById("submit-btn");
const confirmacao = document.getElementById("confirmacao");
const erroMsg = document.getElementById("erro-msg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  erroMsg.hidden = true;

  const nome = document.getElementById("nome").value.trim();
  const celular = document.getElementById("celular").value.trim();
  const acompanhante = document.getElementById("acompanhante").value;
  const voz = document.getElementById("vocal").value;
  const musica = document.getElementById("musica").value.trim();

  if (!nome || !celular || !acompanhante || !voz) {
    erroMsg.querySelector("p").textContent =
      "Preencha todos os campos obrigatórios antes de confirmar.";
    erroMsg.hidden = false;
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Enviando...";

  const payload = { nome, celular, acompanhante, voz, musica };

  fetch(SHEET_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(payload),
  })
    .then(() => {
      form.hidden = true;
      confirmacao.hidden = false;
    })
    .catch(() => {
      erroMsg.querySelector("p").textContent = "Algo deu errado. Tenta de novo.";
      erroMsg.hidden = false;
      submitBtn.disabled = false;
      submitBtn.textContent = "CONFIRMAR PRESENÇA NO ELENCO";
    });
});
