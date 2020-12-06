<template>
  <div class="row">
    <div class="col-md-12">
      <KTCard>
        <template v-slot:title>
          <h3 class="card-title">
            <slot name="title">
              <p>
                Withdraw Requests
              </p>
            </slot>
          </h3>
        </template>
        <template v-slot:body>
          <v-data-table
            :headers="headers"
            :items="withdrawRequests"
            item-key="id"
            class="elevation-1"
            :options.sync="options"
            :server-items-length="totalWithdraws"
            :loading="withdrawsLoading"
          >
            <template v-slot:top>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="2" md="2">
                    <v-combobox
                      v-model="selectedSearchColumn"
                      :items="searchColumns"
                      label="Column"
                      outlined
                    />
                  </v-col>
                  <v-col cols="12" sm="8" md="8">
                    <v-text-field
                      v-model="search"
                      label="Search ..."
                      class="mx-4"
                    />
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-btn
                      color="blue darken-1"
                      block
                      elevation="14"
                      large
                      outlined
                      x-large
                      @click="applySearch"
                    >
                      Apply
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
              <v-toolbar flat>
                <v-dialog
                  v-model="rejectDialogVisible"
                  persistent
                  max-width="400"
                >
                  <v-card>
                    <v-form
                      ref="rejectForm"
                      v-model="rejectFormValid"
                      lazy-validation
                    >
                      <v-card-title class="headline">
                        Reject Withdraw Request
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="12" md="12">
                              <v-textarea
                                required
                                :rules="rejectMessageRules"
                                v-model="editedWithdraw.rejectMessage"
                                label="Reject Message"
                              />
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="red darken-1"
                          text
                          @click="rejectDialogVisible = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          :disabled="!rejectFormValid"
                          color="green darken-1"
                          text
                          @click="reject"
                        >
                          Reject
                        </v-btn>
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-dialog>
                <v-dialog
                  v-model="approveDialogVisible"
                  persistent
                  max-width="400"
                >
                  <v-card>
                    <v-card-title class="headline">
                      Approve Withdraw Request
                    </v-card-title>
                    <v-card-text>
                      Are you Sure ?
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="red darken-1"
                        text
                        @click="approveDialogVisible = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        :disabled="!approveFormValid"
                        color="green darken-1"
                        text
                        @click="approve"
                      >
                        Approve
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="showWithdrawDialog" max-width="650px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{
                        showedWithdrawDialogTitle
                      }}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="12" md="12">
                            <v-text-field
                              readonly
                              v-model="editedWithdraw.userAddress"
                              label="User"
                            />
                          </v-col>
                          <v-col cols="12" sm="4" md="4">
                            <v-text-field
                              readonly
                              :value="weiToEth(editedWithdraw.amount)"
                              label="Amount"
                            />
                          </v-col>

                          <v-col cols="12" sm="4" md="4">
                            <v-text-field
                              readonly
                              :value="editedWithdraw.currency"
                              label="Currency"
                            />
                          </v-col>
                          <v-col cols="12" sm="4" md="4">
                            <v-text-field
                              readonly
                              :value="editedWithdraw.status"
                              label="Status"
                            />
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              readonly
                              :value="editedWithdraw.sessionId"
                              label="Session"
                            />
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              readonly
                              :value="editedWithdraw.created"
                              label="Created"
                            />
                          </v-col>
                          <v-col cols="12" sm="12" md="12">
                            <v-textarea
                              readonly
                              :value="editedWithdraw.withdrawRequestSignature"
                              label="Withdraw Request Signature"
                            />
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <p>
                              Reject Message:
                              <span v-html="editedWithdraw.rejectMessage" />
                            </p>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="closeShowWithdrawDialog"
                      >
                        Close
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.amount="{ item }">
              {{ weiToEth(item.amount) }}
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip class="ma-2" :color="getStatusColor(item.status)">
                {{ item.status }}
              </v-chip>
            </template>
            <template v-slot:item.actions1="{ item }">
              <v-icon small class="mr-2" @click="show(item)">
                mdi-eye
              </v-icon>
            </template>
            <template v-slot:item.actions2="{ item }">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6" class="mr-md-3">
                    <v-btn
                      v-if="item.status === 'PENDING'"
                      color="blue darken-2"
                      elevation="5"
                      block
                      outlined
                      @click="showApproveDialog(item)"
                    >
                      Approve
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" class="ml-md-3">
                    <v-btn
                      v-if="
                        item.status === 'PENDING' || item.status === 'APPROVED'
                      "
                      color="red darken-2"
                      elevation="5"
                      block
                      outlined
                      @click="showRejectDialog(item)"
                    >
                      Reject
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </template>
          </v-data-table>
        </template>
      </KTCard>
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import KTCard from "@/view/content/Card.vue";
import { mapGetters } from "vuex";
import {
  FETCH_WITHDRAW_REQUESTS,
  REJECT_WITHDRAW_REQUEST
} from "@/core/services/store/withdrawRequests.module";
import * as Web3Utils from "web3-utils";
import { APPROVE_WITHDRAW_REQUEST } from "../../../core/services/store/withdrawRequests.module";
export default {
  name: "WithdrawRequests",
  components: {
    KTCard
  },
  data() {
    return {
      approveFormValid: true,
      rejectFormValid: true,
      rejectMessageRules: [v => !!v || "Reject Message is required"],
      options: {},
      searchColumns: ["userAddress", "amount"],
      search: null,
      selectedSearchColumn: null,
      headers: [
        { text: "Actions", value: "actions1", sortable: false },
        { text: "User", value: "userAddress" },
        { text: "Amount", value: "amount" },
        { text: "Currency", value: "currency" },
        { text: "Status", value: "status", sortable: false },
        { text: "Created", value: "created" },
        { text: "", value: "actions2", sortable: false }
      ],
      editedIndex: -1,
      editedWithdraw: {},
      editedWithdrawDialogTitle: "Edit Withdraw",
      showedWithdrawDialogTitle: "Withdraw Details",
      showWithdrawDialog: false,
      editWithdrawDialog: false,
      approveDialogVisible: false,
      rejectDialogVisible: false
    };
  },
  watch: {
    networkId: function() {
      this.fetchWithdrawRequests();
    },
    options: {
      handler() {
        this.fetchWithdrawRequests();
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters([
      "withdrawRequests",
      "totalWithdraws",
      "withdrawsLoading",
      "networkId",
      "web3"
    ])
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Dashboard", route: "withdraw-requests" },
      { title: "Withdraw Requests" }
    ]);
    this.fetchWithdrawRequests();
  },
  methods: {
    applySearch() {
      this.fetchWithdrawRequests();
    },
    weiToEth(value) {
      return Math.round((value / Math.pow(10, 18)) * 100000) / 100000;
    },
    fetchWithdrawRequests() {
      const options = Object.assign({}, this.options);
      if (this.search && this.search !== "") {
        options.searchData = {
          column: this.selectedSearchColumn,
          value: this.search
        };
      } else {
        options.searchData = null;
      }
      options.networkId = this.networkId ? this.networkId : 4;
      options.sortBy =
        options.sortBy.length > 0 ? options.sortBy[0] : "created";
      options.sortDesc =
        options.sortDesc.length > 0 ? options.sortDesc[0] : true;

      this.$store.dispatch(FETCH_WITHDRAW_REQUESTS, options);
    },
    getStatusColor(status) {
      switch (status) {
        case "APPROVED":
          return "green";
        case "REJECTED":
          return "red";
        case "PENDING":
          return "warning";
        case "CANCELED":
          return "yellow";
        case "COMPLETED":
          return "info";
      }
    },
    show(withdraw) {
      this.editedIndex = this.withdrawRequests.indexOf(withdraw);
      this.editedWithdraw = Object.assign({}, withdraw);
      this.showWithdrawDialog = true;
    },
    showApproveDialog(withdraw) {
      this.editedIndex = this.withdrawRequests.indexOf(withdraw);
      this.editedWithdraw = Object.assign({}, withdraw);
      this.approveDialogVisible = true;
    },
    showRejectDialog(withdraw) {
      this.editedIndex = this.withdrawRequests.indexOf(withdraw);
      this.editedWithdraw = Object.assign({}, withdraw);
      this.rejectDialogVisible = true;
    },
    async approve() {
      try {
        const w3 = window.web3;
        const user = this.web3.coinbase;
        const {
          id,
          amount: originalAmount,
          userAddress,
          sessionId,
          currency
        } = this.editedWithdraw;
        const divider = 10 ** 12;
        let amount =
          currency === "ETH"
            ? originalAmount
            : Math.floor(originalAmount / divider);
        const messageForSign = Web3Utils.soliditySha3(
          { type: "address", value: userAddress },
          { type: "uint256", value: amount.toString() },
          { type: "uint256", value: sessionId.toString() }
        );
        const signature = await w3.eth.personal.sign(messageForSign, user);
        const approveResult = await this.$store.dispatch(
          APPROVE_WITHDRAW_REQUEST,
          {
            id: id,
            signature,
            user_address: user
          }
        );
        if (!approveResult.success) {
          alert(approveResult.message);
        }

        this.approveDialogVisible = false;
      } catch (e) {
        throw e;
      }
    },
    reject() {
      if (this.$refs.rejectForm.validate()) {
        this.$store.dispatch(REJECT_WITHDRAW_REQUEST, {
          id: this.editedWithdraw.id,
          user_address: this.editedWithdraw.userAddress,
          reject_message: this.editedWithdraw.rejectMessage
        });
        this.rejectDialogVisible = false;
      }
    },
    closeShowWithdrawDialog() {
      this.showWithdrawDialog = false;
    }
  }
};
</script>

<style scoped></style>
