jQuery(document).ready(function(){

  var numberElementId = "";
  $('#demand_form').find("input[type=number]").each(function(){

  	numberElementId = $(this).attr("id");
	if(null != document.getElementById(numberElementId)){

		setInputFilter(document.getElementById(numberElementId), function(value) {
			return /^\d*\.?\d*$/.test(value);
		});
	}
  });


	$('#submitbtnmodal').on('hidden.bs.modal', function (ele) {

    	var redirectUrl = $("#redirect_url").val();
    	var ruleStatus = $("#rule_status").val();

    	if(ruleStatus == "success"){

	    	if(redirectUrl.length > 0){

		        if(redirectUrl.includes("http") || redirectUrl.includes("https"))
		            redirectUrl = redirectUrl;
		        else
		            redirectUrl = "https://" + redirectUrl;

	    		window.location.href = redirectUrl;
	    	}
	    	else
	        	window.location.href = window.location;
    	}
	});

	$("#sfid").change(function(){
		window.location = "defineFilters.jsp?fid=" + $("#sfid").val();
	});

	addSearchFilters=function()
	{
		$.ajax({
			url : "addupdatefilters.jsp",
			type: 'POST',
			data : { action : "addsearchfilter",  fid : $("#fid").val(), selectedFilters : $("#created_form_filters").val() },
			success : function(response)
			{
				window.location = "defineFilters.jsp?fid="+$("#fid").val();
			},
			error : function()
			{
				//alert("Some error occurred while communicating with the server");
			}
		});
	}

	addResultFilters=function()
	{
		$.ajax({
			url : "addupdatefilters.jsp",
			type: 'POST',
			data : { action : "addresultfilter",  fid : $("#fid").val(), selectedFilters : $("#created_form_filters").val() },
			success : function(response)
			{
				window.location = "defineFilters.jsp?fid="+$("#fid").val();
			},
			error : function()
			{
				//alert("Some error occurred while communicating with the server");
			}
		});
	}

	deleteSearchFilter=function(id)
	{
		if(confirm("Are you sure to delete this filter?"))
		{
			$.ajax({
				url : "addupdatefilters.jsp",
				type: 'POST',
				data : { action : "deletesearchfilter", id : id },
				success : function(response)
				{
					window.location = "defineFilters.jsp?fid="+$("#fid").val();
				},
				error : function()
				{
					//alert("Some error occurred while communicating with the server");
				}
			});
		}
	}

	deleteResultFilter=function(id)
	{
		if(confirm("Are you sure to delete this filter?"))
		{
			$.ajax({
				url : "addupdatefilters.jsp",
				type: 'POST',
				data : { action : "deleteresultfilter", id : id },
				success : function(response)
				{
					window.location = "defineFilters.jsp?fid="+$("#fid").val();
				},
				error : function()
				{
					//alert("Some error occurred while communicating with the server");
				}
			});
		}
	}

	updateRangeFlag=function(obj, id)
	{
		var flg = 0
		if ($(obj).prop('checked') == true) flg = 1;

		$.ajax({
			url : "addupdatefilters.jsp",
			type: 'POST',
			data : { action : "updaterangeflag", id : id, flag : flg },
			success : function(response)
			{
				window.location = "defineFilters.jsp?fid="+$("#fid").val();
			},
			error : function()
			{
				//alert("Some error occurred while communicating with the server");
			}
		});
	};

	$("#form_template_table_name").on("keyup", function(){

		var v = $(this).val();

		if(v != ""){

			var patternTable = /^[a-zA-Z0-9_]*$/;
			if(patternTable.test(v)) $("#form_template_table_name").val(v);
			else {
				$("#form_template_table_name").val(v.substring(0, v.length-1));
			}
		}
	});

	$("#form_template_form_name").on("keyup", function(){

		var v = $(this).val();

		if(v != ""){

			var patternTable = /^[A-Za-z0-9 ]+$/;
			if(patternTable.test(v)) $("#form_template_form_name").val(v);
			else {
				$("#form_template_form_name").val(v.substring(0, v.length-1));
			}
		}
	});

	  var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];

	  $(".tel").each(function(i){

	    var allowCountryCodeArray = [];
	    var countryCode = $(this).attr("allow-country-code");

	    if(countryCode.length > 0 && countryCode.includes(",")){

	      var countryCodeToken = countryCode.split(",");

	      for (var i = 0; i < countryCodeToken.length; i++) {

	        if(countryCodeToken[i].trim().length > 0)
	          allowCountryCodeArray.push(countryCodeToken[i].trim());

	      }

	    } else if(countryCode.length > 0){

	        allowCountryCodeArray.push(countryCode);
	    }

	    var localCountryName = $(this).attr("local-country-name");

	    if(localCountryName.length > 0 && localCountryName === "1"){

	      var countryData = window.intlTelInputGlobals.getCountryData();

	      for(var i = 0; i < countryData.length; i++) {

	        var country = countryData[i];
	        country.name = country.name.replace(/.+\((.+)\)/,"$1");
	      }
	    }

		let _allowNationalMode = false;
		if($(this).attr("allow-national-mode") && $(this).attr("allow-national-mode") == "true")
		{
			_allowNationalMode = true;
		}

	    var iti = window.intlTelInput(this, {

	      utilsScript: $("#appcontext").val() + 'js/utils.js',
	      preferredCountries:[],
	      initialCountry: $(this).attr("default-country-code"),
	      onlyCountries: allowCountryCodeArray,
	      nationalMode: _allowNationalMode

	    });

	    this.addEventListener('blur', function() {

	      if (!iti.isValidNumber()) {

	        if(errorMap[iti.getValidationError()]){

	          $(this).addClass("is-invalid");
	          $(this).parent().parent().find(".error_msgs").html(errorMap[iti.getValidationError()]);
	          $(this).parent().parent().find(".error_msgs").css("display", "block");
	          return false;

	        } else {

	          $(this).removeClass("is-invalid");
	          $(this).parent().parent().find(".error_msgs").css("display", "none");
	        }

	      } else{

	        $(this).removeClass("is-invalid");
	        $(this).parent().parent().find(".error_msgs").css("display", "none");
	      }

//	      $(this).val(iti.getNumber());
	    });

	  });


    customRange = function(a) {

      var step = $(a).attr("step");
      var min = $(a).attr("min");
      var elementName = $(a).prop("id");

      var x = (a.value || a.options[a.selectedIndex].value);

      if(x == 0) {

        document.getElementById("customRange"+elementName).innerHTML = "";
        document.getElementById("customRange"+elementName).append(min);

      } else {

        document.getElementById("customRange"+elementName).innerHTML = "";
        document.getElementById("customRange"+elementName).append(x);

      }
    }

	getToken();
	datetimePickerTrigger();
	setTriggers();

});