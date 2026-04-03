let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ✅ Menus for 7 Vizag Restaurants
const restaurantMenus = {
  "Vista @ The Park Visakhapatnam": [
    { name: "Seafood Platter", price: 650 },
    { name: "Grilled Chicken", price: 480 },
    { name: "Prawn Curry", price: 520 },
    { name: "Chocolate Mousse", price: 250 },
  ],
  "The Square – Novotel": [
    { name: "Continental Buffet", price: 999 },
    { name: "Pasta Alfredo", price: 420 },
    { name: "Paneer Tikka", price: 380 },
    { name: "Tiramisu", price: 290 },
  ],
  "The Eatery – Four Points by Sheraton": [
    { name: "Hyderabadi Biryani", price: 400 },
    { name: "Grilled Fish", price: 550 },
    { name: "Veg Platter", price: 360 },
    { name: "Brownie with Ice Cream", price: 230 },
  ],
  "The Spicy Venue": [
    { name: "Chicken Biryani", price: 280 },
    { name: "Mutton Curry", price: 320 },
    { name: "Gongura Chicken", price: 300 },
    { name: "Veg Thali", price: 220 },
  ],
  "Sri Sairam Parlour": [
    { name: "Idli Vada Combo", price: 80 },
    { name: "Masala Dosa", price: 100 },
    { name: "Veg Meals", price: 160 },
    { name: "Filter Coffee", price: 60 },
  ],
  "Ramaiah Vegetarian Meals": [
    { name: "Andhra Meals", price: 150 },
    { name: "Curd Rice", price: 100 },
    { name: "Vegetable Curry", price: 120 },
    { name: "Lemon Rice", price: 110 },
  ],
  "Absolute Barbecues": [
    { name: "BBQ Chicken Wings", price: 300 },
    { name: "Grilled Paneer", price: 270 },
    { name: "Fish Tikka", price: 330 },
    { name: "Chocolate Fountain", price: 250 },
  ],
};

// ✅ Display Menu for Selected Restaurant
function displayMenu() {
  const menuContainer = document.getElementById("menuItems");
  const restaurantTitle = document.getElementById("restaurantName");

  // Get restaurant name from localStorage
  const name = localStorage.getItem("selectedRestaurant");
  if (!name || !restaurantMenus[name]) {
    menuContainer.innerHTML = "<p>Restaurant menu not found.</p>";
    return;
  }

  restaurantTitle.textContent = `${name} Menu`;

  menuContainer.innerHTML = restaurantMenus[name]
    .map(
      (item, index) => `
        <div class="card">
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>
          <button class="btn small-btn" onclick="addToCart('${name}', ${index})">Add to Cart</button>
        </div>`
    )
    .join("");
}

// ✅ Add item to cart
function addToCart(restaurant, index) {
  const item = restaurantMenus[restaurant][index];
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateLiveCart();
}

// ✅ Update live cart preview (on menu page)
function updateLiveCart() {
  const liveCart = document.getElementById("liveCartItems");
  const liveTotal = document.getElementById("liveTotal");
  if (!liveCart) return;

  if (cart.length === 0) {
    liveCart.innerHTML = "<p>Your cart is empty.</p>";
    liveTotal.innerText = "";
    return;
  }

  liveCart.innerHTML = cart
    .map(
      (item, i) => `
      <div class="card">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <button class="btn small-btn" onclick="removeLiveItem(${i})">Remove</button>
      </div>`
    )
    .join("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  liveTotal.innerText = `Total: ₹${total}`;
}

// ✅ Remove item from live cart
function removeLiveItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateLiveCart();
}

// ✅ Cart page display
function displayCart() {
  const cartContainer = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.innerText = "";
    return;
  }

  cartContainer.innerHTML = cart
    .map(
      (item, i) => `
      <div class="card">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <button class="btn small-btn" onclick="removeLiveItem(${i})">Remove</button>
      </div>`
    )
    .join("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.innerText = `Total: ₹${total}`;
}

