//AQUI DEFINO MIS CONSTANTES 
const hamburguesa = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const enlaces = document.querySelectorAll('.navegacion a');
const fecha = document.querySelector('.fecha');

document.addEventListener('DOMContentLoaded',()=>{
    mostrarMenu();
    cerrarMenu();
    fechaActual();
});
//FUNCION PARA MOSTRAR EL MENU. PORQUE POR DEFECTO ESTA ACTIVADO EL NAV
// O EN TAL CASO ESTA OCULTO PERO CON UN BOTON HAMBURGUESA
//ENTONCES AQUI LLAMO AL EVENTO addEventListener AL HACER CLICK SE MUESTRA EL NAV 
// CUANDO EL BOTON HAMBURGUESA ESTA ACTIVADO CON EL TOGGLE ACTIVA LA CLASE OCULTAR
function mostrarMenu(){
    hamburguesa.addEventListener('click',()=>{
        if(navegacion.classList.contains('ocultar')){
            navegacion.classList.remove('ocultar');
        }else{
            navegacion.classList.add('ocultar')
        }

    }); 
}
//FUNCION PARA CERRAR EL MENU DESPUES DE HABER SELECCIONADO ALGUN a del nav
function cerrarMenu(){
    enlaces.forEach(enlace =>{
        enlace.addEventListener('click',(e)=>{
            e.preventDefault();
            const seccion = document.querySelector(e.target.attributes.href.value);
            cambioSeccion(seccion);
            if(e.target.tagName === 'A'){
                navegacion.classList.add('ocultar');
            }
        });
    });
}

function cambioSeccion(seccion){
    seccion.scrollIntoView({
        behavior:'smooth'
    })
}

//FUNCION PARA INDICIAR SOLAMENTE EL AÑO ACTUAL EL CUAL SE VA A MOSTRAR EN EL FOOTER DEL HTML
function fechaActual(){
    let fechaHoy = new Date().getFullYear();
    fecha.textContent = fechaHoy;
}

///////////////////////API/////////////////////

const marvel = {
    render: () => {
        //AQUI CONSUMO LA API 
        const urlAPI = 'https://gateway.marvel.com:443/v1/public/characters?apikey=8355c66e6cdcc41c4976cf1dc87df052&ts=20/10/2024, 03:50:19&hash=8cc94bf3925fc84b4950fccd5d6ce76b';
        //AQUI USO EL DOM E INDICO EL ID EN EL HTML
        const container = document.querySelector('#marvel-row');
        let contentHTML = '';
        fetch(urlAPI)
        .then(res => res.json())
        .then((json) => { 
            for(const hero of json.data.results) {
          
                let seriesName = hero.series.items.length > 0 ? hero.series.items[0].name : 'Sin serie disponible';
                contentHTML+= 
                //ESTE ES EL HTML QUE VOY A MOSTRAR DENTRO DEL DIV QUE TIENE EL ID MARVEL-ROW
                `   <div class="class col-md-4">
                        <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" class="img-thumbnail">
                        <h3 class="title">Nombre: ${hero.name}</h3>
                        <h3 class="series">Serie: ${seriesName}</h3>
                    </div>
                `;
            }
            container.innerHTML = contentHTML;
        })
    }
};
marvel.render();