// import {POP, NEW, SELL} from "./const";

// export const backTopMixin = {
//   data: function () {
//     return {
//       showBackTop: false
//     }
//   },
//   methods: {
//     backTop: function () {
//       this.$refs.scroll.scrollTo(0, 0, 300);
//     }
//   }
// }

// export const tabControlMixin = {
//   data: function () {
//     return {
//       currentType: POP
//     }
//   },
//   methods: {
//     tabClick(index) {
//       switch (index) {
//         case 0:
//           this.currentType = POP
//           break
//         case 1:
//           this.currentType = NEW
//           break
//         case 2:
//           this.currentType = SELL
//           break
//       }
//       console.log(this.currentType);
//     }
//   }
// }

import {debouce} from './utils';
import BackTop from 'components/content/backTop/BackTop'
import {BACK_POSITION} from 'common/const';
import {POP, NEW, SELL} from "./const";

export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            refresh: null
        }
    },
    mounted() {
        this.refresh = debouce(this.$refs.scroll.refresh, 100)
        this.itemImgListener = () => {
          refresh()
        }
        this.$bus.$on('itemImgLoad', this.itemImgListener)
        // console.log('ssssss');
    }
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
      return {
        isShowBackTop: false
      }
    },
    methods: {
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 300);
      },
      listenShowBackTop(position) {
        this.isShowBackTop = (-position.y) > BACK_POSITION;
      }
    }
  }

  export const tabControlMixin = {
    data: function () {
      return {
        currentType: POP
      }
    },
    methods: {
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = POP
            break
          case 1:
            this.currentType = NEW
            break
          case 2:
            this.currentType = SELL
            break
        }
        console.log(this.currentType);
      }
    }
  }