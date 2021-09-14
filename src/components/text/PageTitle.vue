<template>
<div class="text-2xl font-semibold">
	{{ title }}
</div>
</template>

<script>
export default {
	name: "PageTitle",
	props: {
		title: {
			type: String,
			default: "title",
		}
	},
};
</script>
