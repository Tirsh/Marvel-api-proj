import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom"; 

const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontSize': '24px', 'marginTop': '30px'}} to="/">Back to main page</Link>
        </div>       
        
    );
}

export default Page404;