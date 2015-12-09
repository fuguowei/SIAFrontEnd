$( document ).ready(function() {
	//updateSidebar();
});


$(function () {
    accordion = function (element) {
	    open = element.getAttribute("open");
		if(open == "1"){
	        $(element).next(".menu-mask").stop().animate({height: "0px"}, 200);
	        $(element).next(".menu-mask").children("ul").stop().animate({marginLeft: "-10px"}, 200);
	        element.setAttribute("open", 0);
	    }
	    else{
	        autoHeight = $(element).next(".menu-mask").children("ul").height()+10; // Get Auto Height
	    	$(element).next(".menu-mask").stop().animate({height: autoHeight}, 200);
	    	$(element).next(".menu-mask").children("ul").stop().animate({marginLeft: "0px"}, 200);
	    	element.setAttribute("open", 1);
		}
    };
});

function uploadBox(){
	if ($("#upload_box").css('display') == "none"){
		$("#upload_box").show();
		$("#black_bg").show();
		$("#upload_box").animate({opacity: 1, marginTop: "-175px"}, 200);
		$("#black_bg").animate({opacity: 1}, 300);
	}
	else{
		$("#black_bg").animate({opacity: 0}, 300);
		$("#upload_box").animate({opacity: 0, marginTop: "-160px"}, 200, function() {
			$("#black_bg").hide();
       		$("#upload_box").hide();
  		});
	}
}

function updateSidebar(){

	$("#services_container").empty();
	$.ajax({
                url: 'app/sidebar.php',
                dataType: 'text',  
                cache: false,
                contentType: false,
                processData: false,                        
                type: 'post',
                success: function(data){
                	$("#services_container").html(data);
                }
     });
}

