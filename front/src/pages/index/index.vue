<template>
  <Container>
    <PageNavBar desc="简单快速的问卷调查" title="问心调查" />
    <Menu />
    <PageTabbar :currentIndex="0" />
  </Container>
</template>

<script setup lang="ts">
import PageNavBar from '@/components/Layout/PageNavBar.vue'
import Menu from './components/Menu.vue'
import PageTabbar from '@/components/Layout/PageTabbar/index.vue'
import Container from '@/components/Layout/Container.vue'
</script>
