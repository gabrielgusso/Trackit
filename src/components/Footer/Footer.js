import styled from "styled-components"
import { ligthBlue } from "../../constants/colors"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from "react-router-dom";
import Auth from "../../providers/auth";
import { useContext, useEffect } from "react"
import { BASE_URL } from "../../constants/url";
import axios from "axios";

export default function Footer() {
  const navigate = useNavigate()
  const { user, progress, setProgress, checked } = useContext(Auth)

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }

  useEffect(() => {
    const promisse = axios.get(`${BASE_URL}habits/today`, config)

    promisse.then((response) => {
      returnProgress(response.data)
    })

    promisse.catch((error) => {
      console.log(error)
    })
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]) 

  function returnProgress(data) {
    const done = data.filter(e => 
      e.done
    );
    setProgress((done.length / data.length) * 100)
  }

  return (
    <>
      <Conteiner>
        <button data-identifier="habit-page-action" onClick={() =>  navigate(`/habitos`)}><p>Hábitos</p></button>
        <button data-identifier="historic-page-action" onClick={() =>  navigate(`/historico`)}><p>Histórico</p></button>
      </Conteiner>
      <button onClick={() =>  navigate(`/hoje`)}>
      <Circle
        value={progress}
        text='Hoje'
        background
        backgroundPadding={6}
        styles={buildStyles({
          backgroundColor: ligthBlue,
          textColor: "#fff",
          pathColor: "#fff",
          trailColor: "transparent"
        })}/>
      </button>
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
  z-index: 1;
  p {
    color: ${ligthBlue};
    font-weight: 400;
    font-size: 17.976px;
  }
  button{
    border: none;
    background-color: white;
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
z-index: 2;
`
