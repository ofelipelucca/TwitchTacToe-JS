import '../styles/Site.css'
import '../styles/Home.css'

import { FiSearch } from 'react-icons/fi'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { InstanceMaster } from '../InstanceMaster.js';
import { TMIconnect } from '../TMIconnect';
import { MessageHandler } from '../MessageHandler.js';

const instanceMaster = new InstanceMaster();
const messageHandler = new MessageHandler(instanceMaster);
const twitchChat = new TMIconnect(messageHandler); 

const HomePage = () => {

    const [input, setInput] = useState('');
    const navigate = useNavigate();

    function handleSearch() {
        if (input === '') alert('Insira o canal que você deseja conectar!');
        else {
            
            twitchChat.definirIsConnectedCallback(() => {
                navigate('/connected');
            });
            
            twitchChat.clientConnect(input);
        }
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

    if (twitchChat.isConnected) twitchChat.clientDisconnect();

    return (
        <div className='container'>

            <h1>!TWITCHTACTOE</h1>

            <div className="channelControls">

                    <input className='channelInput' 
                    type="text" 
                    placeholder='Insira seu canal...'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    />

                    <Link to="/connected">
                        <button className='buttonSearch'
                        onClick={handleSearch}>
                        
                            <FiSearch size={25} color='#FFF'/>
                        </button>
                    </Link>
            </div>
        </div>
    )
}

export default HomePage;