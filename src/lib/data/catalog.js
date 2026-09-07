import { asset } from '$app/paths';

/** @param {Parameters<typeof asset>[0]} path */
const withBase = (path) => asset(path);
/** @param {string} path */
const withBaseHref = (path) => path;

export const villas = [
	{
		id: 'villa-a',
		name: 'Villa A',
		legacyName: 'Villa 1',
		tagline: 'Pool, BBQ, KTV',
		features: ['Private pool', '5 bedrooms', 'Kitchen and laundry'],
		cover: withBase('/img/villa1/swimming_pool.webp'),
		width: 1600,
		height: 1200,
		href: withBaseHref('/villas/villa-a'),
		description:
			'Welcome to Villa A, a private pool villa with BBQ area, full kitchen, and comfortable rooms for families and groups.',
		quickInfo: {
			guests: '12',
			bedrooms: '5',
			bathrooms: '7',
			location: 'Central Pattaya',
			booking: 'Hostex direct booking',
			highlights: ['Private pool', 'BBQ area', 'Kitchen', 'Parking']
		},
		bookingLinks: [
			{ label: 'Book on Airbnb', href: 'https://www.airbnb.com/h/-oasis', variant: 'danger' },
			{
				label: 'Book on Booking.com',
				href: 'https://www.booking.com/hotel/th/pattaya-walking-street-5-bedroom-6-bath-ktv-bbq-pool-villa.html',
				variant: 'primary'
			}
		],
		gallery: [
			{ src: withBase('/img/villa1/bedroom1.webp'), alt: 'Villa A bedroom' },
			{ src: withBase('/img/villa1/kitchen.webp'), alt: 'Villa A kitchen' },
			{ src: withBase('/img/villa1/bathroom.webp'), alt: 'Villa A bathroom' },
			{ src: withBase('/img/villa1/slipper.webp'), alt: 'Villa A slippers' },
			{ src: withBase('/img/villa1/table.webp'), alt: 'Villa A table' },
			{ src: withBase('/img/villa1/ktv.webp'), alt: 'Villa A KTV room' }
		]
	},
	{
		id: 'villa-b',
		name: 'Villa B',
		legacyName: 'Villa 2',
		tagline: 'Pool, dining, billiards',
		features: ['Private pool', '5 bedrooms', 'Large dining area'],
		cover: withBase('/img/villa2/swimming_pool.webp'),
		width: 1600,
		height: 1200,
		href: withBaseHref('/villas/villa-b'),
		description:
			'Villa B offers a modern group layout with private pool, billiard area, open living room, and easy hosting for larger stays.',
		quickInfo: {
			guests: '12',
			bedrooms: '5',
			bathrooms: '7',
			location: 'Central Pattaya',
			booking: 'Hostex direct booking',
			highlights: ['Private pool', 'Billiard area', 'Kitchen', 'Parking']
		},
		bookingLinks: [
			{ label: 'Book on Airbnb', href: 'https://www.airbnb.com/h/-oasisb', variant: 'danger' },
			{
				label: 'Book on Booking.com',
				href: 'https://www.booking.com/hotel/th/downtown-oasis-ba-ti-ya-shi-zhong-xin-du-dong-yong-chi-bie-shu-b-5wo-6wei-ktv-bb.html',
				variant: 'primary'
			}
		],
		gallery: [
			{ src: withBase('/img/villa2/bedroom1.webp'), alt: 'Villa B bedroom' },
			{ src: withBase('/img/villa2/living_room.webp'), alt: 'Villa B living room' },
			{ src: withBase('/img/villa2/bathroom.webp'), alt: 'Villa B bathroom' },
			{ src: withBase('/img/villa2/parking.webp'), alt: 'Villa B parking area' },
			{ src: withBase('/img/villa2/billiard_ball.webp'), alt: 'Villa B billiard table' },
			{ src: withBase('/img/villa2/ktv.webp'), alt: 'Villa B KTV room' }
		]
	},
	{
		id: 'villa-c',
		name: 'Villa C',
		legacyName: 'Villa 3',
		tagline: 'Under construction',
		features: ['Under construction'],
		cover: '',
		coverAlt: 'Under construction',
		width: 1600,
		height: 1200,
		href: withBaseHref('/villas/villa-c'),
		description: 'Villa C is currently under construction. More details will be available soon.',
		underConstruction: true,
		quickInfo: {
			guests: 'To be announced',
			bedrooms: 'To be announced',
			bathrooms: 'To be announced',
			location: 'Pattaya',
			booking: 'Not yet available',
			highlights: ['Under construction']
		},
		bookingLinks: [],
		gallery: []
	}
];

