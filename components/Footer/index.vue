<template>
  <!-- <v-footer
    id="dashboard-core-footer"
  >
    <v-container>
      <v-row
        align="center"
        no-gutters
      >
        <v-col
          v-for="(link, i) in links"
          :key="i"
          class="text-center mb-sm-0 mb-5"
          cols="auto"
        >
        
          <a
            :href="link.href"
            class="mr-5 grey--text text--darken-3"
            rel="noopener"
            target="_blank"
          >
          <v-icon>{{link.icon}}</v-icon>
          </a>
        </v-col>

        <v-spacer class="hidden-sm-and-down" />

        <v-col
          cols="12"
          md="auto"
          class="farsi"
        >
          <div class="font-weight-light pt-6 pt-md-0 text-center farsi">
            &copy; 2021, کلیه حقوق مادی و معنوی این وب سایت متعلق به هیئت حریم حوراء می باشد .

          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer> -->
  <v-bottom-navigation
    :value="value"
    fixed
    color="primary"
    class="farsi"
    id="dashboard-core-footer"
  >
    <!-- <v-btn to="/">
      <span>خانه</span>

      <v-icon>mdi-home</v-icon>
    </v-btn> -->

    <v-btn to="/">
      <span>دوره‌ها</span>

      <v-icon>mdi-qrcode</v-icon>
    </v-btn>
    <v-btn to="/myOrders">
      <span>دوره‌های من</span>

      <v-icon>mdi-qrcode</v-icon>
    </v-btn>
    <v-btn to="/register">
      <span>پروفایل</span>

      <v-icon>mdi-account</v-icon>
    </v-btn>

    <v-btn min-width="0" text to="/shoppingcart">
      <span>سبد خرید</span>
      <v-badge
        class="farsi"
        color="red"
        :content="cartCount"
        :value="cartCount"
        bordered
      >
        <v-icon>mdi-cart-outline</v-icon>
      </v-badge>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "DashboardCoreFooter",
  computed: {
    ...mapState(["drawer", "cartCount", "isUserLoggedIn"]),
  },

  data: () => ({
    value: 1,
    links: [
      {
        href: "#",
        icon: "mdi-instagram",
      },
      {
        href: "#",
        icon: "mdi-telegram",
      },
      {
        href: "#",
        icon: "mdi-youtube",
      },
      {
        href: "#",
        icon: "mdi-twitter",
      },
    ],
  }),
};
</script>

<style lang="sass">
#dashboard-core-footer
  a
    font-size: .925rem
    font-weight: 900
    text-decoration: none
    text-transform: uppercase
</style>
