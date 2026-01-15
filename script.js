console.log('KOKOCD Store Initialized');

// --- Mock Data ---
const products = [
    {
        id: 1,
        title: "Windows 11 Pro",
        price: 350,
        discountPrice: 250,
        category: "windows",
        image: "https://placehold.co/400x300/0078d4/FFF?text=Win+11+Pro",
        description: "نسخة أصلية مدى الحياة تدعم التحديثات",
        rating: 5
    },
    {
        id: 2,
        title: "Office 2021 Pro",
        price: 400,
        discountPrice: 299,
        category: "windows",
        image: "https://placehold.co/400x300/ea3e23/FFF?text=Office+2021",
        description: "الحزمة المكتبية الكاملة للشركات والأفراد",
        rating: 4.8
    },
    {
        id: 3,
        title: "GTA V Premium",
        price: 600,
        discountPrice: 450,
        category: "games",
        image: "https://placehold.co/400x300/10b981/FFF?text=GTA+V",
        description: "لعبة العالم المفتوح الشهيرة نسخة الكمبيوتر",
        rating: 4.9
    },
    {
        id: 4,
        title: "Full Stack Course",
        price: 2000,
        discountPrice: 999,
        category: "courses",
        image: "https://placehold.co/400x300/f59e0b/FFF?text=Web+Course",
        description: "دورة شاملة لتعلم برمجة المواقع من الصفر",
        rating: 5
    },
    {
        id: 5,
        title: "Kaspersky Total Security",
        price: 300,
        discountPrice: 150,
        category: "windows",
        image: "https://placehold.co/400x300/059669/FFF?text=Kaspersky",
        description: "حماية كاملة لجهازك من الفيروسات",
        rating: 4.7
    },
    {
        id: 6,
        title: "Elden Ring",
        price: 1200,
        discountPrice: 950,
        category: "games",
        image: "https://placehold.co/400x300/4b5563/FFF?text=Elden+Ring",
        description: "لعبة السنة، مغامرة لا تنسى",
        rating: 5
    },
    {
        id: 7,
        title: "Android Dev Course",
        price: 1500,
        discountPrice: 750,
        category: "courses",
        image: "https://placehold.co/400x300/84cc16/FFF?text=Android+Dev",
        description: "تعلم بناء تطبيقات الموبايل بلغة كوتلين",
        rating: 4.5
    },
    {
        id: 8,
        title: "Adobe Photoshop 2024",
        price: 800,
        discountPrice: 500,
        category: "windows",
        image: "https://placehold.co/400x300/3b82f6/FFF?text=Photoshop",
        description: "عملاق التصميم وتعديل الصور",
        rating: 4.8
    }
];

let cart = [];

// --- DOM Elements ---
const productsGrid = document.getElementById('productsGrid');
const cartModal = document.getElementById('cartModal');
const cartPanel = document.getElementById('cartPanel');
const cartCount = document.getElementById('cartCount');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const categoryBtns = document.querySelectorAll('.category-btn');
const adminModal = document.getElementById('adminModal');
const checkoutModal = document.getElementById('checkoutModal');
const searchInput = document.getElementById('searchInput');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    setupCategoryFilter();
    setupSearch();
});

// --- Functions ---

function renderProducts(items) {
    productsGrid.innerHTML = '';
    items.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full card-enter';
        card.style.animationDelay = `${index * 100}ms`;
        
        const discountCalc = Math.round(((product.price - product.discountPrice) / product.price) * 100);

        card.innerHTML = `
            <div class="relative h-48 overflow-hidden">
                <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                <span class="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow">خصم ${discountCalc}%</span>
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button class="bg-white text-gray-800 p-2 rounded-full hover:bg-indigo-600 hover:text-white transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    </button>
                </div>
            </div>
            <div class="p-5 flex flex-col flex-1">
                <div class="flex justify-between items-start mb-2">
                    <span class="text-xs text-indigo-500 font-semibold bg-indigo-50 px-2 py-1 rounded">${getCategoryName(product.category)}</span>
                    <div class="flex text-yellow-400 text-xs">
                        ${'★'.repeat(Math.floor(product.rating))}
                    </div>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">${product.title}</h3>
                <p class="text-gray-500 text-sm mb-4 flex-1">${product.description}</p>
                <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div class="flex flex-col">
                        <span class="text-gray-400 text-xs line-through">${product.price} ج.م</span>
                        <span class="text-xl font-bold text-gray-900">${product.discountPrice} <span class="text-xs font-normal text-gray-500">ج.م</span></span>
                    </div>
                    <button onclick="addToCart(${product.id})" class="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-lg hover:shadow-indigo-200">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

function getCategoryName(cat) {
    const map = { 'windows': 'برامج', 'games': 'ألعاب', 'courses': 'كورسات', 'android': 'أندرويد' };
    return map[cat] || cat;
}

function setupCategoryFilter() {
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            categoryBtns.forEach(b => {
                b.classList.remove('bg-indigo-600', 'text-white', 'shadow-lg');
                b.classList.add('bg-white', 'text-gray-600');
            });
            // Add active to clicked
            btn.classList.remove('bg-white', 'text-gray-600');
            btn.classList.add('bg-indigo-600', 'text-white', 'shadow-lg');
            
            const category = btn.dataset.cat;
            if (category === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === category);
                renderProducts(filtered);
            }
        });
    });
}

function setupSearch() {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = products.filter(p => 
            p.title.toLowerCase().includes(term) || 
            p.description.toLowerCase().includes(term)
        );
        renderProducts(filtered);
    });
}

// --- Cart Logic ---

window.addToCart = function(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        cart.push(product);
        updateCartUI();
        
        // Feedback animation
        const cartBtn = document.querySelector('.group .p-2');
        cartBtn.classList.add('bg-indigo-200');
        setTimeout(() => cartBtn.classList.remove('bg-indigo-200'), 200);
    }
};

function updateCartUI() {
    cartCount.innerText = cart.length;
    cartCount.classList.remove('scale-0');
    if (cart.length === 0) cartCount.classList.add('scale-0');

    // Update Items
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center text-gray-400 py-10">
                <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                <p>السلة فارغة حالياً</p>
            </div>`;
    } else {
        cart.forEach((item, index) => {
            total += item.discountPrice;
            const itemEl = document.createElement('div');
            itemEl.className = 'flex items-center gap-4 bg-white p-3 rounded-lg border border-gray-100 shadow-sm';
            itemEl.innerHTML = `
                <img src="${item.image}" class="w-16 h-16 object-cover rounded-md">
                <div class="flex-1">
                    <h4 class="font-bold text-gray-800 text-sm">${item.title}</h4>
                    <span class="text-indigo-600 font-bold">${item.discountPrice} ج.م</span>
                </div>
                <button onclick="removeFromCart(${index})" class="text-red-400 hover:text-red-600 p-1">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            `;
            cartItemsContainer.appendChild(itemEl);
        });
    }

    cartTotalElement.innerText = `${total} ج.م`;
}

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartUI();
};

window.toggleCart = function() {
    cartModal.classList.toggle('hidden');
    setTimeout(() => {
        if (!cartModal.classList.contains('hidden')) {
            cartPanel.classList.remove('-translate-x-full');
        } else {
            cartPanel.classList.add('-translate-x-full');
        }
    }, 10);
};

window.toggleAdmin = function() {
    adminModal.classList.toggle('hidden');
};

window.openCheckout = function() {
    if (cart.length === 0) {
        alert('السلة فارغة!');
        return;
    }
    checkoutModal.classList.remove('hidden');
};

window.closeCheckout = function() {
    checkoutModal.classList.add('hidden');
};
