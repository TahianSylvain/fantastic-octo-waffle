var elementId = "";
var elementCounter = "";
var optionsCounter = 0;
var createdElementDisplayInLineCheckbox = false;
var createdElementDisplayInLineRadio = false;
var createdElementDropdownOption = false;
var optionValueUpdate = "";
var onKeyPressOnce = false;
var elementNameValidation = false;
var keywordsNameValidation = false;
var selectedElementStack = new Array();
var selectedElementObjects = {};
var elementObject = {};
var selectImageField = "";

function datetimePickerTrigger(){

	var datePickerElement = $('.textdate');
	var id = "";
	var _class = "";
	var startTime = "";
	var endTime = "";
	var timeSlice = "";
	var date = new Date();
	var fullYear = date.getFullYear();

	for(var i=0; i < datePickerElement.length; i++){

		id = datePickerElement[i].id;
		var dateFormat = $("#"+id).attr("date-format");
		_class = datePickerElement[i].className;

		if(_class.includes("textdate")){

			flatpickr("#" + id, {
				dateFormat: dateFormat,
				enableTime: false,
				minDate: new Date(fullYear - 150, 0, 1),
				maxDate: new Date(fullYear, 11, 31),
				disableMobile: "true"
			});
		}
	}

	var datePickerElement = $('.textdatetime');
	id = "";
	_class = "";

	for(var i=0; i < datePickerElement.length; i++){

		id = datePickerElement[i].id;
		var dateFormat = $("#"+id).attr("date-format");

		_class = datePickerElement[i].className;

		if(_class.includes("textdatetime")) {

			startTime = $("#"+id+"_start_time").val();
			endTime = $("#"+id+"_end_time").val();
			timeSlice = $("#"+id+"_time_slice").val();

			if(undefined != startTime && startTime.length==0) startTime = "00:00";
			if(undefined != endTime && endTime.length==0) endTime = "23:59";
			if(undefined != timeSlice && timeSlice.length==0) timeSlice = "60";

			flatpickr("#" + id, {
				enableTime: true,
				time_24hr: true,
				minTime: startTime,
				maxTime: endTime,
				dateFormat: dateFormat + " H:i",
				minuteIncrement: timeSlice,
				disableMobile: "true"
			});
		}
	}
}

