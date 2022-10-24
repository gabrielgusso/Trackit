import styled from "styled-components"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import { blue } from "../../constants/colors"

export default function History() {
  return (
    <>
      <Header></Header>
      <Footer></Footer>
      <Container>
        <TitleBox>
          <Title>Histórico</Title>
          <h1>Em breve você poderá ver o histórico dos seus hábitos aqui!</h1>
        </TitleBox>
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
`
const TitleBox = styled.div`
  width: 340px;
`

const Title = styled.p`
  font-weight: 400;
  font-size: 22.976px;
  color: ${blue};
  margin-bottom: 17px;
`
