import { useState } from "react";


function App() {
  const [codes, setCodes] = useState([])
  const [id, setId] = useState([])

  const getCodes = async () => {
    console.log('Ejecutando')
    const respuesta = await fetch('http://localhost:3010/')
    const res = await respuesta.json()

    setCodes(res.ids)
  }

  const handleChange = (e) => {
    const value = e.target.value
    setId(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:3010/verifica/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id})
    })
    const res = await response.json()

    console.log(res);
  }

  return (
    <div className="App flex flex-col justify-center items-center">
      <div
        className="w-2/3 bg-gray-300 rounded my-2 p-4"
      >
        {codes?.map((code, n) => (
          <p>{`Codigo ${n}: ${code}`}</p>
        ))}
      </div>
      <button
        onClick={getCodes}
        className="rounded py-2 px-4 bg-cyan-500 text-white"
      >Boton</button>

      <form>
        <input type='text' placeholder="Código" onChange={handleChange}/>
        <button
          className="rounded py-2 px-4 bg-cyan-500 text-white"
          onClick={handleSubmit}
        >Enviar</button>
      </form>
    </div>
  );
}

export default App;
