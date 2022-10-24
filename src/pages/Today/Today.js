import styled from "styled-components"
import { useContext, useState, useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import Auth from "../../providers/auth"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import { BsCheckLg } from "react-icons/bs"
import { blue } from "../../constants/colors"

export default function Today() {
  const [habits, setHabits] = useState([])
  const dayjs = require("dayjs")
  require("dayjs/locale/pt-br")
  let today = dayjs().locale("pt-br").format("dddd, DD/MM")
  const { user, setChecked, checked, progress } = useContext(Auth)

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }

  useEffect(() => {
    const promisse = axios.get(`${BASE_URL}habits/today`, config)

    promisse.then((response) => {
      setHabits(response.data)
    })

    promisse.catch((error) => {
      console.log(error)
    })
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked])

  function CheckHabit(id, done) {
    if (done === false) {
      const promisse = axios.post(`${BASE_URL}habits/${id}/check`, null, config)

      promisse.then(() => {
        setChecked(checked + 1)
      })

      promisse.catch((error) => {
        console.log(error)
      })
    }
    if (done === true) {
      const promisse = axios.post(
        `${BASE_URL}habits/${id}/uncheck`,
        null,
        config
      )

      promisse.then(() => {
        setChecked(checked - 1)
      })

      promisse.catch((error) => {
        console.log(error)
      })
    }
  }

  return (
    <>
      <Header />
      <Footer />
      <Container data-identifier="today-infos">
        <TitleBox>
          <Title>{today}</Title>
          {progress === 0 ? (
            <h1>Nenhum hábito concluído ainda</h1>
          ) : (
            <h2>{progress.toFixed()}% dos hábitos concluídos</h2>
          )}
        </TitleBox>

        {habits &&
          habits.map((e) => (
            <Box key={e.id}>
              <HabitName>{e.name}</HabitName>
              <p>
                Sequência atual:{" "}
                <Span color={e.done ? "#8FC549" : "#666666"}>
                  {e.currentSequence} dias
                </Span>
              </p>
              <p>Seu recorde: {e.highestSequence} dias</p>
              <CheckBox
                data-identifier="done-habit-btn"
                color={e.done ? "#8FC549" : "#ebebeb"}
                onClick={() => CheckHabit(e.id, e.done)}
              >
                <Check />
              </CheckBox>
            </Box>
          ))}
      </Container>
    </>
  )
}

const Container = styled.div`
  overflow-y: scroll;
  background-color: #e5e5e5;
  height: 100vh;
  padding: 98px 18px 0 18px;
  margin-bottom: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-weight: 400;
    font-size: 17.976px;
    color: #666666;
    margin-top: 5px;
    margin-bottom: 26px;
  }
  h2 {
    font-weight: 400;
    font-size: 17.976px;
    color: #8fc549;
    margin-top: 5px;
    margin-bottom: 26px;
  }
`
const Title = styled.p`
  font-weight: 400;
  font-size: 22.976px;
  color: ${blue};
`
const TitleBox = styled.div`
  width: 340px;
`

const Box = styled.div`
  width: 340px;
  background: #ffffff;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  p {
    font-size: 12.976px;
    line-height: 16px;
    color: #666666;
  }
`
const HabitName = styled.div`
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  width: 200px;
  font-weight: 400;
  font-size: 19.976px;
  color: #666666;
  margin-bottom: 7px;
`

const CheckBox = styled.div`
  width: 69px;
  height: 69px;
  border-radius: 5px;
  background-color: ${(props) => props.color};
  border: 1px solid #e7e7e7;
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Check = styled(BsCheckLg)`
  color: white;
  font-size: 35px;
`
const Span = styled.span`
  color: ${(props) => props.color};
`
