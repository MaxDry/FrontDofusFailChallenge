import axios from "axios";

export default class  ChallengeService {
    getChallenges = () => {
        return axios
        .get(process.env.VUE_APP_API_URL + 'challenges')
        .then(response => {
            const { data } = response;
            return data["hydra:member"];
        } )
    }

    postChallenge = (challenge) => {
        return axios
        .post(process.env.VUE_APP_API_URL + 'challenges', {
            "title": challenge.title,
            "score": challenge.score
        })
        .then(response => {
            const { data } = response;
            return data["hydra:member"];
        } )
    }

    deleteChallenge = (challengeId) => {
        return axios
        .delete(process.env.VUE_APP_API_URL + 'challenges/' + challengeId)
        .then(response => {
            const { data } = response;
            return data["hydra:member"];
        } )
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