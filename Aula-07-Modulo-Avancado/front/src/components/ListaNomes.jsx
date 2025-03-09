import { useState } from "react";
import "./styles.css";

const ListaNomes = ({ nomes, editarNome, excluirNome }) => {
  const [editando, setEditando] = useState(null);
  const [novoNome, setNovoNome] = useState("");

  return (
    <ul>
      {nomes.length > 0 ? (
        nomes.map((n) => (
          <li key={n.id}>
            {editando === n.id ? (
              <>
                <input
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                />
                <button
                  onClick={() => {
                    editarNome(n.id, novoNome);
                    setEditando(null);
                  }}
                >
                  Salvar
                </button>
              </>
            ) : (
              <>
                {n.nome}
                <button
                  onClick={() => {
                    setEditando(n.id);
                    setNovoNome(n.nome);
                  }}
                >
                  ✏️
                </button>
                <button onClick={() => excluirNome(n.id)}>🗑️</button>
              </>
            )}
          </li>
        ))
      ) : (
        <li>Nenhum nome cadastrado.</li>
      )}
    </ul>
  );
};

export default ListaNomes;
