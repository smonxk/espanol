document.addEventListener("DOMContentLoaded", function () {
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

    const darkerColors = {
        "red.png": "darkred",
        "blue.png": "darkblue",
        "orange.png": "#FFBF00",
        "green.png": "#DAF7A6",
        "yellow.png": "goldenrod",
    };

    const correctMatches = {
        "red.png": "rojo",
        "blue.png": "azul",
        "orange.png": "anaranjado",
        "green.png": "verde",
        "yellow.png": "amarillo",
    };

    function makeDraggable(element) {
        let isDragging = false;
        let offsetX, offsetY;

        const handleMouseMove = (e) => {
            if (isDragging) {
                const testContainerRect = testContainer.getBoundingClientRect();
                const newLeft = e.clientX - testContainerRect.left - offsetX;
                const newTop = e.clientY - testContainerRect.top - offsetY;

                const maxLeft = testContainerRect.width - element.offsetWidth;
                const maxTop = testContainerRect.height - element.offsetHeight;

                const clampedLeft = Math.max(0, Math.min(newLeft, maxLeft));
                const clampedTop = Math.max(0, Math.min(newTop, maxTop));

                element.style.left = `${clampedLeft}px`;
                element.style.top = `${clampedTop}px`;
                
                testItems.forEach((otherItem) => {
                    if (otherItem !== element) {
                        const otherRect = otherItem.getBoundingClientRect();
                        const elementRect = element.getBoundingClientRect();

                        if (
                            elementRect.left < otherRect.right &&
                            elementRect.right > otherRect.left &&
                            elementRect.top < otherRect.bottom &&
                            elementRect.bottom > otherRect.top
                        ) {
                            const imageName = otherItem.classList.contains("test-img")
                                ? otherItem.getAttribute("src").split("/").pop()
                                : element.getAttribute("src").split("/").pop();

                            const textContent = otherItem.classList.contains("test-text")
                                ? otherItem.textContent.trim().toLowerCase()
                                : element.textContent.trim().toLowerCase();

                            const expectedText = correctMatches[imageName];

                            if (textContent === expectedText) {
                                const correctIcon = document.querySelector(`.correct-icon[data-for="${imageName}"]`);

                                if (correctIcon) {
                                    correctIcon.style.left = otherItem.style.left;
                                    correctIcon.style.top = otherItem.style.top;

                                    correctIcon.classList.remove("hidden");
                                    correctIcon.classList.add("animate");

                                    otherItem.classList.add("scale-down");
                                    element.classList.add("scale-down");

                                    correctIcon.addEventListener("animationend", () => {
                                        correctIcon.classList.remove("animate");
                                        correctIcon.classList.add("hidden");
                                    }, { once: true });

                                    otherItem.addEventListener("animationend", () => {
                                        otherItem.classList.remove("scale-down");
                                        otherItem.classList.add("hidden");
                                    }, { once: true });

                                    element.addEventListener("animationend", () => {
                                        element.classList.remove("scale-down");
                                        element.classList.add("hidden");
                                    }, { once: true });
                                }
                            }
                        }
                    }
                });
            }
        };

        const handleMouseUp = () => {
            if (isDragging) {
                isDragging = false;
                element.style.cursor = "grab";
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            }
        };

        element.addEventListener("mousedown", (e) => {
            if (e.button === 0) {
                e.preventDefault();
                isDragging = true;
                offsetX = e.clientX - element.getBoundingClientRect().left;
                offsetY = e.clientY - element.getBoundingClientRect().top;
                element.style.cursor = "grabbing";

                document.addEventListener("mousemove", handleMouseMove);
                document.addEventListener("mouseup", handleMouseUp);
            }
        });
    }

    testItems.forEach((item) => {
        if (item.classList.contains("test-text") || item.classList.contains("test-img")) {
            makeDraggable(item);
        }
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
