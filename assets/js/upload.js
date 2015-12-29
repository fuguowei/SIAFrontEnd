$('input[type=file]').on('change', uploadFile);

function uploadFile(){

    var file_data = $('#fileselect').prop('files')[0]; 
    var ext = $("#fileselect").val().split('.').pop().toLowerCase();
    if ($.inArray(ext, ['jpg']) == -1){
        $("#upload_error").html("<p class='error'>Please choose a WSDL file</p>");
        return;
    }

    if (file_data == undefined){
        return;
    }

    $("#upload_error").html("Processing File...");

    var form_data = new FormData();                  
    form_data.append('file', file_data);
    $("#upload_bar_holder").show();   

    $.ajax({
                url: 'app/upload.php',
                dataType: 'text',  
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,                         
                type: 'post',
                success: function(filename){
                    $("#upload_bar").animate({width: "100%"}, 1000, function () {

                        uploadBox();
                        $("#upload_error").html("");
                        $("#upload_success").html("<p>"+filename+" has been uploaded.</p>");
                        $("#upload_success").animate({top: "0px"}, 200).delay(1500);
                        $("#upload_success").animate({top: "-80px"}, 200);
                        $("#upload_bar").css("width", "0%");
                        $("#upload_bar_holder").hide();
                        $("#fileselect").val('');
                    });
                }
     });
    
    updateSidebar();
}