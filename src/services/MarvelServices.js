

class MarvelServices {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apikey = 'apikey=5b914e3fbef97f81d2a62f14f887c53d';
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=250&${this._apikey}`);
    }

    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?${this._apikey}`);
    }
}

export default MarvelServices;