document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector(".learning-container");
    const items = Array.from(container.children);
    let currentIndex = 2; 

    function updateGallery() {
        items.forEach(item => item.classList.remove("left", "center", "right"));

     
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        const nextIndex = (currentIndex + 1) % items.length;

        items[prevIndex].classList.add("left");
        items[currentIndex].classList.add("center");
        items[nextIndex].classList.add("right");
    }

    function movePrevious() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateGallery();
    }

    function moveNext() {
        currentIndex = (currentIndex + 1) % items.length; 
        updateGallery();
    }

    document.querySelector(".prev-btn").addEventListener("click", movePrevious);
    document.querySelector(".next-btn").addEventListener("click", moveNext);

 
    updateGallery();
});


function startTest() {
    const container = document.querySelector(".learning-container");
    const items = document.querySelectorAll(".left, .right");
    const centerItem = document.querySelector(".center");
    const buttons = document.querySelectorAll(".next-btn, .prev-btn");

    setTimeout(() => {
        items.forEach(item => item.classList.add("squish"));
        buttons.forEach(button => button.classList.add("squish"));
    }, 400);  
    
    setTimeout(() => {
        items.forEach(item => item.style.display = "none");
        buttons.forEach(button => button.style.display = "none");
        container.classList.add("squish");
    }, 400 + 600); 
}
