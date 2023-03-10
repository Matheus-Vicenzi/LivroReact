import React, { Component } from "react";
import TabelaBody from "./components/TabelaBody";
import TabelaFoot from "./components/TabelaFoot";
import TabelaHead from "./components/TabelaHead";

class App extends Component {
  state = {
    livros: []
  };
  componentDidMount() {
    fetch("/api/livros.json")
      .then(response => response.json())
      .then(livros => this.setState({ livros }))
      .catch(error => {
        console.log("Erro na requisição");
      })
      .finally(() => {
        console.log("Sempre retorna");
      });
  };

  handleRemoverLinha = (id) => {
    const livros = this.state.livros.filter(l => l.id !== id);
    this.setState({ livros });
    console.log(`Livro de id ${id} removido`);
  };

  handleOrdenarCrescente = (titulo) => {
    const livros = this.state.livros.sort((a, b) =>
      a.titulo < b.titulo ? -1 : 0);
    this.setState(livros);
  }

  hadleOrdenarDecrescente = titulo => {
    const livros = this.state.livros.sort((a, b) =>
      a.titulo < b.titulo ? -1 : 0);
    this.setState(livros);
    livros.reverse();
    this.setState({ livros });
  }

  render() {
    return (
      <table className="tabela">
        <TabelaHead
          ordenarCrescente={this.handleOrdenarCrescente}
          ordenarDecrescente={this.hadleOrdenarDecrescente}
        />
        <TabelaBody
          livros={this.state.livros}
          removerLinha={this.handleRemoverLinha}
        />
        <TabelaFoot qdeLivros={this.state.livros.length} />
      </table>
    );
  }
}
export default App;
