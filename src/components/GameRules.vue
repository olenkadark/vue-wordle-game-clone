<template>
  <p>{{ t('message.rules_desc')}}</p>
  <p><strong>{{ t('message.new_word')}}</strong></p>
  <p><strong>{{ t('message.when_wait')}} <a href="https://unovelist.com">{{ t('message.read_news')}}</a></strong></p>
  <p><small>
    {{ t('message.original_author')}}
  </small></p>
  <p><small>
    {{ t('message.developer')}} <a href="https://starryarray.com/category/tutorials/">Olena Zhyvohliad</a>
  </small></p>

</template>

<script>
import {useI18n} from "vue-i18n";

export default {
  setup(){
    const { t } = useI18n();
    return {t};
  }
}
</script>

<style scoped>

</style>