<script>
	import { onMount } from 'svelte';
	import { getAuthContext } from '$lib/auth/context.js';
	import { selectStayDate, stayConflicts } from '$lib/booking/dates.js';
	import { getCopy, language } from '$lib/i18n.js';

	let { villa } = $props();
	let auth = getAuthContext();
	let c = $derived(getCopy($language).bookingPanel);
	let checkIn = $state('');
	let checkOut = $state('');
	/** @type {Array<{check_in:string,check_out:string}>} */
	let unavailable = $state([]);
	let message = $state('');
	let busy = $state(false);
	let minDate = new Date().toISOString().slice(0, 10);
	let calendarMonth = $state(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
	let weekDays = $derived($language === 'zh-CN' ? ['周日', '周一', '周二', '周三', '周四', '周五', '周六'] : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);

	let calendarDays = $derived.by(() => {
		const year = calendarMonth.getFullYear();
		const month = calendarMonth.getMonth();
		const firstWeekday = new Date(year, month, 1).getDay();
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		return Array.from({ length: 42 }, (_, index) => {
			const day = index - firstWeekday + 1;
			if (day < 1 || day > daysInMonth) return null;
			const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
			return {
				day,
				date,
				past: date < minDate,
				booked: unavailable.some((range) => date >= range.check_in && date < range.check_out)
			};
		});
	});
	let calendarLabel = $derived(new Intl.DateTimeFormat($language, { month: 'long', year: 'numeric' }).format(calendarMonth));

	onMount(async () => {
		const response = await fetch(`/api/availability/${villa.id}`);
		if (response.ok) unavailable = (await response.json()).unavailable;
	});

	/** @param {number} offset */
	function changeMonth(offset) {
		calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + offset, 1);
	}
	function conflicts() {
		return stayConflicts(unavailable, checkIn, checkOut);
	}
	/** @param {string} date */
	function selectDate(date) {
		const selection = selectStayDate(unavailable, checkIn, checkOut, date);
		checkIn = selection.checkIn;
		checkOut = selection.checkOut;
		message = selection.message === 'Now choose your check-out date.' ? c.chooseCheckOut : selection.message ? c.bookedDates : '';
	}
	function goToLogin() {
		const returnTo = `${location.pathname}${location.search}#booking-section`;
		location.href = `/login?returnTo=${encodeURIComponent(returnTo)}`;
	}
	async function requestBooking() {
		message = '';
		if (!auth.ready) { message = c.checkingAuth; return; }
		if (!auth.user) { goToLogin(); return; }
		if (!checkIn || !checkOut || checkOut <= checkIn || conflicts()) {
			message = c.chooseDates;
			return;
		}
		busy = true;
		const session = auth.session;
		if (!session) { goToLogin(); return; }
		const response = await fetch('/api/booking-requests', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ villaId: villa.id, checkIn, checkOut })
		});
		const data = await response.json();
		if (response.ok) {
			const paymentParams = new URLSearchParams({ booking: data.id, villa: villa.id, checkIn, checkOut });
			location.href = `/booking/payment?${paymentParams}`;
			return;
		}
		message = data.error;
		busy = false;
	}
</script>

