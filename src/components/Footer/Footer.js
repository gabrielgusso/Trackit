import styled from "styled-components"
import { ligthBlue } from "../../constants/colors"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// import { useContext } from "react"
// import Auth from "../../providers/auth"

export default function Footer() {
  const percentage = 70;
  return (
    <>
      <Conteiner>
        <p>Hábitos</p>
        <p>Histórico</p>
      </Conteiner>
      <Circle
        value={percentage}
        text='Hoje'
        background
        backgroundPadding={6}
        styles={buildStyles({
          backgroundColor: ligthBlue,
          textColor: "#fff",
          pathColor: "#fff",
          trailColor: "transparent"
        })}
      />
    </>
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
const Circle = styled(CircularProgressbar)`
width: 90px;
border-radius: 99999px;
position: fixed;
bottom: 10px;
display: flex;
justify-content: center;
align-items: center;
left: 50%;
margin-left: -45px;
font-weight: 400;
font-size: 17.976px;
color: white;
`
