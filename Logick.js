var OsnownayaPerem = true;
var isMoving = false;

function Moove(){
    if(isMoving)return;
    isMoving = true;

    var firstPos = OsnownayaPerem? -120:0;
    var SecondPos = OsnownayaPerem? 0:-120;
    var mooveing = OsnownayaPerem? 1:-1;
    var container = document.getElementsByClassName('table')[0];
    var timer = setInterval(BigMoove, 5);
    var btn = document.getElementById('burger');

    function BigMoove(){
        if((OsnownayaPerem && firstPos >=SecondPos)||(!OsnownayaPerem && firstPos <=SecondPos)){
            OsnownayaPerem = !OsnownayaPerem;
            clearInterval(timer);
            isMoving= false;
            if(OsnownayaPerem){
                btn.classList.remove('open');
            }else{
                btn.classList.add('open');
            }
        }else{
            firstPos+=mooveing;
            container.style.right = firstPos+'%';
        }
    }

}

            // ПЛАВНЫЙ СКРОЛЛ
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault(); // Отменяем стандартное поведение ссылки
                const targetId = this.getAttribute('href').substring(1); // Получаем ID цели
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });



document.getElementById('burger').addEventListener('сlick', function(){
    var btn = this;
    btn.disabled = true;
    Moove();
    setTimeout(function(){
        btn.disabled = false;
    },Math.abs(1000 * (100 / 1)) )
})


            //Massage from form to telegram
const TELEGRAM_BOT_TOKEN = '7832034365:AAHTQOl3Mxmpd8g1Bhahkwc_BnyyS9jnkpo';
const TELEGRAM_CHAT_ID = '@MassageToTelegram';
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

// Убедитесь, что слушатель событий добавляется правильно
var btnForm = document.getElementById('btn');
btnForm.addEventListener('click', FormZapr);

async function FormZapr() {
    var Name = document.getElementById('name').value;
    var Email = document.getElementById('email').value;
    var Phone = document.getElementById('Phone').value;
    var Textarea = document.getElementById('textarea').value;

    // Проверка на пустые поля
    if (Name === '' || Email === '' || Phone === '' || Textarea === '') {
        console.log('Error: Все поля должны быть заполнены.');

        var inputs = document.getElementsByTagName('input');

        for (var input of inputs) {
            if (input.value === '') {
                input.style.borderColor = 'red';
            }else {
                input.style.borderColor = 'white';
            }
        } 

        return;
    } else {
        var message = new ContactForm(Name, Email, Phone, Textarea);

        try {
            const response = await fetch(API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message.text // Используем геттер text для получения текста сообщения
                })
            });

            if (response.ok) {
                console.log('Сообщение отправлено успешно!');
                
                // Clear input fields and reset border colors
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('Phone').value = '';
                document.getElementById('textarea').value = '';
                
                // Optionally reset border colors back to default
                document.getElementById('name').style.borderColor = '';
                document.getElementById('email').style.borderColor = '';
                document.getElementById('Phone').style.borderColor = '';
                document.getElementById('textarea').style.borderColor = '';
                
                btnForm.style.backgroundColor = 'rgb(113, 255, 47)';

               alert('thank for your massage');

                
            } else {
                console.error('Ошибка при отправке сообщения:', response.statusText);
            }

        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    }
}



// Класс для сообщения
class ContactForm {
    constructor(name, email, phone, textarea) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.textarea = textarea;
    }

    get text() {
        return `Заявка від: ${this.name}!\nEmail: ${this.email}\nPhone: ${this.phone}\nText: ${this.textarea}`;
    }
}





class Form {
    constructor(name, email, phone, textarea) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.textarea = textarea;
    }

   get text(){
        return ` Заява от: ${this.name}!\n Email: ${this.email} \n  Phone:${this.phone} \n Text: ${this.textarea}`
   }
}
