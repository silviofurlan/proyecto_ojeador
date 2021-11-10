
function ContactMap() {
    return (
      <div id="contenedor-ContactarMapa">

      <div className="contactar">
          <h1>Contacte con nosotros</h1>
     
          <div className="formContactar">
              {/* <form action="">
     
                  <label for="nombre">Nombre</label>
                  <input type="text" id="nombre" required title="Debe introucir un nombre"
                      placeholder="Introduzca su nombre">
     
                  <label for="correo">Correo</label>
                  <input type="text" id="correo">
     
                  <label for="mensaje">Mensaje</label>
                  <textarea type="text" id="mnsaje"> </textarea>
     
                  <button>Enviar</button>
              </form> */}
          </div>
          </div>
     
      <div className="contenedorMapa">
          <h1>Ubicación</h1>
          <iframe className="iframeMapa"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2955.1069158820724!2d-8.740386399999956!3d42.21215949999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2589e40a58627d%3A0x35020a409ee2e444!2sEstadio%20Abanca%20Bala%C3%ADdos!5e0!3m2!1ses!2ses!4v1636304210161!5m2!1ses!2ses"
              width="450" height="400" style="border:0;" allowfullscreen="" loading="lazy">
          </iframe>
      </div>
     
  
      </div>

     
    );
  }
  
  export default ContactMap;
  



