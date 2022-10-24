import styled from "styled-components"
import { ligthBlue } from "../../constants/colors"
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import { useState } from "react"
import { ThreeDots } from "react-loader-spinner"

export default function CreateHabit({
  createHabit,
  setCreatHabit,
  config,
  setNewHabits,
  newHabits,
}) {
  const [habitName, setHabitName] = useState("")
  const [habitDays, setHabitDays] = useState([])
  const [loading, setLoading] = useState(false)
  const body = {
    name: habitName,
    days: habitDays,
  }
  const week = ["D", "S", "T", "Q", "Q", "S", "S"]

  // if(createHabit === true){
  //   setLoading(false)
  // }

  function addHabit() {
    const request = axios.post(`${BASE_URL}habits`, body, config)
    request.then((res) => {
      setLoading(false)
      setCreatHabit(!createHabit)
      setNewHabits([...newHabits, res.data])
    })
    request.catch((err) => {
      console.log(err)
      alert(err.response.data.details)
      setLoading(false)
    })
  }
  return (
    <Container>
      <input
      data-identifier="input-habit-name"
        disabled={loading}
        onChange={(e) => setHabitName(e.target.value)}
        placeholder="nome do hábito"
      />
      {week.map((e, idx) => (
        <BtnDays
        data-identifier="week-day-btn"
          disabled={loading}
          btnColor={habitDays.includes(idx) ? true : false}
          onClick={() => {
            !habitDays.includes(idx) && setHabitDays([...habitDays, idx])
            habitDays.includes(idx) &&
              setHabitDays(habitDays.filter((e) => e !== idx))
          }}
          key={idx}
        >
          {e}
        </BtnDays>
      ))}
      <SaveCancel>
        <Cancel
        data-identifier="cancel-habit-create-btn"
          onClick={() => {
            setCreatHabit(!createHabit)
          }}
        >
          Cancelar
        </Cancel>
        {loading ? (
          <Save>
            <ThreeDots color="white" height="10px" />
          </Save>
        ) : (
          <Save
          data-identifier="save-habit-create-btn"
            onClick={() => {
              addHabit()
              setLoading(true)
            }}
          >
            Salvar
          </Save>
        )}
      </SaveCancel>
    </Container>
  )
}

const Container = styled.div`
  width: 340px;
  margin-top: 20px;
  height: 180px;
  background: #ffffff;
  border-radius: 5px;
  padding: 19px;
  margin-bottom: 20px;
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
  color: ${(props) => (props.btnColor ? "#ffffff" : "#dbdbdb")};
  background: ${(props) => (props.btnColor ? "#CFCFCF" : "#ffffff")};
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  margin-right: 5px;
  margin-top: 8px;
`
const Cancel = styled.button`
  margin-right: 23px;
  font-size: 15.976px;
  color: ${ligthBlue};
  border: none;
  background-color: white;
`
const SaveCancel = styled.div`
  margin-top: 20px;
`
