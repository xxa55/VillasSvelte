import { asset, resolve } from '$app/paths';

/** @param {Parameters<typeof asset>[0]} path */
const withBase = (path) => asset(path);
/** @param {Parameters<typeof resolve>[0]} path */
const withBaseHref = (path) => resolve(path);

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
			guests: '10',
			bedrooms: '5',
			bathrooms: '6',
			location: 'Central Pattaya',
			booking: 'Trip.com shared, Airbnb and Booking.com direct',
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
			guests: '10',
			bedrooms: '5',
			bathrooms: '6',
			location: 'Central Pattaya',
			booking: 'Trip.com shared, Airbnb and Booking.com direct',
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
		name: 'A栋别墅', legacyName: '1号别墅', tagline: '私人泳池、烧烤区、KTV',
		features: ['私人泳池', '5间卧室', '厨房与洗衣设施'],
		description: '欢迎入住A栋别墅。这是一栋适合家庭和多人团体入住的私人泳池别墅，配有烧烤区、设备齐全的厨房和舒适客房。',
		location: '芭提雅市中心', booking: 'Trip.com 共享房源，Airbnb 和 Booking.com 独立预订',
		highlights: ['私人泳池', '烧烤区', '厨房', '停车位'],
		galleryAlts: ['A栋别墅卧室', 'A栋别墅厨房', 'A栋别墅浴室', 'A栋别墅拖鞋', 'A栋别墅餐桌', 'A栋别墅KTV房']
	},
	'villa-b': {
		name: 'B栋别墅', legacyName: '2号别墅', tagline: '私人泳池、用餐区、台球',
		features: ['私人泳池', '5间卧室', '宽敞用餐区'],
		description: 'B栋别墅采用适合多人入住的现代空间布局，配有私人泳池、台球区、开放式客厅，方便家庭和团体聚会。',
		location: '芭提雅市中心', booking: 'Trip.com 共享房源，Airbnb 和 Booking.com 独立预订',
		highlights: ['私人泳池', '台球区', '厨房', '停车位'],
		galleryAlts: ['B栋别墅卧室', 'B栋别墅客厅', 'B栋别墅浴室', 'B栋别墅停车区', 'B栋别墅台球桌', 'B栋别墅KTV房']
	}
};

/** @type {Record<string, any>} */
const zhPlatforms = {
	trip: { region: '共享房源', summary: '一个页面同时展示A栋和B栋别墅。', labels: ['查看共享房源'] },
	airbnb: { region: '独立房源', summary: '每栋别墅都有独立的 Airbnb 房源页面。', labels: ['查看A栋别墅', '查看B栋别墅'] },
	booking: { region: '独立房源', summary: '每栋别墅都有独立的 Booking.com 房源页面。', labels: ['查看A栋别墅', '查看B栋别墅'] }
};

