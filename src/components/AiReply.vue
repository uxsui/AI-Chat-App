<script setup>
defineProps({
    content:String
})

</script>

<template>
    <div class="ai-reply-container">
        <div>豆奶</div>
        <div class="content">
            <p>{{ content }}</p>
        </div>
    </div>

</template>


<style scoped>
.ai-reply-container {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 20px;
}

.content {
  line-height: 1.7;
  font-size: 15px;
}
</style>
