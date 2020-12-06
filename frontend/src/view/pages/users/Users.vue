<template>
  <div class="row">
    <div class="col-md-12">
      <KTCard>
        <template v-slot:title>
          <h3 class="card-title">
            <slot name="title">
              <p>
                Users
              </p>
            </slot>
          </h3>
        </template>
        <template v-slot:body>
          <v-data-table
            :headers="headers"
            :items="users"
            item-key="id"
            class="elevation-1"
            :options.sync="options"
            :server-items-length="totalUsers"
            :loading="usersLoading"
          >
            <template v-slot:top>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="3" md="3">
                    <v-combobox
                      v-model="selectedSearchColumn"
                      :items="searchColumns"
                      label="Column"
                      outlined
                    />
                  </v-col>
                  <v-col cols="12" sm="7" md="7">
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
                <v-dialog v-model="showUserDialog" max-width="650px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ showedUserDialogTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="12" md="12">
                            <v-text-field
                              readonly
                              v-model="editedUser.address"
                              label="User"
                            />
                          </v-col>
                          <v-col cols="12" sm="4" md="4">
                            <v-text-field
                              readonly
                              :value="weiToEth(editedUser.ethBalance)"
                              label="ETH Balance"
                            />
                          </v-col>
                          <v-col cols="12" sm="4" md="4">
                            <v-text-field
                              readonly
                              :value="weiToEth(editedUser.usdtBalance)"
                              label="USDT Balance"
                            />
                          </v-col>
                          <v-col cols="12" sm="4" md="4">
                            <v-text-field
                              readonly
                              :value="editedUser.networkId"
                              label="Network ID"
                            />
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-checkbox
                              label="ETH Withdraw Requested"
                              readonly
                              :value="editedUser.ethWithdrawRequested"
                            />
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-checkbox
                              label="USDT Withdraw Requested"
                              readonly
                              :value="editedUser.usdtWithdrawRequested"
                            />
                          </v-col>

                          <v-col cols="12" sm="6" md="6">
                            <p>
                              Win / Loss Ratio:
                              <span v-html="editedUser.winLossRatio"></span>
                            </p>
                          </v-col>

                          <v-col cols="12" sm="6" md="6">
                            <p>
                              Deposits / Withdraws :
                              <span
                                v-html="editedUser.depositsWithdraws"
                              ></span>
                            </p>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="closeShowUserDialog"
                      >
                        Close
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="editUserDialog" max-width="500px">
                  <v-card>
                    <v-form
                      ref="userForm"
                      v-model="userFormValid"
                      lazy-validation
                    >
                      <v-card-title>
                        <span class="headline">{{
                          editedUserDialogTitle
                        }}</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="12" md="12">
                              <v-text-field
                                readonly
                                v-model="editedUser.address"
                                label="User"
                              />
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                                v-model="editedUser.ethBalance"
                                label="ETH Balance"
                              />
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                                v-model="editedUser.usdtBalance"
                                label="USDT Balance"
                              />
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                                readonly
                                outlined
                                :value="editedUser.networkId"
                                label="Network ID"
                              />
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-btn color="green darken-1" text @click="saveUser">
                          Save
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="closeEditUserDialog"
                        >
                          Close
                        </v-btn>
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.ethBalance="{ item }">
              {{ weiToEth(item.ethBalance) }}
            </template>
            <template v-slot:item.usdtBalance="{ item }">
              {{ weiToEth(item.usdtBalance) }}
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small @click="showUser(item)">
                mdi-eye
              </v-icon>
              <v-icon small @click="editUser(item)">
                mdi-pencil
              </v-icon>
            </template>
            <template v-slot:item.ethWithdrawRequested="{ item }">
              <v-chip class="ma-2" :color="getColor(item.ethWithdrawRequested)">
                {{ item.ethWithdrawRequested ? "YES" : "NO" }}
              </v-chip>
            </template>

            <template v-slot:item.usdtWithdrawRequested="{ item }">
              <v-chip
                class="ma-2"
                :color="getColor(item.usdtWithdrawRequested)"
              >
                {{ item.usdtWithdrawRequested ? "YES" : "NO" }}
              </v-chip>
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
import { FETCH_USERS } from "@/core/services/store/users.module";
import { mapGetters } from "vuex";
import { ALTER_USER } from "../../../core/services/store/users.module";

export default {
  name: "Users",
  components: {
    KTCard
  },
  data() {
    return {
      options: {},
      searchColumns: ["Address", "ETH Balance", "USDT Balance"],
      search: null,
      selectedSearchColumn: null,
      headers: [
        { text: "Actions", value: "actions", sortable: false },
        { text: "Address", value: "address" },
        { text: "ETH Balance", value: "ethBalance" },
        { text: "USDT Balance", value: "usdtBalance" },
        { text: "Network ID", value: "networkId", sortable: false },
        {
          text: "ETH Withdraw Requested",
          value: "ethWithdrawRequested",
          sortable: false
        },
        {
          text: "USDT Withdraw Requested",
          value: "usdtWithdrawRequested",
          sortable: false
        },
        { text: "Created", value: "created" }
      ],
      editedIndex: -1,
      editedUser: {},
      editedUserDialogTitle: "Edit User",
      showedUserDialogTitle: "User Details",
      showUserDialog: false,
      editUserDialog: false,
      userFormValid: true
    };
  },
  watch: {
    networkId: function() {
      this.fetchUsers();
    },
    options: {
      handler() {
        this.fetchUsers();
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(["users", "totalUsers", "usersLoading", "networkId"])
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Dashboard", route: "users" },
      { title: "Users" }
    ]);
    this.fetchUsers();
  },
  methods: {
    applySearch() {
      this.fetchUsers();
    },
    fetchUsers() {
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
      options.sortBy = options.sortBy.length > 0 ? options.sortBy[0] : "";
      options.sortDesc =
        options.sortDesc.length > 0 ? options.sortDesc[0] : false;
      this.$store.dispatch(FETCH_USERS, options);
    },
    showUser(user) {
      this.editedIndex = this.users.indexOf(user);
      this.editedUser = Object.assign({}, user);
      this.showUserDialog = true;
    },
    editUser(user) {
      this.editedIndex = this.users.indexOf(user);
      this.editedUser = Object.assign({}, user);
      this.editUserDialog = true;
    },
    closeEditUserDialog() {
      this.editUserDialog = false;
    },
    saveUser() {
      if (this.$refs.userForm.validate()) {
        const {
          address,
          ethBalance: eth_balance,
          usdtBalance: usdt_balance
        } = this.editedUser;
        this.$store.dispatch(ALTER_USER, {
          address,
          eth_balance,
          usdt_balance,
          network_id: this.networkId
        });
        this.editUserDialog = false;
      }
    },
    closeShowUserDialog() {
      this.showUserDialog = false;
    },
    weiToEth(value) {
      return Math.round((value / Math.pow(10, 18)) * 100000) / 100000;
    },
    getColor(status) {
      if (!status) return "red";
      return "green";
    }
  }
};
</script>

<style scoped></style>
