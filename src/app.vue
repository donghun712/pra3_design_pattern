<template>
  <div id="app">
    <header>
      <h1>디자인 패턴 실습</h1>
      <p class="guide">App.vue에서 원하는 패턴을 import해서 사용하세요</p>
    </header>
    
    <main>
      <!-- 빌더 패턴 실행하려면 아래 주석 해제 -->
      <!-- <PraBuilder /> -->

      <!-- 브릿지 패턴 실행하려면 아래 주석 해제 (위 PraBuilder 주석 처리) -->
       <PraBridge /> 

      <!-- 상태 패턴 실행하려면 아래 주석 해제 (위 PraBuilder 주석 처리) -->
      <!-- <PraState /> -->
    </main>
  </div>
</template>

<script setup lang="ts">
import PraBuilder from './components/PraBuilder.vue'
import PraBridge from './components/PraBridge.vue'
import PraState from './components/PraState.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

#app {
  min-height: 100vh;
}

header {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 30px 20px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

header h1 {
  color: white;
  font-size: 32px;
  margin-bottom: 10px;
}

.guide {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

main {
  padding: 40px 20px;
  max-width: 900px;
  margin: 0 auto;
}
</style>
