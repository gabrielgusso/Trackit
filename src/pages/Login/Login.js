import styled from "styled-components"
import logo from "../../assets/images/logo-login.png"
import { ligthBlue } from "../../constants/colors"
import { useContext, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import { Link, useNavigate } from "react-router-dom"
import Auth from "../../providers/auth"
import { ThreeDots } from "react-loader-spinner"

export default function Login() {
  const [registry, setRegistry] = useState()
  const [loading, setLoading] = useState(false)
  const { setUser } = useContext(Auth)
  const navigate = useNavigate()

  function register(event) {
    event.preventDefault()
    setLoading(true)
    const request = axios.post(`${BASE_URL}auth/login`, registry)
    request.then((res) => {
      setUser(res.data)
      navigate(`/habitos`)
    })
    request.catch((err) => {
      setLoading(false)
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
      <form onSubmit={register}>
        <input
        data-identifier="input-email"
          placeholder="email"
          type="email"
          required
          disabled={loading}         
          onChange={(e) => setRegistry({ ...registry, email: e.target.value })}
        />
        <input
        data-identifier="input-password"
          placeholder="senha"
          type="password"
          required
          disabled={loading}
          onChange={(e) =>
            setRegistry({ ...registry, password: e.target.value })
          }
        />
        <button type="submit" data-identifier="login-btn">
          {loading ? <ThreeDots color="white" height="10px"/> : "Entrar"}
          </button>
      </form>
      <Link to={`/cadastro`}>
        <p data-identifier="sign-up-action">Não tem uma conta? Cadastre-se!</p>
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
    background-color:'#ffffff';
    padding-left: 11px;
  }
  input::placeholder {
    color: '#dbdbdb';
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
    display: flex;
    align-items: center;
    justify-content: center;
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
