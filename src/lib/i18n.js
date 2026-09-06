import { writable } from 'svelte/store';

export const supportedLanguages = [
	{ code: 'en', label: 'English' },
	{ code: 'zh-CN', label: '简体中文' }
];

export const language = writable('en');

export const copy = {
	en: {
		language: { label: 'Language' },
		account: { signIn: 'Sign in', signOut: 'Sign out' },
		auth: { title: 'Sign in | Downtown Oasis', eyebrow: 'Guest account', heading: 'Sign in to book.', lead: 'Use one account for booking requests, booking history, and villa comments.', email: 'Email', password: 'Password', signIn: 'Sign in', createAccount: 'Create account', continueGoogle: 'Continue with Google' },
		comments: { eyebrow: 'Guest reviews', heading: 'Notes from our guests.', rating: 'Your rating', star: 'star', stars: 'stars', placeholder: 'Share a helpful comment about your stay', post: 'Post review', checkingAuth: 'Checking your sign-in status. Please try again.', guest: 'Guest', thanks: 'Thank you for sharing your experience.', outOfFive: 'out of 5 stars', empty: 'No reviews yet. Be the first to share your stay.' },
		home: {
			title: 'Pattaya Villas | Private Villas for Rent',
			description: 'Private villas in Pattaya with pools, BBQ areas, a central location, and secure direct booking.',
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
			bookHeading: 'Book your stay', bookLead: 'Choose a villa, select your dates, and book directly.', villas: 'Villas', platforms: 'Platforms', choose: 'Choose',
			contact: 'Contact', connect: 'Connect', place: 'Pattaya, Thailand', closePreview: 'Close image preview', zoomQr: 'Double click to zoom the QR code',
			previous: 'Previous', next: 'Next'
		},
		villasPage: {
			title: 'Villas | Pattaya Villas', description: 'Browse Villa A and Villa B, private pool villas in central Pattaya with BBQ, KTV, and secure direct booking.',
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
			sharedListing: 'Shared listing', separateListings: 'Separate listings', bothVillas: 'Both villas', sharedSummary: 'Shared listing for both villas.', directListing: 'Direct {platform} listing for {villa}.', breadcrumb: 'Breadcrumb', scrollMore: 'Scroll to see more photos'
		},
		bookingPanel: {
			eyebrow: 'Direct booking', heading: 'Request your stay.', lead: 'Book directly and save ฿1,000 per day. A non-refundable $100 USD deposit (approximately ฿3,300) is required to confirm your booking. We will let you know whether your booking is successful. If we cannot confirm it, we will contact you to return your deposit.',
			checkIn: 'Check in', checkOut: 'Check out', selectDate: 'Click a date below', selectLaterDate: 'Click a later date below', selectCheckInFirst: 'Select check-in first', request: 'Request booking', sending: 'Sending request...',
			calendarFor: 'Select dates for {villa}', calendarHeading: 'Choose your dates on this calendar', stepOne: 'Click your check-in date', stepTwo: 'Click your check-out date', previousMonth: 'Previous month', nextMonth: 'Next month', booked: 'Booked', unavailable: 'unavailable', available: 'available',
			checkingAuth: 'Checking your sign-in status. Please try again.', chooseDates: 'Choose available check-in and check-out dates.', chooseCheckOut: 'Now choose your check-out date.', bookedDates: 'Those dates include booked dates. Please choose another stay.'
		},
		payment: {
			title: 'Payment | Downtown Oasis', description: 'PromptPay instructions for your Downtown Oasis booking request.', requestReceived: 'Booking request received', heading: 'Complete your deposit', lead: 'Transfer the non-refundable $100 USD deposit, approximately ฿3,300, using PromptPay. We will let you know whether your booking is successful.',
			staySummary: '{villa}: {checkIn} to {checkOut}', promptPay: 'PromptPay', scanHeading: 'Scan to transfer', scanLead: 'Use your banking app to scan the QR code. Keep your transfer confirmation until we confirm your booking.', qrAlt: 'PromptPay QR code for the booking deposit',
			accountVerification: 'Account verification', accountHeading: 'Company account', accountLead: 'Confirm the recipient details in your banking app before transferring.', accountAlt: 'Downtown Oasis company account document',
			receiptReceived: 'Receipt received', reviewHeading: 'We are reviewing your booking request.', reviewLead: 'We received your payment photo and will contact you after review.', finalStep: 'Final step', uploadHeading: 'Upload your payment photo', uploadLead: 'Upload a clear screenshot or photo of your PromptPay transfer so we can review your booking request.', paymentPhoto: 'Payment photo', uploading: 'Uploading...', submitPhoto: 'Submit payment photo', uploadFailed: 'Your payment photo could not be submitted. Please try again.', missingBooking: 'Your booking reference is missing. Return to the villa page and submit your request again.', returnToVilla: 'Return to villa'
		}
	},
	'zh-CN': {
		language: { label: '语言' },
		account: { signIn: '登录', signOut: '退出登录' },
		auth: { title: '登录 | 芭提雅城市绿洲', eyebrow: '住客账户', heading: '登录后即可预订', lead: '使用同一账户提交预订申请、查看预订记录和发布别墅评价。', email: '邮箱', password: '密码', signIn: '登录', createAccount: '创建账户', continueGoogle: '使用 Google 继续' },
		comments: { eyebrow: '住客评价', heading: '住客留言', rating: '您的评分', star: '星', stars: '星', placeholder: '分享您入住期间的体验', post: '发布评价', checkingAuth: '正在检查登录状态，请稍后重试。', guest: '住客', thanks: '感谢您分享入住体验。', outOfFive: '满分 5 星', empty: '暂无评价，欢迎成为第一位分享入住体验的住客。' },
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
			bookHeading: '预订住宿', bookLead: '选择别墅和日期，然后直接预订。', villas: '别墅', platforms: '预订平台', choose: '查看并选择',
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
			sharedListing: '共享房源', separateListings: '独立房源', bothVillas: '两栋别墅', sharedSummary: '此房源页面同时展示A栋和B栋别墅。', directListing: '在 {platform} 查看并预订{villa}。', breadcrumb: '页面路径', scrollMore: '横向滑动查看更多照片'
		},
		bookingPanel: {
			eyebrow: '直接预订', heading: '提交入住申请', lead: '直接预订，每天可节省 ฿1,000。确认预订需支付不可退款的 100 美元定金（约 ฿3,300）。我们将通知您预订是否成功；如无法确认预订，我们会联系您退还定金。',
			checkIn: '入住日期', checkOut: '退房日期', selectDate: '请在下方选择日期', selectLaterDate: '请选择之后的日期', selectCheckInFirst: '请先选择入住日期', request: '提交预订申请', sending: '正在提交申请...',
			calendarFor: '选择 {villa} 的日期', calendarHeading: '请在日历上选择入住日期', stepOne: '选择入住日期', stepTwo: '选择退房日期', previousMonth: '上个月', nextMonth: '下个月', booked: '已预订', unavailable: '不可用', available: '可预订',
			checkingAuth: '正在检查登录状态，请稍后重试。', chooseDates: '请选择可用的入住和退房日期。', chooseCheckOut: '现在请选择退房日期。', bookedDates: '所选日期包含已预订日期，请选择其他日期。'
		},
		payment: {
			title: '付款 | 芭提雅城市绿洲', description: '芭提雅城市绿洲预订申请的 PromptPay 付款说明。', requestReceived: '已收到预订申请', heading: '完成定金支付', lead: '请通过 PromptPay 支付不可退款的 100 美元定金，约合 ฿3,300。我们将通知您预订是否成功。',
			staySummary: '{villa}：{checkIn} 至 {checkOut}', promptPay: 'PromptPay', scanHeading: '扫码转账', scanLead: '请使用您的银行应用扫描二维码。请保留转账凭证，直至我们确认您的预订。', qrAlt: '预订定金 PromptPay 二维码',
			accountVerification: '账户核验', accountHeading: '公司账户', accountLead: '转账前，请在您的银行应用中确认收款人信息。', accountAlt: '芭提雅城市绿洲公司账户文件',
			receiptReceived: '已收到付款凭证', reviewHeading: '我们正在审核您的预订申请。', reviewLead: '我们已收到您的付款截图，审核后会与您联系。', finalStep: '最后一步', uploadHeading: '上传付款截图', uploadLead: '请上传清晰的 PromptPay 转账截图或照片，以便我们审核您的预订申请。', paymentPhoto: '付款截图', uploading: '正在上传...', submitPhoto: '提交付款截图', uploadFailed: '无法提交您的付款截图，请重试。', missingBooking: '缺少您的预订编号。请返回别墅页面并重新提交申请。', returnToVilla: '返回别墅页面'
		}
	}
};

/** @param {string} locale */
export const getCopy = (locale) => locale === 'zh-CN' ? copy['zh-CN'] : copy.en;
