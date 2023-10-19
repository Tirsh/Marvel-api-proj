import useMarvelServices from '../../services/MarvelServices';
import SingleItem from './SingleItem';

const SingleComic = ({id}) => {
    const services = useMarvelServices();
    return (
        <SingleItem id={id} getItem={services.getComic} services={services}/>
    );

}

export default SingleComic;