export const platforms = [
	{
		id: 'trip',
		name: 'Trip.com',
		region: 'Shared listing',
		summary: 'One link for Villa A and Villa B.',
		badge: 'A + B',
		cover: withBase('/img/platforms/tripcom.webp'),
		thumbnail: withBase('/img/platforms/tripcom.webp'),
		logo: withBase('/img/platforms/tripcom.webp'),
		logoAlt: 'Trip.com logo',
		brandColor: '#1A4FA3',
		href: withBaseHref('/platforms'),
		links: [
			{
				label: 'Shared Listing',
				href: 'https://www.trip.com/m/vacation-rentals/w/detail?h-id=132058119&c-in=2026-07-29&c-out=2026-07-30&locale=zh-HK&curr=THB&d-city=622&c-rooms=1&d-time=25200&dplinktracelogid=appShare&s-filters=%5B%5B%22%E6%AF%8F%E6%88%BF%E6%AF%8F%E6%99%9A%E5%83%B9%E6%A0%BC%EF%BC%88%E6%9C%AA%E9%80%A3%E7%A8%85%E5%8F%8A%E9%99%84%E5%8A%A0%E8%B2%BB%EF%BC%89%22%2C%2280%7C0%7C0%22%2C%2280%22%2C%220%22%2C%22%22%2C%222%22%2C%22%22%2C%22%22%2C%22%5B%5D%22%2C%22%5B%5D%22%2C%22%22%5D%2C%5B%221%E6%88%90%E4%BA%BA%2C0%E5%84%BF%E7%AB%A5%22%2C%2229%7C1%22%2C%2229%22%2C%221%7C1%22%2C%22%22%2C%222%22%2C%22%22%2C%22%22%2C%22%22%2C%22%22%2C%22%22%5D%5D',
				variant: 'success'
			}
		]
	},
	{
		id: 'airbnb',
		name: 'Airbnb',
		region: 'Separate listings',
		summary: 'One Airbnb link per villa.',
		badge: 'A | B',
		cover: withBase('/img/platforms/airbnb.webp'),
		thumbnail: withBase('/img/platforms/airbnb.webp'),
		logo: withBase('/img/platforms/airbnb.webp'),
		logoAlt: 'Airbnb logo',
		brandColor: '#FF5A5F',
		href: withBaseHref('/platforms'),
		links: [
			{ label: 'Villa A Listing', href: 'https://www.airbnb.com/h/-oasis', variant: 'danger' },
			{ label: 'Villa B Listing', href: 'https://www.airbnb.com/h/-oasisb', variant: 'outline-danger' }
		]
	},
	{
		id: 'booking',
		name: 'Booking.com',
		region: 'Separate listings',
		summary: 'One Booking.com link per villa.',
		badge: 'A | B',
		cover: withBase('/img/platforms/booking.webp'),
		thumbnail: withBase('/img/platforms/booking.webp'),
		logo: withBase('/img/platforms/booking.webp'),
		logoAlt: 'Booking.com logo',
		brandColor: '#003B95',
		href: withBaseHref('/platforms'),
		links: [
			{
				label: 'Villa A Listing',
				href: 'https://www.booking.com/hotel/th/pattaya-walking-street-5-bedroom-6-bath-ktv-bbq-pool-villa.html',
				variant: 'primary'
			},
			{
				label: 'Villa B Listing',
				href: 'https://www.booking.com/hotel/th/downtown-oasis-ba-ti-ya-shi-zhong-xin-du-dong-yong-chi-bie-shu-b-5wo-6wei-ktv-bb.html',
				variant: 'outline-primary'
			}
		]
	}
];

