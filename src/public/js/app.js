const MNSForms = (function() {
    var _this = this;

    _this.MNS_CreateItemByType = function(obj, instance, instanceObject) {
        if (obj != null && obj !== undefined && instance !== null && instanceObject !== undefined) {
            switch (typeof(obj)) {
                case "boolean":
                    if (instance.hasOwnProperty(instanceObject)) {
                        if (obj == true) {
                            instance[instanceObject].innerHTML +=
                                '<div><input type="checkbox" checked></div>';
                        } else {
                            instance[instanceObject].innerHTML +=
                                '<div><input type="checkbox"></div>';
                        }
                    }
                    break;
                case "string":
                    if (instance.hasOwnProperty(instanceObject)) {
                        instance[instanceObject].innerHTML +=
                            '<div><input type="text" class="form-control" placeholder="Usuario" value=' + obj + '></div>';
                    }
                    break;
                case "number":
                    if (instance.hasOwnProperty(instanceObject)) {
                        instance[instanceObject].innerHTML +=
                            '<div><input type="text" class="form-control" placeholder="Usuario" value=' + obj + '></div>';
                    }
                    break;
            }
        }
    }
});
const app = (function() {
    var _this = this;
    _this.MNSObj = new MNSForms();
    _this.api_url = window.origin;
    _this.itemsLink = document.querySelectorAll(".a-link-delete");
    _this.itemsEdit = document.querySelectorAll(".a-link-edit");
    _this.containerAdd = document.querySelector('#container-dv-form');

    _this.setItemselected = function(json) {
        debugger
        if (json !== undefined && json !== null) {
            var obj = json instanceof Array ? json[0] : json;
            _this.containerAdd.innerHTML = "";
            if (obj.hasOwnProperty("email_completo") && obj.hasOwnProperty("nombre_completo") &&
                obj.hasOwnProperty("alias") && obj.hasOwnProperty("activo")) {
                // Crea controles con la propiedad 
                for (var item in obj) {
                    _this.MNSObj.MNS_CreateItemByType(obj[item], _this, "containerAdd");
                }
            }
        }
    }

    // funciones para el manejo de la api
    _this.getAPI = function() {
            return _this.api_url + "/";
        }
        // Obtiene información de dirección de correo x Distrito 
    _this.getbyid = function(event) {
            fetch(_this.getAPI() + "email/api/v1/list/" + event.target.target)
                .then((response) => response.json())
                .then((json) => {
                    _this.setItemselected(json);
                })
        }
        // Eliminar una dirección de correo 
    _this.delete = function(event) {
            event.preventDefault();
            let id = event.target.target;
            try {
                fetch(_this.getAPI() + "email/api/v1/delete", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "distrito": id })
                }).then(response => {
                    if (response.statusText.includes("OK")) {
                        alert("Registro eliminado");
                        document.location.href = document.location.href;
                    }
                }).catch(error => {
                    alert(error)
                })
            } catch (err) {
                alert(err);
            }
        }
        // Actualizar una dirección de correo con los datos pasados por parametro 
    _this.update = function(event) {
        event.preventDefault();
        let id = event.target.target;
        try {
            fetch(_this.getAPI() + "email/api/v1/save", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "distrito": id })
            }).then(response => {
                if (response.statusText.includes("OK")) {
                    alert("Registro eliminado");
                    document.location.href = document.location.href;
                }
            }).catch(error => {
                alert(error)
            })
        } catch (err) {
            alert(err);
        }
    }

    _this.startLlisteners = function() {
        for (var i = 0; i < _this.itemsLink.length; i++) {
            _this.itemsLink[i].addEventListener('click', _this.delete, false);
        }
        for (var j = 0; j < _this.itemsLink.length; j++) {
            _this.itemsEdit[j].addEventListener('click', _this.getbyid, false);
        }
    }

});



window.addEventListener('load', function() {
    var application = new app();
    application.startLlisteners();
}, false);