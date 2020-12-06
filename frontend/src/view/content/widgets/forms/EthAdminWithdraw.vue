<template>
  <v-form ref="form" v-model="formValid" lazy-validation>
    <div class="card card-custom bg-gray-100  gutter-b">
      <div class="card-header border-0 bg-primary py-5">
        <h3 class="card-title font-weight-bolder text-white">
          ETH Admin Withdraw
        </h3>
        <div class="card-toolbar"></div>
      </div>
      <div class="card-body p-0 position-relative overflow-hidden">
        <v-container>
          <v-row>
            <v-col cols="12" sm="8" md="8">
              <v-text-field
                required
                v-model="amount"
                label="ETH Withdraw Amount"
              />
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-btn color="green darken-1" block @click="send">
                Send
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";
import * as Web3Utils from "web3-utils";
import ethContractInstance from "@/core/util/ethContractMethods";
export default {
  name: "EthAdminWithdraw",
  data() {
    return {
      amount: "1",
      formValid: true
    };
  },
  computed: {
    ...mapGetters(["blockChainData", "web3"])
  },
  methods: {
    async getGasPrice() {
      let additionalGasPrice = "2";
      additionalGasPrice = Web3Utils.toWei(additionalGasPrice, "gwei");
      additionalGasPrice = new Web3Utils.BN(additionalGasPrice);
      // eslint-disable-next-line no-undef
      let gasPrice = await web3.eth.getGasPrice();
      gasPrice = new Web3Utils.BN(gasPrice);
      gasPrice = gasPrice.add(additionalGasPrice);

      return gasPrice;
    },
    toWeiBN(amount) {
      amount = amount.toString();
      amount = Web3Utils.toWei(amount, "ether");
      amount = new Web3Utils.BN(amount);
      return amount;
    },
    async send() {
      try {
        const contract = await ethContractInstance;
        const user = this.web3.coinbase;
        // const gasPrice = await this.getGasPrice();
        const amount = this.toWeiBN(this.amount);
        const data = {
          user,
          amount
        };
        await contract.withdrawAdmin(data);
      } catch (error) {
        throw error;
      }
    }
  }
};
</script>

<style scoped></style>