export const businessConnections = [
	{ from: 'Trip.com', to: 'Villa A', note: 'Shared listing' },
	{ from: 'Trip.com', to: 'Villa B', note: 'Shared listing' },
	{ from: 'Villa A', to: 'Airbnb', note: 'Separate listing' },
	{ from: 'Villa B', to: 'Airbnb', note: 'Separate listing' }
];

/** @type {Record<string, any>} */
const zhVillas = {
	'villa-a': {
		name: 'A棟別墅', legacyName: '1號別墅', tagline: '私人泳池、燒烤區、KTV',
		features: ['私人泳池', '5間臥室', '廚房與洗衣設施'],
		description: '歡迎入住 A 棟別墅。這是一棟適合家庭和多人團體入住的私人泳池別墅，配有燒烤區、設備齊全的廚房和舒適客房。',
		location: '芭提雅市中心', booking: '人工預訂',
		highlights: ['私人泳池', '燒烤區', '廚房', '停車位'],
		galleryAlts: ['A 棟別墅臥室', 'A 棟別墅廚房', 'A 棟別墅浴室', 'A 棟別墅拖鞋', 'A 棟別墅餐桌', 'A 棟別墅 KTV 房']
	},
	'villa-b': {
		name: 'B棟別墅', legacyName: '2號別墅', tagline: '私人泳池、用餐區、桌球',
		features: ['私人泳池', '5间卧室', '宽敞用餐区'],
		description: 'B 棟別墅採用適合多人入住的現代空間佈局，配有私人泳池、桌球區、開放式客廳，方便家庭和團體聚會。',
		location: '芭提雅市中心', booking: '人工預訂',
		highlights: ['私人泳池', '桌球區', '廚房', '停車位'],
		galleryAlts: ['B 棟別墅臥室', 'B 棟別墅客廳', 'B 棟別墅浴室', 'B 棟別墅停車區', 'B 棟別墅桌球桌', 'B 棟別墅 KTV 房']
	}
};

/** @type {Record<string, any>} */
const zhPlatforms = {
	trip: { region: '共享房源', summary: '一個頁面同時展示 A 棟和 B 棟別墅。', labels: ['查看共享房源'] },
	airbnb: { region: '獨立房源', summary: '每棟別墅都有獨立的 Airbnb 房源頁面。', labels: ['查看 A 棟別墅', '查看 B 棟別墅'] },
	booking: { region: '獨立房源', summary: '每棟別墅都有獨立的 Booking.com 房源頁面。', labels: ['查看 A 棟別墅', '查看 B 棟別墅'] }
};

export function getCatalog(locale = 'en') {
	if (locale !== 'zh-TW') return { villas, platforms, businessConnections };
	const villaTranslations = zhVillas;
	const platformTranslations = zhPlatforms;

	const localizedVillas = villas.map((villa) => {
		const translated = villaTranslations[villa.id];
		if (!translated) return villa;
		return {
			...villa,
			name: translated.name,
			legacyName: translated.legacyName,
			tagline: translated.tagline,
			features: translated.features,
			description: translated.description,
			quickInfo: {
				...villa.quickInfo,
				location: translated.location,
				booking: translated.booking,
				highlights: translated.highlights
			},
			bookingLinks: villa.bookingLinks.map((link) => ({ ...link, label: link.label.replace('Book on', '前往') })),
			gallery: villa.gallery.map((image, index) => ({ ...image, alt: translated.galleryAlts[index] }))
		};
	});

	const localizedPlatforms = platforms.map((platform) => {
		const translated = platformTranslations[platform.id];
		return {
			...platform,
			region: translated.region,
			summary: translated.summary,
			logoAlt: `${platform.name} 标志`,
			links: platform.links.map((link, index) => ({
				...link,
				label: translated.labels[index],
				villaId: platform.id === 'trip' ? null : index === 0 ? 'villa-a' : 'villa-b'
			}))
		};
	});

	const localizedConnections = businessConnections.map((item) => ({
		...item,
		from: item.from.replace('Villa A', 'A棟別墅').replace('Villa B', 'B棟別墅'),
		to: item.to.replace('Villa A', 'A棟別墅').replace('Villa B', 'B棟別墅'),
		note: item.note === 'Shared listing' ? '共享房源' : '独立房源'
	}));

	return { villas: localizedVillas, platforms: localizedPlatforms, businessConnections: localizedConnections };
}
