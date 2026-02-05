import './styles/styleButtom.css';
export default function ButtomSave({ type = "button", onClick, texto = 'Salvar Registro' }) {
  return (
    <section className="app-buttom">
      <button
        className="btn-saved"
        type={type}
        onClick={onClick}
      >
        {texto}
      </button>
    </section>
  );
}