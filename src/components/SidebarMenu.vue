<template>
  <v-list
    dense
    nav
  >

    <v-list-item
      v-for='item in items'
      :key='item.id'
      link
    >
      <router-link class='link' :to='{name: item.to}'>
        <v-list-item-content>
          <v-list-item-title class='ml-2'>

            {{ item.title }}

          </v-list-item-title>
        </v-list-item-content>
      </router-link>
    </v-list-item>

  </v-list>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          title: 'Overview',
          to: 'OverviewPage'
        },
        {
          id: 2,
          title: 'Characters',
          to: 'CharactersPage'
        },
        {
          id: 3,
          title: 'Locations',
          to: 'LocationsPage'
        },
        {
          id: 4,
          title: 'Episodes',
          to: 'EpisodesPage'
        }
      ],
      right: null
    }
  }
}
</script>

<style scoped>
.link {
  text-decoration: none;
  color: black;
  width: 100%;
}
</style>