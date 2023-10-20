import { useEffect, useState, useRef } from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import PropTypes from "prop-types"

import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';

const CharList = (props) => {
    const [charsData, setCharsData] = useState([]);
    const [charsAdding, setCharsAdding] = useState(false);
    const {getAllCharacters, editPictureStyles, process, setProcess} = useMarvelServices();
    const itemsRefs = useRef([]);

    const setContent = (process, Component) => {
        switch (process) {
            case 'waiting':
                return <Spinner/>;
            case 'loading':
                return charsAdding ? <Component/> : <Spinner/>;
            case 'error':
                return <ErrorMessage/>
            case 'confirmed':
                return <Component/>
            default:
                throw new Error('Unexpected process state');
        }
    }

    const onDataLoad = (data) => {
        setCharsData(charsData => [...charsData, ...data]);
        setCharsAdding(() => false);
    };

    const focusOnItem = (id) => {
        itemsRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemsRefs.current[id].classList.add('char__item_selected');
        itemsRefs.current[id].focus();
    };

    useEffect(() => {
        onDataUpdate(true);
    }, []);

    const onDataUpdate = (initial) => {
        const offset = Math.floor(Math.random()*300);
        initial ? setCharsAdding(false): setCharsAdding(true);
        getAllCharacters(offset)
            .then(onDataLoad)
            .then(() => setProcess('confirmed'))
    }

    const renderItems = (data) => {      
        const chars = data.map((item, i) => {
            return (
                    <CSSTransition 
                        key={item.id}
                        timeout={500}
                        classNames="char__item">
                        <li 
                            tabIndex={0}
                            ref={el => itemsRefs.current[i] = el} 
                            className='char__item'
                            onClick={() => {
                                props.onCharSelect(item.id);
                                focusOnItem(i)
                            }}
                            onKeyDown={(e) => {
                                if (e.key === ' ' || e.key === "Enter") {
                                    props.onCharSelect(item.id);
                                    focusOnItem(i);
                                }
                            }}>
                            <img style={editPictureStyles(item.thumbnail)} src={item.thumbnail} alt={`c${item.id}`}/>
                            <div className="char__name">{item.title}</div>
                        </li>
                    </CSSTransition>
            )
        });
        return (
                <ul className="char__grid">
                    <TransitionGroup component={null}>
                        {chars}
                    </TransitionGroup>                    
                </ul>
            )
    }

    return (
        <div className="char__list">                
            {setContent(process, () => renderItems(charsData))}               
            <button disabled={charsAdding} onClick={() => onDataUpdate(false)} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


CharList.propTypes = {
    onCharSelect: PropTypes.func
}

export default CharList;