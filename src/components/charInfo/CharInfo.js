import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'

import MarvelServices from '../../services/MarvelServices';
import AppServices from '../../services/AppServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton'
import './charInfo.scss';

const CharInfo = (props) => {
    const marvelServices = new MarvelServices();
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);    

    useEffect(() => {
        updateChar();
    }, []);

    useEffect(() => {
        updateChar();
    }, [props.charId]);

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(() => false);
    }

    const onError = () => {
        setLoading(() => false);
        setError(() => true);
    }

    const onCharLoading = () => {
        setLoading(() => true);
    }

    const updateChar = () => {
        const {charId} = props;
        if (!charId){
            return;
        }
        onCharLoading();
        marvelServices
            .getCharacter(charId)
            .then(onCharLoaded)
            .catch(onError)
    }

    const content = char ? <View char={char}/> : null;
    const sceleton = !loading && !error && !char ? <Skeleton/> : null;
    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    return (
        <div className="char__info">
            {content}
            {sceleton}
            {spinner}
            {errorMessage}
        </div>
    )

}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, stories} = char;
    return (
    <>
            <div className="char__basics">
                <img style={AppServices.editPictureStyles(thumbnail)} src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {stories.length === 0 ? "We don't have information about this character's stories!" : null}
                { 
                    stories.map((item, i) => {
                        if (i > 9) {
                            return
                        }
                        return (
                        <li key={i} className="char__comics-item">
                            {item.name}
                        </li>
                    )})
                }
            </ul>        
        </>
    );

}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;