import styled from "styled-components";
import { blue } from "../../constants/colors";
import logo from "../../assets/images/TrackIt.png"
import { useContext } from "react"
import Auth from "../../providers/auth"

export default function Header() {
    const { user } = useContext(Auth)
    return(
        <Conteiner>
        <img src={logo} alt="logo"/>
        <Profile data-identifier="avatar" src={user.image} alt="profile"/>
        </Conteiner>
    )
}

const Conteiner = styled.div`
width: 100%;
height: 70px;
background: ${blue};
position: fixed;
top: 0;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 18px 0 18px;
z-index: 1;
`
const Profile = styled.img`
width: 51px;
height: 51px;
border-radius: 98.5px;`