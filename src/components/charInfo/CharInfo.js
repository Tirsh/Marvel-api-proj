import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'

import useMarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton'
import './charInfo.scss';

const CharInfo = (props) => {
    const {loading, error, getCharacter} = useMarvelServices();
    const [char, setChar] = useState(null);

    useEffect(() => {
        updateChar();
    }, []);

    useEffect(() => {
        updateChar();
    }, [props.charId]);

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        const {charId} = props;
        if (!charId){
            return;
        }
        getCharacter(charId)
            .then(onCharLoaded)
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
    const {editPictureStyles} = useMarvelServices();
    return (
    <>
            <div className="char__basics">
                <img style={editPictureStyles(thumbnail)} src={thumbnail} alt={name}/>
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