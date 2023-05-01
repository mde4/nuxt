<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :src="barImage"
    mobile-breakpoint="960"
    app
    width="260"
    v-bind="$attrs"
    class="farsi"
    temporary
    ><!-- "temporary" causes shadow on menu -->
    <template v-slot:img="props">
      <v-img :gradient="`to bottom, ${barColor}`" v-bind="props" />
    </template>

    <v-divider class="mb-1" />

    <v-list dense nav>
      <v-list-item>
        <v-list-item-avatar class="align-self-center" color="white" contain>
          <!-- https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.basdolan.com%2Fimg%2Ffavicon.ico&imgrefurl=https%3A%2F%2Fwww.basdolan.com%2Fimg%2F&docid=AxbWpjvRlhh5eM&tbnid=AvvkK04iVtj_KM%3A&vet=1&w=256&h=256&itg=1&bih=560&biw=1280&ved=2ahUKEwiD3I65gq7oAhWJC-wKHeB1AEMQxiAoAXoECAEQGg&iact=c&ictx=1
          https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.basdolan.com%2Fimg%2Ffavicon.ico&imgrefurl=https%3A%2F%2Fwww.basdolan.com%2Fimg%2F&docid=AxbWpjvRlhh5eM&tbnid=AvvkK04iVtj_KM%3A&vet=1&w=256&h=256&itg=1&bih=560&biw=1280&ved=2ahUKEwiD3I65gq7oAhWJC-wKHeB1AEMQxiAoAXoECAEQGg&iact=c&ictx=1 -->
          <v-img src="baby.png" max-height="50" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="shop-name" v-text="profile.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list expand nav>
      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />

      <template v-for="(item, i) in computedItems">
        <base-item-group
          v-if="item.children"
          :key="`group-${i}`"
          :item="item.title"
        >
          <!--  -->
        </base-item-group>

        <base-item v-else :key="`item-${i}`" :item="item" />
      </template>

      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />
    </v-list>

    <template v-slot:append>
      <base-item
        :item="{
          title: 'تماس با ما',
          icon: 'mdi-phone-classic',
          to: '/contactUs',
        }"
      />
    </template>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapState } from "vuex";

export default {
  name: "DashboardCoreDrawer",

  props: {
    expandOnHover: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    items: [
      {
        icon: "mdi-account",
        title: "پروفایل",
        to: "/register",
      },
      // {
      //   icon: "mdi-view-dashboard",
      //   title: "دسته‌بندی‌ها",
      //   to: "/categories",
      // },
      {
        title: "دوره‌ها",
        icon: "mdi-basket-fill",
        to: "/",
      },
            {
        title: "دوره‌های من",
        icon: "mdi-basket-fill",
        to: "/myOrders",
      },
      {
        title: "سبد خرید",
        icon: "mdi-cart-outline",
        to: "/shoppingcart",
      },
      // {
      //   title: "دوره‌های آموزشی",
      //   icon: "mdi-format-font",
      //   to: "",
      // },
      // {
      //   title: "google",
      //   icon: "mdi-map-marker",
      //   to: "/maps/google-maps",
      // },
      // {
      //   title: "notifications",
      //   icon: "mdi-bell",
      //   to: "/components/notifications",
      // },
      // {
      //   title: "products",
      //   icon: "mdi-bell",
      //   to: "/tables/regular-tables",
      // },
    ],
  }),
  mounted() {
    console.log("computedItems");
    console.log(this.computedItems);
  },

  computed: {
    ...mapState(["barColor", "barImage"]),
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit("SET_DRAWER", val);
      },
    },
    computedItems() {
      return this.items.map(this.mapItem);
    },
    profile() {
      return {
        avatar: true,
        title: "مرکز رویش تخصصی مادر و کودک حریم حوراء",
      };
    },
  },

  methods: {
    mapItem(item) {
      return {
        ...item,
        children: item.children ? item.children.map(this.mapItem) : undefined,
        title: item.title,
      };
    },
  },
};
</script>

<style lang="sass">

</style>