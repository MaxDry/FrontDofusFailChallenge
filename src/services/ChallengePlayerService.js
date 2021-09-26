import axios from "axios";

export default class  ChallengePlayerService {
    getChallengesPlayers = () => {
        return axios
        .get(process.env.VUE_APP_API_URL + 'challenges')
        .then(response => {
            const { data } = response;
            return data["hydra:member"];
        } )
    }

    addPlayerChallenge = (body) => {
        return axios
        .post(process.env.VUE_APP_API_URL + 'challenges_players', body)
        .then(response => response)
        
    }

    deletePlayerChallenge = (id) => {
        return axios
        .delete(process.env.VUE_APP_API_URL + 'challenges_players/' + id)
        .then(response => response )
    }

    putChallenge = (challenge) => {
        return axios
        .put(process.env.VUE_APP_API_URL + 'challenges/' + challenge.id, {
            "title": challenge.title,
            "score": challenge.score
        } )
        .then(response => {
            const { data } = response;
            return data["hydra:member"];
        } )
    }
}