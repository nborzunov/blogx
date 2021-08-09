import axios from 'axios';

export async function searchByQuery(type, query, page) {
    return await axios.get(
        `http://localhost:4000/search/${type}?query=${query}&page=${page}`
    );
}
