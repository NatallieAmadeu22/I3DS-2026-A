import "../styles/Perfil.css";

export default function Perfil({ user }) {

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <h1>Meu Perfil</h1>
        <div className="perfil-info">
          <p>
            <strong>Nome:</strong> {user?.nome}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Tipo de Conta:</strong>{" "}
            <span className={`badge ${user?.level.toLowerCase()}`}>
              {user?.level === "ADMIN" ? "Administrador" : "Cliente"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
