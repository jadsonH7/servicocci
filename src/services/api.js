export async function salvarRegistroNoDrive(payload) {
  const response = await fetch("https://script.google.com/macros/s/AKfycbzCUgi6yZsdeI4Npstx3UixP1dQkVVooo3kUp3AnUuiXHPjGyl2BYohpLslE9N6P2hmPg/exec", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Erro ao salvar no Google Drive");
  }

  return response.json();
}