// ✅ Checkout & Payment process
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  localStorage.removeItem("cart");
  cart = [];
  updateLiveCart();
  displayCart();
  window.location.href = "index.html";
}

// ✅ Theme Setup (Dark / Light) — Persistent across all pages
function setupTheme() {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  // Load saved theme
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.body.classList.toggle("light", savedTheme === "light");

  toggle.textContent = savedTheme === "light" ? "🌙" : "☀️";

  toggle.onclick = () => {
    document.body.classList.toggle("light");
    const newTheme = document.body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    toggle.textContent = newTheme === "light" ? "🌙" : "☀️";
  };
}

// ✅ Initialize all pages
window.onload = () => {
  displayMenu();
  displayCart();
  setupTheme();
  updateLiveCart();
};
// ---------------------------------------
// OTP SYSTEM
// ---------------------------------------

// OTP variable (compatible and safe)
var generatedOTP = null; // use `var` to avoid compatibility issues

// Send OTP (demo)
function sendOTP() {
  var phone = document.getElementById("phoneInput").value;
  if (!phone || phone.trim().length < 10) {
    alert("Enter a valid phone number");
    return;
  }
  generatedOTP = Math.floor(1000 + Math.random() * 9000); // 4-digit OTP
  alert("Your OTP is: " + generatedOTP); // demo—replace with SMS in production
  document.getElementById("stepPhone").style.display = "none";
  document.getElementById("stepOTP").style.display = "block";
}

// Verify OTP
function verifyOTP() {
  var otp = document.getElementById("otpInput").value;
  if (otp == generatedOTP) {
    alert("Login Successful!");
    localStorage.setItem("userRegistered", "true");
    document.getElementById("loginPanel").classList.remove("active");
  } else {
    alert("Incorrect OTP");
  }
}
const otpSection = document.getElementById("otpSection");
const sendOtpBtn = document.getElementById("sendOtpBtn");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
const otpMessage = document.getElementById("otpMessage");
const otpInputSection = document.getElementById("otpInputSection");
const userPhone = document.getElementById("userPhone");
const userOtp = document.getElementById("userOtp");

checkoutBtn.addEventListener("click", function () {
  if (cart.length === 0) {
    alert("Your cart is empty! Please add some items before checkout.");
    return;
  }
  // Show OTP verification first
  otpSection.style.display = "block";
  checkoutBtn.style.display = "none";
});

sendOtpBtn.addEventListener("click", async () => {
  const phone = userPhone.value.trim();
  if (!phone) {
    otpMessage.textContent = "Please enter a valid phone number.";
    return;
  }

  otpMessage.textContent = "Sending OTP...";
  try {
    const res = await fetch("/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    const data = await res.json();
    if (data.success) {
      otpMessage.style.color = "green";
      otpMessage.textContent = "OTP sent! Please check your phone.";
      otpInputSection.style.display = "block";
    } else {
      otpMessage.style.color = "red";
      otpMessage.textContent = "Failed to send OTP. Try again.";
    }
  } catch (err) {
    otpMessage.style.color = "red";
    otpMessage.textContent = "Error sending OTP.";
  }
});

verifyOtpBtn.addEventListener("click", async () => {
  const otp = userOtp.value.trim();
  if (!otp) {
    otpMessage.textContent = "Please enter the OTP you received.";
    return;
  }

  try {
    const res = await fetch("/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: userPhone.value.trim(), otp }),
    });
    const data = await res.json();
    if (data.success) {
      otpMessage.style.color = "green";
      otpMessage.textContent = "Phone verified successfully! You can proceed to payment.";
      document.getElementById("paymentSection").style.display = "block";
      otpSection.style.display = "none";
    } else {
      otpMessage.style.color = "red";
      otpMessage.textContent = "Invalid OTP. Please try again.";
    }
  } catch (err) {
    otpMessage.style.color = "red";
    otpMessage.textContent = "Error verifying OTP.";
  }
});




