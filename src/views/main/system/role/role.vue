<template>
  <div class="role">
    <pageSearch :searchFromConfig="searchFormConfig"></pageSearch>
    <pageContent :page-name="'role'" :tableContentConfig="tableContentConfig"></pageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { tableContentConfig } from './config/content.config'

export default defineComponent({
  name: 'role',
  components: {
    pageSearch,
    pageContent
  },
  setup() {
    return {
      searchFormConfig,
      tableContentConfig
    }
  }
})
</script>

<style scoped></style>