<section class="booking-panel" aria-labelledby="booking-title">
	<div><p class="eyebrow">{c.eyebrow}</p><h2 id="booking-title">{c.heading}</h2><p>{c.lead}</p></div>
	<div class="selection-summary" aria-live="polite">
		<div><span>{c.checkIn}</span><strong>{checkIn || `${c.selectDate} ↓`}</strong></div>
		<div><span>{c.checkOut}</span><strong>{checkOut || (checkIn ? `${c.selectLaterDate} ↓` : `${c.selectCheckInFirst} ↓`)}</strong></div>
		<button onclick={requestBooking} disabled={busy || !checkIn || !checkOut}>{busy ? c.sending : c.request}</button>
		{#if message}<p class="notice">{message}</p>{/if}
	</div>
	<div class="availability-calendar" aria-label={c.calendarFor.replace('{villa}', villa.name)}>
		<div class="calendar-instructions">
			<strong>{c.calendarHeading}</strong>
			<p><span>1</span> {c.stepOne} <span>2</span> {c.stepTwo}</p>
		</div>
		<div class="calendar-heading">
			<button type="button" class="month-button" onclick={() => changeMonth(-1)} aria-label={c.previousMonth}>‹</button>
			<strong>{calendarLabel}</strong>
			<button type="button" class="month-button" onclick={() => changeMonth(1)} aria-label={c.nextMonth}>›</button>
		</div>
		<div class="calendar-grid" aria-label={calendarLabel}>
			{#each weekDays as weekDay}<span class="weekday">{weekDay}</span>{/each}
			{#each calendarDays as date}
				{#if date}
					<button
						type="button"
						class="calendar-day"
						class:booked={date.booked}
						class:past={date.past}
						class:selected={date.date === checkIn || date.date === checkOut}
						class:in-range={Boolean(checkIn && checkOut && date.date > checkIn && date.date < checkOut)}
						disabled={date.booked || date.past}
						onclick={() => selectDate(date.date)}
						aria-label={`${date.date}, ${date.booked ? c.booked.toLowerCase() : date.past ? c.unavailable : c.available}`}
					>{date.day}</button>
				{:else}<span aria-hidden="true"></span>{/if}
			{/each}
		</div>
		<p class="calendar-key"><span aria-hidden="true"></span> {c.booked}</p>
	</div>
</section>

<style>
	.booking-panel{display:grid;grid-template-columns:1.2fr 1fr;gap:2rem;padding:clamp(1.5rem,4vw,3rem);background:#efe9dc;border-top:3px solid #172a22}.eyebrow{text-transform:uppercase;letter-spacing:.16em;font-size:.75rem}h2{font-family:Georgia,serif;font-size:clamp(2.5rem,5vw,4.5rem);font-weight:500;line-height:1}button{padding:.9rem;background:#172a22;color:#fff;border:0;font-weight:700}.selection-summary{display:grid;grid-template-columns:1fr 1fr;gap:.8rem;align-content:start;background:#fff;padding:1.5rem}.selection-summary div{display:grid;gap:.25rem;padding:.75rem;border:1px solid #d8d1c3}.selection-summary span{color:#6d716b;font-size:.75rem;text-transform:uppercase}.selection-summary button,.selection-summary .notice{grid-column:1/-1}.selection-summary button:disabled{opacity:.45}.availability-calendar{grid-column:1/-1;background:#fff;padding:clamp(1rem,3vw,2rem)}.calendar-instructions{margin:-.25rem 0 1.25rem;padding:1rem 1.15rem;border-left:5px solid #b86138;background:#f7eee7}.calendar-instructions strong{display:block;font-family:Georgia,serif;font-size:1.35rem}.calendar-instructions p{display:flex;align-items:center;flex-wrap:wrap;gap:.5rem;margin:.55rem 0 0;color:#4f554f}.calendar-instructions span{display:inline-grid;place-items:center;width:1.6rem;height:1.6rem;margin-left:.35rem;border-radius:50%;background:#172a22;color:#fff;font-size:.78rem;font-weight:700}.calendar-heading{display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;font-size:1.15rem}.month-button{display:grid;place-items:center;width:2.75rem;height:2.75rem;padding:0;border:1px solid #d8d1c3;background:#faf8f2;color:#172a22;font-size:1.5rem}.calendar-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:.4rem}.calendar-grid>span,.calendar-day{display:grid;place-items:center;min-height:clamp(2.75rem,7vw,4.5rem)}.weekday{min-height:auto!important;color:#6d716b;font-size:.72rem;font-weight:700;text-transform:uppercase}.calendar-day{padding:.35rem;background:#faf8f2;color:#172a22;border:1px solid transparent;font-size:1rem}.calendar-day:hover:not(:disabled){border-color:#172a22}.calendar-day.past{background:#f3f1ec;color:#aaa;text-decoration:none}.calendar-day.booked{background:#ead8d3;color:#8a281f;text-decoration:line-through;font-weight:700}.calendar-day.selected{background:#172a22;color:#fff;text-decoration:none}.calendar-day.in-range{background:#dce8e1}.calendar-key{display:flex;align-items:center;gap:.45rem;margin:.85rem 0 0;color:#6d716b;font-size:.8rem}.calendar-key span{width:1rem;height:1rem;background:#ead8d3}.notice{margin:0;color:#8a281f}@media(max-width:760px){.booking-panel{grid-template-columns:1fr}.availability-calendar{grid-column:1}.selection-summary{grid-template-columns:1fr}.selection-summary button,.selection-summary .notice{grid-column:1}.calendar-instructions p{align-items:flex-start;display:grid;grid-template-columns:auto 1fr}.calendar-instructions span{margin-left:0}}</style>
