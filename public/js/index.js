document.querySelector('.btn-adc-tarefa').addEventListener('click', showForm);
var corBackground='vazio', corLetra, idCard=0;
loadCards();

function showForm(){
    document.querySelector('.adc-tarefa').innerHTML = `
        <div id="form-adc-tarefa">
        <label id="lbl-descricao" for="inpt-desc">Description</label>
        <input type="text" id="inpt-desc">

        <label id="lbl-cor" for="btn-cores">Color</label>
        <div class="btn-cores" id="cor1"></div>
        <div class="btn-cores" id="cor2"></div>
        <div class="btn-cores" id="cor3"></div>
        <div class="btn-cores" id="cor4"></div>
        <div class="btn-cores" id="cor5"></div>
        <div class="btn-cores" id="cor6"></div>
        <div class="btn-cores" id="cor7"></div>

        <button id="btn-adicionar">Add</button>
        </div>
    `
    document.querySelector('#cor1').addEventListener('click', selectColor1);
    document.querySelector('#cor2').addEventListener('click', selectColor2);
    document.querySelector('#cor3').addEventListener('click', selectColor3);
    document.querySelector('#cor4').addEventListener('click', selectColor4);
    document.querySelector('#cor5').addEventListener('click', selectColor5);
    document.querySelector('#cor6').addEventListener('click', selectColor6);
    document.querySelector('#cor7').addEventListener('click', selectColor7);

    function selectColor1(){
        limparSelecao();
        document.querySelector('#cor1').style.boxShadow = "2px 2px 2px rgb(0 0 0 / 0.35)";
        corBackground = '#daf5fa';
        corLetra = '#19b5dc';
    }
    function selectColor2(){
        limparSelecao();
        document.querySelector('#cor2').style.boxShadow = "2px 2px 2px rgb(0 0 0 / 0.35)";
        corBackground = '#d1fecb';
        corLetra = '#58a51d';
    }
    function selectColor3(){
        limparSelecao();
        document.querySelector('#cor3').style.boxShadow = "2px 2px 2px rgb(0 0 0 / 0.35)";
        corBackground = '#f6d0f6';
        corLetra = '#cb65cb';
    }
    function selectColor4(){
        limparSelecao();
        document.querySelector('#cor4').style.boxShadow = "2px 2px 2px rgb(0 0 0 / 0.35)";
        corBackground = '#dcd0f3';
        corLetra = '#9763f9';
    }
    function selectColor5(){
        limparSelecao();
        document.querySelector('#cor5').style.boxShadow = "2px 2px 2px rgb(0 0 0 / 0.35)";
        corBackground = '#fcfccb';
        corLetra = '#8f8f69';
    }
    function selectColor6(){
        limparSelecao();
        document.querySelector('#cor6').style.boxShadow = "2px 2px 2px rgb(0 0 0 / 0.35)";
        corBackground = '#fbd4b4';
        corLetra = '#ec842e';
    }
    function selectColor7(){
        limparSelecao();
        document.querySelector('#cor7').style.boxShadow = "2px 2px 2px rgb(0 0 0 / 0.35)";
        corBackground = '#ffffff';
        corLetra = '#727272';

    }
    function limparSelecao(){
        document.querySelector('#cor1').style.boxShadow = "none";
        document.querySelector('#cor2').style.boxShadow = "none";
        document.querySelector('#cor3').style.boxShadow = "none";
        document.querySelector('#cor4').style.boxShadow = "none";
        document.querySelector('#cor5').style.boxShadow = "none";
        document.querySelector('#cor6').style.boxShadow = "none";
        document.querySelector('#cor7').style.boxShadow = "none";
    }

    document.querySelector('#btn-adicionar').addEventListener('click', adcCard);
}


