// Sample room data (in a real app, this would come from a database)
let rooms = [
    { number: 101, type: 'Single', available: true },
    { number: 102, type: 'Double', available: true },
    { number: 103, type: 'Suite', available: false },
    // Add more as needed
];

// Load rooms on page load
document.addEventListener('DOMContentLoaded', () => {
    displayRooms();
    loadBookings();
});

// Display rooms
function displayRooms() {
    const roomList = document.getElementById('room-list');
    roomList.innerHTML = '';
    rooms.forEach(room => {
        const roomDiv = document.createElement('div');
        roomDiv.className = 'room';
        roomDiv.innerHTML = `
            <h3>Room ${room.number}</h3>
            <p>Type: ${room.type}</p>
            <p>Status: ${room.available ? 'Available' : 'Occupied'}</p>
        `;
        roomList.appendChild(roomDiv);
    });
}

// Handle booking
document.getElementById('booking-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const roomNum = parseInt(document.getElementById('room').value);
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    
    const room = rooms.find(r => r.number === roomNum);
    if (room && room.available) {
        room.available = false;
        const booking = { name, roomNum, checkin, checkout };
        saveBooking(booking);
        displayRooms();
        document.getElementById('booking-message').textContent = 'Booking successful!';
    } else {
        document.getElementById('booking-message').textContent = 'Room not available.';
    }
});

// Save booking to localStorage (simulate database)
function saveBooking(booking) {
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

// Load and display bookings in admin
function loadBookings() {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const adminStatus = document.getElementById('admin-status');
    adminStatus.innerHTML = '<h3>Current Bookings:</h3>';
    bookings.forEach(b => {
        adminStatus.innerHTML += `<p>${b.name} - Room ${b.roomNum} (${b.checkin} to ${b.checkout})</p>`;
    });
}

// Admin actions (simplified)
document.getElementById('checkin-btn').addEventListener('click', () => {
    alert('Check-in simulated. In a real app, update database.');
});

document.getElementById('checkout-btn').addEventListener('click', () => {
    alert('Check-out simulated. In a real app, update database.');
});