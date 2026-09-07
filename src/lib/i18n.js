import { writable } from 'svelte/store';

export const supportedLanguages = [
	{ code: 'en', label: 'English' },
	{ code: 'zh-TW', label: '繁體中文' }
];

export const language = writable('en');

export const copy = {
	en: {
		language: { label: 'Language' },
		account: { signIn: 'Sign in', signOut: 'Sign out' },
		auth: { title: 'Sign in | Downtown Oasis', eyebrow: 'Guest account', heading: 'Sign in to book.', lead: 'Use one account for booking requests, booking history, and villa comments.', email: 'Email', password: 'Password', signIn: 'Sign in', createAccount: 'Create account', continueGoogle: 'Continue with Google' },
		comments: { eyebrow: 'Guest reviews', heading: 'Notes from our guests.', rating: 'Your rating', star: 'star', stars: 'stars', placeholder: 'Share a helpful comment about your stay', post: 'Post review', checkingAuth: 'Checking your sign-in status. Please try again.', guest: 'Guest', thanks: 'Thank you for sharing your experience.', outOfFive: 'out of 5 stars', empty: 'No reviews yet. Be the first to share your stay.', delete: 'Delete comment', deleting: 'Deleting...', deleteFailed: 'The comment could not be deleted.' },
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
			accountBank: 'Bank', accountBranch: 'Branch', accountNumber: 'Account number', accountName: 'Account name', accountType: 'Account type', accountTypeValue: 'Savings account', accountBankValue: 'Kasikornbank', accountBranchValue: 'Central Pattaya Branch', accountNumberValue: '218-2-06057-9', accountNameValue: 'DOWNTOWN OASIS CO., LTD.',
			receiptReceived: 'Receipt received', reviewHeading: 'We are reviewing your booking request.', reviewLead: 'We received your payment photo and will contact you after review.', finalStep: 'Final step', uploadHeading: 'Upload your payment photo', uploadLead: 'Upload a clear screenshot or photo of your PromptPay transfer so we can review your booking request.', paymentPhoto: 'Payment photo', uploading: 'Uploading...', submitPhoto: 'Submit payment photo', uploadFailed: 'Your payment photo could not be submitted. Please try again.', missingBooking: 'Your booking reference is missing. Return to the villa page and submit your request again.', returnToVilla: 'Return to villa'
		},
		hostexBooking: {
			eyebrow: 'Direct booking', heading: 'Check availability and prices', lead: 'Choose your dates and guest count first. After you see the live Hostex price, upload your paid receipt before submitting the booking request.', checkingAuth: 'Checking your sign-in status...', signInRequired: 'Sign-in is required to book.', signInLead: 'Please sign in before viewing availability, uploading payment, or requesting this villa.', signIn: 'Sign in to book', unavailable: 'This villa is not available for direct booking yet.', chooseDates: 'Choose your dates first', chooseDatesLead: 'After you click Check prices, the payment instructions and receipt upload will appear before the final Hostex booking step.', uploadToContinue: 'Upload receipt to continue', manualPayment: 'Manual payment required', manualPaymentLead: 'After selecting your dates and reviewing the Hostex price above, transfer the required deposit using the account below. Upload a clear paid receipt before submitting the Hostex booking request. Your booking is not confirmed until the payment is reviewed.', bank: 'Bank', branch: 'Branch', accountNumber: 'Account number', accountName: 'Account name', accountType: 'Account type', accountTypeValue: 'Savings account', payPromptPay: 'Pay with PromptPay', promptPayLead: 'Scan this QR code with your banking app, then upload the paid receipt below.', qrAlt: 'PromptPay payment QR code', email: 'Your email', receiptPhoto: 'Paid receipt photo', sending: 'Sending receipt...', sendReceipt: 'Send receipt and continue', receiptReceived: 'Receipt received.', receiptContinue: 'You can now submit the Hostex booking request above.', receiptRequired: 'Please upload your paid receipt before continuing to the Hostex booking page.', bankValue: 'Kasikornbank', branchValue: 'Central Pattaya Branch', accountNumberValue: '218-2-06057-9', accountNameValue: 'DOWNTOWN OASIS CO., LTD.'
		}
	},
	'zh-TW': {
		language: { label: '语言' },
		account: { signIn: '登入', signOut: '登出' },
		auth: { title: '登入 | 芭提雅城市綠洲', eyebrow: '住客帳戶', heading: '登入後即可預訂', lead: '使用同一帳戶提交預訂申請、查看預訂記錄和發佈別墅評價。', email: '電郵', password: '密碼', signIn: '登入', createAccount: '建立帳戶', continueGoogle: '使用 Google 繼續' },
		comments: { eyebrow: '住客評價', heading: '住客留言', rating: '您的評分', star: '星', stars: '星', placeholder: '分享您入住期間的體驗', post: '發佈評價', checkingAuth: '正在檢查登入狀態，請稍後重試。', guest: '住客', thanks: '感謝您分享入住體驗。', outOfFive: '滿分 5 星', empty: '暫無評價，歡迎成為第一位分享入住體驗的住客。', delete: '刪除留言', deleting: '正在刪除...', deleteFailed: '無法刪除留言。' },
		home: {
			title: '芭提雅城市綠洲泳池別墅 | 私人泳池度假住宿',
			description: '位於芭提雅市中心的私人泳池別墅，配有燒烤區和廚房，可透過多種預訂平台靈活預訂。',
			brand: '芭提雅城市綠洲', about: '別墅介紹', location: '位置', book: '預訂',
			heroTitle: '海灘附近的私享泳池別墅',
			heroLead: '私人泳池、燒烤區和適合多人入住的寬敞空間，為您提供靈活便捷的預訂方式。',
			bookStay: '預訂住宿', seeVillas: '查看別墅', videoFallback: '您的瀏覽器不支援播放此影片。',
			welcome: '歡迎入住城市綠洲泳池別墅', welcomeLead: '選擇心儀別墅，按您喜歡的方式預訂。',
			amenities: [
				{ title: '私人泳池', description: '在專屬私人泳池和日光休閒區盡情放鬆。' },
				{ title: '燒烤區與廚房', description: '配有戶外燒烤區和設備齊全的廚房。' },
				{ title: '舒適客房', description: '多間舒適客房，為家人和朋友提供充足的私密空間。' }
			],
			where: '別墅位置', whereLead: '靠近海灘、芭提雅步行街、餐廳和購物中心。',
			addressLabel: '地址', address: '泰國春武里府邦拉蒙縣芭提雅市 297/3，郵編 20150',
			locationPoints: ['位於芭提雅市中心及海灘路附近', '鄰近夜生活區、餐廳和熱門景點', '方便客人上下車及接送'],
			openMaps: '在 Google 地圖中查看 ↗', propertyAddress: '別墅地址', mapAlt: '芭提雅市中心位置地圖',
			mapZoom: '雙擊放大芭提雅位置地圖', mapCaption: '位置地圖預覽。雙擊可放大，或在 Google 地圖中查看。',
			bookHeading: '預訂住宿', bookLead: '選擇別墅和日期，然後直接預訂。', villas: '別墅', platforms: '預訂平台', choose: '查看並選擇',
			contact: '聯絡我們', connect: '社交平台', place: '泰國芭提雅', closePreview: '關閉圖片預覽', zoomQr: '雙擊放大二維碼',
			previous: '上一個', next: '下一個'
		},
		villasPage: {
			title: '別墅 | 芭提雅城市綠洲', description: '查看位於芭提雅市中心的 A 棟和 B 棟私人泳池別墅，配有燒烤區、KTV，並支援直接或透過平台預訂。',
			label: '泳池別墅', heading: '選擇心儀別墅', seePlatforms: '查看預訂平台', explore: '查看'
		},
		platformsPage: {
			title: '預訂平台 | 芭提雅城市綠洲', description: '可透過 Airbnb 和 Booking.com 分別預訂城市綠洲泳池別墅，也可在 Trip.com 查看共享房源。',
			label: '預訂平台', heading: '選擇預訂平台', lead: 'Trip.com 使用共享房源頁面，Airbnb 按別墅分別展示。', seeVillas: '查看別墅',
			relationship: '平台與別墅對應關係', relationshipLead: 'Trip.com 的一個共享房源頁面包含兩棟別墅；Airbnb 則為每棟別墅提供獨立房源頁面。'
		},
		villaDetail: {
			siteName: '芭提雅城市綠洲', home: '首頁', villas: '別墅', poolAlt: '私人泳池', amenities: '設施與服務', ready: '開始預訂',
			quickInfo: '基本資訊', guests: '可住人數', bedrooms: '臥室', bathrooms: '浴室', location: '位置', booking: '預訂方式', highlights: '特色設施',
			choosePlatform: '選擇預訂平台', platformLead: 'Trip.com 為兩棟別墅的共享頁面；Airbnb 和 Booking.com 提供各棟別墅的獨立房源頁面。', bookingAria: '預訂平台：', gallery: '圖片展示',
			sharedListing: '共享房源', separateListings: '獨立房源', bothVillas: '兩棟別墅', sharedSummary: '此房源頁面同時展示 A 棟和 B 棟別墅。', directListing: '在 {platform} 查看並預訂{villa}。', breadcrumb: '頁面路徑', scrollMore: '橫向滑動查看更多照片'
		},
		bookingPanel: {
			eyebrow: '直接預訂', heading: '提交入住申請', lead: '直接預訂，每天可節省 ฿1,000。確認預訂需支付不可退款的 100 美元訂金（約 ฿3,300）。我們將通知您預訂是否成功；如無法確認預訂，我們會聯絡您退還訂金。',
			checkIn: '入住日期', checkOut: '退房日期', selectDate: '請在下方選擇日期', selectLaterDate: '請選擇之後的日期', selectCheckInFirst: '請先選擇入住日期', request: '提交預訂申請', sending: '正在提交申請...',
			calendarFor: '選擇 {villa} 的日期', calendarHeading: '請在日曆上選擇入住日期', stepOne: '選擇入住日期', stepTwo: '選擇退房日期', previousMonth: '上個月', nextMonth: '下個月', booked: '已預訂', unavailable: '不可用', available: '可預訂',
			checkingAuth: '正在檢查登入狀態，請稍後重試。', chooseDates: '請選擇可用的入住和退房日期。', chooseCheckOut: '現在請選擇退房日期。', bookedDates: '所選日期包含已預訂日期，請選擇其他日期。'
		},
		payment: {
			title: '付款 | 芭提雅城市綠洲', description: '芭提雅城市綠洲預訂申請的 PromptPay 付款說明。', requestReceived: '已收到預訂申請', heading: '完成訂金支付', lead: '請透過 PromptPay 支付不可退款的 100 美元訂金，約合 ฿3,300。我們將通知您預訂是否成功。',
			staySummary: '{villa}：{checkIn} 至 {checkOut}', promptPay: 'PromptPay', scanHeading: '掃碼轉帳', scanLead: '請使用您的銀行應用程式掃描二維碼。請保留轉帳憑證，直至我們確認您的預訂。', qrAlt: '預訂訂金 PromptPay 二維碼',
			accountVerification: '帳戶核驗', accountHeading: '公司帳戶', accountLead: '轉帳前，請在您的銀行應用程式中確認收款人資訊。', accountAlt: '芭提雅城市綠洲公司帳戶資料',
			accountBank: '銀行', accountBranch: '分行', accountNumber: '帳戶號碼', accountName: '帳戶名稱', accountType: '帳戶類型', accountTypeValue: '儲蓄帳戶', accountBankValue: 'Kasikornbank', accountBranchValue: 'Central Pattaya Branch', accountNumberValue: '218-2-06057-9', accountNameValue: 'DOWNTOWN OASIS CO., LTD.',
			receiptReceived: '已收到付款憑證', reviewHeading: '我們正在審核您的預訂申請。', reviewLead: '我們已收到您的付款截圖，審核後會與您聯絡。', finalStep: '最後一步', uploadHeading: '上傳付款截圖', uploadLead: '請上傳清晰的 PromptPay 轉帳截圖或照片，以便我們審核您的預訂申請。', paymentPhoto: '付款截圖', uploading: '正在上傳...', submitPhoto: '提交付款截圖', uploadFailed: '無法提交您的付款截圖，請重試。', missingBooking: '缺少您的預訂編號。請返回別墅頁面並重新提交申請。', returnToVilla: '返回別墅頁面'
		},
		hostexBooking: {
			eyebrow: '直接預訂', heading: '查看房態與價格', lead: '請先選擇入住日期和人數。查看 Hostex 即時價格後，請上傳已付款的收據，再提交預訂申請。', checkingAuth: '正在檢查登入狀態...', signInRequired: '預訂前必須登入。', signInLead: '請先登入，才能查看房態、上傳付款收據或申請入住。', signIn: '登入後預訂', unavailable: '此別墅目前尚未開放直接預訂。', chooseDates: '請先選擇日期', chooseDatesLead: '按下「查看價格」後，付款說明和收據上傳欄位會在 Hostex 最後預訂步驟前顯示。', uploadToContinue: '上傳收據以繼續', manualPayment: '需要手動付款', manualPaymentLead: '選擇日期並查看 Hostex 價格後，請使用以下帳戶支付訂金。提交 Hostex 預訂申請前，請上傳清晰的付款收據。付款核實前，預訂尚未確認。', bank: '銀行', branch: '分行', accountNumber: '帳戶號碼', accountName: '帳戶名稱', accountType: '帳戶類型', accountTypeValue: '儲蓄帳戶', payPromptPay: '使用 PromptPay 付款', promptPayLead: '請使用銀行應用程式掃描此二維碼，然後在下方上傳付款收據。', qrAlt: 'PromptPay 付款二維碼', email: '您的電郵', receiptPhoto: '已付款收據照片', sending: '正在傳送收據...', sendReceipt: '傳送收據並繼續', receiptReceived: '已收到收據。', receiptContinue: '現在可以提交上方的 Hostex 預訂申請。', receiptRequired: '請先上傳已付款的收據，才能繼續前往 Hostex 預訂頁面。', bankValue: 'Kasikornbank', branchValue: 'Central Pattaya Branch', accountNumberValue: '218-2-06057-9', accountNameValue: 'DOWNTOWN OASIS CO., LTD.'
		}
	}
};

/** @param {string} locale */
export const getCopy = (locale) => locale === 'zh-TW' ? copy['zh-TW'] : copy.en;
