import React from 'react';
import '../../App.css';
import { DocumentsButton } from '../Button/DocumentsButton';
import { ForumButton } from '../Button/ForumButton';
import './DandFSection.css';


function DandFSection() {
    return (
        <div className='dandf-container'>

            <h1>Documents and Forum</h1>
            <p>See the park documents and chat with other people on the forum!</p>
            <div className='dandf-btns'>
                <DocumentsButton
                    className='bttns'
                    buttonStyle='bttn--outline'
                    buttonSize='bttn--large'
                >
                    DOCUMENTS
                </DocumentsButton>
                <ForumButton
                    className='bttns'
                    buttonStyle='bttn--outline'
                    buttonSize='bttn--large'

                >
                    FORUM
                </ForumButton>
            </div>
        </div>
    );
}

export default DandFSection;