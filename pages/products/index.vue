<template>
  <div class="team farsi">
    <span class="main">
      <a
        v-for="product in products"
        :key="product.id"
        :href="`/products/${product.id}`"
        class="no_underline"
      >
        <div id="DivForHoverItem">
          <img :src="((product.Urls.length)?prefixPath + Urls[0].imageUrl:require('@/assets/images/default.png'))" class="item" />
          <div class="product_title">{{ product.name }}</div>
          <!-- <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="10"
              ></v-rating>

              <div class="grey--text ml-4">4.5 (413)</div>
            </v-row>
          </v-card-text> -->
          <div class="center1">
            <span class="product_price_asli text-decoration-line-through">{{
              formatUSD(product.price)
            }}</span
            >&nbsp;
            <v-chip class="ma-2" color="red" text-color="white">
              %{{ product.discount }}
            </v-chip>
            <div>
              <span class="product_price">{{
                formatUSD(
                  Math.round(
                    product.price - (product.price * product.discount) / 100
                  )
                )
              }}</span
              >&nbsp;
              <span class="product_price_toman">تومان</span>
            </div>
          </div>
          <div id="HiddenText" class="seller">
            <v-icon right>mdi-account</v-icon>
            مدرس:
            {{ product.Store.name }}
          </div>
        </div>
      </a>
    </span>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
import ProductsService from "@/middleware/ProductsService";
// import { API_LOCATION } from "../../config";
export default {
  metaInfo: {
    title: "مامانی‌نی‌ها ",
    titleTemplate: "%s | دوره‌ها",
    htmlAttrs: {
      lang: "en-US",
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "description",
        content: "An example Vue application with vue-meta.",
      },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  },
  data({$config:{API_LOCATION}}) {
    return {
      prefixPath: API_LOCATION,
      selection: 1,
      loading: false,
      products: {},
      overlay: true,
    };
  },
  async mounted() {
    try {
      let productData = (await ProductsService.index()).data;
      this.products = productData.rows;
      console.log(this.products);
    } catch (err) {
      console.log(err);
      console.log(err.response.data.message);
    } finally {
      this.overlay = false;
    }
  },
  methods: {
    formatUSD(num) {
      return Number(num).toLocaleString();
    },
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
    getImage(Urls) {
      if (Urls.length) return this.prefixPath + Urls[0].imageUrl;
      return require("@/assets/images/default.png");
    },
  },
};
</script>
<style scoped>
.link-unstyled,
.link-unstyled:link,
.link-unstyled:hover {
  color: inherit;
  text-decoration: inherit;
  font-family: BYekan;
}
.farsi {
  font-family: BYekan;
}
/* .bg-menu:hover {
  background-color: #0079C1;
  color: #FFFFFF;
}
.clickable {
  cursor: pointer;
} */
.body {
  background: #efefef;
}
.a {
  text-decoration: none;
}
.no_underline {
  text-decoration: none;
}
.main a {
  padding: 5px;
  background: white;
  margin: 5px;
  box-shadow: 0px 0px 8px -3px black;
  transform: scale(1) rotate(0deg);
  transition: all 0.5s ease;
}
.main a:hover {
  box-shadow: 0px 10px 30px -1px black;
}
img {
  width: 100%;
}
.main {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(179px, 265px));
  justify-content: center;
  grid-column-gap: 5px;
}
.product_image {
  border: 3px solid #73ad21;
}
.product_title {
  color: #616161;
  font-size: 17px;
  font-weight: bold;
  text-align: center;
}
.product_price {
  text-align: center;
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
  color: black;
}
.product_price_asli {
  text-align: center;
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
  color: rgb(168, 168, 168);
}
.product_price_toman {
  text-align: center;
  margin-top: 10px;
  font-size: 20px;
  color: black;
}
.center1 {
  margin: auto;
  width: 100%;
  text-align: left;
}
.options {
  display: grid;
  grid-template-columns: repeat(4, 200px);
  justify-content: center;
  padding: 40px;
  text-align: center;
  text-transform: capitalize;
  font-size: 1.4rem;
}
.options div {
  background: indigo;
  padding: 10px;
  border: solid 2px #efefef;
  color: #efefef;
  border-radius: 5px;
  transition: all 0.5s ease;
}
.options div:hover {
  background: #efefef;
  padding: 10px;
  color: indigo;
  border: solid 2px indigo;
  cursor: pointer;
}
.options-clicked {
  background: #efefef !important;
  color: indigo !important;
  box-shadow: inset 0px 0px 10px 2px black !important;
  border: solid 2px indigo !important;
  transform: translateY(1px);
}

#DivForHoverItem {
  /*just so we can see it*/
  text-align: center;
}

#HiddenText {
  visibility: hidden;
}

#DivForHoverItem:hover #HiddenText {
  visibility: visible;
}
img {
  /* max-width: 100%; */
  /* height: inherit; */
  /* width:inherit; */
}
.seller {
  color: black;
  border-top: dotted 1px indigo;
}

.item {
  width: 220px;
  min-height: 220px;
  max-height: 220px;
  /* border: 1px solid #000; */
  /* margin: 3px;
    padding: 3px; */
}
</style>