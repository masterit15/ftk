<template>
  <Page>
    <ActionBar :title="pageTitle"></ActionBar>
    <StackLayout>
      <Label :text="'Latitude: ' + currentGeoLocation.latitude" />
      <Label :text="'Longitude: ' + currentGeoLocation.longitude" />
    </StackLayout>
    <BottomNavigation>
      <TabStrip>
        <TabStripItem v-for="item in tabItem" @tap="pageTitle = item.title" :key="item">
          <Label :text="item.title"></Label>
        </TabStripItem>
      </TabStrip>
      <TabContentItem>
        <GridLayout>
          <Button @tap="onTapHasPermission" class="btn" text="Has Permission?"></Button>
          <Button @tap="onTapScheduleNotification" class="btn" text="Schedule Notification"></Button>
          <Button @tap="onTapCancelAll" class="btn" text="Cancel notifications"></Button>
          <Label class="message" :text="message" textWrap="true"></Label>
        </GridLayout>
      </TabContentItem>
      <TabContentItem>
        <AddForm />
      </TabContentItem>
      <TabContentItem>
        <SearchBar hint="Search hint" :text="searchPhrase" @submit="onSearchSubmit" />
      </TabContentItem>
    </BottomNavigation>
  </Page>
</template>

<script>
import { alert } from "tns-core-modules/ui/dialogs";
import { Color } from "tns-core-modules/color";
import geoLocation from "nativescript-geolocation";
import { LocalNotifications } from "nativescript-local-notifications";
import Login from "./Login";
import AddForm from "./AddForm";
export default {
  components: {
    AddForm
  },
  data() {
    return {
      pageTitle: "Главная",
      tabItem: [
        {
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
    // this.LocalNotifications.addOnMessageReceivedCallback(notificationData => {
    //   this.message =
    //     "Notification received: " + JSON.stringify(notificationData);
    // });
  },
  methods: {
    enableLocationServices() {
      geoLocation.isEnabled().then(enabled => {
        if (!enabled) {
          geoLocation.enableLocationRequest().then(() => this.showLocation());
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
        },
        {
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
    },

    onTapHasPermission() {
      LocalNotifications.hasPermission().then(granted => {
        alert({
          title: "Permission granted?",
          message: granted ? "YES" : "NO",
          okButtonText: "OK"
        });
      });
    },
    onTapScheduleNotification() {
      LocalNotifications.schedule([
        {
          id: 1,
          title: "Would you like a Red Alert poster?",
          subtitle: "This poster is awesome!",
          body:
            "The big brown Vue app jumped over the lazy Angular app. The big brown Vue app jumped over the lazy Angular app. The big brown Vue app jumped over the lazy Angular app. The big brown Vue app jumped over the lazy Angular app.",
          bigTextStyle: false, // Allow more than 1 row of the 'body' text on Android, but setting this to true denies showing the 'image'
          color: new Color("green"),
          image:
            "https://images-na.ssl-images-amazon.com/images/I/61mx-VbrS0L.jpg",
          thumbnail:
            "https://2.bp.blogspot.com/-H_SZ3nAmNsI/VrJeARpbuSI/AAAAAAAABfc/szsV7_F609k/s200/emoji.jpg",
          forceShowWhenInForeground: true,
          channel: "vue-channel",
          ticker: "Special ticker text for Vue (Android only)",
          at: new Date(new Date().getTime() + 5 * 1000), // 5 seconds from now
          actions: [
            {
              id: "yes",
              type: "button",
              title: "Yes (and launch app)",
              launch: true
            },
            {
              id: "no",
              type: "button",
              title: "No",
              launch: false
            }
          ]
        }
      ])
        .then(() => {
          alert({
            title: "Notification scheduled",
            message: "ID: 1",
            okButtonText: "OK, thanks"
          });
        })
        .catch(error => console.log("doSchedule error: " + error));
    },
    onTapCancelAll() {
      LocalNotifications.cancelAll()
        .then(() => {
          alert({
            title: "All canceled",
            okButtonText: "Awesome!"
          });
        })
        .catch(error => console.log("doCancelAll error: " + error));
    }
  }
};
</script>

<style>
</style>