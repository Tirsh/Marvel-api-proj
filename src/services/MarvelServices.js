import { useHttp } from "../hooks/http.hook";

const useMarvelServices = () => {

    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apikey = 'apikey=5b914e3fbef97f81d2a62f14f887c53d';

    const getAllCharacters = async (offset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apikey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getAllComic = async (offset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apikey}`);
        return res.data.results.map(_transformComic);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apikey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apikey}`);
        return _transformComic(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&limit=2&${_apikey}`);
        if (res.data.total === 0 ) {
            return null
        }
        return _transformCharacter(res.data.results[0]);
    }

    const _transformDescription = (descr) => {
        if(!descr) {
            return "We don't have any information about this character!"
        }
        return descr;
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: _transformDescription(char.description),
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            stories: char.comics.items
        }
    }

    const _transformComic = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description,
            pages: comic.pageCount,
            lang: comic.textObjects.language,
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            price: comic.prices[0].price
        }
    }

    const editPictureStyles = (pictureUrl) => {
        if (!pictureUrl) {
            return null;
        }
        const imgStyles = {objectFit: 'cover'};
        if (pictureUrl.search(/image_not_available/) !== -1) {
            imgStyles.objectFit = 'contain';
        }
        return imgStyles;
    }

    return {loading, error, getAllCharacters, getCharacter, getCharacterByName, getAllComic, getComic, editPictureStyles, clearError}
}

export default useMarvelServices;