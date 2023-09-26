import { Component } from 'react';

import MarvelServices from '../../services/MarvelServices';
import AppServices from '../../services/AppServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton'
import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';

class CharInfo extends Component {
    marvelServices = new MarvelServices();
    state = {
        char: null,
        loading: false,
        error: false
    }
    

    componentDidMount()  {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.charId !== this.props.charId){
            this.updateChar();
        }
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false});
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onCharLoading = () => {
        this.setState(() => ({loading: true}));
    }

    updateChar = () => {
        const {charId} = this.props;
        if (!charId){
            return;
        }
        this.onCharLoading();
        this.marvelServices
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {
        const {char, loading, error} = this.state;
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

export default CharInfo;