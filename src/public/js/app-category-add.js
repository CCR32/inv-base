
let appCategoryInstance = null; 

class appCategoryCreate{    
    constructor(){          
        this.url = window.origin;           
        this.catid = 
        document.querySelector('#cat-id');
        this.name = 
        document.querySelector('#cat-name');
        this.description = 
        document.querySelector('#cat-description');
        this.large = 
        document.querySelector('#cat-des-large');        
        this.saveChanges = 
        document.querySelector('#save-changes');
        this.cancel = 
        document.querySelector('#cancel-save');
                      
        if (this.saveChanges !== null){
            this.addListenersClick(this.saveChanges);
            this.addListenersClick(this.cancel);
        }
    }

    refreshCategory(target, category){
        fetch(this.url +"/Category/" + category)
        .then((response) => response.json())
        .then((json) => {            
                this.catid = json[0].code;
                this.name.value = json[0].nombreCategoria;                         
                this.description.value = json[0].descripcionCategoria;
                this.large.value = json[0].descripcionLarga;
        })
    }
        

    // Guardar una categoria editada.
    saveCategory(target){        
        try {
            this.verifyInputs();
            fetch(this.url + "/Category/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    "cCodigo": this.catid.value,   
                    "cNombreCategoria": this.name.value,
                    "cDescripcionCategoria":this.description.value,
                    "cDescripcionLarga": this.large.value   
                 })
            }).then(response => {
                if (response.statusText.includes("OK")) {
                    alert("Registro actualizado");                        
                    this.refreshCategory(target, 
                    this.catid.value)
                    document.location.href = window.origin+"/Category";
                }
            }).catch(error => {
                alert(error)
            })
        } catch (err) {
            alert(err);
        }    
    }
    //Verificar entrada de datos
    verifyInputs(){
        if (this.catid.value == "" || this.catid.length == 0)
            throw new Error("La categoria no puede estar vacia");
        if (this.name.value == "" || this.name.value.length == 0)
            throw new Error("El nombre de la categoria es obligatorio");
        if (this.description.value == "" || this.description.length == 0)
            throw new Error("La categoria requiere una descripción");
        if (this.large.value == "" || this.large.length == 0)
            throw new Error("La categoria requiere una descripción larga");
    }
    
    //Cacecelar operación
    cancelSave(target){
        document.location.href = window.origin+"/Category";
    }
  
    //Procesar eventos
    processEvents(event){      
        switch(event.target.id){
            case "save-changes":
                appCategoryInstance.saveCategory(event.target);
            break;    
            case "cancel-save":
                appCategoryInstance.cancelSave(event.target);
            break;
        }
    }
    //Inicializar listeners
    addListenersClick(item){
        if (item !== null && item!==undefined){            
            item.addEventListener('click', this.processEvents, false);
        }
    }        
};

window.addEventListener('load', function(event){
    if (appCategoryInstance == null){
        appCategoryInstance = new appCategoryCreate();
    }
}, false);