/** @type {Record<string, any>} */
const thVillas = {
	'villa-a': {
		name: 'วิลล่า A', legacyName: 'วิลล่า 1', tagline: 'สระส่วนตัว บาร์บีคิว คาราโอเกะ',
		features: ['สระว่ายน้ำส่วนตัว', '5 ห้องนอน', 'ห้องครัวและพื้นที่ซักรีด'],
		description: 'วิลล่า A เป็นพูลวิลล่าส่วนตัวพร้อมพื้นที่บาร์บีคิว ห้องครัวครบครัน และห้องพักสะดวกสบาย เหมาะสำหรับครอบครัวและกลุ่มเพื่อน',
		location: 'ใจกลางพัทยา', booking: 'Trip.com แบบรวม และ Airbnb กับ Booking.com แบบแยกวิลล่า',
		highlights: ['สระว่ายน้ำส่วนตัว', 'พื้นที่บาร์บีคิว', 'ห้องครัว', 'ที่จอดรถ'],
		galleryAlts: ['ห้องนอนวิลล่า A', 'ห้องครัววิลล่า A', 'ห้องน้ำวิลล่า A', 'รองเท้าแตะวิลล่า A', 'โต๊ะวิลล่า A', 'ห้องคาราโอเกะวิลล่า A']
	},
	'villa-b': {
		name: 'วิลล่า B', legacyName: 'วิลล่า 2', tagline: 'สระส่วนตัว พื้นที่รับประทานอาหาร โต๊ะพูล',
		features: ['สระว่ายน้ำส่วนตัว', '5 ห้องนอน', 'พื้นที่รับประทานอาหารขนาดใหญ่'],
		description: 'วิลล่า B มีพื้นที่ทันสมัยสำหรับการเข้าพักเป็นกลุ่ม พร้อมสระส่วนตัว โต๊ะพูล ห้องนั่งเล่นแบบเปิด และพื้นที่สังสรรค์ที่สะดวกสบาย',
		location: 'ใจกลางพัทยา', booking: 'Trip.com แบบรวม และ Airbnb กับ Booking.com แบบแยกวิลล่า',
		highlights: ['สระว่ายน้ำส่วนตัว', 'โต๊ะพูล', 'ห้องครัว', 'ที่จอดรถ'],
		galleryAlts: ['ห้องนอนวิลล่า B', 'ห้องนั่งเล่นวิลล่า B', 'ห้องน้ำวิลล่า B', 'ที่จอดรถวิลล่า B', 'โต๊ะพูลวิลล่า B', 'ห้องคาราโอเกะวิลล่า B']
	}
};

/** @type {Record<string, any>} */
const thPlatforms = {
	trip: { region: 'รายการรวม', summary: 'ลิงก์เดียวสำหรับวิลล่า A และวิลล่า B', labels: ['ดูรายการรวม'] },
	airbnb: { region: 'รายการแยก', summary: 'แต่ละวิลล่ามีหน้ารายการ Airbnb แยกกัน', labels: ['ดูวิลล่า A', 'ดูวิลล่า B'] },
	booking: { region: 'รายการแยก', summary: 'แต่ละวิลล่ามีหน้ารายการ Booking.com แยกกัน', labels: ['ดูวิลล่า A', 'ดูวิลล่า B'] }
};

export function getCatalog(locale = 'en') {
	if (locale !== 'zh-CN' && locale !== 'th') return { villas, platforms, businessConnections };
	const villaTranslations = locale === 'th' ? thVillas : zhVillas;
	const platformTranslations = locale === 'th' ? thPlatforms : zhPlatforms;

	const localizedVillas = villas.map((villa) => {
		const translated = villaTranslations[villa.id];
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
			bookingLinks: villa.bookingLinks.map((link) => ({ ...link, label: link.label.replace('Book on', locale === 'th' ? 'จองผ่าน' : '前往') })),
			gallery: villa.gallery.map((image, index) => ({ ...image, alt: translated.galleryAlts[index] }))
		};
	});

	const localizedPlatforms = platforms.map((platform) => {
		const translated = platformTranslations[platform.id];
		return {
			...platform,
			region: translated.region,
			summary: translated.summary,
			logoAlt: `${platform.name} ${locale === 'th' ? 'โลโก้' : '标志'}`,
			links: platform.links.map((link, index) => ({
				...link,
				label: translated.labels[index],
				villaId: platform.id === 'trip' ? null : index === 0 ? 'villa-a' : 'villa-b'
			}))
		};
	});

	const localizedConnections = businessConnections.map((item) => ({
		...item,
		from: item.from.replace('Villa A', locale === 'th' ? 'วิลล่า A' : 'A栋别墅').replace('Villa B', locale === 'th' ? 'วิลล่า B' : 'B栋别墅'),
		to: item.to.replace('Villa A', locale === 'th' ? 'วิลล่า A' : 'A栋别墅').replace('Villa B', locale === 'th' ? 'วิลล่า B' : 'B栋别墅'),
		note: item.note === 'Shared listing' ? (locale === 'th' ? 'รายการรวม' : '共享房源') : (locale === 'th' ? 'รายการแยก' : '独立房源')
	}));

	return { villas: localizedVillas, platforms: localizedPlatforms, businessConnections: localizedConnections };
}
