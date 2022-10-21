import styled from "styled-components"
import logo from "../../assets/images/logo-login.png"
import { ligthBlue } from "../../constants/colors"
import { useContext, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import { Link, useNavigate } from "react-router-dom"
import Auth from "../../providers/auth"

export default function Login() {
  const [registry, setRegistry] = useState()
  const { setUser } = useContext(Auth)
  const navigate = useNavigate()

  function Register(event) {
    event.preventDefault()
    //event.target.reset()
    const request = axios.post(`${BASE_URL}auth/login`, registry)
    request.then((res) => {
      setUser(res.data)
      navigate(`/habitos`)
    })
    request.catch((err) => {
      if (err.response.status === 422) {
        alert(err.response.data.details)
      }
      if (err.response.status === 409) {
        alert(err.response.data.message)
      }
      if (err.response.status === 401) {
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
          type="password"
          required
          onChange={(e) =>
            setRegistry({ ...registry, password: e.target.value })
          }
        />
        <button type="submit">Entrar</button>
      </form>
      <Link to={`/cadastro`}>
        <p>Não tem uma conta? Cadastre-se!</p>
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
