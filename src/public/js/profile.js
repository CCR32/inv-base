let profileInstace = null; 

class Profile{
    constructor(){
        this.IsEditable = false; 
        this.actions = document.querySelector('.container-actions'); 
        this.profile = document.querySelector('.profile-info');
        if (this.actions != null){
            this.actions.addEventListener('click', this.ProcessEventsActions, false);
        }
        if (this.profile != null){
            this.profile.addEventListener('click', 
            this.ProcessEventProfile, false);
            this.profile.addEventListener('keypress', 
            this.ProcessEventProfile, false);
            this.profile.addEventListener('keydown', 
            this.ProcessEventProfile, false);
            this.profile.addEventListener('keyup', 
            this.ProcessEventProfile, false);
            this.profile.addEventListener('change', 
            this.ProcessEventProfile, false);
        }
    }

    ProcessEventProfile(event) {
        if (event.target.className.indexOf("input-obj")!= -1)
        {
            if (!profileInstace.IsEditable){
                event.preventDefault(); 
                alert("Debes presionar el botón de editar antes de intentar modificar algo");
                return;
            }            
        }
        if (profileInstace.IsEditable){
            if (event.target.className.indexOf("b-save")!= -1){
                return profileInstace.VerifyInputs(event);
            }
        }
    }
    VerifyInputs(event){
        if (this.profileInputs != null){
            this.profileInputs.forEach((input)=>{
                let temp = input.querySelector(".input-obj")
                if (temp!= null)
                {
                    if (temp.value.length == 0 ){
                        if (temp.getAttribute('placeholder')!= null){
                            event.preventDefault();
                            temp.focus();
                            alert(`El campo: ${temp.getAttribute('placeholder')} No puede estar vacio.` );                             
                            return false;
                        }
                    }
                }
            });
            return true;
        }
    }

    ProcessEventsActions(event){
        if (event.target != null){
            if (event.target.className.indexOf('b-edit')!=-1){
                profileInstace.EditProfile(event.target, event);
                return;
            }
            if (event.target.className.indexOf('b-image')!=-1){
                profileInstace.ChangeImage(event.target, event);                
                return;
            }
            if(event.target.className.indexOf('b-destroy')!=-1){
                profileInstace.DestroyProfile(event.target, event);
                return;
            }
            if(event.target.className.indexOf('b-disable')!=-1){
                profileInstace.DisableProfile(event.target, event); 
                return;
            }
        }        
    }

    ChangeImage(item,event){
        console.log('change image');
    }

    UpdateProfileInfo(item, event){
        console.log('update profile info');
    }
    DestroyProfile(item, event){
        console.log('destroy profile');
    }
    DisableProfile(item,event){
        console.log('disable profile');
    }
    EditProfile(item, event){
        console.log('edit profile');
        if (this.profile != null){
            this.profileInputs = this.profile.querySelectorAll('.input-container-x'); 
            if (this.profileInputs != null) {
                this.profileInputs.forEach((control)=>{
                    if (control.className.indexOf('disabled-input')!=-1){
                        control.className="input-container-x";
                    }
                });
            }
            this.IsEditable= true;
        }
    }
}


window.addEventListener('load', function(){
    if (profileInstace == null){
        profileInstace = new Profile();
    }
},false);