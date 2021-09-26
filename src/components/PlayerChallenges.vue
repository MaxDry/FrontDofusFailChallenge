<template>
    <section>
        <h1 style="color: white; font-size: 30px; font-weight:500; padding-bottom: 30px;" >Challenges ratés de {{ player.name }} </h1>
            <div class="input-modify">
                <b-field label="Assigner un challenge">
                        <b-select placeholder="Selectionnez un challenge" v-model="selected">
                            <option
                                v-for="chall in challenges"
                                :value="chall.id"
                                :key="chall.id">
                                {{ chall.title }}
                            </option>
                        </b-select>
                    </b-field>
                <b-button type="is-success" v-on:click="addPlayerChallenge">Ajouter</b-button>
            </div>
            <div>
                <b-table
                    :data="isEmpty ? [] : player.challengesPlayers"
                    :bordered="isBordered"
                    :striped="isStriped"
                    :narrowed="isNarrowed"
                    :hoverable="isHoverable"
                    :focusable="isFocusable"
                    :mobile-cards="hasMobileCards">

                    <b-table-column field="Nom" label="Nom" width="180" :td-attrs="columnTdAttrs" v-slot="props">
                        {{ props.row.challenge.title }}
                    </b-table-column>
                    <b-table-column field="Score" label="Score" width="180" :td-attrs="columnTdAttrs" v-slot="props">
                        {{ props.row.challenge.score }}
                    </b-table-column>
                    <b-table-column field="Date de création" label="Date de création" width="180" :td-attrs="columnTdAttrs" v-slot="props">
                        {{ props.row.challenge.createdAt }}
                    </b-table-column>
                    <b-table-column field="Actions" label="Actions" width="350" :td-attrs="columnTdAttrs" v-slot="props">
                        <b-button
                        label="Supprimer"
                        type="is-danger"
                        icon-left="close"
                        class="field"
                        v-on:click="deletePlayerChallenge(props.row.id)" />
                    </b-table-column>
                    <template #empty>
                        <div class="has-text-centered">Aucun challenges</div>
                    </template>
                </b-table>
            </div>
            <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="true"></b-loading>
    </section>
</template>

<script>
    import PlayerService from "../services/PlayerService"
    import ChallengeService from "../services/ChallengeService"
    import ChallengePlayerService from "../services/ChallengePlayerService"

    export default {
        data() {
            const player = {};
            const challenges = [];
            return {
                player,
                challenges,
                isEmpty: false,
                isBordered: false,
                isStriped: false,
                isNarrowed: false,
                isHoverable: false,
                isFocusable: false,
                isLoading: false,
                hasMobileCards: true,
                selected : ""
            }
        },
        mounted() {
            this.fetchDatas();
            this.fetchChallenges();
        },
        methods: {
            fetchDatas() {
                this.isLoading = true
                const playerService = new PlayerService();
                playerService.getOnePlayer(this.$route.params.playerId)
                .then(resp => {
                    this.player = resp,
                    this.isLoading = false
                })
            },
            fetchChallenges() {
                const challengeService = new ChallengeService();
                challengeService.getChallenges()
                .then(resp => {
                    this.challenges = resp;
                    this.isLoading = false
                })
            },
            dateThAttrs(column) {
                return column.label === 'Date' ? {
                    title: 'This title is sponsored by "th-attrs" prop',
                    class: 'has-text-success'
                } : null
            },
            columnTdAttrs(row, column) {
                if (row.id === 'Total') {
                    if (column.label === 'ID') {
                        return {
                            colspan: 4,
                            class: 'has-text-weight-bold',
                            style: {
                                'text-align': 'left !important'
                            }
                        }
                    } else if (column.label === 'Gender') {
                        return {
                            class: 'has-text-weight-semibold'
                        }
                    } else {
                        return {
                            style: {display: 'none'}
                        }
                    }
                }
                return null
            },
            deletePlayerChallenge(id) {
                var r = confirm("Press a button!");
                if (r == true) {
                    console.log(id)
                    const challengePlayerService = new ChallengePlayerService();
                    challengePlayerService.deletePlayerChallenge(id)
                    .then(() => this.fetchDatas())
                }
            },
            addPlayerChallenge() {
                const challengePlayerService = new ChallengePlayerService();
                challengePlayerService.addPlayerChallenge({
                    player: this.player["@id"],
                    challenge: '/api/challenges/' + this.selected
                })
                .then(() => this.fetchDatas())
            },
        }, 
        filters: {
            dateFormat: (val) => {
            let date = new Date(val);
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
            },
        }
    }
</script>

<style lang="scss">
    select {
        width: 300px;
    }
</style>