function register_demand(ele){
	if(window.location.href.indexOf("pagePreview.jsp") >= 0){
		return false;
	}
	var flag = false;
	var telephoneFlag = false;
	var radioFlag = false;
	var checkboxFlag = false;
	var selectFlag = false;
	var reCaptchaFlag = false;
	var form = document.getElementById("demand_form");
	
	if(ele!==undefined)
		form = ele.closest("form");
	
	$(form).find(':input[required],textarea[required]').each(function(){

		if($(this).attr("type") != "radio" && $(this).attr("type") != "checkbox" && !$(this).is("select")){

			if($(this).val().length==0){

				if($(this).attr("type") == "file"){

					$(this).parent().parent().find(".error_msgs").css("display", "block");

				} else {

					$(this).parent().find(".error_msgs").css("display", "block");

				}

				$(this).addClass("is-invalid");
				flag = true;

			}else{

				$(this).removeClass("is-invalid");

				if($(this).attr("type") == "file"){

					if($(this).parent().parent().find(".file_too_large").length > 0){
						
						$(this).parent().parent().find(".file_too_large").css("display","none");
						$(this).parent().parent().find(".error_msgs").css("display", "block");
						flag = true;

					}else{

						$(this).parent().parent().find(".error_msgs").css("display", "none");
					}

				} else {

					$(this).parent().find(".error_msgs").css("display", "none");

				}
			}
		}
	})

	
	$(form).find(':input[type=tel]').each(function(){
		if($(this).parent().next().is(":visible")){
			telephoneFlag = true;
		}
	})
	

	$(form).find("input[type=email]").each(function(){

	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	    if($(this).val().length > 0){

		    if(!re.test(String($(this).val()).toLowerCase())){

				$(this).addClass("is-invalid");
		    	$(this).parent().find(".error_msgs").html("Email is not valid");
		    	$(this).parent().find(".error_msgs").css("display", "block");
		    	flag = true;
		    }else{
				$(this).removeClass("is-invalid");
		    	$(this).parent().find(".error_msgs").css("display", "none");
		    }
	    }
	});

	$(form).find("input[type=radio][required]").each(function(){

		var fieldId = $(this).attr("name");

		if(fieldId.length > 0){

			if($('input[name=' + fieldId + ']').is(":checked")){

				$('input[name=' + fieldId + ']').parent().parent().parent().find(".error_msgs").css("display","none");
			}else{

				$('input[name=' + fieldId + ']').parent().parent().parent().find(".error_msgs").css("display","block");
				radioFlag = true;
			}
		}
	});

	$(form).find(".req_fields").each(function(){

		var checkboxRequired = false;

		$(this).find("input[type=checkbox][required]").each(function(){

			if(!checkboxRequired){

				if($(this).is(":checked")){

					$(this).parent().parent().parent().find(".error_msgs").css("display","none");
					checkboxFlag = false;
					checkboxRequired = true;
				}else{

					$(this).parent().parent().parent().find(".error_msgs").css("display","block");
					checkboxFlag = true;
					checkboxRequired = false;
				}
			}
		});
	});


	$(form).find("select[required]").each(function(){

		var fieldId = $(this).attr("name");

		if(fieldId.length > 0){

			if($('select[name=' + fieldId + ']').val().length > 0){

				$('select[name=' + fieldId + ']').parent().find(".error_msgs").css("display","none");

			}else{

				$('select[name=' + fieldId + ']').parent().find(".error_msgs").css("display","block");
				selectFlag = true;
			}
		}
	});


	$(form).find("input[type=textfield]").each(function(){

		if($(this).attr("pattern").length > 0 && $(this).val().length > 0){

			if(!validateRegularExpression(this)){

		    	$(this).parent().find(".error_msgs").html("Pattern is not valid");
		    	$(this).parent().find(".error_msgs").css("display", "block");
		    	flag = true;
			}else{

		    	$(this).parent().find(".error_msgs").css("display", "none");
			}
		}
	});


	var $captcha = $(form).find( '.g-recaptcha' );

	if($captcha.length > 0){

		var response = grecaptcha.getResponse();

		if (response.length === 0) {

			$($captcha).parent().find(".error_msgs").css("display", "block");
			reCaptchaFlag = true;

		} else {

			$($captcha).parent().find(".error_msgs").css("display", "none");
			reCaptchaFlag = false;
		}
	}

	if(!flag && !telephoneFlag && !radioFlag && !checkboxFlag && !selectFlag && !reCaptchaFlag){
		if(typeof ______menuid !== 'undefined')
			$(form).find("#mid").val(______menuid);
		else if(typeof parent.______menuid !== 'undefined')
			$(form).find("#mid").val(parent.______menuid);
		else
			$(form).find("#mid").val("");

		$(form).find("#menu_lang").val($('html').attr('lang'));


		if(typeof ______portalurl !== 'undefined')
			$(form).find("#portalurl").val(______portalurl);
		else if(typeof parent.______portalurl !== 'undefined')
			$(form).find("#portalurl").val(parent.______portalurl);
		else
			$(form).find("#portalurl").val("");

		var dateFormatElement = $(form).find('.textdate');

		for(var i=0; i < dateFormatElement.length; i++){

			var dateFormat = $(form).find("#"+dateFormatElement[i].id).attr("date-format");
			var dateValue = $(form).find("#"+dateFormatElement[i].id).val();

			if(dateValue.length > 0 && dateFormat == "m/d/Y"){
				var token = $(form).find("#"+dateFormatElement[i].id).val().split("/");
				$(form).find("#"+dateFormatElement[i].id).val(token[1]+"/"+token[0]+"/"+token[2]);	
			}
		}

		var dateTimeFormatElement = $(form).find('.textdatetime');

		for(var i=0; i < dateTimeFormatElement.length; i++){

			var dateFormat = $(form).find("#"+dateTimeFormatElement[i].id).attr("date-format");
			var dateValue = $(form).find("#"+dateTimeFormatElement[i].id).val();
			if(dateValue.length > 0 && dateFormat == "m/d/Y"){
				var token = $(form).find("#"+dateTimeFormatElement[i].id).val().split("/");
				$(form).find("#"+dateTimeFormatElement[i].id).val(token[1]+"/"+token[0]+"/"+token[2]);	
			}
		}

		//we are checking if its a sign_up form and its not opened to update profile then we check for login/email
		if($(form).find("#_ftyp").val() == 'sign_up' || $(form).find("#_ftyp").val() == 'forgot_password')
		{
			var frm = new FormData(form);

			$.ajax({
				type: "POST",
				url: $(form).find("#appcontext").val() + "api/checkclient.jsp",
				data: frm,
				processData: false,
				contentType: false,
				dataType: 'JSON',
				success: function (resp) {

					if(resp.status != 0){

						$(form).find("#submit_btn_msg").html(resp.message);
						$(form).find("#submitbtnmodal").modal("show");
						return false;

					} else {
						___submitForm(form);
					}
				},
				error: function (e) {
					console.log("Error, something is wrong.")
				}
			});	
		}
		else ___submitForm(form);
	}
}
let dataObj=[];
var newInput = document.createElement("INPUT");
function ___submitForm(frm)
{
	var form = new FormData(frm);
	for(let j=0;j<dataObj.length;j++){
		form.append(dataObj[j]["fileId"],dataObj[j]["newBlob"],dataObj[j]["name"])
	}
	var formAction = "";
	if($(frm).attr("action") != undefined && $(form).length > 0)
		formAction = $(frm).attr("action");
	else
		formAction = $(frm).find("#appcontext").val()+"ajax/backendAjaxCallHandler.jsp";

	showLoader();
	$.ajax({
		type: "POST",
		url: formAction,
		data: form,
		processData: false,
		contentType: false,
		dataType: 'JSON',
		success: function (data) 
		{
			//we might be calling _asmCustomFormResponse if its defined so we call pushDataLayer before
			if(data.response == "success"){
				pushDataLayer();
			}			
			$(frm).find("#rule_status").val(data.response);
			
			//we are letting users define a custom function on response of form submit
			//if that exists we will call that otherwise do our default actions
			if( typeof _asmCustomFormResponse !== "undefined" && typeof _asmCustomFormResponse === "function")
			{
				_asmCustomFormResponse(data);//always pass incoming json to it
			}
			else
			{
				var message = "";
				if(data.response == "success"){

					pushDataLayer();
			
					if($(frm).find("#success_msg").val().length > 0) message = $(frm).find("#success_msg").val();
					else message = "Form is submitted.";


					if($(frm).find("#is_admin").val() != undefined && $(frm).find("#is_admin").val() == "1"){

						parent.location.reload(true);

					} else {

						$(frm).find("#submit_btn_msg").html(message);
						$(frm).find("#submitbtnmodal").modal("show");
					}

				}else if(data.response == "error"){

					message = data.msg;
					$(frm).find("#submit_btn_msg").html(message);
					$(frm).find("#submitbtnmodal").modal("show");
				}
			}
		},
		error: function (e) {
			console.log("Error, something is wrong.")
		}
	})
	.always(function() {
		hideLoader();
	});

}

