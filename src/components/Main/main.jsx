import React from 'react';
import './main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';
const Main = () => {
    const targetRef = React.useRef(null);
    const [ extended, setExtended ] = React.useState(false);

    const { 
        onSent,
        recentPrompts,
        showResult,
        loading,
        resultData,
        setInput,
        input,
     } = React.useContext(Context);

    React.useEffect(() => {

      }, []);

    //  console.log('resultData', resultData)

    return (
        <div className='main' ref={targetRef}>
            <div className='header'>
                <img className='menu' onClick={() => setExtended((prevState) => !prevState)} src={assets.menu_icon} alt='menu_icon' />
                <div className='nav'>
                    <p className='logo'>Gemini</p>
                    <img className='profile' src={assets.user_icon} alt='gemini' />
                </div>
            </div>

            <div className='main-container'>
    
                {!showResult ? 
                    <>
                        <div className="greet">
                            <p><span>Hello, Dev..</span></p>
                            <p>How can i help you today</p>
                        </div>
                        <div className="cards">
                            {[
                                {text: 'Suggest beautiful places to on an upcoming road trip', icon: assets.compass_icon, alt: 'compass_icon'},
                                {text: 'Briefly summarize this concept: urban planning', icon: assets.message_icon, alt: 'message_icon'},
                                {text: 'Brainstorm team building activities for our work retreat', icon: assets.bulb_icon, alt: 'bulb_icon'},
                                {text: 'Improve the readability of this code', icon: assets.code_icon, alt: 'code_icon'},
                            ].map( (item,index) => {
                                return (
                                    <div className="card" key={index}>
                                        <p>{item.text}</p>
                                        <img src={item.icon} alt={item.alt + ' image'} />
                                    </div>
                                )
                            })}
                        </div>
                    </>

                : <div className='result'> 
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p>{recentPrompts}</p>
                    </div>
                    {/*  */}
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="" />
                        {loading ? 
                            <div className="loader">
                                <hr />
                                <hr />
                                <hr />
                            </div> 
                        : <p dangerouslySetInnerHTML={{__html: resultData}}></p> }
                        
                    </div>
                    
                </div>}                
            </div>
            {/*  */}
            <div className="main-bottom">
                    <div className="search-box">
                        <input type="text" onChange={(e) => setInput(e.target.value)} value={input} placeholder='Enter a prompt here...' />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            { input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
                        </div>
                    </div>

                    <p className="bottom-info">
                        Gemini may display inaccurate information, so double-check its responses. Please do not use Gemini as a primary source of information. Your privacy and gemini apps.
                    </p>
            </div>
        </div>
    );
};

export default Main;
// USEEFFECT
// if (!targetRef.current) return; // Guard clause: If the ref isn't set yet, do nothing
        
// const observer = new MutationObserver((mutations) => {
//   mutations.forEach((mutation) => {
//     // Handle mutations here
//     if (mutation.type === 'childList') {
//     //   console.log('Child nodes changed:', mutation);

//         if(mutation.addedNodes.length === 2  ){
//             // Example with querySelector
//             const cssLink2 = document.querySelector('link[href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css"]');
//             if (cssLink2) {
//                 reloadCSS(cssLink2);
//             }
//         }

//       // Example: Check if a specific class was added
//       mutation.addedNodes.forEach((node) => {
//         if (node.classList && node.classList.contains('my-class')) {
//         //   console.log('Element with class "my-class" added!');
//         }
//       })
//     } else if (mutation.type === 'attributes') {
//     //   console.log('Attribute changed:', mutation);
//     }
//   });
// });

// const config = {
//   childList: true, // Observe additions/removals of child nodes
//   attributes: true, // Observe attribute changes
//   subtree: true, // Observe all changes within the subtree
// };

// observer.observe(targetRef.current, config);

// function reloadCSS(link) {
//     console.log('css reloaded')
//     const href = link.href;
//     link.href = ''; // Temporarily set to empty to force reload
//     link.href = href; // Set back to original href
//   }
  
  

// // Cleanup function: Important to disconnect the observer
// return () => {
//   observer.disconnect();
// };