<template>
  <div id="app">
    <div class="d-flex justify-content-center align-items-center">
      <div id="widget" class="widget show-bg2">
        <span v-if="$isMobile()" class="beigeCircle animated slideInUp"></span>
        <span v-else class="beigeCircle animated slideInRight"></span>

        <div
          v-if="$isMobile()"
          class="introBottles animated fadeInUpShort delay-1s"
        >
          <img
            class="bottlesMobile"
            src="@/assets/images/intro_bottles_mobile.png"
          />
        </div>

        <div v-else class="introBottles animated slideInRight">
          <img class="bottlesDesktop" src="@/assets/images/intro_bottles.png" />
        </div>
        <div
          id="cta"
          class="
            cta
            animate__animated
            animate__heartBeat
            animate__repeat-3
            animate__delay-2s
          "
        >
          <img src="@/assets/images/cta.svg" />
        </div>
        <b-container fluid class="step intro" v-if="jsondata && firstScreen">
          <b-row align-v="start">
            <b-col class="mt-sm-3 mt-lg-3" align-self="start">
              <h1 class="animated fadeIn">{{ jsondata.question1 }}</h1>
              <h1 class="animated fadeIn delay-1s">{{ jsondata.question2 }}</h1>
            </b-col>
          </b-row>
          <b-row class="buttoncontainer">
            <div
              class=""
              v-for="(item, index) in jsondata.anlaesse"
              :key="index"
              shrink
            >
              <b-col
                sm="12"
                class=""
                align-self="start"
                :class="[`animated fadeInLeftShort delay-${index + 2}s`]"
              >
                <div class="button" v-on:click="changeToScreen2(item.anlassid)">
                  <span class="buttontext" v-html="item.buttontext"></span>
                  <div class="button-arrow bounce"></div>
                </div>
              </b-col>
            </div>
          </b-row>
        </b-container>

        <!-- second screen (Helle Fleisch,..., Rot, Weiß)-->
        <b-container fluid class="step foodcats" v-if="secondScreen">
          <b-row>
            <b-col class="d-flex justify-content-start mt-sm-3 mt-lg-3">
              <h1 class="animated fadeIn delay-0.6s">
                {{ jsondata.anlaesse[anlassid].question }}
              </h1>
            </b-col>
          </b-row>
          <b-row class="buttoncontainer">
            <div
              class="scrollContent"
              id="style-red"
              v-if="jsondata.anlaesse[anlassid].anlassid === 0"
            >
              <div
                class="d-flex justify-content-left"
                v-for="(item, index) in jsondata.anlaesse[anlassid].values"
                :key="index"
                shrink
              >
                <b-col
                  sm="12"
                  class="d-flex justify-content-left"
                  :class="[`animated fadeInUpShort delay-02s`]"
                >
                  <div
                    class="button"
                    v-on:click="changeToScreen3(item.foodcat)"
                  >
                    <span class="buttontext" v-html="item.buttontext"></span>
                    <div class="button-arrow bounce"></div>
                  </div>
                </b-col>
              </div>
            </div>
            <div
              v-else
              class="d-flex justify-content-center"
              v-for="(item, index) in jsondata.anlaesse[anlassid].values"
              :key="index"
              shrink
            >
              <b-col
                sm="12"
                class="d-flex justify-content-left"
                :class="[`animated fadeInUpShort delay-02s`]"
              >
                <div
                  class="button"
                  v-on:click="
                    jumpToScreen4(
                      item.foodcat,
                      jsondata.anlaesse[anlassid].values[item.foodcat].question,
                      jsondata.anlaesse[anlassid].values[item.foodcat].wines
                    ),
                      colorfill()
                  "
                >
                  <span class="buttontext" v-html="item.buttontext"></span>
                  <div class="button-arrow bounce"></div>
                </div>
              </b-col>
            </div>
          </b-row>
        </b-container>
        <!-- end second screen -->
        <!-- third screen (Hähnchen, Pute,...) -->
        <b-container fluid class="step foods" v-if="thirdScreen">
          <b-row>
            <b-col class="d-flex justify-content-left mt-sm-3 mt-lg-3">
              <h1 class="animated fadeIn delay-0.6s">
                {{ jsondata.anlaesse[anlassid].values[foodcat].question }}
              </h1>
            </b-col>
          </b-row>
          <b-row class="d-flex justify-content-center mt-sx-3 buttoncontainer">
            <div class="gridcontent">
              <div
                class="d-flex justify-content-center"
                v-for="(item, index) in jsondata.anlaesse[anlassid].values[
                  foodcat
                ].values"
                :key="index"
                shrink
              >
                <b-col
                  sm="12"
                  class="d-flex justify-content-center"
                  :class="[`animated fadeInShort delay-02s`]"
                >
                  <div
                    class="button"
                    v-on:click="changeToScreen4(item.foodid), colorfill()"
                  >
                    <span class="buttontext" v-html="item.buttontext"></span>
                    <div class="button-arrow bounce"></div>
                  </div>
                </b-col>
              </div>
            </div>
          </b-row>
        </b-container>

        <!-- end third screen -->
        <!--jump Screen four (Weine) from buton 2 + 3 -->
        <div fluid class="step products" v-if="jumpfourthScreen">
          <b-row>
            <b-col class="d-flex justify-content-center mt-4">
              <h1 class="animated fadeIn delay-0.6s">
                {{ question }}
              </h1>
            </b-col>
          </b-row>
          <b-row class="d-flex justify-content-center">
            <carousel
              v-bind:navigation-enabled="true"
              :paginationEnabled="true"
              :navigationPrevLabel="navigationPrev"
              :navigationNextLabel="navigationNext"
              navigationColor="#d8d8d8"
              paginationActiveColor="#7d1125"
              paginationColor="#80585f"
              :paginationSize="10"
              :centerMode="true"
              :autoplay="true"
              v-bind:autoplayTimeout="3000"
              :perPageCustom="[
                [1000, 3],
                [600, 3],
                [300, 1],
              ]"
              :speed="800"
              :loop="true"
              :touchDrag="true"
              class="owl-carousel team"
            >
              <slide
                v-for="(item, index) in wines"
                :key="index"
                class="linkbox"
              >
                <a v-bind:href="item.trackurl" target="_blank">
                  <div v-if="$isMobile()" class="productbox">
                    <img
                      v-if="item.image"
                      class="splash"
                      :src="require(`@/assets/images/${item.farbe}.png`)"
                    />
                    <img
                      v-if="item.image"
                      class="productImage"
                      :src="require(`@/assets/images/products/${item.image}`)"
                    />
                    <div v-else class="justify-content-center mt-8">
                      <b-spinner variant="secondary"></b-spinner>
                    </div>
                    <div class="buttontext" v-html="item.name"></div>
                    <div class="productarrow"></div>
                  </div>
                  <div
                    v-else
                    class="productbox"
                    :class="[`animated fadeInUpShort delay-${index}s`]"
                  >
                    <img
                      v-if="item.image"
                      class="splash"
                      :class="[`animated zoomIn delay-${index}s`]"
                      :src="require(`@/assets/images/${item.farbe}.png`)"
                    />
                    <img
                      v-if="item.image"
                      class="productImage"
                      :src="require(`@/assets/images/products/${item.image}`)"
                    />
                    <div v-else class="justify-content-center mt-8">
                      <b-spinner variant="secondary"></b-spinner>
                    </div>
                    <div class="buttontext" v-html="item.name"></div>
                    <div
                      class="productarrow"
                      :class="[`animated heartBeat delay-${index}s`]"
                    ></div>
                  </div>
                </a>
              </slide>
            </carousel>
          </b-row>
        </div>
        <!--end jump Screen four (Weine) from buton 2 + 3 -->
        <!-- fourth screen (Weine) -->
        <div fluid class="step products" v-if="fourthScreen">
          <b-row>
            <b-col class="d-flex justify-content-center">
              <h1 class="animated fadeIn delay-0.6s mt-4">
                {{
                  jsondata.anlaesse[anlassid].values[foodcat].values[foodid]
                    .question
                }}
              </h1>
            </b-col>
          </b-row>
          <b-row class="d-flex justify-content-center">
            <carousel
              v-bind:navigation-enabled="true"
              :paginationEnabled="true"
              :navigationPrevLabel="navigationPrev"
              :navigationNextLabel="navigationNext"
              navigationColor="#d8d8d8"
              paginationActiveColor="#7d1125"
              paginationColor="#80585f"
              :paginationSize="10"
              :centerMode="true"
              :autoplay="true"
              v-bind:autoplayTimeout="3000"
              :perPageCustom="[
                [1000, 3],
                [600, 3],
                [300, 1],
              ]"
              :speed="800"
              :loop="true"
              :touchDrag="true"
              class="owl-carousel team"
            >
              <slide
                v-for="(item, index) in jsondata.anlaesse[anlassid].values[
                  foodcat
                ].values[foodid].wines"
                :key="index"
                class="linkbox"
              >
                <a v-bind:href="item.trackurl" target="_blank">
                  <div v-if="$isMobile()" class="productbox">
                    <img
                      v-if="item.image"
                      class="splash"
                      :src="require(`@/assets/images/${item.farbe}.png`)"
                    />
                    <img
                      v-if="item.image"
                      class="productImage"
                      :src="require(`@/assets/images/products/${item.image}`)"
                    />
                    <div v-else class="justify-content-center mt-8">
                      <b-spinner variant="secondary"></b-spinner>
                    </div>
                    <div class="buttontext" v-html="item.name"></div>
                    <div class="productarrow"></div>
                  </div>
                  <div
                    v-else
                    class="productbox"
                    :class="[`animated fadeInUpShort delay-${index}s`]"
                  >
                    <img
                      v-if="item.image"
                      class="splash"
                      :class="[`animated zoomIn delay-${index}s`]"
                      :src="require(`@/assets/images/${item.farbe}.png`)"
                    />
                    <img
                      v-if="item.image"
                      class="productImage"
                      :src="require(`@/assets/images/products/${item.image}`)"
                    />
                    <div v-else class="justify-content-center mt-8">
                      <b-spinner variant="secondary"></b-spinner>
                    </div>
                    <div class="buttontext" v-html="item.name"></div>
                    <div
                      class="productarrow"
                      :class="[`animated heartBeat delay-${index}s`]"
                    ></div>
                  </div>
                </a>
              </slide>
            </carousel>
          </b-row>
        </div>

        <!-- end fourth screen -->
        <div
          id="goBack"
          class="goBack"
          v-if="jumpfourthScreen || fourthScreen"
          v-on:click="resetAll()"
        >
          <img class="backicon" src="@/assets/images/backButton-dark.svg" />
        </div>
        <div id="goBack" class="goBack" v-else v-on:click="resetAll()">
          <img class="backicon" src="@/assets/images/backButton-dark.svg" />
        </div>

        <b-container class="logos">
          <b-row class="d-flex justify-content-center">
            <img class="logo" src="@/assets/images/HAW_Logo_rgb_full.svg" />
            <img
              class="logo-dark"
              src="@/assets/images/HAW_Logo_rgb-dark.svg"
            />
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import { gsap } from "gsap";