function pushDataLayer(){

	if(typeof dataLayer !== 'undefined'){
		
		dataLayer.push({
			"event": "standard_click",                            
			"event_category": $("meta[property='og:title']").attr("content"),
			"event_action": "form_click",                                  
			"event_label": "submit"
		});
	}
}

function handleImage(Inputfile,html,fid,i){
	showLoader();
	let QUALITY = $("#_imagequality").val();
	
	if(Inputfile.size >= $("#_imagefilemaxsize").val()){
		const blobURL = window.URL.createObjectURL(Inputfile);
		const img = new Image();
		img.src = blobURL;
		
		img.onload = function () {
			window.URL.revokeObjectURL(blobURL);
			
			const canvas = document.createElement('canvas');
			const [newWidth, newHeight] =calculateSize(img, 2048);
			canvas.width = newWidth;
			canvas.height = newHeight;
			const ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0, 0, newWidth, newHeight);
			canvas.toBlob(
				(blob) => {
					let newFile = new File([blob], Inputfile.name);
					let errorMsg = "Image is too large. Choose another image.";
					
					if(newFile.size > $("#_imagefilemaxsize").val()){
						if($('#largeImageMsg')){
							errorMsg = $('#largeImageMsg').val(); 
						}
						html += "<span class='file_too_large invalid-feedback' style='display: block;' id='displayfilenamespn_" + fid + "_" + i + "'>"+errorMsg+"</span>";
						html += "</div>";

						$("#" + fid).parent().siblings(":last").after().after(html);
					}else{
						removeFromDataObj(fid);
						dataObj.push({"fileId":fid,"newBlob":blob,"name":newFile.name});
						
						document.getElementById(fid).removeAttribute('name');
						filename = newFile.name;
						$(".custom-file-label."+fid).text(filename);
						document.getElementById("custom-file-button"+fid).style.display="block";
						html += "<span id='displayfilenamespn_" + fid + "_" + i + "'></span>";
						html += "</div>";
						
						$("#" + fid).parent().siblings(":last").after().after(html);
					}
					hideLoader()
				},
				"image/jpeg",
				QUALITY
			);
			
		};
	}else{
		filename = Inputfile.name;
		$(".custom-file-label."+fid).text(filename);
		if(!!document.getElementById("custom-file-button"+fid)) document.getElementById("custom-file-button"+fid).style.display="block";
		html += "<span id='displayfilenamespn_" + fid + "_" + i + "'></span>";
		html += "</div>";

		$("#" + fid).parent().siblings(":last").after().after(html);
		hideLoader()
	}
	
	
}

