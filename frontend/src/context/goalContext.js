import { createContext, useContext } from "react";
export const GoalContext = createContext(null);

const GoalContextProvider = ({children}) => {
    var goal = "I want to become a doctor"
    return (
        <GoalContext.Provider value={{goal}}>
            {children}
        </GoalContext.Provider>
    )
}


export const useGoalContext = () => {
    const {goal} = useContext(GoalContext);

    return {goal}

}



export default GoalContextProvider;