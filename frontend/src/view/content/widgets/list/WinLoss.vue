<template>
  <!--begin::List Widget 1-->
  <div class="card card-custom card-stretch gutter-b">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title font-weight-bolder text-dark">
        Win / Loss (Network : {{ networkTitle }})
      </h3>
      <div class="card-toolbar"></div>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body pt-2">
      <div class="d-flex align-items-center mb-10">
        <!--begin::Symbol-->
        <div class="symbol symbol-40 symbol-light-primary mr-5">
          <span class="symbol-label">
            <span class="svg-icon svg-icon-lg svg-icon-success">
              <!--begin::Svg Icon-->
              <inline-svg src="media/svg/icons/Home/Library.svg"></inline-svg>
              <!--end::Svg Icon-->
            </span>
          </span>
        </div>
        <!--end::Symbol-->
        <!--begin::Text-->
        <div class="d-flex flex-column font-weight-bold">
          <a href="#" class="text-dark text-hover-primary mb-1 font-size-lg">
            Win Count
          </a>
          <span class="text-muted">
            {{ winLoss.winCount }}
          </span>
        </div>
        <!--end::Text-->
      </div>
      <div class="d-flex align-items-center mb-10">
        <!--begin::Symbol-->
        <div class="symbol symbol-40 symbol-light-primary mr-5">
          <span class="symbol-label">
            <span class="svg-icon svg-icon-lg svg-icon-danger">
              <!--begin::Svg Icon-->
              <inline-svg src="media/svg/icons/Home/Library.svg"></inline-svg>
              <!--end::Svg Icon-->
            </span>
          </span>
        </div>
        <!--end::Symbol-->
        <!--begin::Text-->
        <div class="d-flex flex-column font-weight-bold">
          <a href="#" class="text-dark text-hover-primary mb-1 font-size-lg">
            Loss Count
          </a>
          <span class="text-muted">
            {{ winLoss.lossCount }}
          </span>
        </div>
        <!--end::Text-->
      </div>
      <div class="d-flex align-items-center mb-10">
        <!--begin::Symbol-->
        <div class="symbol symbol-40 symbol-light-primary mr-5">
          <span class="symbol-label">
            <span class="svg-icon svg-icon-lg svg-icon-info">
              <!--begin::Svg Icon-->
              <inline-svg src="media/svg/icons/Home/Library.svg"></inline-svg>
              <!--end::Svg Icon-->
            </span>
          </span>
        </div>
        <!--end::Symbol-->
        <!--begin::Text-->
        <div class="d-flex flex-column font-weight-bold">
          <a href="#" class="text-dark text-hover-primary mb-1 font-size-lg">
            Draw Count
          </a>
          <span class="text-muted">
            {{ winLoss.drawCount }}
          </span>
        </div>
        <!--end::Text-->
      </div>

      <div class="d-flex align-items-center mb-10">
        <!--begin::Symbol-->
        <div class="symbol symbol-40 symbol-light-primary mr-5">
          <span class="symbol-label">
            <span class="svg-icon svg-icon-lg svg-icon-warning">
              <!--begin::Svg Icon-->
              <inline-svg src="media/svg/icons/Home/Library.svg"></inline-svg>
              <!--end::Svg Icon-->
            </span>
          </span>
        </div>
        <!--end::Symbol-->
        <!--begin::Text-->
        <div class="d-flex flex-column font-weight-bold">
          <a href="#" class="text-dark text-hover-primary mb-1 font-size-lg">
            Total Count
          </a>
          <span class="text-muted">
            {{ winLoss.totalCount }}
          </span>
        </div>
        <!--end::Text-->
      </div>

      <div class="d-flex align-items-center mb-10">
        <!--begin::Symbol-->
        <div class="symbol symbol-40 symbol-light-primary mr-5">
          <span class="symbol-label">
            <span class="svg-icon svg-icon-lg svg-icon-success">
              <!--begin::Svg Icon-->
              <inline-svg src="media/svg/icons/Home/Library.svg"></inline-svg>
              <!--end::Svg Icon-->
            </span>
          </span>
        </div>
        <!--end::Symbol-->
        <!--begin::Text-->
        <div class="d-flex flex-column font-weight-bold">
          <a href="#" class="text-dark text-hover-primary mb-1 font-size-lg">
            Win ETH
          </a>
          <span class="text-muted">
            {{ winLoss.winEth }}
          </span>
        </div>
        <!--end::Text-->
      </div>

      <div class="d-flex align-items-center mb-10">
        <!--begin::Symbol-->
        <div class="symbol symbol-40 symbol-light-primary mr-5">
          <span class="symbol-label">
            <span class="svg-icon svg-icon-lg svg-icon-danger">
              <!--begin::Svg Icon-->
              <inline-svg src="media/svg/icons/Home/Library.svg"></inline-svg>
              <!--end::Svg Icon-->
            </span>
          </span>
        </div>
        <!--end::Symbol-->
        <!--begin::Text-->
        <div class="d-flex flex-column font-weight-bold">
          <a href="#" class="text-dark text-hover-primary mb-1 font-size-lg">
            Loss Eth
          </a>
          <span class="text-muted">
            {{ winLoss.lossEth }}
          </span>
        </div>
        <!--end::Text-->
      </div>

      <div class="d-flex align-items-center mb-10">
        <!--begin::Symbol-->
        <div class="symbol symbol-40 symbol-light-primary mr-5">
          <span class="symbol-label">
            <span class="svg-icon svg-icon-lg svg-icon-success">
              <!--begin::Svg Icon-->
              <inline-svg src="media/svg/icons/Home/Library.svg"></inline-svg>
              <!--end::Svg Icon-->
            </span>
          </span>
        </div>
        <!--end::Symbol-->
        <!--begin::Text-->
        <div class="d-flex flex-column font-weight-bold">
          <a href="#" class="text-dark text-hover-primary mb-1 font-size-lg">
            Win USDT
          </a>
          <span class="text-muted">
            {{ winLoss.winUsdt }}
          </span>
        </div>
        <!--end::Text-->
      </div>

      <div class="d-flex align-items-center mb-10">
        <!--begin::Symbol-->
        <div class="symbol symbol-40 symbol-light-primary mr-5">
          <span class="symbol-label">
            <span class="svg-icon svg-icon-lg svg-icon-danger">
              <!--begin::Svg Icon-->
              <inline-svg src="media/svg/icons/Home/Library.svg"></inline-svg>
              <!--end::Svg Icon-->
            </span>
          </span>
        </div>
        <!--end::Symbol-->
        <!--begin::Text-->
        <div class="d-flex flex-column font-weight-bold">
          <a href="#" class="text-dark text-hover-primary mb-1 font-size-lg">
            Loss USDT
          </a>
          <span class="text-muted">
            {{ winLoss.lossUsdt }}
          </span>
        </div>
        <!--end::Text-->
      </div>

      <div class="d-flex align-items-center mb-10">
        <!--begin::Symbol-->
        <div class="symbol symbol-40 symbol-light-primary mr-5">
          <span class="symbol-label">
            <span class="svg-icon svg-icon-lg svg-icon-warning">
              <!--begin::Svg Icon-->
              <inline-svg src="media/svg/icons/Home/Library.svg"></inline-svg>
              <!--end::Svg Icon-->
            </span>
          </span>
        </div>
        <!--end::Symbol-->
        <!--begin::Text-->
        <div class="d-flex flex-column font-weight-bold">
          <a href="#" class="text-dark text-hover-primary mb-1 font-size-lg">
            ETH Average Bet Amount
          </a>
          <span class="text-muted">
            {{ winLoss.avgEth }}
          </span>
        </div>
        <!--end::Text-->
      </div>

      <div class="d-flex align-items-center mb-10">
        <!--begin::Symbol-->
        <div class="symbol symbol-40 symbol-light-primary mr-5">
          <span class="symbol-label">
            <span class="svg-icon svg-icon-lg svg-icon-info">
              <!--begin::Svg Icon-->
              <inline-svg src="media/svg/icons/Home/Library.svg"></inline-svg>
              <!--end::Svg Icon-->
            </span>
          </span>
        </div>
        <!--end::Symbol-->
        <!--begin::Text-->
        <div class="d-flex flex-column font-weight-bold">
          <a href="#" class="text-dark text-hover-primary mb-1 font-size-lg">
            USDT Average Bet Amount
          </a>
          <span class="text-muted">
            {{ winLoss.avgUsdt }}
          </span>
        </div>
        <!--end::Text-->
      </div>

      <div class="d-flex align-items-center mb-10">
        <!--begin::Symbol-->
        <div class="symbol symbol-40 symbol-light-primary mr-5">
          <span class="symbol-label">
            <span class="svg-icon svg-icon-lg svg-icon-success">
              <!--begin::Svg Icon-->
              <inline-svg src="media/svg/icons/Home/Library.svg"></inline-svg>
              <!--end::Svg Icon-->
            </span>
          </span>
        </div>
        <!--end::Symbol-->
        <!--begin::Text-->
        <div class="d-flex flex-column font-weight-bold">
          <a href="#" class="text-dark text-hover-primary mb-1 font-size-lg">
            ETH Fee Average
          </a>
          <span class="text-muted">
            {{ winLoss.avgFeeEth }}
          </span>
        </div>
        <!--end::Text-->
      </div>

      <div class="d-flex align-items-center mb-10">
        <!--begin::Symbol-->
        <div class="symbol symbol-40 symbol-light-primary mr-5">
          <span class="symbol-label">
            <span class="svg-icon svg-icon-lg svg-icon-warning">
              <!--begin::Svg Icon-->
              <inline-svg src="media/svg/icons/Home/Library.svg"></inline-svg>
              <!--end::Svg Icon-->
            </span>
          </span>
        </div>
        <!--end::Symbol-->
        <!--begin::Text-->
        <div class="d-flex flex-column font-weight-bold">
          <a href="#" class="text-dark text-hover-primary mb-1 font-size-lg">
            USDT Fee Average
          </a>
          <span class="text-muted">
            {{ winLoss.avgFeeUsdt }}
          </span>
        </div>
        <!--end::Text-->
      </div>

      <div class="d-flex align-items-center mb-10">
        <!--begin::Symbol-->
        <div class="symbol symbol-40 symbol-light-primary mr-5">
          <span class="symbol-label">
            <span class="svg-icon svg-icon-lg svg-icon-danger">
              <!--begin::Svg Icon-->
              <inline-svg src="media/svg/icons/Home/Library.svg"></inline-svg>
              <!--end::Svg Icon-->
            </span>
          </span>
        </div>
        <!--end::Symbol-->
        <!--begin::Text-->
        <div class="d-flex flex-column font-weight-bold">
          <a href="#" class="text-dark text-hover-primary mb-1 font-size-lg">
            ETH Total Fee
          </a>
          <span class="text-muted">
            {{ winLoss.totalFeeEth }}
          </span>
        </div>
        <!--end::Text-->
      </div>

      <div class="d-flex align-items-center mb-10">
        <!--begin::Symbol-->
        <div class="symbol symbol-40 symbol-light-primary mr-5">
          <span class="symbol-label">
            <span class="svg-icon svg-icon-lg svg-icon-info">
              <!--begin::Svg Icon-->
              <inline-svg src="media/svg/icons/Home/Library.svg"></inline-svg>
              <!--end::Svg Icon-->
            </span>
          </span>
        </div>
        <!--end::Symbol-->
        <!--begin::Text-->
        <div class="d-flex flex-column font-weight-bold">
          <a href="#" class="text-dark text-hover-primary mb-1 font-size-lg">
            USDT Total Fee
          </a>
          <span class="text-muted">
            {{ winLoss.totalFeeUsdt }}
          </span>
        </div>
        <!--end::Text-->
      </div>
    </div>
    <!--end::Body-->
  </div>
  <!--end: List Widget 1-->
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_WIN_LOSS } from "../../../../core/services/store/auth.module";

export default {
  name: "win-loss",
  data() {
    return {};
  },
  mounted() {
    this.fetchWinLoss();
  },
  watch: {
    networkId: function(val) {
      this.$store.dispatch(FETCH_WIN_LOSS, val);
    }
  },
  computed: {
    ...mapGetters(["layoutConfig", "winLoss", "networkTitle", "networkId"])
  },
  methods: {
    fetchWinLoss() {
      if (this.networkId) {
        this.$store.dispatch(FETCH_WIN_LOSS, this.networkId);
      }
    }
  }
};
</script>
