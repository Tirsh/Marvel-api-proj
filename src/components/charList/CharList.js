import { Component } from 'react';

import MarvelServices from '../../services/MarvelServices';
import AppServices from '../../services/AppServices';
import Spinner from '../spinner/Spinner';
import './charList.scss';

class CharList extends Component {
    state = {
        charsData: [],
        selected: null,
        loading: true
    }   

    marvelServices = new MarvelServices();

    onDataLoad = (data) => {
        this.setState({
            charsData: data,
            loading: false
        })
    }

    onCharSelected = (id) => {
        this.setState(() =>  ({
            selected: id
        }))
    }

    componentDidMount(){
        this.onDataUpdate();
    }

    onDataUpdate = () => {
        const offset = Math.floor(Math.random()*300);
        this.onCharLoading();
        this.marvelServices.getAllCharacters(offset)
            .then(this.onDataLoad)
    }

    onCharLoading = () => {
        this.setState(() => ({loading: true}));
    }


    render() {
        const {charsData, selected, loading} = this.state;
        return (
            <div className="char__list">                
                <CharsRecords data={charsData} selected={selected} clickAction={[this.props.onCharSelect, this.onCharSelected]} loading={loading}/>                 
                <button onClick={this.onDataUpdate} className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
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

export default CharList;