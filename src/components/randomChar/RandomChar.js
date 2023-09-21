import { Component } from 'react';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelServices from '../../services/MarvelServices';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {

    state = {
        char: {},
        loading: true,
        error: false
    }

    marvelServices = new MarvelServices();

    onCharLoaded = (char) => {
        this.setState({char, loading: false});
    }

    componentDidMount = () => {
        this.updateChar();
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelServices
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    checkDescription = (descr) => {
        if(descr) {
            if (descr.length > 155) {
                return descr.slice(0, 154) + "...";
            }
            return descr;
        } else {
            return "We don't have any information about this character!"
        }
    }

    render() {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char} check={this.checkDescription}/> : null;

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char, check}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    const imgStyles = {objectFit: 'cover'};
    if (thumbnail.search(/image_not_available/) !== -1) {
        imgStyles.objectFit = 'contain';
    }
    return (
        <div className="randomchar__block">
        <img style={imgStyles} src={thumbnail} alt="Random character" className="randomchar__img"/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {check(description)}
            </p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    );
}



export default RandomChar;