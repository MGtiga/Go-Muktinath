// js/modal.js
document.addEventListener('DOMContentLoaded', function() {
    // Check if modal has been shown this session
    if (!sessionStorage.getItem('bookingModalShown')) {
        const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));
        bookingModal.show();
        sessionStorage.setItem('bookingModalShown', 'true');
    }

    // Optional: Handle "Explore manually" button – it already dismisses via data-bs-dismiss
    // But you can add extra logic if needed
});