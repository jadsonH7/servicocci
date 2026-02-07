export function salvarRegistroNoDrive(payload) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = "https://script.google.com/macros/s/AKfycbwvzfrhD7o5hmM4yxvwvuI3-Q5TJfHhwx8gwY1dbF3yQYdZEqDxvhQxwW9F-k73HfLkSg/exec";
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
