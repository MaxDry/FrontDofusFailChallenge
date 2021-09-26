<template>
    <section>
        <div class="input-modify">
            <b-field label="Ajouter un nouveau joueur">
                <b-input v-model="nameAdd" placeholder="nom du joueur"></b-input>
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

                    <b-table-column field="name" label="name" width="700" :td-attrs="columnTdAttrs" v-slot="props">
                        {{ props.row.name }}
                        <b-button class="button-pen" v-on:click="changeModal(props.row)">
                            <b-icon
                                icon="pen"
                                size="is-small"
                                >
                            </b-icon>
                        </b-button>
                    </b-table-column>
                    <b-table-column field="Date de création" label="Date de création" width="400" :td-attrs="columnTdAttrs" v-slot="props">
                        {{ props.row.createdAt | dateFormat() }}
                    </b-table-column>
                    <b-table-column field="Nb de challs ratés" label="Nb de challs ratés" width="300" :td-attrs="columnTdAttrs" v-slot="props">
                        {{ props.row.challengesPlayers.length }}
                    </b-table-column>
                    <b-table-column field="Actions" label="Actions" width="700" :td-attrs="columnTdAttrs" v-slot="props">
                        <router-link 
                            :to="{
                                path: '/player/'+ props.row.id + '/challenges'
                            }">
                            <b-button
                            label="Challenges"
                            type="is-default"
                            icon-left="clipboard-check-outline"
                            class="field btn-challenge"/>
                        </router-link>
                        <b-button
                        label=""
                        type="is-danger"
                        icon-left="close"
                        class="field"
                        v-on:click="deletePlayer(props.row.id)" />
                    </b-table-column>

                    <template #empty>
                        <div class="has-text-centered">Aucun joueurs</div>
                    </template>
                </b-table>
            </div>
            <div class="modal-player">
                <form action="" v-show="showModal">
                    <div class="modal-card" style="width: auto">
                        <header class="modal-card-head">
                            <p class="modal-card-title">Modifier un joueur</p>
                            <button
                                type="button"
                                class="delete"
                                v-on:click="showModal=false"
                            />
                        </header>
                        <section class="modal-card-body">
                            <b-field label="Pseudo">
                                <b-input
                                    type="Pseudo"
                                    v-model="currentForm.name"
                                    required>
                                </b-input>
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
                                v-on:click="updatePlayer()"
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
    import PlayerService from "../services/PlayerService"

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
                nameAdd: "",
                showModal: false,
                currentForm : {
                    id: "" ,
                    name: ""
                }
            }
        },
        mounted () {
            this.fetchDatas()
        },
        methods: {
            fetchDatas() {
                this.isLoading = true
                const playerService = new PlayerService();
                playerService.getPlayers()
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
                const playerService = new PlayerService();
                playerService.postPlayers(this.nameAdd)
                .then(() => this.fetchDatas())
            },
            deletePlayer(playerId) {
                var r = confirm("Supprimer le joueur ?");
                if (r == true) {
                    const playerService = new PlayerService();
                    playerService.deletePlayers(playerId)
                    .then(() => this.fetchDatas())
                }
            },
            changeModal(player) {
                this.showModal= !this.showModal
                this.currentForm.name = player.name
                this.currentForm.id = player.id
            },
            updatePlayer() {
                const playerService = new PlayerService();
                playerService.putPlayers(this.currentForm.id, this.currentForm.name)
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
<style lang="scss">
    .table-modify {
        display: flex;

        .modal-player {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin-left: 50px;
            background-color: #ffffff99;
            padding: 50px;
            border-radius: 5px;

            >form {
                width: 100%;
            }
        }

        .btn-challenge {
            background-color: #304763;
            color: white;
            margin-right: 10px;
            &:hover {
                background-color: #253548;
            }
        }
        .button-pen {
            padding: 2px !important;
            height: 20px;
            border: none;
            margin-left: 5px;

            &:hover {
                i {
                    font-size: 20px;
                }
            }
            &:focus {
                box-shadow: none;
            }
        }
    }

    .input-modify  {
        display: flex;
        align-items: flex-end;
        background-color: #ffffff99;
        border-radius: 5px;
        padding: 10px 20px;
        margin-bottom: 30px;

        &>button {
            margin-left: 15px;
            margin-bottom: 12px;
        }

        & label {
            font-size: 20px;
        }
    }
</style>