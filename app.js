//variables

//variables para los campos
const email = document.querySelector(' #email2 ');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const bntEnviar = document.querySelector('#enviar');
const mensajeFinalValidacion = document.querySelector('.mensajeFinalValidacion');
const btnReset = document.querySelector('#reset')
const form2 = document.querySelector('.btn-enviar');

const Er =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; /*EXPRESION REGULARES PARA VALIDACION DEL MAIL EN JS */


eventListeners ();
function eventListeners (){
    //inicio de la app
    document.addEventListener('DOMContentLoaded', iniciarApp);
    
    //campos del form
    email.addEventListener('blur' , validarForm); //para validar un campo vacio
    asunto.addEventListener('blur' , validarForm);
    mensaje.addEventListener('blur' , validarForm);
    form2.addEventListener('click' , enviarMail);
    btnReset.addEventListener('click', reseterForm)
}

//funciones
function iniciarApp() {
    bntEnviar.disabled = true;
 bntEnviar.classList.add('enviarBoton');

}

//validar form
function validarForm(e){
    if( e.target.value.length > 0 ){
        const errorHtml = document.querySelector('p.Error');
        if(errorHtml){
            errorHtml.remove();
        }
        e.target.classList.add('validacionOk');/*creo una clase para que cambie el color del input si esta todo Ok */
        e.target.classList.remove('error'); /*ELIMINO LA CLASE error QUE DA ESTILOS A  ESE TIPO DE ERROR */
        
      
    }else{
        e.target.classList.add('error');
        e.target.classList.remove('validacionOk');

        mostrarError('TODOS LOS CAMPOS SON OBLIGATORIOS *');
    }

    if(e.target.type === 'email'){
        const errorHtml = document.querySelector('p.Error');
        
       
        if(Er.test(e.target.value)){
            if(errorHtml){
                errorHtml.remove();
            }
            e.target.classList.add('validacionOk');/*creo una clase para que cambie el color del input si esta todo Ok */
            e.target.classList.remove('error'); /*ELIMINO LA CLASE error QUE DA ESTILOS A  ESE TIPO DE ERROR */

        }else{
            e.target.classList.add('error');
            e.target.classList.remove('validacionOk');
            mostrarError('MAIL NO VALIDO *');
        }
    }

    if(Er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
        bntEnviar.disabled = false;
        bntEnviar.classList.remove('enviarBoton');
    }else{
        iniciarApp();
    }
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.classList.add('MensajeFinal',  'Error');
    mensajeError.textContent = mensaje;

    const errores = document.querySelectorAll('.Error')
    if(errores.length === 0 ){
        mensajeFinalValidacion.appendChild(mensajeError);
    }
}

function enviandoMail(){
   
   console.log('enviando...')
    
}
function enviarMail(){
    const spinner = document.querySelector('.spinner')
    spinner.style.display = 'block';

    setTimeout( ()=>{
        spinner.style.display = 'none';
        mailEnviado.textContent = 'MENSAJE ENVIADO CORRECTAMENTE';

        setTimeout(()=>{

            mailEnviado.remove();
            reseterForm();
        }, 5000)

    }, 3000)
    const mailEnviado = document.createElement('p')
    mensajeFinalValidacion.appendChild(mailEnviado);


}

function reseterForm(){
   email.value = '';
   asunto.value = '';
   mensaje.value = '';
    iniciarApp();
}