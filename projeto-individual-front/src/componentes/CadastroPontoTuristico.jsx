import { useState } from 'react'
import styles from '../style.module.css'

// Componente responsável por exibir o formulário e enviar os dados para a API (POST)
export function CadastroPontoTuristico(props){
  // Estado do tipo objeto: guarda todos os campos do formulário juntos,
  // igual fizemos em ListaFrutas com "valorDigitado"
  const [novoPonto, setNovoPonto] = useState({
    nome: "",
    cidade: "",
    categoria: "",
    preco: "",
    descricao: ""
  })

  // Estados para controlar o que a tela mostra durante a requisição
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState("")
  const [sucesso, setSucesso] = useState(false)

  // Função genérica: atualiza só a propriedade que o usuário está digitando,
  // sem apagar as outras (por isso o spread {...novoPonto})
  function atualizarCampo(evento, propriedade){
    const copiaNovoPonto = {...novoPonto}
    copiaNovoPonto[propriedade] = evento.target.value
    setNovoPonto(copiaNovoPonto)
  }

  // Função assíncrona que envia os dados para a API (método POST)
  async function cadastrarPonto(evento){
    evento.preventDefault() // evita que a página recarregue ao enviar o form

    setCarregando(true)
    setErro("")
    setSucesso(false)

    try {
      const resposta = await fetch("http://localhost:8080/locais", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome: novoPonto.nome,
          cidade: novoPonto.cidade,
          categoria: novoPonto.categoria,
          preco: Number(novoPonto.preco),
          descricao: novoPonto.descricao
        })
      })

      if(!resposta.ok){
        throw new Error("Não foi possível cadastrar o ponto turístico")
      }

      setSucesso(true)
      // Limpa o formulário depois de cadastrar com sucesso
      setNovoPonto({ nome: "", cidade: "", categoria: "", preco: "", descricao: "" })

      // Avisa o componente pai (App) que um novo ponto foi cadastrado,
      // para ele poder atualizar a lista
      if(props.aoCadastrar){
        props.aoCadastrar()
      }

    } catch(erroRequisicao) {
      setErro(erroRequisicao.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className={styles.formulario}>
      <h2>Cadastrar ponto turístico</h2>

      <form onSubmit={cadastrarPonto}>
        <input
          type="text"
          placeholder="Nome"
          value={novoPonto.nome}
          onChange={(evento) => atualizarCampo(evento, "nome")}
        /><br />

        <input
          type="text"
          placeholder="Cidade"
          value={novoPonto.cidade}
          onChange={(evento) => atualizarCampo(evento, "cidade")}
        /><br />

        <input
          type="text"
          placeholder="Categoria"
          value={novoPonto.categoria}
          onChange={(evento) => atualizarCampo(evento, "categoria")}
        /><br />

        <input
          type="number"
          placeholder="Preço"
          value={novoPonto.preco}
          onChange={(evento) => atualizarCampo(evento, "preco")}
        /><br />

        <textarea
          placeholder="Descrição"
          value={novoPonto.descricao}
          onChange={(evento) => atualizarCampo(evento, "descricao")}
        /><br />

        <button type="submit" disabled={carregando}>
          {carregando ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>

      {/* Renderização condicional: só aparece se tiver erro ou sucesso */}
      {erro && <p style={{color: "red"}}>{erro}</p>}
      {sucesso && <p style={{color: "green"}}>Ponto turístico cadastrado com sucesso!</p>}
    </div>
  )
}
