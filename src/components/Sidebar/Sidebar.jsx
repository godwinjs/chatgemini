import React from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Sidebar = () => {
    const [ extended, setExtended ] = React.useState(true);
    const { onSent, newChat, prevPrompt, setRecentPrompts } = React.useContext(Context);

    const loadPrompt = async (prompt) => {
        // td: use db or local storage to get prev prompt
        await setRecentPrompts(prompt);
        await onSent(prompt);
    }

    return (
        <div className={`sidebar ${extended ? '' : 'extended'}`}>
            {/*  */}
            <div className='top'>
                <img className='menu' onClick={() => setExtended((prevState) => !prevState)} src={assets.menu_icon} alt='menu_icon' />

                <div onClick={() => newChat()} className={'new-chat '+ (extended ? 'new-chat-ext' : '')}>
                    <img className='plus' src={assets.plus_icon} alt='plus_icon' />
                    <p className={'text '+ (extended ? 'show' : '')}>New Chat</p>
                </div>

                {extended ? <div className='recent'>
                    <p className="recent-title">Recent</p>
                    { prevPrompt.map( (item,index) => {
                        return (
                            <div onClick={() => loadPrompt(item)} className={`recent-entry ${extended ? 'recent-entry-ext': null}`} key={index}>
                                <img className='user' src={assets.user_icon} alt='user_icon' />
                                {/* <div className="recent-info"> */}
                                    <p className="name">{item.slice(0, 18)}...</p>
                                {/* </div> */}
                            </div>
                        )
                    })}
                </div> : null}
                

            </div>

            {/*  */}
            <div className='bottom'>
                {[
                    {icon: assets.question_icon, text: 'Help'},
                    {icon: assets.history_icon, text: 'Activity'},
                    {icon: assets.setting_icon, text: 'Settings'},
                ].map( (item,index) => {
                    return (
                        <div className={`buttom-item recent-entry ${extended ? 'recent-entry-ext': null}`} key={index}>
                            <img className={item.text.toLocaleLowerCase()} src={item.icon} alt={item.text} />
                            <p className={'text '+ (extended ? 'show' : '')}>{item.text}</p>
                        </div>
                    )
                })}

            </div>

        </div>
    );
};

export default Sidebar;