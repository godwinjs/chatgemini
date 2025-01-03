import React from "react";
import PropTypes from "prop-types";
import run from "../config/gemini";

export const Context = React.createContext();

const ContextProvider = ({children}) => {
    const [ input, setInput ] = React.useState('');
    const [ recentPrompts, setRecentPrompts ] = React.useState('');
    const [ prevPrompt, setPrevPrompt ] = React.useState([]);
    const [ showResult, setShowResult ] = React.useState(false);
    const [ loading, setLoading ] = React.useState(false);
    const [ resultData, setResultData ] = React.useState('');

    const delayPara = (idx, nextWord) => {
        setTimeout(function() {
            setResultData((prev) => prev + ' ' + nextWord);
        }, 75*idx)
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

     const onSent = async (prompt) => {
        setResultData('');
        setLoading(true);
        setShowResult(true);
        let response = '';

        if(prompt !== undefined) {
            // td: use db or local storage to get prev prompt
            response = await run(prompt+ ' also replace the response format with appropriate html elements, do not include the head, body, or html tags');
            setRecentPrompts(prompt);
            
        }else{
            response = await run(input+ ' also replace the response format with appropriate html elements, do not include the head, body, or html tags');
            setRecentPrompts(input);
            setPrevPrompt((prev) => [...prev, input]);
        }

        // let responseArr = response.split('**');
        // let newResponse;
        

        // for(let i = 0; i < responseArr.length; i++){
        //     if(i === 0 || i%2 !== 1){
        //         newResponse += responseArr[i];
        //     }else {
        //         newResponse += "<b>"+responseArr[i]+"</b>";
        //     }
        // }

        let newResponse2 = response.split('```html')[1].split('```')[0];

        // setResultData(newResponse2);
        // setResultData(newResponse2);
        let newResponseArr = newResponse2.split(' ');
        for(let i = 0; i < newResponseArr.length; i++){
            delayPara(i, newResponseArr[i]+' ');
        }

        setLoading(false);
        setInput('');
     }

    const contextValue = {
        onSent,
        newChat,
        prevPrompt,
        setPrevPrompt,
        recentPrompts,
        setRecentPrompts,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData,
        input,
        setInput
    }

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ContextProvider;