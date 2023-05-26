

const LanguageModel = ({set_is_popup})=>{
    return(
        <div className="flex justify-center items-center h-screen">
        <div className="w-1/2 h-24 bg-red-400 ">
            <h1>Select A Language Model</h1>
            <button>GPT-3</button>
            <button>GPT-3.5</button>
        </div>

        </div>
        
    )
}

export default LanguageModel;