function calculateSize(img, size) {
	let width = img.width;
	let height = img.height;
	let aspectRatio = width/height;
	if (width > height && width > size) {		
		width = size;
		height = width/aspectRatio;
	} else if(height > size) {
		height = size;
		width = height * aspectRatio;
	}
	return [width, height];
}

function setFileName(fid, exts)
{
	
	var input = Array.from($('input:file#'+fid)[0].files);
	var _ext = "";
	var validfile = true;
	var msg = "";
	let validImages = ["jpeg", "jpg", "png", "gif", "jpe", "bmp", "tif", "tiff", "dib", "svg", "ico"]
	var filename = "";
	//Rewmove old file name from form feild
	//$("#files_list_" + fid).remove();
	
	$(".custom-file-label."+fid).text(" ");
	if(!!document.getElementById("custom-file-button"+fid)) document.getElementById("custom-file-button"+fid).style.display="none";
	//$("<style>.custom-file-label."+ fid +"::after{content:\" \"; background-image: url(/src/assets/icons/forms/"+iconName+"); background-size: contain; background-repeat: no-repeat; background-position: center; width: 50px; background-color: transparent; border: none;}</style>").appendTo('body');
	var html = "<div id='files_list_" + fid + "'>";
	for (var i = 0; i < input.length; i++) {
		_ext = input[i].name;
		let inputType = input[i].name.split('.')[input[i].name.split('.').length - 1].toLowerCase();
		if (validImages.includes(inputType)) {
			handleImage(input[i],html,fid,i)
		}
		else if(input[i].size > 50000000){

			let errorMsg = "File is too large. Choose another file.";
			if($('#largeFileMsg')!=undefined){
				errorMsg = $('#largeFileMsg').val(); 
			}

			html += "<span class='file_too_large invalid-feedback' style='display: block;' id='displayfilenamespn_" + fid + "_" + i + "'>"+errorMsg+"</span>";
			html += "</div>";

			$("#" + fid).parent().siblings(":last").after().after(html);
		}
		else{
			filename = input[i].name;

			$(".custom-file-label."+fid).text(filename);
			if(!!document.getElementById("custom-file-button"+fid)) document.getElementById("custom-file-button"+fid).style.display="block";
			html += "<span id='displayfilenamespn_" + fid + "_" + i + "'></span>";

			html += "</div>";

			$("#" + fid).parent().siblings(":last").after().after(html);
		}
	}
	
}
function removeFromDataObj(fid){
	for(let j=0;j<dataObj.length;j++){
		if(dataObj[j]["fileId"]==fid){
			dataObj.splice(j,1);
		}
	}
}
function removeFileSelection(fid, exts){
	$("#" + fid).val('');
	setFileName(fid, exts);
	removeFromDataObj(fid);
}

