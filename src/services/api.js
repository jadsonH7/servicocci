export function salvarRegistroNoDrive(payload) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = "https://script.google.com/macros/s/AKfycbzXwXQSzMS90Bx2Xp_CiROWGcyhAKPY5Z7hhkbs8d61mu89re1UzzBPTxUHAQGqEwLp/exec";
  form.target = "hidden_iframe";

  const input = document.createElement("input");
  input.type = "hidden";
  input.name = "data";
  input.value = JSON.stringify(payload);

  form.appendChild(input);
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}
