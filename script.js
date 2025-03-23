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

    const testContainer = document.querySelector(".test-container");
    const testItems = Array.from(testContainer.children);

   
    /*testItems.forEach((testItem) => {
        const testContainerWidth = testContainer.offsetWidth;
        const testContainerHeight = testContainer.offsetHeight;
        const testItemWidth = testItem.offsetWidth;
        const testItemHeight = testItem.offsetHeight;

        const randomTop = Math.floor(Math.random() * (testContainerHeight - testItemHeight));
        const randomLeft = Math.floor(Math.random() * (testContainerWidth - testItemWidth));

        testItem.style.top = `${randomTop}px`;
        testItem.style.left = `${randomLeft}px`;
    });*/

    testItems.forEach((testItem) => {
        let isDragging = false;
        let offsetX, offsetY;

        const handleMouseMove = (e) => {
            if (isDragging) {
                const testContainerRect = testContainer.getBoundingClientRect();
                const newLeft = e.clientX - testContainerRect.left - offsetX;
                const newTop = e.clientY - testContainerRect.top - offsetY;

                const maxLeft = testContainerRect.width - testItem.offsetWidth;
                const maxTop = testContainerRect.height - testItem.offsetHeight;

                const clampedLeft = Math.max(0, Math.min(newLeft, maxLeft));
                const clampedTop = Math.max(0, Math.min(newTop, maxTop));

                testItem.style.left = `${clampedLeft}px`;
                testItem.style.top = `${clampedTop}px`;
            }
        };

        const handleMouseUp = () => {
            if (isDragging) {
                isDragging = false;
                testItem.style.cursor = "grab";
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            }
        };

        testItem.addEventListener("mousedown", (e) => {
            if (e.button === 0) {
                e.preventDefault();
                isDragging = true;
                offsetX = e.clientX - testItem.getBoundingClientRect().left;
                offsetY = e.clientY - testItem.getBoundingClientRect().top;
                testItem.style.cursor = "grabbing";

                
                document.addEventListener("mousemove", handleMouseMove);
                document.addEventListener("mouseup", handleMouseUp);
            }
        });
    });
}); 


function startTest() {
    const container = document.querySelector(".learning-container");
    const items = document.querySelectorAll(".left, .right");
    const centerItem = document.querySelector(".center");
    const buttons = document.querySelectorAll(".next-btn, .prev-btn");
    const testButton = document.querySelector(".test-btn");
    const testContainer = document.querySelector(".test-container");

    testButton.classList.add("squish");
    testButton.style.animation = "none";

    setTimeout(() => {
        items.forEach(item => item.classList.add("squish"));
        buttons.forEach(button => button.classList.add("squish"));
    }, 400);

    setTimeout(() => {
        items.forEach(item => item.style.display = "none");
        buttons.forEach(button => button.style.display = "none");
        container.classList.add("squish");
    }, 400 + 600);

    setTimeout(() => {
        testContainer.classList.remove("hidden");

        const testItems = Array.from(testContainer.children);
        const testContainerRect = testContainer.getBoundingClientRect();
        const testContainerWidth = testContainerRect.width;
        const testContainerHeight = testContainerRect.height;

        testItems.forEach((testItem) => {
            const testItemRect = testItem.getBoundingClientRect();
            const testItemWidth = testItemRect.width;
            const testItemHeight = testItemRect.height;

            const maxLeft = testContainerWidth - testItemWidth;
            const maxTop = testContainerHeight - testItemHeight;

            const randomLeft = Math.floor(Math.random() * maxLeft);
            const randomTop = Math.floor(Math.random() * maxTop);

            testItem.style.top = `${randomTop}px`;
            testItem.style.left = `${randomLeft}px`;
        });

        testItems.forEach(testItem => {
            testItem.classList.add("bounce-in");
        });

        testContainer.addEventListener("animationend", () => {
            testItems.forEach(testItem => {
                testItem.classList.remove("bounce-in");
            });
        }, { once: true });
    }, 400 + 600 + 600);
}
