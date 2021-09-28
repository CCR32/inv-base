let drawerManger = null; 

class MenuDrawer{
    constructor(){
        this.wrapper = document.querySelector('.wrapper');
        this.buttonMenu = document.querySelector('.img-menu');
        this.containerMenu = document.querySelector('.container-menu');
        this.statusDrawer = "open";
        this.items = document.querySelectorAll('.menu-item');
        
        if (this.wrapper != null){              
            if (this.buttonMenu != null){
                this.buttonMenu.addEventListener('click', this.ProcessEvents, false);
            }              
            if (this.items != null){
                this.containerMenu.addEventListener('click', this.ProcessEvents, false);
            }
        }
    }  

    ProcessEvents(event){
        if ((event.target.className.indexOf("menu-item") != -1) ||
            (event.target.className.indexOf("item") != -1)){
            drawerManger.SelectMenuItem(event.target, event);
            return;
        }
        if (drawerManger.statusDrawer == "closed"){
            drawerManger.OpenDrawer();
            return;
        }
        if (drawerManger.statusDrawer == "open"){
            drawerManger.CloseDrawer();
            return;
        }        
    }

    SelectMenuItem(item, event){        
        this.items.forEach((item)=>{
            item.className ="menu-item";
        });
        if (item.className.className == "menu-item"){
            item.className= "menu-item selected";            
        }
        if (item.className=="item"){
            item.parentElement.className = "menu-item selected";
        }
    }
    OpenDrawer(){
         if(this.statusDrawer.indexOf("closed")!= -1) {
        this.statusDrawer = "open";
        this.wrapper.className = "wrapper open-drawer";
        this.containerMenu.className = "container-menu";
      }
    }
    CloseDrawer(){
      if (this.statusDrawer.indexOf("open") != -1){
        this.statusDrawer = "closed"
        this.wrapper.className = "wrapper"
        this.containerMenu.className = "container-menu closed-menu";
      }
    }  
  }


window.addEventListener('load', function() {
    if (drawerManger == null){
        drawerManger = new MenuDrawer();
    }
}, false);