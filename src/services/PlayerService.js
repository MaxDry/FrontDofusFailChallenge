import axios from "axios";

export default class  PlayerService {
    getPlayers = () => {
        return axios
        .get(process.env.VUE_APP_API_URL + 'players')
        .then(response => {
            const { data } = response;
            return data["hydra:member"];
        } )
    }

    getOnePlayer = (id) => {
        return axios
        .get(process.env.VUE_APP_API_URL + 'players/' + id)
        .then(response => {
            const { data } = response;
            return data;
        } )
    }

    postPlayers = (name) => {
        return axios
        .post(process.env.VUE_APP_API_URL + 'players', {
            "name": name
        })
        .then(response => {
            const { data } = response;
            return data["hydra:member"];
        } )
    }

    deletePlayers = (playerId) => {
        return axios
        .delete(process.env.VUE_APP_API_URL + 'players/' + playerId)
        .then(response => {
            const { data } = response;
            return data["hydra:member"];
        } )
    }

    putPlayers = (playerId, name) => {
        return axios
        .put(process.env.VUE_APP_API_URL + 'players/' + playerId, {
            "name": name
        } )
        .then(response => {
            const { data } = response;
            return data["hydra:member"];
        } )
    }
}