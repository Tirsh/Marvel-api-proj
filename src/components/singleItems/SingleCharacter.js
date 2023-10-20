import { Helmet } from 'react-helmet';
import SingleItem from './SingleItem';

const SingleCharacter = ({id}) => {
    return (
        <>
            <Helmet>
            <meta
                name="description"
                content="Page with imformation about comic"
            />
            </Helmet>
            <SingleItem id={id} contentType={"char"}/>
        </>
    );

}

export default SingleCharacter;