export default {
  components: {},
  data: () => ({
    mobile: false,
    firstScreen: true,
    secondScreen: false,
    thirdScreen: false,
    fourthScreen: false,
    jumpfourthScreen: false,
    anlassid: null,
    foodcat: null,
    foodid: null,
    wines: null,
  }),
  computed: {
    navigationNext: function () {
      return `<img src="/images/arrow-red.svg">`;
    },
    navigationPrev: function () {
      return `<img src="/images/arrow-red.svg">`;
    },
    ...mapGetters({
      setAnlass: "setAnlass",
    }),
    jsondata() {
      return this.$store.state.anlass;
    },
  },
  mounted() {
    this.$store.dispatch("setAnlass");
  },

  methods: {
    resetAll() {
      this.foodcat = 0;
      this.foodid = 0;
      this.wines = 0;
      this.firstScreen = true;
      this.secondScreen = false;
      this.thirdScreen = false;
      this.fourthScreen = false;
      this.jumpfourthScreen = false;

      var widget = document.getElementById("widget");
      widget.classList.add("show-bg2");

      gsap.to(".beigeCircle", { duration: 1, opacity: 1, delay: 1 });

      gsap.to(".introBottles", { duration: 1, opacity: 1, delay: 1 });

      gsap.to("#cta", { duration: 1, opacity: 1, delay: 0.5 });

      var cta = document.getElementById("cta");
      cta.style.setProperty("--animate-repeat", "4");

      gsap.to(".logo", { duration: 1, opacity: 1, delay: 1.2 });

      gsap.to(".logo-dark", { duration: 0.5, opacity: 0 });

      gsap.set("#goBack", { opacity: 0 });

      var goBack = document.getElementById("goBack");
      goBack.style.setProperty("display", "none");
      document.querySelector("#goBack").disabled = true;
    },
    changeToScreen2(anlassid) {
      this.firstScreen = false;
      this.secondScreen = true;
      this.anlassid = anlassid;

      var goBack = document.getElementById("goBack");
      goBack.style.setProperty("display", "block");
      gsap.set("#goBack", { opacity: 0.5 });

      var widget = document.getElementById("widget");
      widget.classList.add("show-bg2");
    },
    changeToScreen3(foodcat) {
      this.secondScreen = false;
      this.thirdScreen = true;
      this.foodcat = foodcat;
      gsap.set("#goBack", { opacity: 0.5 });
    },
    jumpToScreen4(foodcat, question, wines) {
      this.secondScreen = false;
      this.jumpfourthScreen = true;
      this.foodcat = foodcat;
      this.wines = wines;
      this.question = question;

      gsap.to(".logo", { duration: 0.5, opacity: 0 });
      gsap.to(".logo-dark", { duration: 0.5, opacity: 1 });

      gsap.to(".beigeCircle", { duration: 0.5, opacity: 0 });
      gsap.to(".cta", { duration: 0.5, opacity: 0 });

      gsap.to(".introBottles", { duration: 0.5, opacity: 0 });

      var widget = document.getElementById("widget");
      widget.classList.remove("show-bg2");
    },
    changeToScreen4(foodid) {
      /**/ this.thirdScreen = false;
      this.fourthScreen = true;
      this.foodid = foodid;
      gsap.to(".logo", { duration: 0.5, opacity: 0 });
      gsap.to(".logo-dark", { duration: 0.5, opacity: 1 });
      gsap.to(".beigeCircle", { duration: 0.5, opacity: 0 });
      gsap.to(".cta", { duration: 0.5, opacity: 0 });
      // $(".circleSplash").fadeTo(500, 0);
      gsap.to(".introBottles", { duration: 0.5, opacity: 0 });

      var widget = document.getElementById("widget");
      widget.classList.remove("show-bg2");
    },
    colorfill() {
      var widget = document.getElementById("widget");
      widget.style.setProperty("background-color", "#ffffff");
    },
  },
};
</script>
<style scoped lang="scss">
.widget {
  position: relative;
  font-family: "Spartan-Regular";
  color: #ffffff;
  border: 1px solid $darkText;
  /* mobile */
  width: 320px;
  height: 360px;
  -webkit-transition-property: background-color;
  -o-transition-property: background-color;
  transition-property: background-color;
  -webkit-transition-duration: 0.8s;
  -o-transition-duration: 0.8s;
  transition-duration: 0.8s;
  /* transition-delay: 1s; */
  overflow: hidden;
  @include breakpoints-between(sm, md) {
    width: 720px;
    height: 360px;
  }

  @include breakpoints-up(lg) {
    /* desktop */
    width: 616px;
    height: 360px;
  }

  .step {
    position: absolute;
    top: 50px;
    left: 0;
    text-align: center;
    @include breakpoints-between(sm, md) {
      top: 20px;
    }
    @include breakpoints-up(lg) {
      top: 20px;
    }
  }
  .foods .buttoncontainer {
    padding: 0px 4px;
    @include breakpoints-between(sm, md) {
      padding: 0px 30px;
    }
    @include breakpoints-up(lg) {
      padding: 0px 30px;
    }
  }
  .buttoncontainer {
    height: 200px;
    padding: 10px 24px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-line-pack: center;
    align-content: flex-start;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    text-align: -webkit-center;
    @include breakpoints-between(sm, md) {
      /* tablet */
      justify-content: center;
      text-align: left;
      padding: 0px 30px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      -ms-flex-line-pack: center;
      align-content: flex-start;
      flex-wrap: wrap;
      justify-content: center;
      align-items: flex-start;
      text-align: left;
    }
    @include breakpoints-up(lg) {
      /* desktop */
      justify-content: center;
      text-align: left;
      padding: 0px 30px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      -ms-flex-line-pack: center;
      align-content: flex-start;
      flex-wrap: wrap;
      justify-content: center;
      align-items: flex-start;
      text-align: left;
    }
  }

  .intro .button {
    width: 210px;
  }

  .button {
    position: relative;
    width: 238px;
    height: 35px;
    padding: 6px 10px 10px 26px;
    margin-bottom: 10px;
    border-radius: 20px;
    -webkit-box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.15);
    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.15);
    background-color: $darkText;
    text-align: left;
    cursor: pointer;
    -webkit-transition: -webkit-transform cubic-bezier(0.45, 0, 0.55, 1) 0.3s;
    transition: -webkit-transform cubic-bezier(0.45, 0, 0.55, 1) 0.3s;
    -o-transition: transform cubic-bezier(0.45, 0, 0.55, 1) 0.3s;
    transition: transform cubic-bezier(0.45, 0, 0.55, 1) 0.3s;
    transition: transform cubic-bezier(0.45, 0, 0.55, 1) 0.3s,
      -webkit-transform cubic-bezier(0.45, 0, 0.55, 1) 0.3s;
    @include breakpoints-between(sm, md) {
      /* tablet */
      width: 260px;
      height: 40px;
      padding: 10px 10px 10px 26px;
    }
    @include breakpoints-up(lg) {
      /* desktop */
      width: 260px;
      height: 40px;
      padding: 10px 10px 10px 26px;
    }
  }
  .button-arrow {
    position: absolute;
    width: 17px;
    height: 14px;
    right: 20px;
    top: 32%;
    background-image: url("./assets/images/arrow-red.svg");
    background-repeat: no-repeat;
    background-size: 17px 14px;
    background-position: 0;
    -webkit-transition: all 0.25s cubic-bezier(0.31, -0.105, 0.43, 1.4);
    -o-transition: all 0.25s cubic-bezier(0.31, -0.105, 0.43, 1.4);
    transition: all 0.25s cubic-bezier(0.31, -0.105, 0.43, 1.4);
  }
  .button:hover {
    -ms-transform: scale(1);
    -webkit-transform: scale(1);
    transform: scale(1);
    @include breakpoints-between(sm, md) {
      /* tablet */
      -ms-transform: scale(1);
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    @include breakpoints-up(lg) {
      /* desktop */
      -ms-transform: scale(1);
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  .bounce {
    -webkit-animation: none;
    animation: none;
    @include breakpoints-between(sm, md) {
      /* tablet */
      -webkit-animation: bounce 2s infinite;
      animation: bounce 2s infinite;
    }
    @include breakpoints-up(lg) {
      /* desktop */
      -webkit-animation: bounce 2s infinite;
      animation: bounce 2s infinite;
    }
  }

  @-webkit-keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    40% {
      -webkit-transform: translateX(-6px);
      transform: translateX(-6px);
    }
    60% {
      -webkit-transform: translateX(-5px);
      transform: translateX(-5px);
    }
  }
  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    40% {
      -webkit-transform: translateX(-6px);
      transform: translateX(-6px);
    }
    60% {
      -webkit-transform: translateX(-5px);
      transform: translateX(-5px);
    }
  }
  .buttontext {
    font-family: "Spartan-Bold";
    font-size: 14px;

    color: $primaryText;
    cursor: pointer;
    @include breakpoints-between(sm, md) {
      /* tablet */
      font-size: 15px;
    }
    @include breakpoints-up(lg) {
      /* desktop */
      font-size: 15px;
    }
  }

  .scrollContent {
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    white-space: nowrap;
    max-height: 190px;
    width: 303px;
    overflow-y: scroll;
    scrollbar-color: red yellow;
    @include breakpoints-up(sm) {
      /* desktop */
      width: 320px;
    }
  }
  #style-red::-webkit-scrollbar-track {
    background-color: #ffffff;
  }

  #style-red::-webkit-scrollbar {
    width: 8px;
    background-color: #ffffff;
  }

  #style-red::-webkit-scrollbar-thumb {
    background-color: $darkText;
  }

  .gridcontent {
    position: unset;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    max-width: 22.5rem;
    margin: 0 auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-between;
    align-items: center;
    @include breakpoints-between(sm, md) {
      /* tablet */
      position: absolute;
      top: 140px;
    }
    @include breakpoints-up(lg) {
      /* desktop */
      position: absolute;
      top: 140px;
    }
    /*display: -ms-grid;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 3.5rem;
    gap: 4px;
    width: 100%;
    max-width: 22.5rem;
    margin: 0 auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;*/
  }
  .gridcontent .button {
    width: 140px;
    text-align: left;
    padding-left: 20px;
    @include breakpoints-between(sm, md) {
      /* tablet */
      width: 160px;
    }
    @include breakpoints-up(lg) {
      /* desktop */
      width: 160px;
    }
  }

  .product-grid {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    text-align: center;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -ms-flex-line-pack: center;
    align-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: flex-start;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    text-align: center;
  }
  .linkbox {
    position: relative;
    height: 294px;
    width: 206px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    background-color: #ffffff04;
    -ms-flex-line-pack: center;
    align-content: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;

    @include breakpoints-between(sm, md) {
      /* tablet */
      height: 304px;
    }
    @include breakpoints-up(lg) {
      /* desktop */
      height: 304px;
    }
  }
  .linkbox::after {
    content: "";
    position: absolute;
    height: 315px;
    border-right: 1px solid #f4f3ef;
  }
  .linkbox::after:nth-of-type(3) {
    border-right: none;
  }
  .productbox {
    position: relative;
    height: 284px;
    width: 204px;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    padding-top: 60px;
    margin: 0 auto;
    list-style: none;
    width: 100%;
    height: auto;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }

  .productbox .buttontext {
    position: absolute;
    width: 100%;
    height: 60px;
    left: 0;
    bottom: 0;
    background-color: $darkText;
    font-family: "Spartan-Regular";
    font-size: 14px;
    font-weight: 100;
    line-height: 1.36;
    color: #ffffff;
    padding: 10px 10px;
    cursor: pointer;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    @include breakpoints-between(sm, md) {
      height: 78px;
    }

    @include breakpoints-up(lg) {
      height: 78px;
    }
  }
  .productbox .productarrow {
    position: absolute;
    width: 40px;
    height: 40px;
    bottom: 50px;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 50%;
    background-image: url("./assets/images/productArrow.svg");
    background-repeat: no-repeat;
    background-size: 40px;
    background-position: 0;
    @include breakpoints-between(sm, md) {
      bottom: 68px;
    }

    @include breakpoints-up(lg) {
      bottom: 68px;
    }
  }
  .productImage {
    position: absolute;
    height: 180px;
    width: auto;
    bottom: 96px;
    left: 0;
    right: 0;
    margin: 0 auto;
    @include breakpoints-between(sm, md) {
      bottom: 110px;
    }

    @include breakpoints-up(lg) {
      bottom: 110px;
    }
  }
  .splash {
    position: absolute;
    width: 184px;
    height: 210px;
    bottom: 65px;
    left: 0;
    right: 0;
    margin: 0 auto;
    @include breakpoints-between(sm, md) {
      bottom: 82px;
    }

    @include breakpoints-up(lg) {
      bottom: 82px;
    }
  }

  .products {
    position: relative;
    height: 100%;
    width: 100%;
    margin-top: -46px;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    @include breakpoints-between(sm, md) {
      margin-top: -20px;
    }

    @include breakpoints-up(lg) {
      margin-top: -20px;
    }
  }
  .products h1 {
    color: #6a0d24;
  }

  .goBack {
    position: absolute;
    height: 30px;
    width: 30px;
    top: 60px;
    left: 7px;
    @include breakpoints-between(sm, md) {
      top: 132px;
    }

    @include breakpoints-up(lg) {
      top: 132px;
    }
    img {
      height: 30px;
      width: 30px;
    }
  }
  .goBack {
    opacity: 0;
    cursor: pointer;
    -webkit-transition: opacity cubic-bezier(0.45, 0, 0.55, 1) 0.3s;
    -o-transition: opacity cubic-bezier(0.45, 0, 0.55, 1) 0.3s;
    transition: opacity cubic-bezier(0.45, 0, 0.55, 1) 0.3s;
  }
  .goBack:hover {
    opacity: 1 !important;
  }
  .VueCarousel {
    position: unset;
  }
  .VueCarousel-dot {
    display: inline-block;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    background-clip: content-box;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    padding: 0;
    border-radius: 100%;
    outline: none !important;
    outline: 0;
  }

  .VueCarousel-dot:active {
    outline: 0;
  }

  .VueCarousel-dot--active {
    outline: 0;
  }

  .VueCarousel-dot-container button {
    margin-top: 0px !important;
    margin-left: 2px !important;
    margin-right: 2px !important;
    padding: 2px !important;
    width: 18px !important;
    height: 18px !important;
  }
  .logo-dark {
    position: absolute;
    top: 10px;
    right: 10px;
    height: 40px;
    width: auto;
    opacity: 0;
    @include breakpoints-between(sm, md) {
      top: 20px;
      right: 15px;
    }

    @include breakpoints-up(lg) {
      /* desktop */
      top: 20px;
      right: 15px;
    }
  }
}
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 1) {
  .widget {
    width: 720px;
    height: 360px;
  }
  /*.bounce {
    -webkit-animation: none;
    animation: none;
  }*/
}

