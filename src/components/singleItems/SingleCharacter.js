import useMarvelServices from '../../services/MarvelServices';
import SingleItem from './SingleItem';

const SingleCharacter = ({id}) => {
    const services = useMarvelServices();
    return (
        <SingleItem id={id} getItem={services.getCharacter} services={services}/>
    );

}

export default SingleCharacter;