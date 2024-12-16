<template>

    <Suspense>
      <template #default>
        <MailScreen />
      </template>
      <template #fallback>
        Loading...
      </template>
    </Suspense>
</template>

<script>
import MailScreen from '@/components/MailScreen.vue'

export default {
  name: 'App',
  components: {
    MailScreen
  }
}
</script>
