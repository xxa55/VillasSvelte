export const villas = [
	{
		id: 'villa-a',
		name: 'Villa A',
		legacyName: 'Villa 1',
		tagline: 'Pool, BBQ, KTV',
		features: ['Private pool', '5 bedrooms', 'Kitchen and laundry'],
		cover: '/img/villa1/swimming_pool.jpg',
		width: 1600,
		height: 1200,
		href: '/villas/villa-a',
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
			{ src: '/img/villa1/bedroom1.jpg', alt: 'Villa A bedroom' },
			{ src: '/img/villa1/kitchen.jpg', alt: 'Villa A kitchen' },
			{ src: '/img/villa1/bathroom.jpg', alt: 'Villa A bathroom' },
			{ src: '/img/villa1/slipper.jpg', alt: 'Villa A slippers' },
			{ src: '/img/villa1/table.jpg', alt: 'Villa A table' },
			{ src: '/img/villa1/ktv.jpg', alt: 'Villa A KTV room' }
		]
	},
	{
		id: 'villa-b',
		name: 'Villa B',
		legacyName: 'Villa 2',
		tagline: 'Pool, dining, billiards',
		features: ['Private pool', '5 bedrooms', 'Large dining area'],
		cover: '/img/villa2/swimming_pool.jpg',
		width: 1600,
		height: 1200,
		href: '/villas/villa-b',
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
			{ src: '/img/villa2/bedroom1.jpg', alt: 'Villa B bedroom' },
			{ src: '/img/villa2/living_room.jpg', alt: 'Villa B living room' },
			{ src: '/img/villa2/bathroom.jpg', alt: 'Villa B bathroom' },
			{ src: '/img/villa2/parking.jpg', alt: 'Villa B parking area' },
			{ src: '/img/villa2/billiard_ball.jpg', alt: 'Villa B billiard table' },
			{ src: '/img/villa2/ktv.jpg', alt: 'Villa B KTV room' }
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
		cover: '/img/platforms/tripcom.webp',
		thumbnail: '/img/platforms/tripcom.webp',
		logo: '/img/platforms/tripcom.webp',
		logoAlt: 'Trip.com logo',
		brandColor: '#1A4FA3',
		href: '/platforms',
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
		cover: '/img/platforms/airbnb.webp',
		thumbnail: '/img/platforms/airbnb.webp',
		logo: '/img/platforms/airbnb.webp',
		logoAlt: 'Airbnb logo',
		brandColor: '#FF5A5F',
		href: '/platforms',
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
		cover: '/img/platforms/booking.webp',
		thumbnail: '/img/platforms/booking.webp',
		logo: '/img/platforms/booking.webp',
		logoAlt: 'Booking.com logo',
		brandColor: '#003B95',
		href: '/platforms',
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
