let btnAgendar = document.getElementById('btn-agendar-cita');
btnAgendar.addEventListener('click', agendarCita);

function pagar_con_paypal() {
      let form = document.getElementById('form-pagar-con-paypal');
      form.submit();
}
