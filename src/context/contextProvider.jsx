import React from "react";
import PropTypes from "prop-types";
import run from "../config/gemini";
import hljs from 'highlight.js';
import { Context } from "./context";

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
            let p = `also replace the response format with appropriate html elements, 
                do not include the head, body, or html tags.
                when there is a code block in the response, use pre and code tags and a class name of language-[replace with the language of the code]`
                // replace script tags with code tags inside pre tags and use 
                // prismjs to highlight the code, the class name for the pre tag 
                // should be language-[replace with the language of the code]`;

            response = await run(input+ p);
            setRecentPrompts(input);
            setPrevPrompt((prev) => [...prev, input]);
        }
        

        // for(let i = 0; i < responseArr.length; i++){
        //     if(i === 0 || i%2 !== 1){
        //         newResponse += responseArr[i];
        //     }else {
        //         newResponse += "<b>"+responseArr[i]+"</b>";
        //     }
        // }
        
        let newResponse2 = newResponse2.includes('```html') ? response.split('```html')[1].split('```')[0] : response;
        let formattedResponse = newResponse2;
        
        if(newResponse2.includes('<code class="language')){
            let newResponse3 = newResponse2.replace(/<code class="language-/g, 'x_split_x__start__x_split_x');
            let newResponse4 = newResponse3.replace(/<\/code>/g, 'x_split_x__end__x_split_x')
            formattedResponse = newResponse4.split('x_split_x')

            const htmlEntities = {
                "&lt;": "<",
                "&gt;": ">",
                "&amp;": "&",
                "&quot;": '"',
                "&apos;": "'",
            };

            for (let i = 0; i < formattedResponse.length; i++){
                let html = '';
    
                if(formattedResponse[i] === '__start__'){
                    let code = formattedResponse[i+1].split('');
                    let language = '';
                    let codeBlock = '';
    
                    for(let j = 0; j < code.length; j++){
                        if(code[j] === '"'){

                            codeBlock = code.slice(j+2).join('').replace(/&lt;|&gt;|&amp;|&quot;|&apos;/g, match => htmlEntities[match]);
                            break;
                        }else{
                            language += code[j];
                        }
                    }
                    
                    console.log(language, codeBlock);
    
                    html = hljs.highlight(
                        codeBlock,
                        { language: language }
                      ).value;
                    //   console.log(html)
                      
                    formattedResponse[i+1] = `<code class="language-${language}">` + html + "</code>";
                }
            }
        }
        console.log(formattedResponse)

        let newResponseArr = formattedResponse.join('').replace(/__start__/g, '').replace(/__end__/g, '').split(' ');
        

        // setResultData(newResponse2);
        // setResultData(newResponse2);
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
