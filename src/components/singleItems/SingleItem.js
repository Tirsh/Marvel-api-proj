import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './singleItem.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const SingleItem = ({id, getItem, services}) => {
    const {loading, error, clearError} = services;
    const [item, setItem] = useState(null);
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    useEffect(()=>{
        loadItem();
    }, [])

    const loadItem = () => {
        clearError()
        getItem(id)
            .then(setItem);
    }
    
    const content = item ?  <View item={item}/> : null;
    const spinner = loading && !error ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    
    return (
        <div className="single-item">
            {spinner}
            {errorMessage}
            {content}           
            <div onClick={goBack} className="single-item__back">Back to all</div>
        </div>
    )
}

const View = ({item}) => {
    console.log(item);
    return (
        <>
                <img src={item.thumbnail} alt={item.name} className="single-item__img"/>
                <div className="single-item__info">
                    <h2 className="single-item__name">{item.name}</h2>
                    {item.title ? <h2 className="single-item__name">{item.title}</h2> : null}
                    <p className="single-item__descr">{item.description}</p>
                    {item.pages ? <p className="single-item__descr">{`${item.pages} pages`}</p> : null}
                    {item.lang ? <p className="single-item__descr">{`Language: ${item.lang ? item.lang : 'no info'}`}</p> : null}
                    {item.price ? <div className="single-item__price">{`${item.price}$`}</div> : null}
                </div>
        </>
    );
}

export default SingleItem;