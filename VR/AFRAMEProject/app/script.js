AFRAME.registerComponent('hotspots',{
    init:function(){
        this.el.addEventListener('reloadspots',function(evt){
            var currspotgroup=document.getElementById(evt.detail.currspots);
            currspotgroup.setAttribute("scale","0 0 0");
      
            var newspotgroup=document.getElementById(evt.detail.newspots);
            newspotgroup.setAttribute("scale","1 1 1");
          });
    }
});

AFRAME.registerComponent('spot',{
    schema:{
      linkto:{type:"string",default:""},
      spotgroup:{type:"string",default:""}
    },
    
    init:function(){
        this.el.setAttribute("src","#hotspot");
        this.el.setAttribute("look-at","#cam");

        var data=this.data;
    
        this.el.addEventListener('click',function(){
          
            var sky=document.getElementById("skybox");
            sky.setAttribute("src",data.linkto);
    
            var spotcomp=document.getElementById("spots");
            var currspots=this.parentElement.getAttribute("id");
          
            spotcomp.emit('reloadspots',{newspots:data.spotgroup,currspots:currspots});
        });
    }
});
