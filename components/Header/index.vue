<template>
  <v-app-bar id="app-bar" absolute app color="transparent" flat height="75" class="farsi">
    <v-btn class="mr-3" elevation="1" fab small @click="setDrawer(!drawer)">
      <v-icon v-if="value">mdi-view-quilt</v-icon>

      <v-icon v-else>mdi-menu</v-icon>
    </v-btn>

    <v-toolbar-title class="hidden-sm-and-down font-weight-light farsi" v-text="$route.name" />

    <v-spacer />
    <div class="farsi px-5">
      0993-995-8124
      <v-icon> mdi-phone-in-talk </v-icon>
    </div>
    <v-text-field class="farsi" :label="'جستجو'" color="secondary" hide-details style="max-width: 165px">
      <template v-if="$vuetify.breakpoint.mdAndUp" v-slot:append-outer>
        <v-btn class="mt-n2" elevation="1" fab small>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>

    <div class="mx-3" />

    <v-btn class="ml-2" min-width="0" text to="/">
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>
    <v-btn class="ml-2" min-width="0" text to="/shoppingcart">
      <v-badge class="farsi" color="red" :content="this.$store.state.cartCount" :value="this.$store.state.cartCount"
        bordered>
        <v-icon>mdi-cart-outline</v-icon>
      </v-badge>
    </v-btn>

    <v-menu bottom left offset-y origin="top right" transition="scale-transition">
      <template v-slot:activator="{ attrs, on }">
        <v-btn class="ml-2" min-width="0" text v-bind="attrs" v-on="on" to="/register">
          <!-- <v-badge class="farsi" color="red" :content="cartCount" :value="cartCount" bordered> -->
          <!-- <template v-slot:badge>
              <span>{{cartCount}}</span>
            </template>-->

          <v-icon medium>mdi-account</v-icon>
          <!-- </v-badge> -->
        </v-btn>
      </template>

      <v-list :tile="false" nav>
        <div>
          <app-bar-item v-for="(n, i) in notifications" :key="`item-${i}`">
            <v-list-item-title v-text="n" />
          </app-bar-item>
        </div>
      </v-list>
    </v-menu>

    <v-btn class="ml-2" min-width="0" text @click="logout" v-if="this.$store.state.isUserLoggedIn">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      page_name: "test page",
      notifications: [
        "پیام مربوط به این کاربر",
        "پروفایل خود را کامل کنید",
        "سوالات خود را از طریق ارتباط با ما بپرسید",
      ],
    };
  },

  methods: {
    // ...mapMutations({
    //   setDrawer: "SET_DRAWER",
    // }),

    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$store.dispatch("setStep", 1);
      this.$router.push({
        name: "Register",
      });
    },
  },
  components: {
    AppBarItem: {
      render(h) {
        return h(VHover, {
          scopedSlots: {
            default: ({ hover }) => {
              return h(
                VListItem,
                {
                  attrs: this.$attrs,
                  class: {
                    "black--text": !hover,
                    "white--text secondary elevation-12": hover,
                  },
                  props: {
                    activeClass: "",
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                },
                this.$slots.default
              );
            },
          },
        });
      },
    },
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style scoped>
.title {
  text-decoration: none !important;
}

.title:visited {
  color: white;
}

.farsi {
  font-family: Tahoma !important;
}
</style>