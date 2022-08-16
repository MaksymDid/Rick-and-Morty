<template>
  <div class='d-flex justify-center wrap_info'>
    <div class='mr-5' v-for='infoItem in allCountInfo'>
      {{infoItem.name}}: {{infoItem.count}}
    </div>
  </div>
</template>
<script>
import { mapState} from 'vuex'

export default {
  name: 'AllInfo',
  computed: {
    ...mapState(['allCountInfo']),
  }
}
</script>
<style scoped>

h1 {
  font-size: 75px;
  padding: 100px 0;
  text-align: center;
  z-index: 0;
}

svg {
  width: auto;
  height: 75%;
  fill: rgb(245, 245, 245);
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: -1;
}

.wrap_info {
  margin-top: 20px;
  color: white;
  padding: 70px 0;
  background: rgb(32, 35, 41);
}

</style>