<template>
    <section>
        <div class="podium-section">
            <div style="display:flex; justify-content:center; align-items:center; padding-bottom:20px;">
                <h3>Podium des nullos</h3>
                <img style="width:80px;" alt="Vue logo" src="../assets/beuteu.png">
            </div>
            <div class="podium-first-container">
                <div class="podium-first card"> 
                    <div class="icon">
                        <b-icon
                            icon="trophy"
                            size="is-large"
                            class="first"
                            >
                        </b-icon>
                    </div>
                    <div class="content">
                        <span class="name">{{ looserPodium[0].name }}</span>
                        <span class="score">{{ looserPodium[0].total }}</span>
                     </div>
                </div>
            </div>  
            <div class="podium-last-container">
                <div class="podium-second card"> 
                    <div class="icon">
                        <b-icon
                            icon="trophy"
                            size="is-large"
                            class="second">
                        </b-icon>
                    </div>
                    <div class="content">
                        <span>{{ looserPodium[1].name }}</span>
                        <span>{{ looserPodium[1].total }}</span>
                    </div>
                </div>
                <div class="podium-third card"> 
                    <div class="icon">
                        <b-icon
                            icon="trophy"
                            size="is-large"
                            class="third">
                        </b-icon>
                    </div>
                    <div class="content">
                        <span>{{ looserPodium[2].name }}</span>
                        <span>{{ looserPodium[2].total }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="podium-section">  
            <h3>Podium des plu faur</h3>
            <div class="podium-first-container">
                <div class="podium-first card"> 
                    <div class="icon">
                    <b-icon
                        icon="trophy"
                        size="is-medium">
                    </b-icon>
                    </div>
                    <div class="content">
                        <span>{{ winnerPodium[0].name }}</span>
                        <span>{{ winnerPodium[0].total }}</span>
                     </div>
                </div>
            </div>  
            <div class="podium-last-container">
                <div class="podium-second card"> 
                    <div class="icon">
                        <b-icon
                            icon="trophy"
                            size="is-medium">
                        </b-icon>
                    </div>
                    <div class="content">
                        <span>{{ winnerPodium[1].name }}</span>
                        <span>{{ winnerPodium[1].total }}</span>
                    </div>
                </div>
                <div class="podium-third card"> 
                    <div class="icon">
                        <b-icon
                            icon="trophy"
                            size="is-medium">
                        </b-icon>
                    </div>
                    <div class="content">
                        <span>{{ winnerPodium[2].name }}</span>
                        <span>{{ winnerPodium[2].total }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import PlayerService from "../services/PlayerService"

    export default {
        data() {
            const data = []
            const looserPodium = []
            const winnerPodium = []


            return {
                data,
                looserPodium,
                winnerPodium
                // isLoading: false,
            }
        },
        mounted () {
            this.fetchDatas();
            
        },
        methods: {
            fetchDatas() {
                this.isLoading = true
                const playerService = new PlayerService();
                playerService.getPlayers()
                .then(resp => {
                    this.data = resp,
                    this.isLoading = false
                    this.calculPodium()
                })
            },
            calculPodium() {
                const playersScore = this.data.map(player => {
                    const score = player.challengesPlayers.reduce((acc, current) => {
                        return acc + current.challenge.score
                    }, 0)
                    return {
                        name: player.name,
                        total: score
                    }
                })
                
                const byValue = (a,b) => a.total - b.total;
                this.winnerPodium = [...playersScore].sort(byValue).slice(0,3);
                this.looserPodium = [...playersScore].sort(byValue).reverse().slice(0,3);
            },
        },
    }
</script>
<style lang="scss" scoped>
    section {
        display: flex;
        justify-content: space-around;
    }
    .podium-section {
        width: 40%;
        background-color: #ffffffcf;
        padding: 30px;
        border-radius: 5px;
        h3 {
            text-align: center;
            padding-bottom: 20px;
            font-size: 25px;
            font-weight: bold;
        }
        .podium-first-container {
            display: flex;
            justify-content: center;
            padding-bottom: 20px;
        }
        .podium-last-container {
            display: flex;
            justify-content: space-between;
        }
        .podium-first {
            border: solid #FFD700 3px;
        }
        .podium-second {
            border: solid #C0C0C0 3px;
        }
        .podium-third {
            border: solid #70483C 3px;
        }
        .card {
            padding: 20px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: white;
            border-radius: 5px;
            width: 235px;

            .icon {
                .first {
                    color: #FFD700;
                }
                .second {
                    color: #C0C0C0;
                }
                .third {
                    color: #70483C;
                }
            }
            .content{
                display: flex;
                flex-direction: column;
                align-items: center;
                color: #444;
                span {
                    &:nth-child(1){
                        font-size: 17px;
                    }
                    &:nth-child(2){
                        font-weight: bold;
                    }
                }
                
            }
        }
    }
</style>