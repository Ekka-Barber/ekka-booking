const categories = {
    "Packages I باكجات": [
        { name: "حلاقة الشعر والدقن", duration: "40m", price: 50 },
        { name: "باقة إكّــه", duration: "1h", price: 150 },
        { name: "باقة إكّــه اكسترا", duration: "1h 30m", price: 250 },
        { name: "باقة العناية بالشعر", duration: "50m", price: 105 },
        { name: "باقة العناية بالشعر + تنظيف فروة الرأس", duration: "1h 15m", price: 175 }
    ],
    "Beard Services l خدمات اللحية": [
        { name: "حلاقة الدقن", duration: "30m", price: 50 },
        { name: "صبغة الدقن - السكسوكة", duration: "20m", price: 40 },
        { name: "صبغة الدقن - اللحية كاملة", duration: "30m", price: 60 },
        { name: "صبغة الشنب", duration: "15m", price: 20 },
        { name: "تطبيق صبغة الدقن", duration: "15m", price: 25 }
    ],
    "Facial Care Services I خدمات البشرة": [
        { name: "صنفرة وجه سريعة كلاسيك", duration: "20m", price: 35 },
        { name: "صنفرة وجه سريعة بريميوم", duration: "30m", price: 50 },
        { name: "تنظيف عميق للبشرة بالبخار", duration: "1h", price: 100 },
        { name: "ماسك للوجه", duration: "15m", price: 25 },
        { name: "لزقة الأنف", duration: "10m", price: 15 },
        { name: "شمع لإزالة شعر الوجه - الأنف", duration: "10m", price: 20 },
        { name: "شمع لإزالة شعر الوجه - الأذنين", duration: "10m", price: 20 },
        { name: "شمع لإزالة شعر الوجه - شمع كامل", duration: "30m", price: 50 }
    ],
    "Hair Services l خدمات الشعر": [
        { name: "حلاقة الشعر - مقص وتدريج", duration: "45m", price: 75 },
        { name: "حلاقة الشعر - شعر طويل", duration: "1h", price: 100 },
        { name: "صبغة شعر - صبغة بيقون", duration: "1h", price: 150 },
        { name: "صبغة شعر - صبغة كيون الهولندية", duration: "1h 15m", price: 200 },
        { name: "غسيل الشعر", duration: "15m", price: 25 },
        { name: "استشوار وتصفيف الشعر", duration: "30m", price: 50 },
        { name: "حمام زيت الشعر", duration: "45m", price: 100 },
        { name: "صبغة ميش", duration: "1h 30m", price: 250 },
        { name: "حمام كيراتين لعلاج للشعر - شعر قصير", duration: "2h", price: 300 },
        { name: "حمام كيراتين لعلاج للشعر - شعر طويل", duration: "3h", price: 500 },
        { name: "بروتين للشعر - شعر قصير", duration: "2h", price: 350 },
        { name: "بروتين للشعر - شعر طويل", duration: "3h", price: 550 },
        { name: "تنظيف فروة الرأس العميق", duration: "45m", price: 150 },
        { name: "تطبيق صبغة الشعر", duration: "1h", price: 120 },
        { name: "قص شعر - بنات أطفال - شعر قصير", duration: "30m", price: 50 },
        { name: "قص شعر - بنات أطفال - شعر طويل", duration: "45m", price: 70 },
        { name: "استشوار وتصفيف الشعر - بنات اطفال", duration: "30m", price: 50 }
    ]
};

const employeeWorkingHours = {
    "كريم": ["08:00", "18:00"],
    "هادي": ["10:00", "20:00"],
    "خالد": ["09:00", "17:00"],
    "طارق": ["12:00", "22:00"]
};

const selectedServices = new Set();
let currentLanguage = 'ar';
let totalDuration = 0;
let totalPrice = 0;

