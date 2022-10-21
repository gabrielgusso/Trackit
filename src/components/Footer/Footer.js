import styled from "styled-components"
import { ligthBlue } from "../../constants/colors"
// import { useContext } from "react"
// import Auth from "../../providers/auth"

export default function Footer() {
  return (
    <Conteiner>
      <p>Hábitos</p>
      <p>Histórico</p>
    </Conteiner>
  )
}

const Conteiner = styled.div`
  width: 100%;
  height: 70px;
  background: #ffffff;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px 0 25px;
  p {
    color: ${ligthBlue};
    font-weight: 400;
    font-size: 17.976px;
  }
`
