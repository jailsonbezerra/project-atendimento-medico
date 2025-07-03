// Componente reutilizável para botões de prioridade
export default function PrioridadeTriagem({ prioridades, prioridadeAtual, onChange }) {
  return (
    <div className="prioridade-triagem">
      {prioridades.map((p) => (
        <button
          type="button"
          key={p.label}
          className={
            'prioridade-btn ' +
            p.cor +
            (prioridadeAtual === p.label ? ' active' : '')
          }
          onClick={() => onChange(p.label)}
        >
          <span>{p.label}</span>
        </button>
      ))}
    </div>
  );
}