document.addEventListener('DOMContentLoaded', () => {
    const languageToggle = document.getElementById('languageToggle');
    const categoriesContainer = document.getElementById('categories');
    const barberSelect = document.getElementById('barber');
    const timeSelect = document.getElementById('time');
    const form = document.getElementById('bookingForm');

    languageToggle.addEventListener('change', toggleLanguage);
    initializeCategories(categoriesContainer);
    initializeBarbers(barberSelect);
    updateTimeSlots(barberSelect.value, timeSelect);
    barberSelect.addEventListener('change', () => updateTimeSlots(barberSelect.value, timeSelect));
    form.addEventListener('submit', handleFormSubmit);
    updateSummary();
});

function toggleLanguage() {
    currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    updateLanguage();
}

function updateLanguage() {
    const elements = {
        'main-title': { ar: 'احجز موعدك', en: 'Book Your Appointment' },
        'category-label': { ar: 'اختر الفئة:', en: 'Choose Category:' },
        'service-label': { ar: 'اختر الخدمة:', en: 'Choose Service:' },
        'summary-label': { ar: 'ملخص الحجز:', en: 'Booking Summary:' },
        'selected-services': { ar: 'الخدمات المختارة:', en: 'Selected Services:' },
        'total-duration': { ar: 'المدة الإجمالية:', en: 'Total Duration:' },
        'total-price': { ar: 'السعر الإجمالي:', en: 'Total Price:' },
        'barber-label': { ar: 'اختر الحلاق:', en: 'Choose Barber:' },
        'time-label': { ar: 'اختر الوقت:', en: 'Choose Time:' },
        'name-label': { ar: 'الاسم:', en: 'Name:' },
        'phone-label': { ar: 'رقم الهاتف:', en: 'Phone Number:' },
        'submit-button': { ar: 'احجز الآن', en: 'Book Now' }
    };

    Object.entries(elements).forEach(([id, labels]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = labels[currentLanguage];
    });

    // Ensure the logo is visible in both languages
    const logoContainer = document.querySelector('.logo-container');
    if (logoContainer) {
        logoContainer.style.display = 'block';
    }

    document.body.style.direction = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    updateCategoriesLanguage();
    updateServicesLanguage();
    updateSummary(); // Make sure the summary is updated with the new language
}

function updateCategoriesLanguage() {
    const categoryButtons = document.querySelectorAll('.category-button');
    categoryButtons.forEach(button => {
        const category = button.textContent.split(' | ')[currentLanguage === 'ar' ? 1 : 0];
        button.textContent = category;
    });
}

function updateServicesLanguage() {
    const serviceButtons = document.querySelectorAll('.service-button');
    serviceButtons.forEach(button => {
        const serviceName = button.textContent.split('(')[0].trim();
        const service = Object.values(categories).flat().find(s => s.name === serviceName);
        if (service) {
            button.innerHTML = `${service.name}<br>(${service.duration} - SAR ${service.price})`;
        }
    });
}

function initializeCategories(categoriesContainer) {
    Object.keys(categories).forEach(category => {
        const button = createButton(category, 'category-button');
        button.addEventListener('click', () => {
            document.querySelectorAll('.category-button').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            populateServices(category);
        });
        categoriesContainer.appendChild(button);
    });
}

function populateServices(category) {
    const servicesContainer = document.getElementById('services');
    servicesContainer.innerHTML = '';
    categories[category].forEach(service => {
        const serviceButton = createButton(`${service.name}<br>(${service.duration} - SAR ${service.price})`, 'service-button');
        serviceButton.addEventListener('click', () => toggleService(serviceButton, service.name));
        servicesContainer.appendChild(serviceButton);
    });
}

function toggleService(button, serviceName) {
    button.classList.toggle('selected');
    const category = Object.keys(categories).find(cat => categories[cat].some(service => service.name === serviceName));
    const service = categories[category].find(s => s.name === serviceName);
    
    if (selectedServices.has(serviceName)) {
        selectedServices.delete(serviceName);
        totalDuration -= parseDuration(service.duration);
        totalPrice -= service.price;
    } else {
        selectedServices.add(serviceName);
        totalDuration += parseDuration(service.duration);
        totalPrice += service.price;
    }
    
    updateSummary();
}

function initializeBarbers(barberSelect) {
    Object.keys(employeeWorkingHours).forEach(barber => {
        const option = document.createElement('option');
        option.value = barber;
        option.textContent = barber;
        barberSelect.appendChild(option);
    });
}

