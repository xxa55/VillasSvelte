<script>
	import VillaDetail from '$lib/components/VillaDetail.svelte';
	import { villas } from '$lib/data/catalog.js';

	const villa = villas.find((item) => item.id === 'villa-b');
</script>

<VillaDetail {villa} />
