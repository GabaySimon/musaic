export const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    toast.textContent = message;
    document.body.appendChild(toast);
    
    toast.addEventListener('animationend', (e) => {
        if (e.animationName === 'toastOut') {
            toast.remove();
        }
    })
}