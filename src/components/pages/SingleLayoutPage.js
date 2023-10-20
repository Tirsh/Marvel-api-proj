import { useParams } from "react-router";
import SingleComic from "../singleItems/SingleComic";
import SingleCharacter from "../singleItems/SingleCharacter";

const SingleLayoutPage = ({char}) => {
    const {id} = useParams();
    return (
        char ? <SingleCharacter id={id}/> : <SingleComic id={id}/>
    );
}

export default SingleLayoutPage;