<template>
  <div class="card text-center m-3">
    <!-- {{ deliveries }} -->
    <div v-if="error" class="alert alert-danger">
      <strong>Danger!</strong> {{ error }}
      action.
      <button onClick="window.location.reload();">Refresh Page</button>
    </div>
    <div class="d-flex justify-content-between">
      <div class="form-group">
        <input
          type="number"
          class="form-control"
          placeholder="Enter weight"
          v-model="weight"
        />
      </div>
      <div class="form-group">
        <select
          class="form-select"
          aria-label="Default select example"
          @change="changeLimit"
          v-model="limit"
        >
          <option selected>Open this select menu</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="500">500</option>
        </select>
      </div>
    </div>
    <div v-if="isLoading">
      <div class="loadingio-spinner-pulse-abu97rda9bu">
        <div class="ldio-p0bzoea9v5f">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>

    <div class="card-body">
      <!-- {{ pageOfItems }} -->
      <table v-if="isLoading === false">
        <tr>
          <th>Origin</th>
          <th>Destination</th>
          <th>Products</th>
          <th>When</th>
        </tr>

        <tr
          v-for="item in deliveries"
          :key="item.id"
          @click="selectDelivery(item)"
        >
          <td>
            {{ item.origin.street }} {{ item.origin.number }}
            {{ item.origin.postalCode }} {{ item.origin.city }}
          </td>
          <td>
            {{ item.destination.street }} {{ item.destination.number }}
            {{ item.destination.postalCode }} {{ item.destination.city }}
          </td>
          <td>
            <ul>
              <li v-for="product in item.products" :key="product._id">
                {{ product.reference }}
              </li>
            </ul>
          </td>
          <td>{{ moment(item.when).format("lll") }}</td>
        </tr>
      </table>
    </div>
    <div class="card-footer pb-0 pt-3">
      <div class="pagination">
        <div class="page" @click="setCurrentPage(1)">
          First
          <!-- <router-link :to="{ query: { page: 1 } }">First</router-link> -->
        </div>
        <div class="page" @click="setCurrentPage(currentPage - 1)">
          Previous
          <!-- <router-link :to="{ query: { page: currentPage - 1 } }"></router-link> -->
        </div>
        <div v-for="page in displayPages" :key="page">
          <!--change here -->
          <!-- <router-link :to="{ query: { page: page } }"> -->
          <div
            class="page"
            :class="{ active: page == currentPage }"
            @click="setCurrentPage(page)"
          >
            {{ page }}
          </div>
          <!-- </router-link> -->
        </div>
        <div class="page" @click="setCurrentPage(currentPage + 1)">
          Next
          <!-- <router-link :to="{ query: { page: currentPage + 1 } }"></router-link> -->
        </div>
        <div class="page" @click="setCurrentPage(totalPages)">
          Last
          <!-- <router-link :to="{ query: { page: totalPages } }">Last</router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  data() {
    return {
      pager: {},
      pageOfItems: [],
      limit: 10,
      weight: 10000,
    };
  },
  computed: {
    displayPages() {
      const totalPages = this.totalPages;
      let currentPage = this.currentPage;
      if ([1, 2].includes(currentPage)) currentPage = 3;
      else if ([totalPages - 1, totalPages].includes(currentPage))
        currentPage = totalPages - Math.trunc(5 / 2);

      return [...Array(5).keys()]
        .map((i) => i - Math.trunc(5 / 2) + currentPage)
        .filter((a) => a <= this.totalPages);
    },
    currentPage() {
      return this.$store.state.currentPage;
    },
    deliveries() {
      return this.$store.state.deliveries;
    },
    selectedDelivery() {
      return this.$store.state.selectedDelivery;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    totalPages() {
      return this.$store.state.totalPages;
    },
    error() {
      return this.$store.state.error;
    },
  },
  methods: {
    async selectDelivery(item) {
      await this.$store.dispatch("selectDelivery", item);
      this.$router.push({ name: "Delivery", params: { id: item._id } });
    },
    async setCurrentPage(page) {
      await this.$store.dispatch("setCurrentPage", page);
    },
    async changeLimit(event) {
      await this.$store.dispatch("setCurrentPage", 1);
      console.log("event", event.target.value);
      console.log("limit", this.limit);
      await this.getData(
        "2021-10-01T22:02:00.000Z",
        "2021-10-31T23:01:00.000Z",
        this.weight
      );
    },
    async getData(
      from = "2021-10-01T22:02:00.000Z",
      to = "2021-10-31T23:01:00.000Z",
      weight = this.weight
    ) {
      let data = {
        from,
        to,
        weight: this.weight,
        limit: this.limit,
        page: this.currentPage,
      };
      console.log(this.$store);
      await this.$store.dispatch("getDeliveries", data);
    },
  },
  watch: {
    currentPage: {
      immediate: true,
      async handler(page) {
        page = parseInt(page) || 1;
        await this.$store.dispatch("setCurrentPage", page);
        this.getData(
          "2021-10-01T22:02:00.000Z",
          "2021-10-31T23:01:00.000Z",
          this.weight
        );
      },
    },
    weight: _.debounce(async function (newVal) {
      await this.$store.dispatch("setCurrentPage", 1);
      await this.getData(
        "2021-10-01T22:02:00.000Z",
        "2021-10-31T23:01:00.000Z",
        newVal
      );
    }, 500),
  },
};
</script>