const CONTAINER_INCOMPLETED_IMPORTANT = document.getElementById("incompleteBookshelfListImportant");
const CONTAINER_INCOMPLETED_MEDIUM = document.getElementById("incompleteBookshelfListMedium");
const CONTAINER_INCOMPLETED_LOW = document.getElementById("incompleteBookshelfListLow");
const CONTAINER_COMPLETED = document.getElementById("completeBookshelfList");

const inputBookTitle = document.getElementById("inputBookTitle");
const inputBookAuthor = document.getElementById("inputBookAuthor");
const inputBookYear =  document.getElementById("inputBookYear");
const inputBookId_Date = +new Date();

const inputBookIsComplete = document.getElementById("inputBookIsComplete");
const inputPriority = document.getElementsByName("inputPriority");

function makeBook(id, title, author, year){

    const book = {
        id: id,
        title: title,
        author: author,
        year: year,
        isComplete: null,
        priority: null
    }

    if (inputBookIsComplete.checked == true){
        book.isComplete = true;
    } else {
        book.isComplete = false;
    }

    if (inputPriority[0].checked == true) {
        book.priority = "important";

    } else if (inputPriority[1].checked == true) {
        book.priority = "medium";

    } else if (inputPriority[2].checked == true) {
        book.priority = "low";

    }

    containerArticle(
        book.id, 
        book.title, 
        book.author, 
        book.year, 
        book.isComplete,
        book.priority
    );

    STORAGE.push(book);
}

function elementTitle(bookTitle) {
    const elementTitle = document.createElement("h3");
    elementTitle.innerText = bookTitle;
    elementTitle.classList.add("title");
    return elementTitle;
}

function elementAuthor(bookAuthor) {
    const elementAuthor = document.createElement("p");
    elementAuthor.innerText = "Penulis: " + bookAuthor;
    return elementAuthor;
}

function elementYear(bookYear) {
    const elementYear = document.createElement("p");
    elementYear.innerText = "Tahun: " + bookYear;
    return elementYear;
}

function containerAction(bookIsComplete, bookPriority) {
    const containerAction = document.createElement("div");
    containerAction.classList.add("action");
    if (bookIsComplete == true){
        containerAction.append(buttonFinishOrCancel("finish_or_cancel", "Cancel", bookPriority), deleteButton("delete", "Delete"));
    } else if (bookIsComplete == false) {
        containerAction.append(buttonFinishOrCancel("finish_or_cancel", "Finish", bookPriority), deleteButton("delete", "Delete"));
    }

    return containerAction;
}

function containerArticle(bookId, bookTitle, bookAuthor, bookYear, bookIsComplete, bookPriority) {
    const containerArticle = document.createElement("article");
    containerArticle.classList.add("book_item");
    containerArticle.id = bookId;
    
    containerArticle.append(
        elementTitle(bookTitle), 
        elementAuthor(bookAuthor), 
        elementYear(bookYear), 
        containerAction(bookIsComplete, bookPriority)
    );

    if (bookIsComplete == true){
        CONTAINER_COMPLETED.append(containerArticle);  
        containerArticle.classList.add("completed");

    } else if (bookIsComplete == false && bookPriority == "important") {
        containerArticle.classList.add("important_priority");
        CONTAINER_INCOMPLETED_IMPORTANT.append(containerArticle);

    } else if (bookIsComplete == false && bookPriority == "medium") {
        containerArticle.classList.add("medium_priority");
        CONTAINER_INCOMPLETED_MEDIUM.append(containerArticle);

    } else if (bookIsComplete == false && bookPriority == "low")  {
        containerArticle.classList.add("low_priority");
        CONTAINER_INCOMPLETED_LOW.append(containerArticle);
    }
        
    return containerArticle;
}

function buttonFinishOrCancel(buttonTypeClass, buttonText, bookPriority) {
    const button = createButton(buttonTypeClass, buttonText);

    button.addEventListener("click", (event) => {
        whereShelfIsBookShouldMove(event, bookPriority);

        changeBookIsCompleteTrueOrFalse(event);

        updateDataToStorage();
    });

    return button;
}

function deleteButton(buttonTypeClass, buttonText){
    const button = createButton(buttonTypeClass, buttonText);

    button.addEventListener("click", (event) => {
        const clickedBook = event.target.parentElement.parentElement;
       
        areYouSure("delete", `<b>${clickedBook.firstChild.textContent}</b>`, clickedBook);
    });

    return button;
}

function changeBookIsCompleteTrueOrFalse(clickedButton) {
    const clickedBook = clickedButton.target.parentElement.parentElement;

    for (myStorage of STORAGE) {
        if(myStorage.id == clickedBook.id) { 
            if (clickedButton.target.innerText == "Finish") {
                myStorage.isComplete = false;
                console.log("Moved to Incomplete List");
                console.log(myStorage);

            } else if (clickedButton.target.innerText == "Cancel") {
                myStorage.isComplete = true;
                console.log("Moved to Complete List");
                console.log(myStorage);
            }
        }
    }
}

function whereShelfIsBookShouldMove(clickedButton, bookPriority) {
    const clickedBook = clickedButton.target.parentElement.parentElement;

    if (clickedButton.target.innerText == "Cancel" && bookPriority == "important") {
        clickedButton.target.innerText = "Finish";
        CONTAINER_INCOMPLETED_IMPORTANT.appendChild(clickedBook);
        clickedBook.classList.add("important_priority");
        clickedBook.classList.remove("completed");

    } else if (clickedButton.target.innerText == "Cancel" && bookPriority == "medium") {
        clickedButton.target.innerText = "Finish";
        CONTAINER_INCOMPLETED_MEDIUM.appendChild(clickedBook);
        clickedBook.classList.add("medium_priority");
        clickedBook.classList.remove("completed");

    } else if (clickedButton.target.innerText == "Cancel" && bookPriority == "low") {
        clickedButton.target.innerText = "Finish";
        CONTAINER_INCOMPLETED_LOW.appendChild(clickedBook);
        clickedBook.classList.add("low_priority");
        clickedBook.classList.remove("completed");

    } else {
        clickedButton.target.innerText = "Cancel";
        CONTAINER_COMPLETED.appendChild(clickedBook);
        clickedBook.classList.add("completed");
        clickedBook.classList.remove("low_priority", "medium_priority", "important_priority");

    }
}
