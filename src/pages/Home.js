import welcomeImage from "../assets/pepfar_logo.png";
//import classes from "./CSS/Home.module.css";

function HomePage() {
    return (
        <>
            <img src={welcomeImage} alt="PEPFAR Mozambique logo!" />
            <h1>Welcome to Mozambique Art System.</h1>
        </>
    )
}

export default HomePage;