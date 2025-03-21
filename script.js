document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector(".learning-container");
    let items = Array.from(container.children);
    isAnimating = false;

    function updateCenter() {
        items.forEach(item => item.classList.remove("center"));
        const centerIndex = Math.floor(items.length / 2);
        items[centerIndex].classList.add("center");
    }

    function shiftLeft() {
        if (isAnimating) return;
        isAnimating = true;

        items.forEach(item => {
            item.style.transform = "translateX(-100%)";
    });

    setTimeout(() => {
        const firstItem = items.shift();
        items.push(firstItem);
        container.appendChild(firstItem);
        updateItems();
        items.forEach(item => item.style.transform = ""); 
        updateCenter();
        isAnimating = false;
    }, 600); 
}

function shiftRight() {
    if (isAnimating) return;
    isAnimating = true;


    items.forEach(item => {
        item.style.transform = "translateX(100%)"; // slide right
    });

    setTimeout(() => {
        const lastItem = items.pop();
        items.unshift(lastItem);
        container.insertBefore(lastItem, container.firstChild);
        updateItems();
        items.forEach(item => item.style.transform = ""); 
        updateCenter();
        isAnimating = false;
    }, 600);
}

    function updateItems() {
        items = Array.from(container.children);
    }

    container.addEventListener("click", function(event) {
        const clickedItem = event.target.closest("div");
        if (clickedItem && container.contains(clickedItem)) {
            updateItems();
            const index = items.indexOf(clickedItem);
            const centerIndex = Math.floor(items.length / 2);

            
            if (index < centerIndex) {
                shiftRight();
            } else if (index > centerIndex) {
                shiftLeft(); 
            }
        }
    });

    updateCenter();
});