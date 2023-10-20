import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './singleItem.scss';
import setContent from '../../utils/setContent';
import useMarvelServices from '../../services/MarvelServices';

const SingleItem = ({id, contentType}) => {
    const {getCharacter, getComic, clearError, setProcess, process} = useMarvelServices();
    const [item, setItem] = useState(null);
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    useEffect(()=>{
        loadItem();
    }, [])

    const loadItem = () => {
        clearError();
        switch (contentType){
            case "comic":
                getComic(id)
                .then(setItem)
                .then(() => setProcess('confirmed'));
                break;
            case "char":
                getCharacter(id)
                .then(setItem)
                .then(() => setProcess('confirmed'));
                break;
            default:
                throw new Error("Wrong value") 
        }
    }
    
    return (
        <div className="single-item">
            {setContent(process, () => <View data={item} contentType={contentType}/>)}      
            <div onClick={goBack} className="single-item__back">Back to all</div>
        </div>
    )
}

const View = ({data, contentType}) => {
    return (
        <>
            <Helmet>
                <title>{data.title}</title>
            </Helmet>
            <img src={data.thumbnail} alt={data.title} className="single-item__img"/>
            <div className="single-item__info">
                <h2 className="single-item__name">{data.title}</h2>
                <p className="single-item__descr">{data.description}</p>
                {contentType === "comic" ? (<>
                    <p className="single-item__descr">{data.pages ? `${data.pages} pages` : 'No info'}</p>
                    <p className="single-item__descr">{`Language: ${data.lang ? data.lang : 'No info'}`}</p>
                    <div className="single-item__price">{data.price ? `${data.price} $`: 'No info'}</div>
                    </>
                ) : null}

            </div>
        </>
    );
}

export default SingleItem;