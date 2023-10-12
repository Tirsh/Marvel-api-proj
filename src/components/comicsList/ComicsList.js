import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';


const ComicsList = () => {
    const {loading, error, getAllComic} = useMarvelServices();
    const [comicList, setComicList] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);

    useEffect(() => {
        onDataUpdate(false);
    }, []);

    const onDataUpdate = (state) => {
        setDataLoading(state);
        getAllComic(Math.floor(Math.random() * 57000))
            .then(onDataLoad);
    }

    const onDataLoad = (data) => {
        setComicList(comicList => ( [...comicList, ...data]))
        setDataLoading(false);
    }

    const spinner = loading && !dataLoading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            <View comics={comicList}/>
            <button disabled={dataLoading} onClick={() => onDataUpdate(true)} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const View = (props) => {
    return (
        <ul className="comics__grid">
            {props.comics.map(comic => (
                <li key={comic.id} className="comics__item">
                    <Link to={`/comics/${comic.id}`}>
                        <img src={comic.thumbnail} alt={comic.title} className="comics__item-img"/>
                        <div className="comics__item-name">{comic.title}</div>
                        <div className="comics__item-price">{comic.price ? comic.price + ' $': 'NOT AVAILABLE'}</div>
                    </Link>
                </li>
            ))}                
        </ul>
    )
}

export default ComicsList;