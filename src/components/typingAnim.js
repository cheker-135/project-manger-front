import { TypeAnimation } from "react-type-animation";  

const TypingAnim = () => {
    return (
        <TypeAnimation
        sequence={[
            // Same substring at the start will only be typed once, initially
            
            "Gérez vos projets avec facilité! ",
            1000,
            "Simplifiez votre travail d'équipe! ",
            1000,
            "Suivez vos projets en temps réel! ",
            1000,
            "Notre plateforme de gestion en ligne pour une organisation sans faille!💻 ",
            1500,
        ]}
        speed={50}
        style={{
            fontSize: "70px",
            color: "#fff",
            display: "inline-block",
            textShadow: "5px 5px 25px #fff",
        }}
        repeat={Infinity}
        />
    );
};

export default TypingAnim;