function isvalidimage(fname)
{
	if($.trim(fname) == '') return false;
	var ext = $.trim(fname);
	if(ext.indexOf(".") > -1) ext = ext.substring(ext.lastIndexOf(".") + 1);
	else return false;

	if(ext.toLowerCase() != "png" && ext.toLowerCase() != "jpg" && ext.toLowerCase() != "jpeg" && ext.toLowerCase() != "tif" && ext.toLowerCase() != "gif")
		return false;
	return true;
}

function update_selected_image(currentElement){

	if(confirm("Do you want to update the image?")){

		if($(selectImageField).prev().prop("id") == "meta_info_value"){

			var imgurl = $("#appcontext").val()+"uploads/images/"+$(currentElement).find("input[type=hidden]").val();

			if($("#imgUploadSelectedElement").val().length > 0){

				$("#"+$("#imgUploadSelectedElement").val()).next().find("img").prop("src", imgurl);

			}
		}

		$(selectImageField).prev().val($(currentElement).find("input[type=hidden]").val());
		$(selectImageField).prev().focus();
		$('#uploadProductImageDialog').modal('hide');

	}
}

function validateRegularExpression(currentElement){

	if($(currentElement).prop("pattern").length > 0){

	    var pattern = new RegExp($(currentElement).prop("pattern"));

	    if($(currentElement).val().length > 0){

		    if(pattern.test(String($(currentElement).val()).toLowerCase()))
		    	return true;

		    return false;

	    }

	    return false;
	}

	return false;
}
// Restricts input for the given textbox to the given inputFilter.
function setInputFilter(textbox, inputFilter)
{
	["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event)
	{
		textbox.addEventListener(event, function()
		{
			if (inputFilter(this.value))
			{
				this.oldValue = this.value;
				this.oldSelectionStart = this.selectionStart;
				this.oldSelectionEnd = this.selectionEnd;
			}
			else if (this.hasOwnProperty("oldValue"))
			{
				this.value = this.oldValue;
				this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
			}
		});
	});
};

function getToken(){
	$.ajax({
		url : $("#appcontext").val()+'ajax/gettoken.jsp' ,
		type: 'GET',
		dataType : 'json',
		success : function(resp) {
			$("#form_token").val(resp.token);
		},
		error : function() {
			alert("Error while communicating with the server");
		}
	});
};

function onEditFormParameter(){
	$("#editfrmparam").submit();
};

function onEditLineParameter(){
	$("#editlineparam").submit();
};

function formRuleSave(){

	$("#addrulefrm").submit();
}

function remove_rule(id, ele, formId){

	if(!confirm("Are you sure to delete the rule?"))
		return false;

	if(id.length == 0 && id == ''){
		$(ele).parent().parent().parent().remove();
		return true;
	}

    $.ajax({
        url : $("#appcontext").val()+'admin/ajax/backendAjaxCallHandler.jsp',
        type: 'POST',
        dataType: 'HTML',
        data: {
        	"action": "delete_rule_field",
        	"id": id,
        	"form_id": formId
        },
        success : function(response)
        {
			$(ele).parent().parent().parent().remove();
        }
    });
}

function add_rule_field(){

	var rule = $(".rule_clone").clone();
	$(rule).removeClass("d-none");
	$(rule).removeClass("rule_clone");
	$("#global_information").prepend(rule);

}

function delete_rule_field(fieldId){

	if(!confirm("Are you sure to delete this rule?")) return false;

    $.ajax({
        url : $("#appcontext").val()+'admin/ajax/backendAjaxCallHandler.jsp',
        type: 'POST',
        dataType: 'HTML',
        data: {
        	"action": 'delete_rule_field',
        	"form_id": $("#form_id").val(),
        	"field_id": fieldId
        },
        success : function(response)
        {
       		window.location.reload(true);
        }
    });
}

