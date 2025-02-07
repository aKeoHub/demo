import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import image1 from '../../images/img_1.png';
import image2 from '../../images/img_2.png';
import image3 from '../../images/img_3.png';
import image4 from '../../images/img_4.png';

//Component for the Single Cards.
function Cards() {
    return (
        <div className='cards'>
            <h1>Check out our Events!</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        <CardItem
                            src={image1}
                            text='EuroFest'
                            label='Event'
                            path='/events'
                        />
                        <CardItem
                            src={image2}
                            text='Fastball Open'
                            label='Event'
                            path='/events'
                        />
                    </ul>
                    <ul className='cards__items'>
                        <CardItem
                            src={image3}
                            text='Color Parade'
                            label='Event'
                            path='/events'
                        />
                        <CardItem
                            src={image4}
                            text='Car Meet'
                            label='Event'
                            path='/events'
                        />
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default Cards;