
import { PulseLoader } from "react-spinners"



const customCss = {
    display: "block",
    margin: "0 0",
    borderColor: "red",
  };

export const Loader = ({index})=>{
    return(
        <PulseLoader cssOverride={customCss} color={"#2dd4bf"} loading={true} aria-label="Loading Spinner"
        data-testid="loader" size={15} speedMultiplier={0.8} id={index} />
    )
}