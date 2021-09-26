<template>
    <div class="sidebar-page">
        <section class="sidebar-layout">
             <b-sidebar
                position="static"
                :mobile="mobile"
                :expand-on-hover="expandOnHover"
                :reduce="reduce"
                :delay="expandWithDelay ? 500 : null"
                type="is-light"
                open
            >
                <div class="p-1">
                    <div class="block">
                    <img alt="Vue logo" src="../assets/dofus_fail_logo.png">
                    </div>
                    <b-menu class="is-custom-mobile">
                        <b-menu-list>
                            <router-link to="/dashboard">
                                <b-icon
                                    icon="monitor-dashboard"
                                    size="is-small">
                                </b-icon>
                                <b-menu-item expanded icon="settings" label="Dashboard"></b-menu-item>
                            </router-link>
                            <router-link to="/players">
                                <b-icon
                                    icon="account-multiple"
                                    size="is-small">
                                </b-icon>
                                <b-menu-item expanded icon="settings" label="Joueurs"></b-menu-item>
                            </router-link>
                            <router-link to="/challenges">
                                <b-icon
                                    icon="clipboard-check"
                                    size="is-small">
                                </b-icon>
                                <b-menu-item expanded icon="settings" label="Challenges"></b-menu-item>
                            </router-link>
                        </b-menu-list>
                    </b-menu>
                </div>
            </b-sidebar>
        </section>
    </div>
</template>

<script>
export default {
  data() {
    return {
      expandOnHover: false,
      expandWithDelay: false,
      mobile: "reduce",
      reduce: false
    };
  }
};
</script>

<style lang="scss">
.p-1 {
  padding: 1em;
}
.my-sidebar {
    height: 100%;
}
.sidebar-page {
    display: flex;
    flex-direction: column;
    width: 260px;
    min-height: 100%;
    // min-height: 100vh;
    .sidebar-layout {
        display: flex;
        flex-direction: row;
        min-height: 100%;
        // min-height: 100vh;
    }
}
.menu-list a.router-link-active {
    background-color: #2a3542 !important;
    color: #fff !important;
    border-left: solid white 2px;

    &>li>a>span {
        color: #fff;
    }

    &:hover {
        background-color: #2a3542 !important;
        color: #fff !important;
        .menu-list a>li>a>span {
            color: #fff;
        }
    }
}
.menu-list>a {
    display: flex !important;
    align-items: center;
    padding-left: 30px !important;

    & i {
        font-size: 25px;
    }
    &:hover {
        background-color: #2a35426e !important;
        color: #4a4a4a !important;
    }
}
.menu-list a.is-active {
    background-color: transparent !important;
    color: #fff !important;
}
.icon-text {
    color: #a5afbc !important;

    &:hover {
        background-color: transparent !important;
    }
}
@media screen and (max-width: 1023px) {
    .b-sidebar {
        .sidebar-content {
            &.is-mini-mobile {
                &:not(.is-mini-expand),
                &.is-mini-expand:not(:hover):not(.is-mini-delayed) {
                    .menu-list {
                        li {
                            a {
                                span:nth-child(2) {
                                    display: none;
                                }
                            }
                            ul {
                                padding-left: 0;
                                li {
                                    a {
                                        display: inline-block;
                                    }
                                }
                            }
                        }
                    }
                    .menu-label:not(:last-child) {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
}
@media screen and (min-width: 1024px) {
    .b-sidebar {
        .sidebar-content {
            min-height: 100vh;
            background-color: #18222e !important;
            &.is-mini {
                &:not(.is-mini-expand),
                &.is-mini-expand:not(:hover):not(.is-mini-delayed) {
                    .menu-list {
                        li {
                            a {
                                span:nth-child(2) {
                                    display: none;
                                }
                            }
                            ul {
                                padding-left: 0;
                                li {
                                    a {
                                        display: inline-block;
                                    }
                                }
                            }
                        }
                    }
                    .menu-label:not(:last-child) {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
}
.is-mini-expand {
    .menu-list a {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>