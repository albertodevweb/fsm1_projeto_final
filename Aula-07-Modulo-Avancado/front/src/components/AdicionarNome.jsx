import { useState } from "react";
import "./styles.css";

const AdicionarNome = ({ adicionarNome }) => {
  const [nome, setNome] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionarNome(nome);
    setNome("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default AdicionarNome;

