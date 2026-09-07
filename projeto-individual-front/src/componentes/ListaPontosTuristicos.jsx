import { useState, useEffect } from 'react'
import styles from '../style.module.css'

// Componente responsável por buscar os pontos turísticos na API (GET) e exibi-los
export function ListaPontosTuristicos(props){
  const [pontos, setPontos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState("")

  // useEffect é um hook novo: ele roda uma função depois que o componente
  // aparece na tela. O array no final ([props.atualizarLista]) faz ela rodar
  // de novo toda vez que esse valor mudar — assim, quando um ponto novo é
  // cadastrado no outro componente, essa lista se atualiza sozinha.
  useEffect(() => {
    buscarPontos()
  }, [props.atualizarLista])

  async function buscarPontos(){
    setCarregando(true)
    setErro("")

    try {
      const resposta = await fetch("http://localhost:8080/locais")

      if(!resposta.ok){
        throw new Error("Não foi possível carregar os pontos turísticos")
      }

      const dados = await resposta.json()
      setPontos(dados)

    } catch(erroRequisicao) {
      setErro(erroRequisicao.message)
    } finally {
      setCarregando(false)
    }
  }

  // Assim como em ListaHobbies, .map() transforma o array vindo da API em <li>.
  // Aqui usamos "key" (o id de cada ponto) porque o React precisa identificar
  // cada item da lista quando os dados vêm de fora e podem mudar.
  const pontosMapeados = pontos.map(ponto =>
    <li key={ponto.id} className={styles.card}>
      <h3>{ponto.nome}</h3>
      <p>{ponto.cidade} - {ponto.categoria}</p>
      <p>{ponto.descricao}</p>
      <p>Preço: R$ {ponto.preco}</p>
    </li>
  )

  return (
    <div>
      <h2>Pontos turísticos cadastrados</h2>

      {carregando && <p>Carregando...</p>}
      {erro && <p style={{color: "red"}}>{erro}</p>}

      {!carregando && !erro && (
        <ul className={styles.lista}>
          {pontosMapeados}
        </ul>
      )}
    </div>
  )
}
