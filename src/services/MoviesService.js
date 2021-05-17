import axios from 'axios';

export async function findMoviesByTitl(title) {
  const urlTitle = 'https://imdb-api.com/en/API/SearchTitle/k_9hxi2rcg/';

  await axios.get('https://imdb-api.com/en/API/SearchTitle/k_9hxi2rcg/Inception')
    .then((response) => {
        console.log(response.data);
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
    })
}
export const findMoviesByTitle = async () => {
    try {
        const resp = await axios.get('https://imdb-api.com/en/API/SearchTitle/k_9hxi2rcg/Inception')
        const result = await resp.json();
        console.log(result);
    } catch (err) {
        console.error(err);
    }

  const urlTitle = 'https://imdb-api.com/en/API/SearchTitle/k_9hxi2rcg/';

}