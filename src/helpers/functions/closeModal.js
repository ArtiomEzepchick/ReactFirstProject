export const closeModal = (setIsModalOpen, delay = 500) => {
    const overlay = document.querySelector('.overlay')

    if (overlay) {
        if (overlay.classList.contains('show')) {
            overlay.classList.add('hidden')
    
            setTimeout(() => {
                overlay.classList.remove('show')
                setIsModalOpen(false)
            }, delay)
        }
    }
}