import styled from "styled-components"
import { BsTrash } from "react-icons/bs"
import axios from "axios"
import { BASE_URL } from "../../constants/url"

export default function Habit({ habits, config, setHabits }) {
  const week = ["D", "S", "T", "Q", "Q", "S", "S"]
  
  function deleteHabit(id, idx) {
    axios.delete(`${BASE_URL}habits/${id}`, config)
    setHabits(habits.filter((e) => e.id !== id))
  }

  return (
    <>
      {habits.map((e, idx) => (
        <Box key={idx}>
          <div data-identifier="habit-name">{e.name}</div>
          <div>
          {week.map((element, index) => (
            <BtnDays
              btnColor={e.days.includes(index) ? true : false}
              key={index}
            >
              {element}
            </BtnDays>
          ))}
          </div>
          <Trash data-identifier="delete-habit-btn" onClick={() => deleteHabit(e.id)} />
        </Box>
      ))}
    </>
  )
}

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
  div {
    overflow-wrap: break-word;  
    word-wrap: break-word; 
    word-break: break-word;
    width: 300px;
    font-weight: 400;
    font-size: 19.976px;
    color: #666666;
  }
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
  margin-top: 10px;
`
const Trash = styled(BsTrash)`
  color: #666666;
  position: absolute;
  top: 10px;
  right: 10px;
`
