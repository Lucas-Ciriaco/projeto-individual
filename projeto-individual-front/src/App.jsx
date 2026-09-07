import { useState } from 'react'
import './App.css'
import { CadastroPontoTuristico } from './componentes/CadastroPontoTuristico'
import { ListaPontosTuristicos } from './componentes/ListaPontosTuristicos'

function App() {
  // Estado simples só para "avisar" a lista que ela precisa se atualizar.
  // Toda vez que esse número muda, o useEffect da ListaPontosTuristicos roda de novo.
  const [atualizarLista, setAtualizarLista] = useState(0)

  function aoCadastrarPonto(){
    setAtualizarLista(atualizarLista + 1)
  }

  return (
    <>
      <section id="center">
        <div>
          <h1>Pontos Turísticos</h1>
          <p>Cadastre e consulte pontos turísticos.</p>
        </div>

        <CadastroPontoTuristico aoCadastrar={aoCadastrarPonto} />

        <ListaPontosTuristicos atualizarLista={atualizarLista} />
      </section>
    </>
  )
}

export default App