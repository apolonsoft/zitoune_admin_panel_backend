<template>
  <!--begin::Advance Table Widget 2-->
  <div class="card card-custom mt-1">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark">
          Trades Total Amounts in Time Frames:
        </span>
      </h3>
      <div class="card-toolbar"></div>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body pt-3 pb-0">
      <!--begin::Table-->
      <div class="table-responsive">
        <table class="table table-borderless table-vertical-center">
          <thead>
            <tr>
              <th class="p-0" style="width: 50px"></th>
              <th class="p-0" style="min-width: 200px"></th>
              <th class="p-0" style="min-width: 200px"></th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, i) in list">
              <tr v-bind:key="i">
                <td class="pl-0 py-4">
                  <div class="symbol symbol-50 symbol-light mr-1">
                    <span class="symbol-label">
                      <img
                        :src="item.text0"
                        class="h-50 align-self-center"
                        alt=""
                      />
                    </span>
                  </div>
                </td>
                <td class="pl-0">
                  <span
                    class="text-dark-75 font-weight-bolder  mb-1 font-size-lg"
                  >
                    {{ item.text1 }}
                  </span>
                  <div>
                    <span class="font-weight-bolder">Time Frame :</span>
                    <span class="text-muted font-weight-bold">
                      {{ item.text2 }}
                    </span>
                  </div>
                </td>
                <td class="text-right">
                  <span
                    class="text-dark-75 font-weight-bolder d-block font-size-lg"
                  >
                    {{ item.text3 }}
                  </span>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <!--end::Table-->
    </div>
    <!--end::Body-->
    <!--end::Advance Table Widget 2-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "widget-2",
  data() {
    return {};
  },
  components: {},
  computed: {
    ...mapGetters(["layoutConfig", "winLoss"]),
    list() {
      return [
        {
          text0: "media/svg/misc/013-rgb.svg",
          text1: "ETH",
          text2: "Last 24 Hours",
          text3: this.winLoss ? this.winLoss.totalEth24 : "0 ETH"
        },
        {
          text0: "media/svg/misc/003-puzzle.svg",
          text1: "USDT",
          text2: "Last 24 Hours",
          text3: this.winLoss ? this.winLoss.totalUsdt24 : "0 USDT"
        },
        {
          text0: "media/svg/misc/013-rgb.svg",
          text1: "ETH",
          text2: "Last Week",
          text3: this.winLoss ? this.winLoss.totalEthWeek : "0 ETH"
        },
        {
          text0: "media/svg/misc/003-puzzle.svg",
          text1: "USDT",
          text2: "Last Week",
          text3: this.winLoss ? this.winLoss.totalUsdtWeek : "0 USDT"
        },
        {
          text0: "media/svg/misc/013-rgb.svg",
          text1: "ETH",
          text2: "Last Month",
          text3: this.winLoss ? this.winLoss.totalEthMonth : "0 ETH"
        },
        {
          text0: "media/svg/misc/003-puzzle.svg",
          text1: "USDT",
          text2: "Last Month",
          text3: this.winLoss ? this.winLoss.totalUsdtMonth : "0 USDT"
        },
        {
          text0: "media/svg/misc/013-rgb.svg",
          text1: "ETH",
          text2: "Last 3 Months",
          text3: this.winLoss ? this.winLoss.totalEth3Month : "0 ETH"
        },
        {
          text0: "media/svg/misc/003-puzzle.svg",
          text1: "USDT",
          text2: "Last 3 Months",
          text3: this.winLoss ? this.winLoss.totalUsdt3Month : "0 USDT"
        },
        {
          text0: "media/svg/misc/013-rgb.svg",
          text1: "ETH",
          text2: "Last 6 Months",
          text3: this.winLoss ? this.winLoss.totalEth6Month : "0 ETH"
        },
        {
          text0: "media/svg/misc/003-puzzle.svg",
          text1: "USDT",
          text2: "Last 6 Months",
          text3: this.winLoss ? this.winLoss.totalUsdt6Month : "0 USDT"
        }
      ];
    }
  }
};
</script>
