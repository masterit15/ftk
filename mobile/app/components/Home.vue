<template>
    <Page>
        <ActionBar :title="pageTitle">

        </ActionBar>
        <StackLayout>
            <Label :text="'Latitude: ' + currentGeoLocation.latitude" />
            <Label :text="'Longitude: ' + currentGeoLocation.longitude" />
        </StackLayout>
        <BottomNavigation>
            <TabStrip>
                <TabStripItem v-for="item in tabItem"
                    @tap="pageTitle = item.title" :key="item">
                    <Label :text="item.title"></Label>
                </TabStripItem>
            </TabStrip>
            <TabContentItem>
                <GridLayout>

                </GridLayout>
            </TabContentItem>
            <TabContentItem>
                <AddForm />
            </TabContentItem>
            <TabContentItem>
                    <SearchBar hint="Search hint" :text="searchPhrase"
                        @submit="onSearchSubmit" />
            </TabContentItem>
        </BottomNavigation>
    </Page>
</template>

<script>
    const geoLocation = require("nativescript-geolocation");

    import Login from "./Login";
    import AddForm from "./AddForm";
    export default {
        components: {
            AddForm
        },
        data() {
            return {
                pageTitle: "Главная",
                tabItem: [{
                        title: "Главная",
                        icon: "fa-home"
                    },
                    {
                        title: "Добавить",
                        icon: "fa-home"
                    },
                    {
                        title: "Поиск",
                        icon: "res://search"
                    }
                ],
                currentGeoLocation: {
                    latitude: null,
                    longitude: null,
                    altitude: null,
                    direction: null
                },

                message: "Успешная авторизация."
            };
        },
        async created() {
            let loc = await this.enableLocationServices();
        },
        methods: {
            enableLocationServices() {
                geoLocation.isEnabled().then(enabled => {
                    if (!enabled) {
                        geoLocation
                            .enableLocationRequest()
                            .then(() => this.showLocation());
                    } else {
                        this.showLocation();
                    }
                });
            },
            showLocation() {
                geoLocation.watchLocation(
                    location => {
                        this.currentGeoLocation = location;
                    },
                    error => {
                        alert(error);
                    }, {
                        desiredAccuracy: 3,
                        updateDistance: 10,
                        minimumUpdateTime: 1000 * 1
                    }
                );
            },

            logout() {
                this.$backendService.logout();
                this.$navigateTo(Login, {
                    clearHistory: true
                });
            },
            alert(message) {
                return alert({
                    title: "AMC ФТК",
                    okButtonText: "OK",
                    message: message
                });
            }
        }
    };
</script>

<style>
</style>