function adcCard(){
    let desc = document.querySelector('#inpt-desc').value;
    if (desc.trim() === ''){
        alert('Fields cannot be empty')
         return;
    }

    if (corBackground == 'vazio'){
        alert('Choose a color')
         return;
    }
    
    document.querySelector('.card-area').innerHTML += `
        <div class="card" id="card${idCard}">
            <div class="card-cabecalho" id="cabecalho-${idCard}">
                <div class="img-card-cabecalho">
                    <img src="./public/assets/unchecked.png" id="check${idCard}" onclick ="concluirTarefa(${idCard})">
                </div>
                <div class="txt-card-cabecalho" id="txt-content${idCard}">
                    Não Concluída
                </div>
            </div>
            <div class="texto-card" id="txt-card${idCard}">${desc}</div>
            <div class="card-rodape">
                <div class="btn-card-arquivar">
                    <img src="./public/assets/archive-color.png" id="btn-card-arquivar" onclick ="arquivarItem(parentNode.parentNode.parentNode, ${idCard}, '${corBackground}', '${corLetra}')">
                </div>
                <div>
                    <img src="./public/assets/trash-gray-scale.png" id="btn-card-excluir" onclick ="deleteItem(parentNode.parentNode.parentNode, ${idCard})">
                </div>
            </div>
        </div>
    `

    let cardStyle = '#card' + idCard;
    document.querySelector(cardStyle).style.backgroundColor = corBackground;
    document.querySelector(cardStyle).style.color = corLetra;
    idCard++;
    corBackground='vazio'

    let memoCards = document.querySelector('.card-area').innerHTML;
    let memoIdCard = idCard;
    
    window.localStorage.setItem('memoCards', JSON.stringify(memoCards));
    window.localStorage.setItem('memoIdCard', JSON.stringify(memoIdCard));

    document.querySelector('.adc-tarefa').innerHTML = `
    <div class="btn-adc-tarefa">
        <img class="link-adc-tarefa" src="./public/assets/task-add-icon.png"/>
        <pre class="link-adc-tarefa">  Add Task</pre>
    </div>`

    document.querySelector('.btn-adc-tarefa').addEventListener('click', showForm);
}

function loadCards(){
    let memoCards = JSON.parse(window.localStorage.getItem('memoCards')) || [];
    let memoIdCard = JSON.parse(window.localStorage.getItem('memoIdCard')) || [];
    document.querySelector('.card-area').innerHTML = memoCards;
    idCard = memoIdCard;
}

function deleteItem(item, idItem) {
    alert('You must archive a task to be able to delete it')
         return;
}

function arquivarItem(item, idItem, corBackgroundArq, corLetraArq){
    if(document.getElementById('txt-content'+idItem).innerText == 'Completed'){
        
        let memoCardsArquivadas = JSON.parse(window.localStorage.getItem('memoCardsArquivadas')) || [];
        let itemHTML = document.getElementById('card'+idItem).innerHTML;

        memoCardsArquivadas += '<div class="card" id="card'+idItem+'" style="background-color: '+corBackgroundArq+'; color: '+corLetraArq+'">'+itemHTML+'</div>';
        window.localStorage.setItem('memoCardsArquivadas', JSON.stringify(memoCardsArquivadas));
        
        document.querySelector('.card-area').removeChild(item);
        let memoCards = document.querySelector('.card-area').innerHTML;
        window.localStorage.setItem('memoCards', JSON.stringify(memoCards));
        loadCards();

    } else{
        alert('voce nao pode arquivar tarefas nao concluidas')
            return;
    }
}

function concluirTarefa(item){
    document.getElementById('check'+item).setAttribute("src", "./public/assets/checked.png");
    document.getElementById('txt-content'+item).innerText = 'Completed';
    document.getElementById('cabecalho-'+item).style.color = '#2b5a07';
    document.getElementById('txt-card'+item).style.textDecoration = 'line-through';
    document.getElementById('cabecalho-'+item).style.backgroundColor = '#b8ff99';
    let memoCards = document.querySelector('.card-area').innerHTML;
    window.localStorage.setItem('memoCards', JSON.stringify(memoCards));
    loadCards();
}