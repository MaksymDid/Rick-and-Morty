<template>
  <div class='d-flex flex-column flex-sm-row justify-center wrap_info'>
    <div class='mx-auto mx-sm-5 mr-sm-5 ' v-for='infoItem in allCountInfo'>
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
.wrap_info {
  margin-top: 20px;
  color: white;
  padding: 70px 0;
  background: rgb(32, 35, 41);
}
</style>