.widget.show-bg2 {
  background-color: $primary !important;
  border: 1px solid $darkText;
}
.widget.show-bg {
  background-color: $primary !important;
  border: 1px solid $darkText;
  background-image: url("./assets/images/oil-splash.png");
  background-repeat: no-repeat;

  background-size: 36%;
  background-position: 0% 100%;
  /*transition: all 0.5s cubic-bezier(0.31, -0.105, 0.43, 1.4);*/
  @include breakpoints-between(sm, md) {
    background-size: 26%;
  }

  @include breakpoints-up(lg) {
    /* desktop */
    background-size: 26%;
  }
}
.beigeCircle {
  position: absolute;
  height: 62px;
  width: 320px;
  top: unset;
  bottom: 0px;
  right: 0px;
  background-color: #fcdc77;

  @include breakpoints-between(sm, md) {
    height: 400px;
    width: 143px;
    top: 0px;
    bottom: unset;
    right: 0px;
  }

  @include breakpoints-up(lg) {
    /* desktop */
    height: 400px;
    width: 143px;
    top: 0px;
    bottom: unset;
    right: 0px;
  }
}
.circleSplash {
  position: absolute;
  top: -174px;
  right: -291px;
  height: 1104px;
  width: 876px;
  background-image: url("./assets/images/Splash.png");
  background-repeat: no-repeat;

  background-size: 100%;
  background-position: 50% 50%;
  /* transition: all 0.5s cubic-bezier(0.31, -0.105, 0.43, 1.4); */
  @include breakpoints-between(sm, md) {
    background-size: 100%;
  }

  @include breakpoints-up(lg) {
    /* desktop */
    background-size: 100%;
  }
}
.introBottles {
  position: absolute;
  height: 268px;
  width: 292px;
  top: 190px;
  right: 10px;

  .bottlesMobile {
    height: 268px;
    width: 292px;
  }
  .bottlesDesktop {
    width: 296px;
    height: 430px;
  }
  @include breakpoints-between(sm, md) {
    top: -28px;
    right: -15px;
    height: 430px;
    width: 296px;
  }
  @include breakpoints-up(lg) {
    /* desktop */
    height: 430px;
    width: 296px;
    top: -33px;
    right: -15px;
  }
}
.cta {
  position: absolute;
  height: 70px;
  width: 70px;
  bottom: 10px;
  right: 10px;
  img {
    height: 70px;
    width: 70px;
  }
  @include breakpoints-between(sm, md) {
    height: 84px;
    width: 84px;
    bottom: 10px;
    right: 10px;
    img {
      height: 84px;
      width: 84px;
    }
  }
  @include breakpoints-up(lg) {
    /* desktop */
    height: 84px;
    width: 84px;
    bottom: 10px;
    right: 10px;
    img {
      height: 84px;
      width: 84px;
    }
  }
}
</style>