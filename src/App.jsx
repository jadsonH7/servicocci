import { useState } from 'react';
// Importação dos componentes
import EquipeForm from './components/EquipeForm';
import QuartoHoraForm from './components/QuartoHoraForm';
import FaxinaCopaForm from './components/FaxinaCopaForm';
import FaxinaGeralForm from './components/FaxinaGeralForm';
import ChecklistOperacional from './components/ChecklistOperacional';
import OcorrenciaForm from './components/OcorrenciaForm';
import ButtomSave from './components/ButtomSave';
// Importação do styles
import './styles/app.css';
import './styles/appMobile.css';
import './styles/appDesktop.css';
import { salvarRegistroNoDrive } from './services/api.js';
export default function App() {
  const [quartoHora, setQuartoHora] = useState({ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", });
  const [status, setStatus] = useState({ loading: false, error: null, success: false });
  // Estado centralizado no componente pai
  const [formData, setFormData] = useState({
    dataServico: "",

    equipe: [
      { nome: '', posto: 'Chefe de Equipe' },
      { nome: '', posto: 'Líder de Resgate' },
      { nome: '', posto: 'Combatente 1' },
      { nome: '', posto: 'Combatente 2' },
      { nome: '', posto: 'Resgate 1' },
      { nome: '', posto: 'Resgate 2' },
      { nome: '', posto: 'Rádio Operador' },
      { nome: '', posto: 'Motorista CCI' },
      { nome: '', posto: 'Motorista CRS' },
    ],

    faxinaCopa: {
      cafe: ['', ''],
      almoco: ['', ''],
      janta: ['', ''],
    },

    faxinaGeral: {
      alojamento: '',
      hallSalaChefe: '',
      auditorioSalaMotorista: '',
      copa1: '',
      copa2: '',
      banheiro1: '',
      banheiro2: '',
      banheiro3: '',
    },

    checklistOperacional: {
      equipeCompleta: false,
      faxinaAnterior: false,
      abastecimentoViaturas: false,
      conferenciaCCI: false,
      conferenciaCRS: false,
      checkSirene: false
    },

    ocorrencias: ''
  });

  // Handlers para comunicação com os componentes filhos
  const handleEquipeChange = (index, value) => {
    const newEquipe = [...formData.equipe];
    newEquipe[index].nome = value;
    setFormData({ ...formData, equipe: newEquipe });
  };

  const handleFaxinaCopaChange = (refeicao, index, value) => {
    const newFaxinaCopa = { ...formData.faxinaCopa };
    newFaxinaCopa[refeicao][index] = value;
    setFormData({ ...formData, faxinaCopa: newFaxinaCopa });
  };

  const handleFaxinaGeralChange = (local, value) => {
    setFormData({
      ...formData,
      faxinaGeral: {
        ...formData.faxinaGeral,
        [local]: value,
      },
    });
  };

  const handleChecklistOperacionalChange = (field) => {
    setFormData({
      ...formData,
      checklistOperacional: {
        ...formData.checklistOperacional,
        [field]: !formData.checklistOperacional[field],
      },
    });
  };

  const handleOcorrenciasChange = (value) => {
    setFormData({ ...formData, ocorrencias: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({ loading: true, success: false, error: null });

    const payload = {
      dataServico: formData.dataServico,
      equipe: formData.equipe,
      quartoHora,
      faxinaCopa: formData.faxinaCopa,
      faxinaGeral: formData.faxinaGeral,
      checklistOperacional: formData.checklistOperacional,
      ocorrencias: formData.ocorrencias
    };

    try {
      const response = await salvarRegistroNoDrive(payload);

      setStatus({
        loading: false,
        success: true,
        error: null,
        pdfUrl: response.pdfUrl
      });

    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: `Erro ao salvar registro: ${error.message}`
      });
    }
  };

  const equipeCompleta = formData.equipe.every(
    (membro) => membro.nome && membro.nome.trim() !== ""
  );

  return (
    <section className="app-container">
      <div className="app-header">
        <span className="app-logo">
          <img src="assets/logo/logo.png" alt="logo" />
        </span>
        <span className="app-title">
          <h1>Serviço do Dia </h1>
          <input
            type="date" value={formData.dataServico}
            onChange={(e) => setFormData((prev) => ({ ...prev, dataServico: e.target.value }))}
            required
          />
        </span>
      </div>

      <form onSubmit={handleSubmit} className="app-form-layout">
        <EquipeForm
          equipe={formData.equipe}
          onChange={handleEquipeChange}
        />

        <ChecklistOperacional
          checklist={formData.checklistOperacional}
          onChange={handleChecklistOperacionalChange}
        />

        <QuartoHoraForm
          equipe={formData.equipe.reduce((acc, member) => {
            acc[member.posto.toLowerCase().replace(/ /g, '')] = member.nome ?? '';
            return acc;
          }, {})}
          quartoHora={quartoHora}
          setQuartoHora={setQuartoHora}
          disabled={!equipeCompleta}
        />

        <FaxinaCopaForm
          equipe={formData.equipe.reduce((acc, member) => {
            acc[member.posto.toLowerCase().replace(/ /g, '')] = member.nome;
            return acc;
          }, {})}
          faxinaCopa={formData.faxinaCopa}
          onChange={handleFaxinaCopaChange}
          disabled={!formData.equipe.every(m => m.nome.trim() !== "")}
        />

        <FaxinaGeralForm
          faxinaGeral={formData.faxinaGeral}
          onChange={handleFaxinaGeralChange}
          equipe={formData.equipe.reduce((acc, member) => {
            acc[member.posto.toLowerCase().replace(/ /g, '')] = member.nome ?? '';
            return acc;
          }, {})}
          disabled={!equipeCompleta}
        />

        <OcorrenciaForm
          value={formData.ocorrencias}
          onChange={handleOcorrenciasChange}
        />

        {status.success && (
          <div className="app-success-message">
            <p>✅ Registro salvo com sucesso no Google Drive!</p>
            <a href={status.pdfUrl} target="_blank" rel="noopener noreferrer">
              📄 Abrir relatório em PDF
            </a>
          </div>
        )}

        {status.error && (
          <div className="app-error-message">
            ❌ {status.error}
          </div>
        )}

        {
          !equipeCompleta ? (
            <ButtomSave type='button' texto='Preencha os campos' disabled={true} />
          ) : (
            <ButtomSave type='submit' texto='Salvar Registro' />
          )
        }
      </form>
      <footer className="app-footer">
        <p>Registro de Serviço Operacional - Lider de Resgate</p>
        <p>© 2026 - Célula de Contra Incêndio. Uso Interno do CCI.</p>
      </footer>
    </section>
  );
}