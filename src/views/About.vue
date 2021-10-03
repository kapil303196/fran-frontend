<template>
  <div class="about">
    <div v-if="error" class="alert alert-danger">
      <strong>Danger!</strong> {{ error }}
      action.
      <button onClick="window.location.reload();">Refresh Page</button>
    </div>
    <h1>This is Product Details page</h1>
    <form>
      <button
        v-if="!edit"
        type="button"
        class="btn btn-success mb-3"
        @click="edit = true"
      >
        Edit
      </button>
      <button
        v-if="edit"
        type="button"
        class="btn btn-success mb-3"
        @click="edit = false"
      >
        Save
      </button>
      <div class="container pt-5" v-if="!edit">
        <div class="card border p-5">
          <h6>
            Origin: {{ selectedDelivery.origin.street }},
            {{ selectedDelivery.origin.city }}
          </h6>
          <h6>
            Destination: {{ selectedDelivery.destination.street }},
            {{ selectedDelivery.destination.city }}
          </h6>
          <h6>
            Date: {{ moment(selectedDelivery.when).format("YYYY-MM-DD") }}
          </h6>
        </div>
        <div class="row">
          <div
            class="col-md-4"
            v-for="(item, id) of selectedDelivery.products"
            :key="id"
          >
            <div class="card border m-2" style="width: auto">
              <div class="card-body">
                <h5 class="card-title">{{ item.reference }}</h5>
                <h6 class="card-subtitle mb-2">Weight: {{ item.weight }}</h6>
                <h6 class="card-subtitle mb-2">Height: {{ item.height }}</h6>
                <p class="card-text">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="edit">
        <div class="col-12 row border">
          <div class="col-6 border" v-if="model && model.origin">
            <h1>Origin</h1>
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Street</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Reference"
                  v-model="model.origin.street"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Number</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Enter Number"
                  v-model="model.origin.number"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Postal Code</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Enter Postalcode"
                  v-model="model.origin.postalCode"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">City</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter City"
                  v-model="model.origin.city"
                />
              </div>
            </form>
          </div>
          <div class="col-6 border" v-if="model && model.destination">
            <h1>Destination</h1>
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Street</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Reference"
                  v-model="model.destination.street"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Number</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Enter Number"
                  v-model="model.destination.number"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Postal Code</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Enter Postalcode"
                  v-model="model.destination.postalCode"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">City</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter City"
                  v-model="model.destination.city"
                />
              </div>
            </form>
          </div>
        </div>
        <br />
        <br />
        <div
          class="col-12 row border"
          v-if="model && model.products.length > 0"
        >
          <br />
          <br />
          <div
            class="col-4 p-4 border"
            v-for="(product, i) in model.products"
            :key="i"
          >
            <h2>Product {{ i + 1 }}</h2>
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Reference</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Reference"
                  v-model="product.reference"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Description</label>
                <input
                  type="textarea"
                  class="form-control"
                  placeholder="Enter Reference"
                  v-model="product.description"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Weight</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Enter Reference"
                  v-model="product.weight"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Height</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Enter Reference"
                  v-model="product.height"
                />
              </div>
            </form>
          </div>
          <br />
          <br />
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      edit: true,
      model: this.selectedDelivery,
    };
  },
  computed: {
    selectedDelivery() {
      return this.$store.state.selectedDelivery;
    },
    error() {
      return this.$store.state.error;
    },
  },
  watch: {
    selectedDelivery: {
      immediate: true,
      handler(val) {
        this.model = val;
      },
    },
    model: {
      immediate: true,
      deep: true,
      async handler(val) {
        await this.$store.dispatch("selectDelivery", val);
      },
    },
  },
  async mounted() {
    // await this.$store.dispatch("getOneDelivery", this.id);
  },
};
</script>