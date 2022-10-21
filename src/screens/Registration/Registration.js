import { useState } from "react"
import styled from "styled-components"
import logo from "../../assets/images/logo-login.png"
import { ligthBlue } from "../../constants/colors"
import { BASE_URL } from "../../constants/url"
import axios from "axios"
import { Link } from "react-router-dom"

export default function Registration() {
  const [registry, setRegistry] = useState()

  function Register(event) {
    event.preventDefault()
    //event.target.reset()
    console.log(registry)

    const request = axios
      .post(
        `${BASE_URL}auth/sign-up`,
        registry
      )
      request.then((res) => {
        console.log(res)
        console.log("cadastrado")
      })
      request.catch((err) => {
        if (err.response.status === 422) {
          alert(err.response.data.details)
        }
        if (err.response.status === 409) {
          alert(err.response.data.message)
        }
        console.log(err)
      })
      
  }

  return (
    <Container>
      <img src={logo} alt="logo" />
      <form onSubmit={Register}>
        <input
          placeholder="email"
          type="email"
          required
          onChange={(e) => setRegistry({ ...registry, email: e.target.value })}
        />
        <input
          placeholder="senha"
          required
          onChange={(e) =>
            setRegistry({ ...registry, password: e.target.value })
          }
        />
        <input
          placeholder="nome"
          required
          onChange={(e) => setRegistry({ ...registry, name: e.target.value })}
        />
        <input
          placeholder="foto"
          required
          onChange={(e) => setRegistry({ ...registry, image: e.target.value })}
        />
        <button type="submit">Cadastrar</button>
      </form>
      <Link to={`/`}>
      <p>Já tem uma conta? Faça login!</p>
      </Link>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  input {
    width: 303px;
    height: 45px;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    font-weight: 400;
    font-size: 19.976px;
    margin-bottom: 6px;
    outline: none;
    padding-left: 11px;
  }
  input::placeholder {
    color: #dbdbdb;
  }
  button {
    width: 303px;
    height: 45px;
    background: ${ligthBlue};
    border-radius: 4.63636px;
    border: none;
    font-weight: 400;
    font-size: 20.976px;
    color: #ffffff;
    cursor: pointer;
  }
  img {
    margin-bottom: 40px;
  }
  p {
    font-weight: 400;
    font-size: 13.976px;
    line-height: 17px;
    text-decoration-line: underline;
    color: ${ligthBlue};
    margin-top: 25px;
  }
`