function updateTimeSlots(selectedBarber, timeSelect) {
    const [startTime, endTime] = employeeWorkingHours[selectedBarber].map(time => parseInt(time.split(":")[0]));
    timeSelect.innerHTML = '';
    for (let hour = startTime; hour < endTime; hour++) {
        for (let minute of ["00", "15", "30", "45"]) {
            const timeSlot = `${hour.toString().padStart(2, '0')}:${minute}`;
            const option = document.createElement('option');
            option.value = timeSlot;
            option.textContent = timeSlot;
            timeSelect.appendChild(option);
        }
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const bookingData = Object.fromEntries(formData.entries());
    bookingData.services = Array.from(selectedServices);
    bookingData.totalDuration = formatDuration(totalDuration);
    bookingData.totalPrice = totalPrice;
    
    if (validateForm(bookingData)) {
        sendBookingToWhatsApp(bookingData);
    } else {
        alert(currentLanguage === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة واختيار خدمة واحدة على الأقل.' : 'Please fill in all required fields and select at least one service.');
    }
}

function validateForm(bookingData) {
    return bookingData.name && bookingData.phone && bookingData.barber && bookingData.time && bookingData.services.length > 0;
}

function sendBookingToWhatsApp(bookingData) {
    const message = `
=========
${currentLanguage === 'ar' ? 'الاسم' : 'Name'}: ${bookingData.name}
${currentLanguage === 'ar' ? 'رقم الهاتف' : 'Phone Number'}: ${bookingData.phone}
${currentLanguage === 'ar' ? 'الخدمات' : 'Services'}: 
${bookingData.services.map(service => `- ${service}`).join('\n')}
${currentLanguage === 'ar' ? 'المدة الإجمالية' : 'Total Duration'}: ${bookingData.totalDuration}
${currentLanguage === 'ar' ? 'السعر الإجمالي' : 'Total Price'}: ${bookingData.totalPrice} SAR
${currentLanguage === 'ar' ? 'الحلاق' : 'Barber'}: ${bookingData.barber}
${currentLanguage === 'ar' ? 'الوقت' : 'Time'}: ${bookingData.time}
    `;
    window.open(`https://wa.me/966599791440?text=${encodeURIComponent(message)}`, '_blank');
}

function createButton(text, className) {
    const button = document.createElement('button');
    button.innerHTML = text;
    button.classList.add(className);
    return button;
}

function parseDuration(duration) {
    if (duration.includes('h')) {
        const [hours, minutes] = duration.split('h');
        return parseInt(hours) * 60 + parseInt(minutes || 0);
    } else {
        return parseInt(duration) || 0;
    }
}

function formatDuration(minutes) {
    if (isNaN(minutes)) {
        return currentLanguage === 'ar' ? '0 دقيقة' : '0 minutes';
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (currentLanguage === 'ar') {
        return hours > 0 ? `${hours} ساعة ${mins} دقيقة` : `${mins} دقيقة`;
    } else {
        return hours > 0 ? `${hours} hour(s) ${mins} minute(s)` : `${mins} minute(s)`;
    }
}

function updateSummary() {
    const selectedServicesElement = document.getElementById('selected-services');
    const totalDurationElement = document.getElementById('total-duration');
    const totalPriceElement = document.getElementById('total-price');

    const servicesLabel = currentLanguage === 'ar' ? 'الخدمات المختارة: ' : 'Selected Services: ';
    const durationLabel = currentLanguage === 'ar' ? 'المدة الإجمالية: ' : 'Total Duration: ';
    const priceLabel = currentLanguage === 'ar' ? 'السعر الإجمالي: ' : 'Total Price: ';

    selectedServicesElement.innerHTML = `${servicesLabel}<span>${Array.from(selectedServices).join(', ') || '-'}</span>`;
    totalDurationElement.innerHTML = `${durationLabel}<span>${formatDuration(totalDuration)}</span>`;
    totalPriceElement.innerHTML = `${priceLabel}<span>${totalPrice} ${currentLanguage === 'ar' ? 'ريال' : 'SAR'}</span>`;
}
