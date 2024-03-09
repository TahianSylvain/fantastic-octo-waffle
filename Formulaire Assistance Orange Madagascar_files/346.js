$(document).ready(function() {


	associateAutoComplete=function(obj, fieldid, formid, minlength, name)
	{
		$(obj).autocomplete({
                    	source: function(request, response) {
				$.ajax({
					url: $("#appcontext").val()+"autocompleteResults.jsp",
					data: { __field_id : fieldid, __form_id : formid, __fieldname : name, __objvalue : $(obj).val() },
				       dataType: "json",
       				success: function(resp) 
					{
	                    			response(resp);
      		         		}
				});
			},
             	minLength: minlength
		});
	};

	isArray=function(what) {
    		return Object.prototype.toString.call(what) === '[object Array]';
	};

	makeServerCall=function(obj, fieldid, formid, ruleid, fname, htmlformid, triggername)
	{
		var dt = $("#"+htmlformid).serialize();
		dt += "&__noe_field_id=" + fieldid + "&__noe_form_id=" + formid + "&__noe_rule_id=" + ruleid + "&__noe_trigger_name="+triggername;
		$.ajax({
			url: $("#appcontext").val()+"getTriggerResults.jsp",
			data: dt,
			type: 'POST',
		       dataType: "json",
			success: function(resp) 
			{
				if(resp.data != null ) 
		 	       {
					var jsd = resp.data;

					if(isArray(resp.data))
					{
						jsd = resp.data[0];
					}
					for(var k in jsd) 
					{
						var _val = $.trim(jsd[k]);
						k = k.toLowerCase();

						//we are not implementing setting values in tables forms yet so we always have one field with this name
						if($('#'+htmlformid+' :input[name='+k+']').length > 0)
						{
							var obj = $('#'+htmlformid+' :input[name='+k+']').get(0);

							if($(obj).is(':radio'))
							{
								$('input:radio[name='+k+']').each(function () { $(this).prop('checked', false); });
								$('input:radio[name='+k+']').each(function () { if($(this).val().toLowerCase() == _val.toLowerCase()) $(this).prop('checked', true);  });
							}
							else if($(obj).is(':checkbox'))
							{
								$('input:checkbox[name='+k+']').each(function () { $(this).prop('checked', false); });
								if(_val.indexOf(";") > -1)
								{
									var _vals = _val.split(";");
									for(var j=0;j<_val.length;j++)
									{
										$('input:checkbox[name='+k+']').each(function () { if($(this).val().toLowerCase() == _vals[j].toLowerCase()) $(this).prop('checked','checked');  });
									}
								}
								else $('input:checkbox[name='+k+']').each(function () { if($(this).val().toLowerCase() == _val.toLowerCase()) $(this).prop('checked','checked');  });
							}
							else
							{
								$(':input[name='+k+']').val(_val);
							}
						}
 					}
				}


      		       }
		});
		
	}; 

	associateTrigger=function(_trigger, obj, fieldid, formid, ruleid, fname, htmlformid)
	{
		if(_trigger == 'onblur')
		{
			$(obj).blur(function(){
				makeServerCall(obj, fieldid, formid, ruleid, fname, htmlformid, 'onblur');
			});
		}
		else if(_trigger == 'onchange')
		{
			$(obj).change(function(){
				makeServerCall(obj, fieldid, formid, ruleid, fname, htmlformid, 'onchange');
			});
		}
		else if(_trigger == 'onclick')
		{
			$(obj).click(function(){
				makeServerCall(obj, fieldid, formid, ruleid, fname, htmlformid, 'onclick');
			});
		}

		else if(_trigger == 'onkeypress')
		{
			$(obj).keypress(function(){
				makeServerCall(obj, fieldid, formid, ruleid, fname, htmlformid, 'onkeypress');
			});
		}

		else if(_trigger == 'onkeyup')
		{
			$(obj).keyup(function(){
				makeServerCall(obj, fieldid, formid, ruleid, fname, htmlformid, 'onkeyup');
			});
		}

		else if(_trigger == 'onkeydown')
		{
			$(obj).keydown(function(){
				makeServerCall(obj, fieldid, formid, ruleid, fname, htmlformid, 'onkeydown');
			});
		}

	};


	setTriggers = function(){

		$(".noe_auto_complete").each(function() {
			associateAutoComplete($(this), $(this).attr('data-noe-field-id'), $(this).attr('data-noe-form-id'), $(this).attr('data-noe-auto-char'), $(this).attr('data-noe-fname'));
		});	

		$(".noe_onblur").each(function() {
			associateTrigger("onblur", $(this), $(this).attr('data-noe-field-id'), $(this).attr('data-noe-form-id'), $(this).attr('data-noe-rule-id'), $(this).attr('data-noe-fname'), $(this).attr('data-noe-html-form-id'));
		});	

		$(".noe_onchange").each(function() {

			associateTrigger("onchange", $(this), $(this).attr('data-noe-field-id'), $(this).attr('data-noe-form-id'), $(this).attr('data-noe-rule-id'), $(this).attr('data-noe-fname'), $(this).attr('data-noe-html-form-id'));
		});	

		$(".noe_onclick").each(function() {
			associateTrigger("onclick", $(this), $(this).attr('data-noe-field-id'), $(this).attr('data-noe-form-id'), $(this).attr('data-noe-rule-id'), $(this).attr('data-noe-fname'), $(this).attr('data-noe-html-form-id'));
		});	

		$(".noe_onkeypress").each(function() {
			associateTrigger("onkeypress", $(this), $(this).attr('data-noe-field-id'), $(this).attr('data-noe-form-id'), $(this).attr('data-noe-rule-id'), $(this).attr('data-noe-fname'), $(this).attr('data-noe-html-form-id'));
		});	

		$(".noe_onkeyup").each(function() {
			associateTrigger("onkeyup", $(this), $(this).attr('data-noe-field-id'), $(this).attr('data-noe-form-id'), $(this).attr('data-noe-rule-id'), $(this).attr('data-noe-fname'), $(this).attr('data-noe-html-form-id'));
		});	

		$(".noe_onkeydown").each(function() {
			associateTrigger("onkeydown", $(this), $(this).attr('data-noe-field-id'), $(this).attr('data-noe-form-id'), $(this).attr('data-noe-rule-id'), $(this).attr('data-noe-fname'), $(this).attr('data-noe-html-form-id'));
		});	

		$.ajax({
			type : "POST",
			url : $("#appcontext").val()+"ajax/backendAjaxCallHandler.jsp",
			data : {
				"action" : "getJsCode",
				"form_id" : $("#form_id").val(),
				"rule_id" : $("#rule_id").val()
			},
			cache : false,
			async : false,
			dataType : 'html',
			success : function(response) {
				$("#noe_js_script").html('');
				$("#noe_js_script").html(response);
			}
		});
	}

});