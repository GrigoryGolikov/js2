document.querySelector('#buttonSend').addEventListener('click',() => {

    // берем с формы знаечни которые будем проверять
    let blockEmailblockName = document.querySelector('[name = "name"]'); 
    let blockPhone = document.querySelector('[name = "phone"]'); 
    let blockEmail = document.querySelector('[name = "email"]'); 
    let blockMessage = document.querySelector('[name = "message"]'); 

    let name = blockName.value; 
    let phone = blockPhone.value; 
    let email = blockEmail.value; 
    let message = blockMessage.value; 

    // реuулярные выражения для проверки
    regName = /^[a-zа-я]+$/ig;
    regPhone = /^\+7\(\d{3}\)\d{3}-\d{4}/ig;
    regEmail = /^[a-z1-9-.]+@[a-z]+\.(com|ru)$/ig;
    regMessage = /.+/igm;

    if (regName.test(name)) {
        blockName.classList.add('div-ok');
        blockName.nextElementSibling.textContent = "";

    } else{
        blockName.classList.add('div-error');
        blockName.nextElementSibling.textContent = "имя должно содержать только буквы";
    }  

    if (regPhone.test(phone)) {
        blockPhone.classList.add('div-ok');
        blockPhone.nextElementSibling.textContent = "";

    } else{
        blockPhone.classList.add('div-error');
        blockPhone.nextElementSibling.textContent = "телефон должен иметь формат +7(000)000-0000";
    }   

    if (regEmail.test(email)) {
        blockEmail.classList.add('div-ok');
        blockEmail.nextElementSibling.textContent = "";

    } else{
        blockEmail.classList.add('div-error');
        blockEmail.nextElementSibling.textContent = "E-mail должен иметь вид mymail@mail.ru";
    }   
    if (regMessage.test(message)) {
        blockMessage.classList.add('div-ok');
        blockMessage.nextElementSibling.textContent = "";

    } else{
        blockMessage.classList.add('div-error');
        blockMessage.nextElementSibling.textContent = "сообщение не должно быть пустым";
    }   

}
);

let blockName = document.querySelector('[name = "name"]'); 

