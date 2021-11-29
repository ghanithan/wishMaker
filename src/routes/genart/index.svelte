<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>


<div class="worklet-canvas"></div>



<style>


.worklet-canvas {
  width: calc(100vw - 4rem);
  height: calc(100vh - 4rem);
  margin-left: 2rem;
  margin-top: 2rem;
  background-color: #fff;
  background-image: paint(circles);
  resize: both;
  overflow: hidden;
}

</style>