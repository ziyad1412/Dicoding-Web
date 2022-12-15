const asideAddBook = document.getElementById("asideAddBook");
const inputSection = document.getElementById("inputSection");
const overlay = document.getElementById("overlay");

asideAddBook.addEventListener("click", () => {

    if (overlay.classList.contains("d-none")){
        overlay.classList.remove("d-none");
        overlay.classList.add("d-grid-center");
        inputSection.classList.add("visible");

    } else if (overlay.classList.contains("d-grid-center")){
        overlay.classList.remove("d-grid-center");
        overlay.classList.add("d-none");
        inputSection.classList.remove("visible");
    }

    document.addEventListener("click", (event) => { 
        const clickedElement = event.target;
        if (clickedElement != inputSection && clickedElement == overlay && overlay.classList.contains("d-grid-center")) {
            overlay.classList.remove("d-grid-center");
            overlay.classList.add("d-none");
        } 
    });

    inputBookIsComplete.addEventListener("click", () => {
        const inputPriority = document.getElementsByName("inputPriority");
        const textButtonCompleteIncomplete = document.getElementById("textButtonCompleteIncomplete");
    
        if(inputBookIsComplete.checked === true) {
            textButtonCompleteIncomplete .innerText = "shelf complete";
            for (let i = 0; i < inputPriority.length; i++){
                inputPriority[i].setAttribute("disabled", true);
            }
        } else {
            for (let i = 0; i < inputPriority.length; i++){
                inputPriority[i].removeAttribute("disabled");
            }
            textButtonCompleteIncomplete .innerText = "shelf incomplete";
        }
    });
});

document.getElementById("searchBook").addEventListener("submit", (event) => {
    event.preventDefault();

    const inputSearch = document.getElementById("searchBookTitle");
    const bookItem = document.getElementsByClassName("book_item");
    const refreshSubmit = document.getElementById("refreshSubmit");
    
    for (let i = 0; i < bookItem.length; i++) {
        if (bookItem[i].firstChild.textContent.indexOf(inputSearch.value) > -1) {
            bookItem[i].style.display = "block";
        } else {
            bookItem[i].style.display = "none";

        }
    }

    refreshSubmit.classList.add("d-grid-center");   
    refreshSubmit.addEventListener("click", () => {
        refreshSubmit.classList.remove("d-grid-center");
        window.location.reload();
        inputSearch.value = null;
    });
});

const linkIncompleteWrapper = document.getElementById("linkIncompleteWrapper");
const linkShowAll = document.getElementById("linkShowAllIncompleteBookShelf");
const linkImportant = document.getElementById("linkImportantIncompleteBookShelf");
const linkMedium = document.getElementById("linkMediumIncompleteBookShelf");
const linkLow = document.getElementById("linkLowIncompleteBookShelf");

function showAllShelf() {
    linkShowAll.classList.add("active");
    CONTAINER_INCOMPLETED_IMPORTANT.classList.add("d-grid-opacity");
    CONTAINER_INCOMPLETED_MEDIUM.classList.add("d-grid-opacity");
    CONTAINER_INCOMPLETED_LOW.classList.add("d-grid-opacity");
}

linkShowAll.addEventListener("click", (event) => {
    event.preventDefault

    if (!(linkShowAll.classList.contains("active"))) {
        linkShowAll.classList.add("active");
        CONTAINER_INCOMPLETED_IMPORTANT.classList.add("d-grid-opacity");
        CONTAINER_INCOMPLETED_MEDIUM.classList.add("d-grid-opacity");
        CONTAINER_INCOMPLETED_LOW.classList.add("d-grid-opacity");
    
        linkImportant.classList.remove("active");
        linkMedium.classList.remove("active");
        linkLow.classList.remove("active");
    }
});