function update_rule_field(element, fieldId, id){

	var frequency = $(element).parent().parent().find("input[id='frequency']").val();
	var period = $(element).parent().parent().find("select[id='period']").val();

    $.ajax({
        url : $("#appcontext").val()+'admin/ajax/backendAjaxCallHandler.jsp',
        type: 'POST',
        dataType: 'HTML',
        data: {
        	"action": 'update_rule_field',
        	"form_id": $("#form_id").val(),
        	"field_id": fieldId,
        	"frequency": frequency,
        	"period": period,
        	"id": id
        },
        success : function(response)
        {
       		window.location.reload(true);
        }
    });
}

function onFormValidation(element){

	var flagProcessForm = false;

	if($("#process_name").val() == ""){

		$("#process_name").next().css("display","block");
		flagProcessForm = true;
	}
	else $("#process_name").next().css("display","none");

	if($("#table_name").val() == ""){

		$("#table_name").next().css("display","block");
		flagProcessForm = true;
	}
	else $("#table_name").next().css("display","none");

	var titleCount = 0;
	$(".title").each(function(){

		if($(this).val() == "" && titleCount == 0){

			$(".title").parent().find(".invalid-feedback").css("display","block");
			flagProcessForm = true;
			return false;

		} else {

			$(".title").parent().find(".invalid-feedback").css("display","none");
		}
		titleCount++;
	});

	$(".page_path").each(function(){

		if($(this).val() == ""){

			$(".process_path_lang").next().html("Path of the form for language " + $(this).attr("data-language-code") + " is mandatory");
			$(".process_path_lang").next().css("display","block");
			flagProcessForm = true;
			return false;

		} else {

			$(".process_path_lang").next().css("display","none");
		}
	});

	if(flagProcessForm) return false;

	var _data = "id=";

	if($("#form_id").length > 0)
		_data += $("#form_id").val();

	_data += "&type=form";
	$(".page_path").each(function(){

		_data += "&" + $(this).attr("name") + "=";

		if($("#variant").val() === "logged")
			_data += $("#variant").val() + "/";

		_data += $(this).val();
	});


	if($("#form_id").length > 0){

	    $.ajax({
	        url : $("#appcontext").val()+'admin/ajax/checkpathsuniqueness.jsp',
	        type: 'POST',
	        dataType: 'JSON',
			data: _data,
	        success : function(response) {
	          	if(response.status == 0){

	          		$("#form_js").val($ch.jsEditor.getSession().getValue());
	          		$("#form_css").val($ch.cssEditor.getSession().getValue());
					$(".unique_path_err_msg").css("display","none");
					
					$(".ckeditor_success_msg").each(function(){
						var _id = $(this).attr('id');
						var vl = CKEDITOR.instances[_id].getData();

						if(vl.indexOf("src='") > -1)
						{
							vl = vl.replace(/src='/gi,"_etnipt_='");
						}

						if(vl.indexOf("src=\"") > -1)
						{
							vl = vl.replace(/src="/gi,"_etnipt_=\"");
						}
						if(vl.indexOf("href='") > -1)
						{
							vl = vl.replace(/href='/gi,"_etnhrf_='");
						}
						if(vl.indexOf("href=\"") > -1)
						{
							vl = vl.replace(/href="/gi,"_etnhrf_=\"");
						}

						$("#" + _id).val(vl);					
					});

	          		$("#newformfrm").submit();

	          	} else {

					$(".unique_path_err_msg").html(response.msg);
					$(".unique_path_err_msg").css("display","block");
					return false;
				}
	        }
	    });

	} else {

		if($("#table_name").val().length > 0){

		    $.ajax({
		        url : $("#appcontext").val()+'admin/ajax/backendAjaxEditForm.jsp',
		        type: 'POST',
		        dataType: 'JSON',
				data: {
					action: "checktablenameuniqueness",
					tablename: $("#table_name").val()
				},
		        success : function(response) {

		          	if(response.status == 0){

						$("#table_name").next().css("display","none");
					    $.ajax({
					        url : $("#appcontext").val()+'admin/ajax/checkpathsuniqueness.jsp',
					        type: 'POST',
					        dataType: 'JSON',
							data: _data,
					        success : function(response) {

					          	if(response.status == 0){

					          		$("#form_js").val($ch.jsEditor.getSession().getValue());
					          		$("#form_css").val($ch.cssEditor.getSession().getValue());
									$(".unique_path_err_msg").css("display","none");
									
									$(".ckeditor_success_msg").each(function(){
										var _id = $(this).attr('id');
										var vl = CKEDITOR.instances[_id].getData();

										if(vl.indexOf("src='") > -1)
										{
											vl = vl.replace(/src='/gi,"_etnipt_='");
										}

										if(vl.indexOf("src=\"") > -1)
										{
											vl = vl.replace(/src="/gi,"_etnipt_=\"");
										}
										if(vl.indexOf("href='") > -1)
										{
											vl = vl.replace(/href='/gi,"_etnhrf_='");
										}
										if(vl.indexOf("href=\"") > -1)
										{
											vl = vl.replace(/href="/gi,"_etnhrf_=\"");
										}

										$("#" + _id).val(vl);
									});	
									
					          		$("#newformfrm").submit();

					          	} else {

									$(".unique_path_err_msg").html(response.msg);
									$(".unique_path_err_msg").css("display","block");
									return false;
								}
					        }
					    });

		          	} else {

						$("#table_name").next().html(response.msg);
						$("#table_name").next().css("display","block");
						return false;
					}
		        }
		    });
		}
	}
};

function strReplaceAll(str , searchTerm, replacement){

    return str.replace(new RegExp(searchTerm, 'g'), replacement);
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

function escapeDot(str){
  return strReplaceAll(str, escapeRegExp("."), "\\.");
}

function onFieldCkeditorReady(evt){
    var collapseButton = $('#'+ escapeDot(this.id) + "_toolbar_collapser");
    if(collapseButton.length > 0){
        this.ui.editor.on('focus',function(){
            if(collapseButton.hasClass('cke_toolbox_collapser_min')){
                collapseButton.triggerHandler('click');
            }
        });

        collapseButton.trigger('click');
    }
}

function bootConfirm(message, callback) {
    //callback(result) , where result = true/false

    bootbox.confirm({
        size: 'small',
        animate: false,
        message: message,
        callback: callback
    });
}

function showLoader(msg, ele){

    if(typeof ele === "undefined") ele = $('body');

    ele.addClass('loading2');

    $(ele).find('div.loading2msg').remove();
    var msgEle = $('<div>').addClass('loading2msg');
    $(ele).append(msgEle);

    if(typeof msg !== 'undefined'){
        msgEle.html(msg);
    }
    else{
        msgEle.html("");
    }

}

function hideLoader(){
    $('.loading2').removeClass('loading2');
}

function bootConfirm(message, callback) {
    //callback(result) , where result = true/false

    bootbox.confirm({
        size: 'small',
        animate: false,
        message: message,
        callback: callback
    });
}

function bootAlert(message, callback) {
    //NOTE: unlike builtin "alert()" this does not stop execution
    //for workaround, you can use callback
    //callback(result) , where result = true/false

    bootbox.alert({
        size: 'small',
        animate: false,
        message: message,
        callback: callback
    });
}

/*
  toast-like , growl-like notification
  which auto close after some time
*/

function bootNotifyError(msg){
  bootNotify(msg, "danger");
}

function bootNotify(msg, type) {

    if (typeof type == 'undefined') {
        type = "success";
    }
    var settings = {
        type: type,
        delay: 2000,
        placement: {
            from: "top",
            align: "center"
        },
        offset : {
            y : 10,
        },
        z_index : 1500,//to show above bootstrap modal
        // animate: {
        //     enter: 'animated fadeInDown',
        //     exit: 'animated fadeOutRight'
        // }
    };

    $.notify(msg, settings);
}