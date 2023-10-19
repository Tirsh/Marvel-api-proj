import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import useMarvelServices from '../../services/MarvelServices';
import './findChar.scss';

const FindChar = () => {
    const [findedChar, setFindedChar] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const { getCharacterByName } = useMarvelServices(); 
    const onCharSearch = (value) => {
        getCharacterByName(value.char)
            .then(result => result ?  setFindedChar(result) : setNotFound(true))
    }

    return (
        <div className="find-char">
            <Formik                
                initialValues={{char: ''}}
                validationSchema = {Yup.object({
                    char: Yup.string()
                        .required("This field is required")
                })}
                onSubmit={(values, actions) => {
                    onCharSearch(values);
                    actions.resetForm();
                }}                
            >
                <Form>
                    <label className='find-char__label' htmlFor="char">Or find a character by name:</label>
                    <Field onBlur={()=>{setNotFound(false)}} className='find-char__input' type="text" name="char" placeholder="Enter name"/>
                    <button className='button button__main find-char__btn' type="submit">
                        <div className="inner">FIND</div>
                    </button>
                    <ErrorMessage className='find-char__message find-char__message_error' name="char" component='div'/>
                </Form>
            </Formik>
            {findedChar ? <VisitPage char={findedChar}/> : null}
            {notFound ? (<div className="find-char__message find-char__message_error">The character was not found. Check the name and try again</div>) : null}
        </div>
    );
}

const VisitPage = ({char}) => {
    return (
        <div className="find-char__visit">
            <div className="find-char__message find-char__message_success">{`There is! Visit ${char.name} page?`}</div>
            <Link to={`/character/${char.id}`} className='button button__secondary' type="submit">
                        <div className="inner">TO PAGE</div>
            </Link>
        </div>
    );

}

export default FindChar;
