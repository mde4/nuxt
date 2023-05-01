<template>
  <v-card class="mx-auto mt-9 farsi" max-width="500">
    <v-card-title class="title font-weight-regular justify-space-between">
      <span class="farsi grey--text text--darken-1">{{ currentTitle }}</span>
      <v-avatar color="primary lighten-2" class="subheading white--text" size="24"
        v-text="this.$store.state.step"></v-avatar>
    </v-card-title>
    <v-window v-model="step">
      <v-window-item :value="1">
        <v-card-text>
          <v-text-field v-model="mobile" label="تلفن همراه" hint="09123456789"></v-text-field>
          <span class="caption grey--text text--darken-1">
            از این تلفن همراه برای ورود به سایت استفاده خواهید کرد
          </span>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="2">
        <v-card-text>
          <v-text-field v-model="passCode" label="کد تأیید" type="number"></v-text-field>
          <span class="caption grey--text text--darken-1"> </span>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="3">
        <div class="pa-4 text-center">
          <v-text-field v-model="userObj.name" label="نام"></v-text-field>
          <v-text-field v-model="userObj.family" label="نام خانوادگی"></v-text-field>
          <v-text-field v-model="userObj.numOfChild" type="number" label="تعداد فرزند"></v-text-field>
          <v-combobox v-model="userObj.education" :items="educationItems" item-text="name" item-value="id"
            label=" تحصیلات" outlined dense required></v-combobox>
        </div>
      </v-window-item>
    </v-window>

    <v-divider></v-divider>

    <v-card-actions>
      <!-- <v-btn
          :disabled="step === 1"
          v-show="step!=2"
          text
          @click="$store.dispatch('setStep', $store.state.step - 1)"
        >
           Back
        </v-btn> -->
      <div v-show="step === 2">
        <vac :end-time="new Date().getTime() + 60000">
          <template v-slot:process="anyYouWantedScopName">
            <v-btn disabled class="farsi">{{
              `ارسال مجدد کد (${anyYouWantedScopName.timeObj.ceil.s})`
            }}</v-btn>
          </template>
          <template v-slot:finish>
            <v-btn text @click="$store.dispatch('setStep', 1)">ارسال مجدد کد</v-btn>
          </template>
        </vac>
      </div>
      <v-spacer></v-spacer>

      <!-- :disabled = "step ===3"         -->
      <div v-show="step === 1">
        <v-btn color="primary" depressed @click="register()">
          ارسال کد
        </v-btn>
      </div>
      <div v-show="step === 2">
        <v-btn color="primary" depressed @click="confirmRegister()">
          تایید ثبت نام
        </v-btn>
      </div>
      <div v-show="step === 3">
        <v-btn color="primary" depressed @click="completeSpecification">
          ثبت مشخصات
        </v-btn>
      </div>
      <div v-show="step === 4 && !paymentDone">
        <v-btn color="primary" depressed @click="addToShoppingCart(1)">
          افزودن دوره به سبد خرید
        </v-btn>
      </div>
      <!-- <v-btn
          v-show="step === 4 && paymentDone"
          color="primary"
          depressed
          @click="addToShoppingCart(1)"
        >
          پرداخت با موفقیت انجام شد
        </v-btn> -->
      <div v-show="step === 4 && paymentDone">
        <v-alert dense text type="success">
          پرداخت با موفقیت انجام شد، کد رهگیری: {{ paymentDone }}
        </v-alert>
      </div>
    </v-card-actions>
    <br />
    <br />
    <br />
  </v-card>
</template>
<script>
import { mapState } from "vuex";
import vueAwesomeCountdown from "@/components/vue-awesome-countdown";
import AuthenticationService from "@/middleware/AuthenticationService";
import ProvincesService from "@/middleware/ProvincesService";
import CartService from "@/middleware/CartService";

