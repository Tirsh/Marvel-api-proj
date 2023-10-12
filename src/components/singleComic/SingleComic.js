import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './singleComic.scss';
import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const SingleComic = ({id}) => {
    const {loading, error, getComic, clearError} = useMarvelServices();
    const [comic, setComic] = useState(null);

    useEffect(()=>{
        loadComic();
    }, [])

    const loadComic = () => {
        clearError()
        getComic(id)
            .then(setComic);
    }
    // const onComicLoaded = (comic) => {
    //     setComic(comic);
    // }
    const content = comic ?  <View comic={comic}/> : null;
    const spinner = loading && !error ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    console.log(comic);
    
    return (
        <div className="single-comic">
            {spinner}
            {errorMessage}
            {content}           
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

const View = ({comic}) => {
    return (
        <>
            <img src={comic.thumbnail} alt={comic.title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{comic.title}</h2>
                <p className="single-comic__descr">{comic.description}</p>
                <p className="single-comic__descr">{`${comic.pages} pages`}</p>
                <p className="single-comic__descr">{`Language: ${comic.lang ? comic.lang : 'no info'}`}</p>
                <div className="single-comic__price">{`${comic.price}$`}</div>
            </div>
        </>
    );
}

export default SingleComic;