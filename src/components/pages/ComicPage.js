import { useParams } from "react-router";
import SingleComic from "../singleComic/SingleComic";

const ComicPage = () => {
    const {comicId} = useParams();
    return (
        <SingleComic id={comicId}/>
    );
}

export default ComicPage;