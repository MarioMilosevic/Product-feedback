<template>
  <div class="loader"></div>
</template>

<style scoped>
.loader {
  width: 3rem;
  height: 3rem;
  border: 5px solid #fff;
  border-bottom-color: #ff3d00;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  grid-column: span 4;
  margin: 10rem auto;
  grid-area: 2 / 4 / 3 / 5;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
