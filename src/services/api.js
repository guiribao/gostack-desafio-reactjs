import axios from "axios";

export const gitApi = axios.create({
  baseURL: "https://api.github.com",
})
export const ourApi = axios.create({
  baseURL: "http://localhost:3333",
});