linkImportant.addEventListener("click", (event) => {
    event.preventDefault();

    if (!(CONTAINER_INCOMPLETED_IMPORTANT.classList.contains("active"))) {
        linkImportant.classList.add("active");
        CONTAINER_INCOMPLETED_IMPORTANT.classList.add("d-grid-opacity");

        linkShowAll.classList.remove("active");
        linkMedium.classList.remove("active");
        linkLow.classList.remove("active");

        CONTAINER_INCOMPLETED_MEDIUM.classList.remove("d-grid-opacity");
        CONTAINER_INCOMPLETED_LOW.classList.remove("d-grid-opacity");
    }
});

linkMedium.addEventListener("click", (event) => {
    event.preventDefault();

    if (!(CONTAINER_INCOMPLETED_MEDIUM.classList.contains("active"))) {
        linkMedium.classList.add("active");
        CONTAINER_INCOMPLETED_MEDIUM.classList.add("d-grid-opacity");

        linkShowAll.classList.remove("active");
        linkImportant.classList.remove("active");
        linkLow.classList.remove("active");

        CONTAINER_INCOMPLETED_IMPORTANT.classList.remove("d-grid-opacity");
        CONTAINER_INCOMPLETED_LOW.classList.remove("d-grid-opacity");
    }
});

linkLow.addEventListener("click", (event) => {
    event.preventDefault();

    if (!(CONTAINER_INCOMPLETED_LOW.classList.contains("active"))) {
        linkLow.classList.add("active");
        CONTAINER_INCOMPLETED_LOW.classList.add("d-grid-opacity");
        
        linkShowAll.classList.remove("active");
        linkMedium.classList.remove("active");
        linkImportant.classList.remove("active");

        CONTAINER_INCOMPLETED_MEDIUM.classList.remove("d-grid-opacity");
        CONTAINER_INCOMPLETED_IMPORTANT.classList.remove("d-grid-opacity");
    }
});

function buttonReset() {
    const resetButton = document.getElementById("resetButton");
    
    resetButton.addEventListener("click", () => {
        areYouSure("reset", "<b>all</b>", null);
    })
}

function buttonYesDeleteOrReset(doCondition, clickedBook) {
    const buttonYesDeleteOrReset = document.getElementById("buttonYes");
    const areYouSure = document.getElementById("areYouSure");

    if (doCondition == "delete") {
        buttonYesDeleteOrReset.addEventListener("click", () => {
            clickedBook.remove();
            areYouSure.classList.remove("d-grid-opacity");

            deleteData(clickedBook);
            customDialog(clickedBook.firstChild.textContent);
            updateDataToStorage();
        });

    } else if (doCondition == "reset") {
        buttonYesDeleteOrReset.addEventListener("click", () => {
            localStorage.removeItem("book");
            window.location.reload();
        });
    }
    
}

function buttonCancelResetAndDelete() {
    const buttonCancelDelete = document.getElementById("buttonCancel");
    const areYouSure = document.getElementById("areYouSure");

    buttonCancelDelete.addEventListener("click", () => {
        areYouSure.classList.remove("d-grid-opacity");
    });
}

function areYouSure(doCondition, clickedElementText, clickedBook) {
    const areYouSure = document.getElementById("areYouSure");
    const areYouSureText = document.getElementById("areYouSureText");

    areYouSure.classList.add("d-grid-opacity");
    areYouSureText.innerHTML = `Are you sure want to ${doCondition} ${clickedElementText}?`;

    buttonYesDeleteOrReset(doCondition, clickedBook)
    buttonCancelResetAndDelete();
}

function customDialog(clickedElement) {
    const customDialog = document.getElementById("customDialog");
    const customDialogText = document.getElementById("customDialogText");

    customDialog.classList.add("animation_center_visible");
    customDialogText.innerText = `Book ${clickedElement} has been deleted`;
    customDialog.addEventListener("animationend", () => {
        customDialog.classList.remove("animation_center_visible");
    });
}

function createButton(buttonTypeClass, buttonText) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = buttonText;

    return button;
}