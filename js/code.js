$("document").ready(function () {
  GetMes();
  GetFecha();
});

/* Funcion para indicar el mes */
function GetMes() {
  var theMonths = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  var aMonth = today.getMonth();
  console.log(theMonths[aMonth]);
  $("#mes").text(theMonths[aMonth]);
  //  document.write(theMonths[aMonth]);
}

const today = new Date();

const theDays = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
];

/* Funcion para poner las fechas a los respectivos dias de las actividades */
function GetFecha() {
  var today = new Date();
  var todayWord = theDays[today.getDay()];
  console.log(typeof theDays);
  // console.log(todayWord);
  /* 
Obtener la lista con todos los dias y actividades

Agarro la label .activity-checkbox dentro:
div .checkbox-text
input .w-checkbox-input.checkbox
*/

  var diasText = $(".checkbox-text");
  console.log(diasText);
  console.log(diasText.length);
  console.log(typeof diasText);

  for (let i = 0; i < diasText.length; i++) {
    let dia = diasText[i].innerHTML.split(" ")[0];
    let iday = theDays.indexOf(dia);

    if (diasText[i].children[0] != undefined) {
      let proxFechaObj = getNextDayOfWeek(today, iday);
      diasText[i].children[0].innerText = proxFechaObj.getDate().toString();
    }
  }

  function getNextDayOfWeek(date, dayOfWeek) {
    // Code to check that date and dayOfWeek are valid left as an exercise ;)

    var resultDate = new Date(date.getTime());

    resultDate.setDate(date.getDate() + ((7 + dayOfWeek - date.getDay()) % 7));

    return resultDate;
  }

  // diasText.forEach((diaText) => {
  //   console.log(diaText.innerText());
  //   console.log(diaText.text());
  // });
}

/* Funcionalidad para mostrar mostrar el deatalle de la actividad en el form, eso es algo unicamente visual
    no afecta al form perse */
$("#template").css("display", "none");
$(".checkbox").click(function () {
  let check = $(this);
  // console.log(check);
  var actividad = check.attr("add-act");
  var detalle = actividad.split("_");
  console.log(actividad);
  // console.log(detalle);
  // console.log("el detalle en 0 : ", detalle[0]);
  // console.log(($('#' +detalle[0])).length);

  if (check.is(":checked")) {
    // Read the activity data in this format
    // add-act = (cardIndex)_(actividad)_(horario)_(dia)
    // add-act ="a1_vinyasa-budawild_18_martes"

    /* 
             actividad cheked
                 Si NO existe la actividad en el detalle
                     clonar el elemento li template y agregarle el id de la actividad
                     - agregar toda la informacion de la activdidad
                 Si existe la actividad en el detalle
                     - agregar el dia informacion del dia a la activdidad
             actividad NOTcheked
                corroborar si tiene mas de un dia
                    eliminar la informacion del dia que se desea desactivar/
                si NO tiene mas de un dia
                    sacar actividad del detalle
             
             */
    if ($("#" + detalle[0]).length === 0) {
      //create new element on summary
      // OLD var clon = $("#detail_list li:first").clone().attr("id", detalle[0]);
      var clon = $("#template").clone().attr("id", detalle[0]);
      // console.log(clon.children.length);
      $("#detalle").append(clon);
      $("#" + detalle[0]).show("slow");
      $("#" + detalle[0])
        .find("p.activity-item")
        .text(detalle[1].split("-").join(" "));
      $("#" + detalle[0])
        .find("p.day-item")
        .text(detalle[3]);
      $("#" + detalle[0])
        .find("p.hours-item")
        .text(detalle[2]);
    } else {
      $("#" + detalle[0])
        .find("p.day-item")
        .append(" - " + detalle[3]);
    }
  } else {
    // if user unchecks the checkbox

    var dia_alternativo = check
      .parent()
      .siblings()
      .children("input")
      .is(":checked");
    if (dia_alternativo) {
      let dias = [];
      dias = $("#" + detalle[0])
        .find("p.day-item")
        .text()
        .split(" - ");
      // console.log("antes de cortar ", dias);
      for (let index = 0; index < dias.length; index++) {
        if (dias[index] === detalle[3]) {
          dias.splice(index, 1);
        }
      }
      // console.log("desp de cortar ", dias);

      // console.log(dias);
      $("#" + detalle[0])
        .find("p.day-item")
        .text(dias);
      dias = [];

      // console.log(
      //   "el item con la actividad ya existe, habria que sacar el dia indicado por el checkbox, pero no eliminar"
      // );
    } else {
      console.log("eliminar");
      $("#" + detalle[0]).hide("slow");
      $("#" + detalle[0])
        .remove()
        .delay(2000);
    }

    // console.log(dia_alternativo);
  }
});

$("#mision").click(function () {
  $("#tab-mision").click();
  topFunction();
  return false;
});
$("#actividades").click(function () {
  $("#tab-actividades").click();
  topFunction();
  return false;
});
$("#espacio").click(function () {
  $("#tab-espacio").click();
  topFunction();
  return false;
});
$("#contacto").click(function () {
  $("#tab-contacto").click();
  topFunction();
  return false;
});

$("#tab-mision").click(function () {
  topFunction();
});
$("#tab-actividades").click(function () {
  topFunction();
});
$("#tab-espacio").click(function () {
  topFunction();
});
$("#tab-contacto").click(function () {
  topFunction();
});

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
