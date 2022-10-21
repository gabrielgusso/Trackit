import styled from "styled-components"
import { ligthBlue, blue } from "../../constants/colors"
import { useContext, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import { Link, useNavigate } from "react-router-dom"
import Auth from "../../providers/auth"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"

export default function Habits() {
  const { user } = useContext(Auth)
  return (
    <>
      <Header />
      <Footer />
      <Container>
        <Top>
          <h1>Meus hábitos</h1>
          <button>+</button>
        </Top>
      </Container>
    </>
  )
}

const Container = styled.div`
  background-color: #e5e5e5;
  height: 100vh;
`
const Top = styled.div`
  display: flex;
  button {
    width: 40px;
    height: 35px;
    background-color: ${ligthBlue};
    border-radius: 4.63636px;
  }
`
