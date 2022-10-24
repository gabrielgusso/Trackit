import { useState } from "react"
import styled from "styled-components"
import logo from "../../assets/images/logo-login.png"
import { ligthBlue } from "../../constants/colors"
import { BASE_URL } from "../../constants/url"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { ThreeDots } from "react-loader-spinner"


export default function Registration() {
  const [loading, setLoading] = useState(false)
  const [registry, setRegistry] = useState()
  const navigate = useNavigate()

  function Register(event) {
    event.preventDefault()
    setLoading(true)

    const request = axios
      .post(
        `${BASE_URL}auth/sign-up`,
        registry
      )
      request.then(() => {
        navigate(`/`)
      })
      request.catch((err) => {
        setLoading(false)
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
        data-identifier="input-email"
          placeholder="email"
          type="email"
          required
          onChange={(e) => setRegistry({ ...registry, email: e.target.value })}
        />
        <input
         data-identifier="input-password"
          placeholder="senha"
          required
          onChange={(e) =>
            setRegistry({ ...registry, password: e.target.value })
          }
        />
        <input
         data-identifier="input-name"
          placeholder="nome"
          required
          onChange={(e) => setRegistry({ ...registry, name: e.target.value })}
        />
        <input
         data-identifier="input-photo"
          placeholder="foto"
          required
          onChange={(e) => setRegistry({ ...registry, image: e.target.value })}
        />
        <button type="submit" data-identifier="back-to-login-action"> {loading ? <ThreeDots color="white" height="10px"/> : "Cadastrar"}</button>
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
