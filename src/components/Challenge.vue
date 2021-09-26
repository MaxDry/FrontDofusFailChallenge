<template>
    <section>
        <div class="input-modify">
            <b-field label="Ajouter un challenge">
                <b-input style="margin-right: 30px;" placeholder="nom du challenge" v-model="challengeAdd.title"></b-input>
                <b-numberinput v-model="challengeAdd.score"></b-numberinput>
            </b-field>
            <b-button type="is-success" v-on:click="handleSubmit">Ajouter</b-button>
        </div>
        <div class="table-modify">
            <div>
                <b-table
                    :data="isEmpty ? [] : data"
                    :bordered="isBordered"
                    :striped="isStriped"
                    :narrowed="isNarrowed"
                    :hoverable="isHoverable"
                    :focusable="isFocusable"
                    :mobile-cards="hasMobileCards">

                    <b-table-column field="name" label="name" width="400" :td-attrs="columnTdAttrs" v-slot="props">
                        {{ props.row.title }}
                    </b-table-column>
                    <b-table-column field="Points" label="Points" width="400" :td-attrs="columnTdAttrs" v-slot="props">
                        {{ props.row.score }}
                    </b-table-column>
                    <b-table-column field="Actions" label="Actions" width="700" :td-attrs="columnTdAttrs" v-slot="props">
                        <b-button
                        label="Modifier"
                        type="is-primary"
                        icon-left="pen"
                        class="field btn-challenge"
                        v-on:click="changeModal(props.row)" />
                        <b-button
                        label=""
                        type="is-danger"
                        icon-left="close"
                        class="field"
                        v-on:click="deleteChallenge(props.row.id)" />
                    </b-table-column>

                    <template #empty>
                        <div class="has-text-centered">Aucun challenges</div>
                    </template>
                </b-table>
            </div>
            <div class="modal-player">
                <form action="" v-show="showModal">
                    <div class="modal-card" style="width: auto">
                        <header class="modal-card-head">
                            <p class="modal-card-title">Modifier un challenge</p>
                            <button
                                type="button"
                                class="delete"
                                v-on:click="showModal=false"
                            />
                        </header>
                        <section class="modal-card-body">
                            <b-field label="Title">
                                <b-input
                                    type="Title"
                                    v-model="currentForm.title"
                                    required>
                                </b-input>
                            </b-field>
                             <b-field label="Score">
                                <b-numberinput
                                    type="Score"
                                    v-model="currentForm.score"
                                    required>
                                </b-numberinput>
                            </b-field>
                        </section>
                        <footer class="modal-card-foot">
                            <b-button
                                label="Fermer"
                                v-on:click="showModal=false"
                            />
                            <b-button
                                label="Modifier"
                                type="is-primary" 
                                v-on:click="updateChallenge()"
                            />
                        </footer>
                    </div>
                </form>
            </div>
        </div>
        <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="true"></b-loading>
    </section>
</template>

<script>
    import ChallengeService from "../services/ChallengeService"

    export default {
        data() {
            const data = []
            
            return {
                data,
                isEmpty: false,
                isBordered: false,
                isStriped: false,
                isNarrowed: false,
                isHoverable: false,
                isFocusable: false,
                isLoading: false,
                hasMobileCards: true,
                challengeAdd : {
                    title: "",
                    score: 0
                },
                showModal: false,
                currentForm : {
                    id: "" ,
                    name: "",
                    score: 0
                }
            }
        },
        mounted () {
            this.fetchDatas()
        },
        // watch: {
        //     data: function() {
        //         this.fetchDatas()
        //     }
        // },
        methods: {
            fetchDatas() {
                this.isLoading = true
                const challengeService = new ChallengeService();
                challengeService.getChallenges()
                .then(resp => {
                    this.data = resp,
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
            handleSubmit() {
                const challengeService = new ChallengeService();
                challengeService.postChallenge(this.challengeAdd)
                .then(() => this.fetchDatas())
            },
            deleteChallenge(challengeId) {
                var r = confirm("Press a button!");
                if (r == true) {
                    const challengeService = new ChallengeService();
                    challengeService.deleteChallenge(challengeId)
                    .then(() => this.fetchDatas())
                }
            },
            changeModal(challenge) {
                this.showModal=!this.showModal
                this.currentForm.title = challenge.title
                this.currentForm.score = challenge.score
                this.currentForm.id = challenge.id
            },
            updateChallenge() {
                const challengeService = new ChallengeService();
                challengeService.putChallenge(this.currentForm)
                .then(() => this.fetchDatas())
            }
        },
        filters: {
            dateFormat: (val) => {
            let date = new Date(val);
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
            },
        }
    }
</script>