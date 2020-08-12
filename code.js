<script>
    /* Funcionalidad para mostrar mostrar el deatalle de la actividad en el form, eso es algo unicamente visual
    no afecta al form perse */
    $("#template").css("display", "none");
    $('.checkbox').click(function () {
        let check = $(this);
        var actividad = check.attr('add-act');
        var detalle = actividad.split("_");




        if (check.is(':checked')) {
            if (($('#' + detalle[0]))f.length === 0) {

                //create new li
                var clon = $('#detail_list li:first').clone().attr('id', detalle[0]);
                console.log(clon.children.length);
                $('#detail_list').append(clon);
                $('#' + detalle[0]).show("slow");
                $('#' + detalle[0]).find("p.activity-item").text(detalle[1].split('-').join(' '));
                $('#' + detalle[0]).find("p.day-item").text(detalle[3]);
                $('#' + detalle[0]).find("p.hours-item").text(detalle[2]);
            } else {
                $('#' + detalle[0]).find("p.day-item").append(" - " + detalle[3]);
            }

        }
        else { // if user unchecks the checkbox

            var dia_alternativo = check.parent().siblings().children("input").is(':checked');
            if (dia_alternativo) {
                let dias = [];
                dias = $('#' + detalle[0]).find("p.day-item").text().split(" - ");
                console.log("antes de cortar ", dias);
                for (let index = 0; index < dias.length; index++) {
                    if (dias[index] === detalle[3]) {
                        dias.splice(index, 1);
                    }
                }
                console.log("desp de cortar ", dias);

                console.log(dias);
                $('#' + detalle[0]).find("p.day-item").text(dias);
                dias = [];


                console.log('el item con la actividad ya existe, habria que sacar el dia indicado por el checkbox, pero no eliminar');
            } else {
                console.log('eliminar');
                $('#' + detalle[0]).hide("slow");
                $('#' + detalle[0]).remove().delay(2000);

            }

            console.log(dia_alternativo);
        }
    });

</script>



<script>
    $("#mision").click(function () {
        $("#tab-mision").click();
        console.log('click');
        topFunction()
        return false;
    });
    $("#actividades").click(function () {
        $("#tab-actividades").click();
        console.log('click');
        topFunction()
        return false;
    });
    $("#espacio").click(function () {
        $("#tab-espacio").click();
        console.log('click');
        topFunction()
        return false;
    });
    $("#contacto").click(function () {
        $("#tab-contacto").click();
        console.log('click');
        topFunction()
        return false;
    });

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
        document.body.scrollTop = 0; // para Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
</script>