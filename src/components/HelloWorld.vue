<template>
  <div class="hello">
    <div class="lequ-header feedStyle">
      <img src="http://pic2.iqiyipic.com/lequ/20200312/0981ba8cb61b4c2a8f1872297cf623ad.png"
           class="component_titleImage" alt=""/>
    </div>
    <div class="lequ-list">
      <ul class="modeList feedMode" @click="getData" key="server">
        <h1>服务端预加载的数据：</h1>
        <template v-for="(item, idx) in preItems">
          <li class="liMode" :data-tv-id="item.itemId" :data-feed-index="idx" :data-video-title="item.name"
              :data-poster-img="item.imageUrl" :key="item.itemId">
            <a class="lequLink" :href="item.url">
              <div class="playImg">
                <div class="linkImg"><img :src="item.imageUrl"></div>
                <div class="playIcon"><img src="//pic0.iqiyipic.com/common/20190530/935b5e9c4ba34002916be4455ea4c5e8.png"></div>
                <div class="playTop">
                  <img class="playNameMask" src="//pic3.iqiyipic.com/common/20190604/044bb15ce209405c81918a5731b88d9a.png"/>
                  <p class="playName">{{item.name}}</p></div>
                <div class="playBottom">
                <span class="likeNum">
                  <img src="//pic3.iqiyipic.com/common/20190529/e115b08e433541bba1abe361fd2ddd7a.png">
                  {{item.likeNum}}
                </span>
                  <span class="duration">{{item.duration | getTime}}</span></div>
              </div>
            </a>
          </li>
        </template>
      </ul>
      <ul class="modeList feedMode" key="client">
        <h1>客户端请求的数据：</h1>
        <template v-for="(item, idx) in showAry">
          <li class="liMode" :data-tv-id="item.itemId" :key="item.itemId" :data-feed-index="idx" :data-video-title="item.name"
              :data-poster-img="item.imageUrl">
            <a class="lequLink" :href="item.url">
              <div class="playImg">
                <div class="linkImg"><img :src="item.imageUrl"></div>
                <div class="playIcon"><img src="//pic0.iqiyipic.com/common/20190530/935b5e9c4ba34002916be4455ea4c5e8.png"></div>
                <div class="playTop">
                  <img class="playNameMask" src="//pic3.iqiyipic.com/common/20190604/044bb15ce209405c81918a5731b88d9a.png"/>
                  <p class="playName">{{item.name}}</p></div>
                <div class="playBottom">
                  <span class="likeNum">
                    <img src="//pic3.iqiyipic.com/common/20190529/e115b08e433541bba1abe361fd2ddd7a.png">
                    {{item.likeNum}}
                  </span>
                  <span class="duration">{{item.duration | getTime}}</span></div>
              </div>
            </a>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        showAry: []
      }
    },
    beforeMount() {
      this.getData();
    },
    methods: {
      getData() {
        axios.get('http://lequ-qfe.iqiyi.com/api/nc/recommend/resources/30118102312?pageParam=%7B%22device_id%22%3A%220%22%2C%22ip%22%3A%22%22%2C%22platform%22%3A%22H5_QIYI%22%2C%22uid%22%3A1242627550%2C%22page_num%22%3A2%2C%22page_size%22%3A6%7D').then(res => {
          res = res.data;
          if(res.code === 'A00000' && res.data && res.data.items && res.data.items.length) {
            let items = res.data.items;
            items.map(item => {
              if(item.mixinVideo) {
                item.name = item.mixinVideo.name;
                item.url = item.mixinVideo.url;
                item.likeNum = item.mixinVideo.likeNum;
                item.duration = item.mixinVideo.duration;
                item.imageUrl = item.mixinVideo.imageUrl.replace(/\.(jpg|png|jpeg)$/, function(data) {
                  return '_1080_608' + data
                })
              }
            });
            this.showAry = items
          }
        }).catch(err => {
          console.log(err);
        })
      }
    },
    filters: {
      getTime(second) {
        let min = parseInt(second / 60);
        let sec = second % 60;
        min = min < 10 ? '0' + min : min;
        sec = sec < 10 ? '0' + sec : sec;
        return min + ":" + sec
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .component_titleImage{
    width:100%;
  }
  .modeList li{
    padding-bottom:0.1rem;
  }
  .linkImg img{
    width:100%;
  }
  .playImg {
    height: 2rem;
    overflow: hidden;
    position: relative
  }
  .playIcon {
    width: .48rem;
    height: .48rem;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -0.24rem;
    margin-left: -0.24rem
  }
  .playIcon img {
    width: 100%;
    height: 100%
  }
  .playNameMask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: .6rem;
    width: 100%;
    overflow: hidden;
    border-top-left-radius: .02rem;
    border-top-right-radius: .02rem
  }
  .playName {
    position: absolute;
    top: .08rem;
    line-height: .24rem;
    left: .12rem;
    right: .12rem;
    font-size: .17rem;
    font-weight: bold;
    color: #fff;
    word-break: break-all;
    font-family: "PingFangSC-Semibold";
    text-align:left;
  }
  .playBottom {
    position: absolute;
    bottom: .06rem;
    left: .1rem;
    right: .06rem;
    color: #fff;
    font-family: "AvenirNext-Medium";
    overflow: hidden;
    font-size: .12rem;
    filter: drop-shadow(0 .005rem .02rem rgba(0,0,0,0.4))
  }
  .likeNum {
    float: left;
    padding-top: .015rem
  }
  .likeNum img {
    width: .12rem;
    height: .12rem;
    margin-right: .04rem;
    margin-top: -0.015rem;
    vertical-align: bottom
  }
  .duration {
    float: right
  }
</style>
