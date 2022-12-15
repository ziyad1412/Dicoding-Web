document.addEventListener("DOMContentLoaded", () => {
    
    showAllShelf();
    buttonReset();

    document.getElementById("inputImportant").checked = true;

    inputBookIsComplete.checked = false;

    const formInputBook = document.getElementById("inputBook");
    formInputBook.addEventListener("submit", (event) => {
        event.preventDefault();
        makeBook(+new Date(), inputBookTitle.value, inputBookAuthor.value, inputBookYear.value);
        updateDataToStorage();
    });
    
    if (isStorageExist()){
        const getDataInStorage = localStorage.getItem("book");
        let theData = JSON.parse(getDataInStorage);

        if (theData !== null) {
            STORAGE = theData; 
        } 

        for (myStorage of STORAGE) {
            const savedBook = {
                id: myStorage.id,
                title: myStorage.title,
                author: myStorage.author,
                year: myStorage.year,
                isComplete: myStorage.isComplete,
                priority: myStorage.priority
            }
            
            containerArticle(
                savedBook.id, 
                savedBook.title, 
                savedBook.author, 
                savedBook.year, 
                savedBook.isComplete,
                savedBook.priority
            );
        }
    }


});