import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'

import useMarvelServices from '../../services/MarvelServices';
import setContent from '../../utils/setContent';
import './charInfo.scss';
import { Link } from 'react-router-dom';

const CharInfo = (props) => {
    const {getCharacter, setProcess, process} = useMarvelServices();
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
            .then(() => setProcess('confirmed'))
    }

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )

}

const View = ({data}) => {
    const {title, description, thumbnail, homepage, wiki, stories} = data;
    const {editPictureStyles} = useMarvelServices();
    return (
    <>
            <div className="char__basics">
                <img style={editPictureStyles(thumbnail)} src={thumbnail} alt={title}/>
                <div>
                    <div className="char__info-name">{title}</div>
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
                            <Link to={`/comics/${item.resourceURI.match(/\/\d+/)[0].substring(1)}`}>
                                {item.name}
                            </Link>
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