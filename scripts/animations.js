$( document ).ready(function() {
    console.log( "ready!" );
    polys = $("polygon");
    for (let i = 0; i < polys.length; i++){
        $(polys[i]).mouseover(function () {
            $(this).css('position', 'relative');
            $( this ).css("fill", "yellow");
            $this = $(this);
            let bbox = this.getBBox();
            let centreX = bbox.x + bbox.width/2;
            let centreY = bbox.y + bbox.height/2;
            $this.css("transform-origin", centreX + 'px ' + centreY + 'px');
            $this.css("transform", "scale(2)");
            $this.css("z-index", 100);
        }).mouseleave(function () {
            $( this ).css("fill", "dodgerblue");
            let bbox = this.getBBox();
            let centreX = bbox.x + bbox.width/2;
            let centreY = bbox.y + bbox.height/2;
            $this = $(this);
            $this.css("transform-origin", centreX + 'px ' + centreY + 'px');
            $this.css("transform", "scale(1)");
            $this.css("z-index", 0);
        })
    }
});
