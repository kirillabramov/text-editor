import axios from "axios";

const API_URL = "https://api.datamuse.com/words?ml=";

const fetchWords = word => {
  const url = `${API_URL}${word}`;
  return axios(url, res => {
    return res.json();
  })
    .then(res => {
      return res.data.filter(item => item.tags.includes("syn"));
    })
    .catch(err => alert("there is no synonyms for that word found :("));
};

export { fetchWords };
