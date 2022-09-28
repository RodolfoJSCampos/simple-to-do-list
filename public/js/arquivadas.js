loadCards();

function loadCards(){
    let memoCardsArquivadas = JSON.parse(window.localStorage.getItem('memoCardsArquivadas')) || [];
    document.querySelector('.card-area-arquivadas').innerHTML = memoCardsArquivadas;
}

function deleteItem(item, idItem) {
    if(document.getElementById('txt-content'+idItem).innerText == 'Completed'){
        document.querySelector('.card-area-arquivadas').removeChild(item);
        let memoCards = document.querySelector('.card-area-arquivadas').innerHTML;
        window.localStorage.setItem('memoCardsArquivadas', JSON.stringify(memoCards));
        loadCards();
    } else{
        alert('You can\'t archive incompleted tasks')
        return;
    }
}