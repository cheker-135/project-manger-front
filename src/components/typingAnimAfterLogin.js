import { TypeAnimation } from "react-type-animation";

const TypingAnimAfter = () => {
    return (
        <TypeAnimation
        sequence={[
            // Same substring at the start will only be typed once, initially

            " Ne jamais perdre du temps ! ",
            2000,
            "Rejoignez vos projects a l'instant!! ",
            2000,

        ]}
        speed={50}
        style={{
            fontSize: "70px",
            color: "#fff",
            display: "inline-block",
            textShadow: "1px 1px 25px #fff",
        }}
        repeat={Infinity}
        />
    );
};

export default TypingAnimAfter;
