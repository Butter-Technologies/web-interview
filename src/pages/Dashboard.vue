<template>
  <div class="box">
    <div class="top">
      <CeFilter
        :options="filterOption"
        @change="filterChange"
      ></CeFilter>
    </div>
    <div class="table">
      <el-table
        :data="showTableData"
      >
        <el-table-column
          prop="orderId"
          label="Order ID"
          width="100">
          <template slot-scope="scope">
            <div class="bolder" :class="scope.row.status">
              <div>{{scope.row.orderId}}</div>
              <div>{{scope.row.status}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="buyer"
          label="Buyer"
          width="180">
        </el-table-column>
        <el-table-column
          prop="seller"
          label="Seller">
        </el-table-column>
        <el-table-column
          prop="deliveryAt"
          label="Deliver At"
          width="210">
        </el-table-column>
        <el-table-column
          prop="addressAt"
          label="Deliver Address">
        </el-table-column>
        <el-table-column
          prop="route"
          label="Route">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import CeFilter from '@components/Filter';
export default {
  name: 'dashboard',
  data() {
    return {
      filterOption: [],
      tableData: [],
      filters: [],
    };
  },
  created() {
    this.getTable();
  },
  computed: {
    showTableData() {
      return this.tableData.filter((item) => {
        if (!this.filters || !this.filters.length) {
          return true;
        } else {
          const route = item.route;
          const status = item.status;
          return this.filters.includes(route) || this.filters.includes(status);
        }
      });
    }
  },
  components: {
    CeFilter
  },
  methods: {
    getTable() {
      this.$request('/getFilters', {}, 'POST').then((data) => {
        const res = data.data;
        if (res && res.length) {
          const routes = [], status = [];
          const routecheck = {};
          const statuscheck = {};
          res.forEach((item) => {
            const route = item.route;
            if (!routecheck[route.name]) {
              routecheck[route.name] = true;
              routes.push(route.name);
            }
            if (!statuscheck[item.status]) {
              statuscheck[item.status] = true;
              status.push(item.status)
            }
            this.tableData.push({
              orderId: item.client_order_id,
              buyer: item.buyer_loc.name,
              seller: item.seller_loc.name,
              addressAt: item.delivery_address.address,
              deliveryAt: item.delivery_time,
              route: item.route.name,
              status: item.status
            })
          })
          this.filterOption.push({
            name: 'Route',
            items: routes
          })
          this.filterOption.push({
            name: 'Order Status',
            items: status
          })
        }
      })
    },
    filterChange(data) {
      console.log(data);
      this.filters = data;
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  height: 100%;
  background: #fff;
  border-radius: 8px;
  .top {
    padding: 14px;
  }
  .bolder {
    font-family: Poppins;
    font-weight: bolder;
  }
  .Confirmed {
    color: rgba(66, 149, 102, 1);
  }
  .Placed {
    color: rgba(255, 202, 0, 1);
  }
  .Billed {
    color: rgba(58, 155, 255, 1);
  }
}
</style>
