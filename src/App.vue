<template>
	<div id="app">
		<div>
			<avatar-weather/>
		</div>
	</div>
</template>

<script>
  import AvatarWeather from "./packages/weather/avatar";

  export default {
    name: 'app',
    components: {
      AvatarWeather
    },
    data() {
      return {}
    }
  }
</script>

