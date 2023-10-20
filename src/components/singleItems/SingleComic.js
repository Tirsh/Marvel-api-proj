import { Helmet } from 'react-helmet';

import SingleItem from './SingleItem';

const SingleComic = ({id}) => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with imformation about comic"
                />
            </Helmet>
            <SingleItem id={id} contentType={"comic"}/>
        </>
    );

}

export default SingleComic;