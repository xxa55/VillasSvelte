<script>
	import { onMount } from 'svelte'; import { getAuthContext } from '$lib/auth/context.js'; import { getCopy, language } from '$lib/i18n.js'; import { supabase } from '$lib/supabaseClient.js';
	let { villaId }=$props();
	let auth=getAuthContext();
	let c=$derived(getCopy($language).comments);
	/** @type {Array<{id:number,author_name:string,rating:number,body:string,created_at:string}>} */
	let comments=$state([]);
	let body=$state('');
	let rating=$state(5);
	let message=$state('');
	let deletingId=$state(/** @type {number | null} */ (null));
	async function load(){ const {data}=await supabase.from('comments').select('id,author_name,rating,body,created_at').eq('villa_id',villaId).order('created_at',{ascending:false}); comments=data||[]; }
	onMount(load);
	async function add(){ if(!auth.ready){message=c.checkingAuth;return;} if(!auth.user){const returnTo=`${location.pathname}${location.search}#guest-book`;location.href=`/login?returnTo=${encodeURIComponent(returnTo)}`;return;} const author=auth.user.user_metadata?.full_name||auth.user.email?.split('@')[0]||c.guest; const {error}=await supabase.from('comments').insert({villa_id:villaId,user_id:auth.user.id,author_name:author,rating,body:body.trim()}); if(error){message=error.message;return;} body=''; rating=5; message=c.thanks; await load(); }
	/** @param {number} commentId */
	async function remove(commentId){ deletingId=commentId; message=''; const response=await fetch('/api/admin/comments',{method:'DELETE',headers:{'content-type':'application/json'},body:JSON.stringify({id:commentId})}); if(!response.ok){message=c.deleteFailed; deletingId=null; return;} comments=comments.filter((comment)=>comment.id!==commentId); deletingId=null; }
</script>
<section class="comments" id="guest-book">
	<div><p class="eyebrow">{c.eyebrow}</p><h2>{c.heading}</h2></div>
	<div class="review-form">
		<fieldset><legend>{c.rating}</legend><div class="rating-input">{#each [1,2,3,4,5] as value}<button type="button" class:filled={value <= rating} onclick={() => rating=value} aria-label={`${value} ${value === 1 ? c.star : c.stars}`} aria-pressed={rating === value}>★</button>{/each}</div></fieldset>
		<textarea bind:value={body} maxlength="1000" placeholder={c.placeholder}></textarea>
		<button class="submit-review" onclick={add} disabled={!body.trim()}>{c.post}</button>
		{#if message}<p class="message">{message}</p>{/if}
	</div>
	<div class="comment-list">
		{#each comments as comment}
			<article><div class="rating-display" aria-label={`${comment.rating} ${c.outOfFive}`}>{#each [1,2,3,4,5] as value}<span class:filled={value <= comment.rating}>★</span>{/each}</div><p>{comment.body}</p><footer>{comment.author_name} · {new Date(comment.created_at).toLocaleDateString($language)}{#if auth.user?.email?.toLowerCase() === 'oasis55168@gmail.com'}<button class="delete-comment" type="button" onclick={() => remove(comment.id)} disabled={deletingId === comment.id}>{deletingId === comment.id ? c.deleting : c.delete}</button>{/if}</footer></article>
		{:else}<p class="empty">{c.empty}</p>{/each}
	</div>
</section>
<style>
	.comments{margin-top:5rem;padding-top:2rem;border-top:1px solid #9e9788;display:grid;grid-template-columns:1fr 1.4fr;gap:2rem}.eyebrow{text-transform:uppercase;letter-spacing:.16em;font-size:.75rem}h2{font-family:Georgia,serif;font-size:clamp(2.5rem,5vw,4rem);font-weight:500}.review-form{display:grid;gap:.8rem}fieldset{padding:0;border:0}legend{margin-bottom:.25rem;font-size:.85rem;font-weight:700}.rating-input{display:inline-flex;gap:.15rem}.rating-input button{padding:0;border:0;background:none;color:#c8c3b8;font-size:2rem;line-height:1;cursor:pointer}.rating-input button.filled,.rating-display .filled{color:#b16b45}.rating-input button:focus-visible{outline:2px solid #172a22;outline-offset:3px}textarea{width:100%;min-height:8rem;padding:1rem;border:1px solid #afa897;background:#fff}.submit-review{justify-self:start;padding:.8rem 1.2rem;border:0;background:#172a22;color:#fff}.submit-review:disabled{cursor:not-allowed;opacity:.55}.comment-list{grid-column:2;display:grid;gap:1rem}.comment-list article{padding:1.25rem;background:#fff;border-left:3px solid #b16b45}.rating-display{display:flex;gap:.08rem;margin-bottom:.5rem;color:#d8d4ca;font-size:1.1rem}.comment-list footer,.message,.empty{font-size:.82rem;color:#6f685d}@media(max-width:760px){.comments{grid-template-columns:1fr}.comment-list{grid-column:1}}
	.delete-comment{margin-left:1rem;padding:0;border:0;background:transparent;color:#a52a2a;font-size:inherit;text-decoration:underline;cursor:pointer}.delete-comment:disabled{opacity:.55}
</style>
