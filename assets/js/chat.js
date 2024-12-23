let iconsVisible = false;

function showSocialIcons() {
    const callBtn = document.querySelector('.floating_btn_call');
    const instagramBtn = document.querySelector('.floating_btn_instagram');
    const whatsappBtn = document.querySelector('.floating_btn_whatsapp');
    const closeIcon = document.querySelector('.contact_icon_close');
    const chatIcon = document.querySelector('.contact_icon_chat');

    if (!iconsVisible) {
        // Add 'show' class to make the buttons appear smoothly
        callBtn.classList.add('show');
        instagramBtn.classList.add('show');
        whatsappBtn.classList.add('show');
        closeIcon.classList.add('show');
        
        // Hide chat icon
        chatIcon.classList.add('hide');

        iconsVisible = true;
    } else {
        // Remove 'show' class to hide the buttons smoothly
        callBtn.classList.remove('show');
        instagramBtn.classList.remove('show');
        whatsappBtn.classList.remove('show');
        closeIcon.classList.remove('show');
        
        // Show chat icon
        chatIcon.classList.remove('hide');

        iconsVisible = false;
    }
}