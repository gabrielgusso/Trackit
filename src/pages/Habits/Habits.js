import styled from "styled-components"
import { ligthBlue, blue } from "../../constants/colors"
import { useContext, useState, useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import Auth from "../../providers/auth"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import CreateHabit from "../../components/CreateHabit/CreateHabit"
import Habit from "../../components/Habit/Habit"

export default function Habits() {
  const [habits, setHabits] = useState([])
  const [createHabit, setCreatHabit] = useState(false)
  const [newHabits, setNewHabits] = useState([])
  const { user } = useContext(Auth)

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }

  useEffect(() => {
    const promisse = axios.get(`${BASE_URL}habits`, config)

    promisse.then((response) => {
      setHabits(response.data)
    })

    promisse.catch((error) => {
      console.log(error.response.data)
    })
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newHabits.length])

  return (
    <>
      <Header />
      <Footer />
      <Container>
        <Top>
          <h1>Meus hábitos</h1>
          <button
            data-identifier="create-habit-btn"
            onClick={() => {
              setCreatHabit(!createHabit)
            }}
          >
            +
          </button>
        </Top>
        {createHabit && (
          <CreateHabit
            createHabit={createHabit}
            config={config}
            setCreatHabit={setCreatHabit}
            setNewHabits={setNewHabits}
            newHabits={newHabits}
          />
        )}
        {habits[0] ? (
          <Habit habits={habits} config={config} setHabits={setHabits} />
        ) : (
          <TitleBox>
            <p data-identifier="no-habit-message">
              Você não tem nenhum hábito cadastrado ainda. Adicione um hábito
              para começar a trackear!
            </p>
          </TitleBox>
        )}
      </Container>
    </>
  )
}

const Container = styled.div`
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e5e5e5;
  height: 100vh;
  padding: 98px 18px 0 18px;
  margin-bottom: 90px;
  p {
    font-weight: 400;
    font-size: 17.976px;
    color: #666666;
  }
`
const TitleBox = styled.div`
  width: 340px;
`

const Top = styled.div`
  display: flex;
  width: 340px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
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
