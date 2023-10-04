import { useEffect, useState } from 'react';
import PropTypes from "prop-types"

import MarvelServices from '../../services/MarvelServices';
import AppServices from '../../services/AppServices';
import Spinner from '../spinner/Spinner';
import './charList.scss';

const CharList = (props) => {
    const [charsData, setCharsData] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const [charsAdding, setCharsAdding] = useState(false);

    const marvelServices = new MarvelServices();

    const onDataLoad = (data) => {
        setCharsData(charsData => [...charsData, ...data]);
        setLoading(() => false);
        setCharsAdding(() => false);
    };

    const onCharSelected = (id) => {
        setSelected(id);
    };

    useEffect(() => {
        onDataUpdate();
    }, []);

    const onDataUpdate = () => {
        const offset = Math.floor(Math.random()*300);
        onCharLoading();
        marvelServices.getAllCharacters(offset)
            .then(onDataLoad)
    }

    const onCharLoading = () => {
        setCharsAdding(() => true);
    }


    return (
        <div className="char__list">                
            <CharsRecords data={charsData} selected={selected} clickAction={[props.onCharSelect, onCharSelected]} loading={loading}/>                 
            <button disabled={charsAdding} onClick={onDataUpdate} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

const CharsRecords = ({data, selected, clickAction, loading}) => {
    if (loading) {
        return (<Spinner/>);
    }
    
    const chars = data.map((item) => {
        const clazz = selected === item.id ? "char__item char__item_selected" : "char__item";
        return (
                <li key={item.id} className={clazz} onClick={() => {clickAction.forEach(func => func(item.id)) }}>
                    <img style={AppServices.editPictureStyles(item.thumbnail)} src={item.thumbnail} alt={`c${item.id}`}/>
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