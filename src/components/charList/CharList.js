import { useEffect, useState } from 'react';
import PropTypes from "prop-types"

import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import './charList.scss';

const CharList = (props) => {
    const [charsData, setCharsData] = useState([]);
    const [selected, setSelected] = useState(null);
    const [charsAdding, setCharsAdding] = useState(false);
    const {loading, getAllCharacters} = useMarvelServices();


    const onDataLoad = (data) => {
        setCharsData(charsData => [...charsData, ...data]);
        setCharsAdding(() => false);
    };

    const onCharSelected = (id) => {
        setSelected(id);
    };

    useEffect(() => {
        onDataUpdate(true);
    }, []);

    const onDataUpdate = (initial) => {
        const offset = Math.floor(Math.random()*300);
        initial ? setCharsAdding(false): setCharsAdding(true);
        getAllCharacters(offset)
            .then(onDataLoad)
    }

    return (
        <div className="char__list">                
            <CharsRecords data={charsData} selected={selected} clickAction={[props.onCharSelect, onCharSelected]} loading={loading} adding={charsAdding}/>                 
            <button disabled={charsAdding} onClick={() => onDataUpdate(false)} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

const CharsRecords = ({data, selected, clickAction, loading, adding}) => {
    const { editPictureStyles } = useMarvelServices();
    if (loading && !adding) {
        return (<Spinner/>);
    }
    
    const chars = data.map((item) => {
        const clazz = selected === item.id ? "char__item char__item_selected" : "char__item";
        return (
                <li key={item.id} className={clazz} onClick={() => {clickAction.forEach(func => func(item.id)) }}>
                    <img style={editPictureStyles(item.thumbnail)} src={item.thumbnail} alt={`c${item.id}`}/>
                    <div className="char__name">{item.name}</div>
                </li>
        )
    });
    return (
            <ul className="char__grid">
                {chars}
            </ul>
        )
}

CharList.propTypes = {
    onCharSelect: PropTypes.func
}

export default CharList;