export default {
  name: "register",
  components: {
    vac: vueAwesomeCountdown,
  },
  metaInfo: {
    title: "مامانی‌نی‌ها",
    titleTemplate: "%s | ثبت نام دوره گام به گام تا مادرانگی",
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

  // self = this,
  data: () => ({
    show: true,
    userObj: {
      name: "", //this.$store.state.user.name,
      family: "",
      nationalCode: "",
      birthDate: "",
      education: "",
      numOfChild: "",
      pregnantStatus: "",
      provinceId: "",
      cityId: "",
    },

    mobile: "",
    passCode: null,
    name: "",
    family: "",
    nationalCode: "",
    birthDate: "",
    numOfChild: null,
    provinces: [],
    cities: [],
    selectPregnant: ["انتخاب کنید"],
    selectEducation: ["انتخاب کنید"],
    selectedProvince: ["انتخاب کنید"],
    selectedCity: ["انتخاب کنید"],
    pregnantItems: [
      { id: 0, name: "قبل از بارداری" },
      { id: 1, name: "باردار" },
      { id: 2, name: "پس از زایمان" },
    ],
    educationItems: [
      { id: 0, name: "زیر دیپلم" },
      { id: 1, name: "دیپلم" },
      { id: 2, name: "فوق دیپلم" },
      { id: 3, name: "کارشناسی" },
      { id: 4, name: "تحصیلات حوزوی" },
      { id: 5, name: "کارشناسی ارشد و بالاتر" },
    ],
  }),
  created: function () {
    //= $toast.show("response.data.message");
    console.log("mounted")


  },
  methods: {
    async addToShoppingCart(productId) {
      try {
        this.addedToCart = (await CartService.addToCart(productId, 1)).data;
        console.log("this.addedToCart");
        console.log(this.addedToCart);

        const shoppingCart = (await CartService.show()).data;
        this.$store.dispatch("setCartCount", shoppingCart.totalQty);

        // this.product = product[0];
        console.log(shoppingCart.totalQty);
        this.$router.push({ path: "shoppingcart" });
      } catch (err) {
        console.log(err);
      }
    },
    async changeCity() {
      console.log(this.userObj.provinceId);

      this.cities = (
        await ProvincesService.cities(this.userObj.provinceId.id)
      ).data;
    },
    async register() {
      try {
        const response = await AuthenticationService.register({
          mobile: this.mobile,
        });

        // console.log("response12:");
        // console.log(response.data.message);
        this.$notify({ text: response.data.message, type: "success" })
        this.$store.dispatch("setToken", null);
        this.$store.dispatch("setUser", null);
        this.$store.dispatch("setStep", 2);
        // this.$router.push({
        //   name: "tickets"
        // });
      } catch (error) {
        console.log(error);
        // this.$toasted.error(error.response.data.error, {
        //   icon: { name: "error_outline", after: true },
        // });
        // this.$notify({, text: 'Heyy !!!' ,type:"error"})
        this.$notify({
          // (optional)

          // (optional)
          // Title (will be wrapped in div.notification-title)
          // title: "This is the <em>title</em>",

          // Content (will be wrapped in div.notification-content)
          text: error.response.data.error,

          // (optional)
          // Class that will be assigned to the notification
          type: "error",
        });
        // this.snackbar = true;
        // this.error = error.response.data.error;
      }
    },

    async confirmRegister() {
      try {
        const response = await AuthenticationService.confirmRegister({
          mobile: this.mobile,
          passCode: this.passCode,
        });

        console.log("responseComplete:");

        console.log(response);
        this.error = null;
        this.color = "success";
        this.snackbar = true;
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        this.$store.dispatch("setStep", 3);
        this.init()
        this.$notify({
          text: response.data.message,
          type: "success",
        });

        // this.$router.push({
        //   name: "tickets"
        // });
      } catch (error) {
        console.log("error13:");
        console.log(error);
        this.$notify({ text: error.response.data.error, type: "error" });

        // this.color = "error";
        // this.snackbar = true;
        // this.error = error.response.data.error;
      }
    },
    async completeSpecification() {
      try {
        console.log("response12:");
        console.log(this.userObj);
        if (this.userObj.name == "" || this.userObj.family == "") {
          this.$notify({
            text: "لطفاً نام و نام خانوادگی خود را وارد کنید",
            type: "error",
          });
          return;
        }


        const { ...dataWithoutObject } = this.userObj;
        // dataWithoutObject.education = dataWithoutObject.education.id;
        // dataWithoutObject.pregnantStatus = dataWithoutObject.pregnantStatus.id;
        // dataWithoutObject.cityId = dataWithoutObject.cityId.id;
        // dataWithoutObject.provinceId = dataWithoutObject.provinceId.id;

        const response = await AuthenticationService.completeSpecification(
          dataWithoutObject, this.$store.state.token
        );

        console.log("response:::::::::::");
        console.log(response);
        this.$notify({
          text: response.data.message,
          type: "success",
        });
        this.$store.dispatch("setUser", response.data.user);
        // this.$store.dispatch("setStep", this.$store.state.step + 1);

        // this.$store.dispatch("setToken", response.data.token);
        // this.$store.dispatch("setUser", response.data.user);
        // this.$router.push({
        //   name: "tickets"
        // });
      } catch (error) {
        console.log(error);
        this.$notify({ text: error.response.data.error, type: "error" });
      }
    },
    async payment() {
      try {
      } catch (error) {
        console.log(error);
        this.$notify({ text: error.response.data.error, type: "error" });
      }
    },

    async init() {
      try {
        this.provinces = (await ProvincesService.provinces()).data;
        this.cities = (
          await ProvincesService.cities(this.$store.state.user.provinceId)
        ).data;
        this.userObj.name = this.$store.state.user.name;
        this.userObj.family = this.$store.state.user.family;
        this.userObj.nationalCode = this.$store.state.user.nationalCode;
        this.userObj.numOfChild = this.$store.state.user.numOfChild;
        this.userObj.birthDate = this.$store.state.user.birthDate;
        this.userObj.address = this.$store.state.user.address;
        this.userObj.pregnantStatus =
          this.pregnantItems[this.$store.state.user.pregnantStatus];
        this.userObj.education =
          this.educationItems[this.$store.state.user.education];
        this.userObj.provinceId = this.provinces.find((obj) => {
          return obj.id === this.$store.state.user.provinceId;
        });
        this.userObj.cityId = this.cities.find((obj) => {
          return obj.id === this.$store.state.user.cityId;
        });

        console.log("(:::::::::::::::::");
        console.log(this.$store.state.user.cityId);
        console.log(this.$store.state.user.provinceId);
        console.log(this.cities);
        console.log(this.provinces);
        this.$toast.show("response.data.message");

        // tObject.cityId.
        // ect.provinceId.
      } catch (error) {
        this.color = "error";
        this.snackbar = true;
        // this.error = error.response.data.error;
      }
    },
  },
  mounted() {
    // if (this.$store.state.step == 3) 
    this.init();
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "step", "shoppingCart"]),
    paymentDone() {
      console.log(this.$route.query.tcode); // outputs 'yay'
      return this.$route.query.tcode;
      // outputs 'yay'
    },
    currentTitle() {
      switch (this.$store.state.step) {
        case 1:
          return "ثبت نام / ورود";
        case 2:
          return "تأیید تلفن همراه";
        case 3:
          return "اطلاعات تکمیلی";
        case 4:
          return "ثبت نام دوره";
      }
    },
  },
};
</script>
<style scoped></style>