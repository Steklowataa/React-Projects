import './Card.css';
import Button from '../Button/Button';
import { useState, useRef } from 'react';

export default function Card() {
    const [cards, setCards] = useState([]);
    const [counter, setCounter] = useState(1);
    const input = useRef();

    function goLower(id) {
        if (id < cards.length-1) {
            const newTask = [...cards];
            [newTask[id+1], newTask[id]] = [newTask[id], newTask[id+1]];
            setCards(newTask);
        }
    }

    function goUpper(id) {
        if (id > 0) {
            const newTask = [...cards];
            [newTask[id-1], newTask[id]] = [newTask[id], newTask[id-1]];
            setCards(newTask);
        }
    }

    function handle(event) {
        if (event.key === 'Enter') {
            const newCard = {
                id: counter,
                text: input.current.value,
                visible: true
            };
            setCards([...cards, newCard]);
            setCounter(counter + 1);
            input.current.value = ''; // Clear the input field after adding the card
        }
    }

    function hideCard(id) {
        setCards(cards.map(card => card.id === id ? { ...card, visible: false } : card));
    }

    return (
        <div className="container">
            <input type="text" className='control' onKeyDown={handle} ref={input} placeholder="Add a task" />
            {cards.map((card, index) => (
                card.visible && (
                    <section key={card.id} className='card'>
                        <h6>
                            <strong>{card.text}</strong>
                        </h6>
                        <Button className="button" onClick={() => goLower(index)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">    <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg></Button>
                        <Button className="button" onClick={() => goUpper(index)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg></Button>
                        <Button className="button" onClick={() => hideCard(card.id)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg></Button>
                    </section>
                )
            ))}
        </div>
    );
}
