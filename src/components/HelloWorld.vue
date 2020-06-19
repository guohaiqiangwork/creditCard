<template>
  <div class="hello">
    <div v-for="(item,index) in  ceshiList" :key="index">
      <img :src=" item.picture" style="width:"/>
    </div>
  </div>
</template>

<script>
import url from "../bin/url";
export default {
  name: "HelloWorld",
  data() {
    return {
      ceshiList: []
    };
  },
  methods: {
    //   获取数据
    ceshi() {
      var _this = this;
      this.$fetch.get(url.ceshi).then(
        data => {
          if (data.code == 200) {
            console.log(JSON.stringify(data));
            _this.ceshiList = data.data;
          } else {
          }
        },
        err => {
          alert("网络缓慢。。");
        }
      );
    }
  },

  mounted() {
    this.ceshi();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
