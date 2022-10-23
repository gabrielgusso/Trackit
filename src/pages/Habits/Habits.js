import styled from "styled-components"
import { ligthBlue, blue } from "../../constants/colors"
import { useContext, useState, useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import { Link, useNavigate } from "react-router-dom"
import Auth from "../../providers/auth"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"

export default function Habits() {
  const week = ["D", "S", "T", "Q", "Q", "S", "S"]
  const [habits, setHabits] = useState([])
  const { user } = useContext(Auth)
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }

  useEffect(() => {
    const promisse = axios.get(`${BASE_URL}habits`, config)

    promisse.then((response) => {
      console.log(response)
      setHabits(response.data)
    })

    promisse.catch((error) => {
      console.log(error.response.data)
    })
  }, [])

  return (
    <>
      <Header />
      <Footer />
      <Container>
        <Top>
          <h1>Meus hábitos</h1>
          <button
            onClick={() => {
              addHabit()
            }}
          >
            +
          </button>
        </Top>
        {/* {!habits[0] && (
          <p>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
            começar a trackear!
          </p>
        )} */}
        <CreateHabit>
          <input placeholder="nome do hábito" />
          {week.map((e) => (
            <BtnDays>{e}</BtnDays>
          ))}
          <div>
            <p>cancelar</p>
            <Save>salvar</Save>
          </div>
        </CreateHabit>
      </Container>
    </>
  )
}

function addHabit() {}

const Container = styled.div`
  background-color: #e5e5e5;
  height: 100vh;
  padding: 98px 18px 0 18px;
  p {
    font-weight: 400;
    font-size: 17.976px;
    color: #666666;
  }
`
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    width: 40px;
    height: 35px;
    background-color: ${ligthBlue};
    border-radius: 4.63636px;
    border: none;
    color: white;
  }
  h1 {
    font-weight: 400;
    font-size: 22.976px;
    color: ${blue};
  }
`
const CreateHabit = styled.div`
  width: 340px;
  margin-top: 20px;
  height: 180px;
  background: #ffffff;
  border-radius: 5px;
  padding: 19px;
  input {
    width: 303px;
    height: 45px;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
  }
  input::placeholder {
    font-weight: 400;
    font-size: 19.976px;
    color: #dbdbdb;
    padding-left: 5px;
  }
  div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 35px;
    margin-top: 20px;
  }
  p {
    margin-right: 23px;
    font-size: 15.976px;
    color: ${ligthBlue};
  }
`
const Save = styled.button`
  border: none;
  width: 84px;
  height: 35px;
  background: ${ligthBlue};
  border-radius: 4.63636px;
  font-weight: 400;
  font-size: 15.976px;
  color: #ffffff;
`

const BtnDays = styled.button`
  width: 30px;
  height: 30px;
  font-size: 19.976px;
  color: #dbdbdb;
  background: #ffffff;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  margin-right: 5px;
  margin-top: 8px;
`
