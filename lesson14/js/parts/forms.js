function forms() {
    let message = new Object();
    message.loading = "Загрузка...";
    message.success = "Спасибо! скоро с вами свяжутся";
    message.failure = "Что-то пошло не так";
    let form = document.getElementsByClassName('main-form')[0],
        formFooter = document.getElementById('form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');
    statusMessage.classList.add('status');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        //AJAX
        let request = new XMLHttpRequest();
        request.open("POST", "server.php");

        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        let formData = new FormData(form);

        request.send(formData);

        request.onreadystatechange = function () {
            if (request.readyState < 4){
                statusMessage.innerHTML = message.loading;
            } else if(request.readyState === 4){
                if (request.status < 300){
                    statusMessage.innerHTML = message.success;
                    //обавляем контент на страницу
                }
                else {
                    statusMessage.innerHTML = message.failure;
                }
            }
        };
        for (let i=0; i<input.length; i++){
            input[i].value = '';
            //Очищаем поля ввода
        }
    });
    formFooter.addEventListener('submit', function(event) {
        event.preventDefault();
        formFooter.appendChild(statusMessage);

        //AJAX
        let request = new XMLHttpRequest();
        request.open("POST", "server.php");

        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        let formData = new FormData(form);

        request.send(formData);

        request.onreadystatechange = function () {
            if (request.readyState < 4){
                statusMessage.innerHTML = message.loading;
            } else if(request.readyState === 4){
                if (request.status < 300){
                    statusMessage.innerHTML = message.success;
                    //обавляем контент на страницу
                }
                else {
                    statusMessage.innerHTML = message.failure;
                }
            }
        };
        for (let i=0; i<input.length; i++){
            input[i].value = '';
            //Очищаем поля ввода
        }
    });
}
module.exports = forms;