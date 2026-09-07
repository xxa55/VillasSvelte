import { writable } from 'svelte/store';

export const supportedLanguages = [
	{ code: 'en', label: 'English' },
	{ code: 'th', label: 'ไทย' },
	{ code: 'zh-CN', label: '简体中文' }
];

export const language = writable('en');

export const copy = {
	en: {
		language: { label: 'Language' },
		home: {
			title: 'Pattaya Villas | Private Villas for Rent',
			description: 'Private villas in Pattaya with pool, BBQ, central location, and flexible booking through villa-first or platform-first paths.',
			brand: 'Pattaya Villas', about: 'About', location: 'Location', book: 'Book',
			heroTitle: 'Private villas near the beach',
			heroLead: 'Pool, BBQ, group-friendly layouts, and flexible booking once you are ready.',
			bookStay: 'Book your stay', seeVillas: 'See villas', videoFallback: 'Your browser does not support the video tag.',
			welcome: 'Welcome to Our Villas', welcomeLead: 'Choose your stay. Book your way.',
			amenities: [
				{ title: 'Private Pool', description: 'Relax in your own private pool and sun deck.' },
				{ title: 'BBQ & Kitchen', description: 'Outdoor BBQ area and a fully equipped kitchen.' },
				{ title: 'Comfortable Bedrooms', description: 'Multiple comfortable bedrooms with privacy.' }
			],
			where: 'Where we are', whereLead: 'Near the beach, Walking Street, restaurants, and shopping.',
			addressLabel: 'Address', address: '297/3, Pattaya City, Bang Lamung District, Chon Buri 20150, Thailand',
			locationPoints: ['Central Pattaya / Beach Road area', 'Close to nightlife, dining, and attractions', 'Easy pickup and drop-off for guests'],
			openMaps: 'Open in Google Maps ↗', propertyAddress: 'Property address', mapAlt: 'Map showing the central Pattaya location',
			mapZoom: 'Double click to zoom the Pattaya map', mapCaption: 'Map preview. Double-click to enlarge, or open Google Maps.',
			bookHeading: 'Book your stay', bookLead: 'Choose by villa or platform.', villas: 'Villas', platforms: 'Platforms', choose: 'Choose',
			contact: 'Contact', connect: 'Connect', place: 'Pattaya, Thailand', closePreview: 'Close image preview', zoomQr: 'Double click to zoom the QR code',
			previous: 'Previous', next: 'Next'
		},
		villasPage: {
			title: 'Villas | Pattaya Villas', description: 'Browse Villa A and Villa B, private pool villas in central Pattaya with BBQ, KTV, and flexible direct or platform booking.',
			label: 'Villas', heading: 'Pick a villa', seePlatforms: 'See platforms', explore: 'Explore'
		},
		platformsPage: {
			title: 'Booking Platforms | Pattaya Villas', description: 'Book Downtown Oasis villas directly on Airbnb and Booking.com, or find both villas on Trip.com.',
			label: 'Platforms', heading: 'Pick a platform', lead: 'Trip.com is shared. Airbnb splits by villa.', seeVillas: 'See villas',
			relationship: 'Business relationship', relationshipLead: 'Trip.com points to both villas through one shared listing, while Airbnb splits into one listing per villa.'
		},
		villaDetail: {
			siteName: 'Pattaya Villas', home: 'Home', villas: 'Villas', poolAlt: 'swimming pool', amenities: 'Amenities', ready: 'Ready to book',
			quickInfo: 'Quick Info', guests: 'Guests', bedrooms: 'Bedrooms', bathrooms: 'Bathrooms', location: 'Location', booking: 'Booking', highlights: 'Highlights',
			choosePlatform: 'Choose your platform', platformLead: 'Trip.com is shared. Airbnb and Booking.com are villa-specific.', bookingAria: 'Booking platforms for', gallery: 'Gallery',
			sharedListing: 'Shared listing', separateListings: 'Separate listings', bothVillas: 'Both villas', sharedSummary: 'Shared listing for both villas.', directListing: 'Direct {platform} listing for {villa}.', breadcrumb: 'Breadcrumb'
		}
	},
	th: {
		language: { label: 'ภาษา' },
		home: {
			title: 'พูลวิลล่าพัทยา | บ้านพักส่วนตัวให้เช่า',
			description: 'พูลวิลล่าส่วนตัวใจกลางพัทยา พร้อมพื้นที่บาร์บีคิว ห้องครัว และช่องทางการจองที่ยืดหยุ่น',
			brand: 'พูลวิลล่าพัทยา', about: 'เกี่ยวกับเรา', location: 'ที่ตั้ง', book: 'จองที่พัก',
			heroTitle: 'พูลวิลล่าส่วนตัวใกล้ชายหาด',
			heroLead: 'สระว่ายน้ำ บาร์บีคิว พื้นที่เหมาะสำหรับกลุ่ม และช่องทางการจองที่สะดวก',
			bookStay: 'จองที่พัก', seeVillas: 'ดูวิลล่า', videoFallback: 'เบราว์เซอร์ของคุณไม่รองรับวิดีโอ',
			welcome: 'ยินดีต้อนรับสู่วิลล่าของเรา', welcomeLead: 'เลือกที่พักและจองในแบบที่คุณสะดวก',
			amenities: [
				{ title: 'สระว่ายน้ำส่วนตัว', description: 'ผ่อนคลายในสระว่ายน้ำและพื้นที่อาบแดดส่วนตัว' },
				{ title: 'บาร์บีคิวและห้องครัว', description: 'มีพื้นที่บาร์บีคิวกลางแจ้งและห้องครัวพร้อมอุปกรณ์ครบครัน' },
				{ title: 'ห้องนอนแสนสบาย', description: 'ห้องนอนหลายห้องที่สะดวกสบายและเป็นส่วนตัว' }
			],
			where: 'ที่ตั้งของเรา', whereLead: 'ใกล้ชายหาด ถนนคนเดิน ร้านอาหาร และแหล่งช้อปปิ้ง',
			addressLabel: 'ที่อยู่', address: '297/3 เมืองพัทยา อำเภอบางละมุง จังหวัดชลบุรี 20150 ประเทศไทย',
			locationPoints: ['ใจกลางพัทยา ใกล้ถนนเลียบชายหาด', 'ใกล้สถานบันเทิง ร้านอาหาร และสถานที่ท่องเที่ยว', 'สะดวกสำหรับการรับส่งผู้เข้าพัก'],
			openMaps: 'เปิดใน Google Maps ↗', propertyAddress: 'ที่อยู่วิลล่า', mapAlt: 'แผนที่แสดงที่ตั้งใจกลางพัทยา',
			mapZoom: 'ดับเบิลคลิกเพื่อขยายแผนที่พัทยา', mapCaption: 'ตัวอย่างแผนที่ ดับเบิลคลิกเพื่อขยาย หรือเปิดใน Google Maps',
			bookHeading: 'จองที่พัก', bookLead: 'เลือกตามวิลล่าหรือแพลตฟอร์ม', villas: 'วิลล่า', platforms: 'แพลตฟอร์ม', choose: 'เลือก',
			contact: 'ติดต่อเรา', connect: 'ช่องทางออนไลน์', place: 'พัทยา ประเทศไทย', closePreview: 'ปิดตัวอย่างรูปภาพ', zoomQr: 'ดับเบิลคลิกเพื่อขยายคิวอาร์โค้ด',
			previous: 'ก่อนหน้า', next: 'ถัดไป'
		},
		villasPage: {
			title: 'วิลล่า | พูลวิลล่าพัทยา', description: 'เลือกชมวิลล่า A และวิลล่า B พูลวิลล่าส่วนตัวใจกลางพัทยา พร้อมบาร์บีคิว คาราโอเกะ และช่องทางการจองที่ยืดหยุ่น',
			label: 'วิลล่า', heading: 'เลือกวิลล่าของคุณ', seePlatforms: 'ดูแพลตฟอร์มการจอง', explore: 'ดูรายละเอียด'
		},
		platformsPage: {
			title: 'แพลตฟอร์มการจอง | พูลวิลล่าพัทยา', description: 'จองวิลล่าดาวน์ทาวน์โอเอซิสผ่าน Airbnb และ Booking.com หรือดูวิลล่าทั้งสองหลังบน Trip.com',
			label: 'แพลตฟอร์มการจอง', heading: 'เลือกแพลตฟอร์ม', lead: 'Trip.com ใช้หน้ารวม ส่วน Airbnb แยกหน้าตามวิลล่า', seeVillas: 'ดูวิลล่า',
			relationship: 'ความเชื่อมโยงของช่องทางการจอง', relationshipLead: 'Trip.com เชื่อมไปยังวิลล่าทั้งสองหลังในหน้ารวม ส่วน Airbnb มีหน้ารายการแยกสำหรับแต่ละวิลล่า'
		},
		villaDetail: {
			siteName: 'พูลวิลล่าพัทยา', home: 'หน้าแรก', villas: 'วิลล่า', poolAlt: 'สระว่ายน้ำ', amenities: 'สิ่งอำนวยความสะดวก', ready: 'พร้อมจอง',
			quickInfo: 'ข้อมูลโดยย่อ', guests: 'ผู้เข้าพัก', bedrooms: 'ห้องนอน', bathrooms: 'ห้องน้ำ', location: 'ที่ตั้ง', booking: 'การจอง', highlights: 'จุดเด่น',
			choosePlatform: 'เลือกแพลตฟอร์มการจอง', platformLead: 'Trip.com เป็นหน้ารวม ส่วน Airbnb และ Booking.com แยกตามวิลล่า', bookingAria: 'แพลตฟอร์มการจองสำหรับ', gallery: 'แกลเลอรี',
			sharedListing: 'รายการรวม', separateListings: 'รายการแยก', bothVillas: 'วิลล่าทั้งสองหลัง', sharedSummary: 'รายการรวมสำหรับวิลล่าทั้งสองหลัง', directListing: 'รายการ {villa} โดยตรงบน {platform}', breadcrumb: 'เส้นทางนำทาง'
		}
	},
	'zh-CN': {
		language: { label: '语言' },
		home: {
			title: '芭提雅城市绿洲泳池别墅 | 私人泳池度假住宿',
			description: '位于芭提雅市中心的私人泳池别墅，配有烧烤区和厨房，可通过多种预订平台灵活预订。',
			brand: '芭提雅城市绿洲', about: '别墅介绍', location: '位置', book: '预订',
			heroTitle: '海滩附近的私享泳池别墅',
			heroLead: '私人泳池、烧烤区和适合多人入住的宽敞空间，为您提供灵活便捷的预订方式。',
			bookStay: '预订住宿', seeVillas: '查看别墅', videoFallback: '您的浏览器不支持播放此视频。',
			welcome: '欢迎入住城市绿洲泳池别墅', welcomeLead: '选择心仪别墅，按您喜欢的方式预订。',
			amenities: [
				{ title: '私人泳池', description: '在专属私人泳池和日光休闲区尽情放松。' },
				{ title: '烧烤区与厨房', description: '配有户外烧烤区和设备齐全的厨房。' },
				{ title: '舒适客房', description: '多间舒适客房，为家人和朋友提供充足的私密空间。' }
			],
			where: '别墅位置', whereLead: '靠近海滩、芭提雅步行街、餐厅和购物中心。',
			addressLabel: '地址', address: '泰国春武里府邦拉蒙县芭提雅市 297/3，邮编 20150',
			locationPoints: ['位于芭提雅市中心及海滩路附近', '邻近夜生活区、餐厅和热门景点', '方便客人上下车及接送'],
			openMaps: '在 Google 地图中查看 ↗', propertyAddress: '别墅地址', mapAlt: '芭提雅市中心位置地图',
			mapZoom: '双击放大芭提雅位置地图', mapCaption: '位置地图预览。双击可放大，或在 Google 地图中查看。',
			bookHeading: '预订住宿', bookLead: '您可以按别墅或预订平台进行选择。', villas: '别墅', platforms: '预订平台', choose: '查看并选择',
			contact: '联系我们', connect: '社交平台', place: '泰国芭提雅', closePreview: '关闭图片预览', zoomQr: '双击放大二维码',
			previous: '上一个', next: '下一个'
		},
		villasPage: {
			title: '别墅 | 芭提雅城市绿洲', description: '查看位于芭提雅市中心的A栋和B栋私人泳池别墅，配有烧烤区、KTV，并支持直接或通过平台预订。',
			label: '泳池别墅', heading: '选择心仪别墅', seePlatforms: '查看预订平台', explore: '查看'
		},
		platformsPage: {
			title: '预订平台 | 芭提雅城市绿洲', description: '可通过 Airbnb 和 Booking.com 分别预订城市绿洲泳池别墅，也可在 Trip.com 查看共享房源。',
			label: '预订平台', heading: '选择预订平台', lead: 'Trip.com 使用共享房源页面，Airbnb 按别墅分别展示。', seeVillas: '查看别墅',
			relationship: '平台与别墅对应关系', relationshipLead: 'Trip.com 的一个共享房源页面包含两栋别墅；Airbnb 则为每栋别墅提供独立房源页面。'
		},
		villaDetail: {
			siteName: '芭提雅城市绿洲', home: '首页', villas: '别墅', poolAlt: '私人泳池', amenities: '设施与服务', ready: '开始预订',
			quickInfo: '基本信息', guests: '可住人数', bedrooms: '卧室', bathrooms: '浴室', location: '位置', booking: '预订方式', highlights: '特色设施',
			choosePlatform: '选择预订平台', platformLead: 'Trip.com 为两栋别墅的共享页面；Airbnb 和 Booking.com 提供各栋别墅的独立房源页面。', bookingAria: '预订平台：', gallery: '图片展示',
			sharedListing: '共享房源', separateListings: '独立房源', bothVillas: '两栋别墅', sharedSummary: '此房源页面同时展示A栋和B栋别墅。', directListing: '在 {platform} 查看并预订{villa}。', breadcrumb: '页面路径'
		}
	}
};

/** @param {string} locale */
export const getCopy = (locale) => locale === 'th' ? copy.th : locale === 'zh-CN' ? copy['zh-CN'] : copy.en;
