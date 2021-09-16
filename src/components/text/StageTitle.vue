<template>
<div class="px-4 py-1 mt-4 mb-2 font-medium text-green-700 bg-green-100 rounded-lg text-md max-w-max">
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
