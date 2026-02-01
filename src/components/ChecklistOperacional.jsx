import './styles/styleCheckList.css';
export default function ChecklistOperacional({ checklist, onChange }) {
  const itens = [
    { key: 'equipeCompleta', label: 'Equipe de Serviço' },
    { key: 'faxinaAnterior', label: 'Faxina da equipe anterior' },
    { key: 'abastecimentoViaturas', label: 'Abastecimento das viaturas' },
    { key: 'conferenciaCCI', label: 'Conferência material CCI' },
    { key: 'conferenciaCRS', label: 'Conferência material CRS' },
    { key: 'checkSirene', label: 'Check Sirene' },
  ];

  return (
    <section className="app-checklist-operacional">
      <h2>Checklist Operacional</h2>
      <div className="app-checkbox-grid">
        {itens.map((item) => (
          <div className="app-checkbox-item" key={item.key}>
            <label>
              <input
                type="checkbox"
                checked={checklist[item.key]}
                onChange={() => onChange(item.key)}
              />
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}