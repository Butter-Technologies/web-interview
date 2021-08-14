<template>
  <div  @click.stop class="filter-componten">
    <div @click="onOpen" class="filter-box">
      <span>Filter</span>
      <i :class="{
        'el-icon-arrow-down': !isOpen,
        'el-icon-arrow-up': isOpen,
      }"></i>
    </div>
    <div v-if="isOpen" class="filter-options">
      <div class="filter-top">
        <div class="ab-box">
          <div class="filter-options-selected">
            <div
              v-for="(item, index) in values"
              :key="item"
              class="filter-options-item"
            >
              <span>{{item}}</span>
              <i @click="onClear(index)" class="el-icon-close"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="filter-center">
        <div class="ab-box">
          <div class="filter-groups">
            <div
              v-for="item in options"
              :key="item.name"
              class="filter-groups-items"
            >
              <div
                class="filter-groups-label"
              >{{item.name}}</div>
              <div class="filter-groups-box">
                <div
                  v-for="child in item.items"
                  :key="child"
                  class="filter-groups-item"
                  :class="{
                    checked: values.includes(child)
                  }"
                >
                  <div @click="onCheck(child)" class="checkbox-inner"></div>
                  <div class="checkbox-label">{{child}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="filter-bottom">
        <div class="left">
          <div @click="onClear()" class="btn-text">
            <span>Clear</span>
          </div>
        </div>
        <div @click="onSubmit()" class="right">
          <div class="btn-primary">Apply</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectEvent from '@/event/selectEvent';

export default {
  props: {
    options: {
      type: Array,
      default:() => {
        return [{
          name: "Route",
          items: []
        },{
          name: "Order Status",
          items: []
        }]
      }
    }
  },
  data() {
    return {
      isOpen: false,
      values: [],
      saveValues: [],
    }
  },
  computed: {
    isChecked(item) {
      return this.values.includes(item);
    }
  },
  created() {
    SelectEvent.$on('close', this.onClose);
  },
  destroyed() {
    SelectEvent.$off('close', this.onClose);
  },
  methods: {
    stopEvent(el) {
      el.stopPropagation();
    },
    onOpen() {
      this.getSave();
      this.isOpen = true;
    },
    onClose() {
      this.isOpen = false;
    },
    onCheck(item) {
      const index = this.values.indexOf(item);
      if (index === -1) {
        this.values.push(item);
      } else {
        this.onClear(index);
      }
    },
    getSave() {
      this.values = [
        ...this.saveValues
      ];
    },
    onClear(index) {
      if (index !== undefined) {
        this.values.splice(index, 1);
      } else {
        this.saveValues = [];
        this.getSave();
        this.onSubmit();
        this.isOpen = false;
      }
    },
    onSubmit() {
      this.saveValues = [
        ...this.values
      ];
      this.$emit('change', this.saveValues);
      this.isOpen = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.filter-componten {
  display: inline-block;
  position: relative;
  .filter-box{
    background: #FFFFFF;
    border: 1px solid #646464;
    box-sizing: border-box;
    border-radius: 8px;
    cursor: pointer;
    display: inline-block;
    padding: 8px 10px 8px 18px;
    span {
      font-family: Poppins;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 16px;
      color: #131313;
    }
    & > i {
      margin-left: 20px;
      font-size: 14px;
    }
  }
  .filter-options {
    position: absolute;
    background: #FFFFFF;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.160784);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    width: 260px;
    height: 450px;
    bottom: -456px;
    left: 0;
    z-index: 20;

    .filter-top {
      position: relative;
      border-bottom: 1px solid rgba(178, 178, 178, .6);
      height: 82px;
      box-sizing: border-box;
      .ab-box {
        overflow: auto;
      }
      .filter-options-selected {
        position: relative;
        padding: 9.5px 14px;
        .filter-options-item {
          background: rgba(100, 100, 100, .15);
          mix-blend-mode: normal;
          border-radius: 5px;
          color: #646464;
          display: inline-block;
          padding: 6.5px 12px 6.5px 16px;
          font-family: Poppins;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 14px;
          margin: 2.5px 4px;
          & > i {
            margin-left: 11px;
            cursor: pointer;
          }
        }
      }
    }

    .filter-center {
      position: relative;
      border-bottom: 1px solid rgba(178, 178, 178, .6);
      height: 312px;
      box-sizing: border-box;
      .ab-box {
        overflow: auto;
      }
      .filter-groups {
        padding: 0 8px;
        .filter-groups-items {
          padding: 12px 6px;
          border-bottom: 1px solid rgba(178, 178, 178, .6);
          &:last-child {
            border-bottom: none;
          }
          .filter-groups-label {
            margin-bottom: 14px;
            font-weight: bold;
          }
          .filter-groups-box {
            .filter-groups-item {
              margin-bottom: 14px;
              &:last-child {
                margin-bottom: 0;
              }
              &.checked {
                .checkbox-inner{
                  background-color: #FFCA00;
                  border-color: #FFCA00;
                  &::after {
                    transform: rotate(
                    45deg
                    ) scaleY(1);
                  }
                }
              }
              .checkbox-inner {
                display: inline-block;
                position: relative;
                border: 1px solid #707070;
                box-sizing: border-box;
                border-radius: 4px;
                width: 25px;
                height: 25px;
                background-color: #fff;
                transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
                vertical-align: middle;
                cursor: pointer;
                &::after {
                  box-sizing: content-box;
                  content: "";
                  border: 3px solid #fff;
                  border-left: 0;
                  border-top: 0;
                  height: 12.5px;
                  left: 7px;
                  position: absolute;
                  top: 1px;
                  transform: rotate(
                    45deg
                  ) scaleY(0);
                  width: 6px;
                  transition: transform .15s ease-in .05s;
                  transform-origin: center;
                }
              }
              .checkbox-label {
                display: inline-block;
                vertical-align: middle;
                margin-left: 14px;
              }
            }
          }
        }
      }
    }

    .filter-bottom {
      display: flex;
      padding: 9px 11px;
      align-items: flex-end;
      .left {
        flex: 1;
        .btn-text {
          font-style: normal;
          font-weight: bold;
          font-size: 16px;
          line-height: 26px;
          text-decoration-line: underline;
          color: #131313;
          cursor: pointer;
        }
      }
      .right {
        .btn-primary {
          width: 74px;
          height: 36px;
          background: #FFCA00;
          border-radius: 8px;
          text-align: center;
          font-weight: bold;
          font-size: 14px;
          line-height: 36px;
          text-align: center;
          color: #131313;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
