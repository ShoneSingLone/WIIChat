	methods = {
	    // http://jqueryvalidation.org/email-method/
	    email: function (value, element) {
	        // From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
	        // Retrieved 2014-01-14
	        // If you have a problem with this implementation, report a bug against the above spec
	        // Or use custom methods to implement your own email validation
	        return this.optional(element) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
	    },

	    // http://jqueryvalidation.org/url-method/
	    url: function (value, element) {

	        // Copyright (c) 2010-2013 Diego Perini, MIT licensed
	        // https://gist.github.com/dperini/729294
	        // see also https://mathiasbynens.be/demo/url-regex
	        // modified to allow protocol-relative URLs
	        return this.optional(element) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
	    },

	    // http://jqueryvalidation.org/date-method/
	    date: function (value, element) {
	        return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString());
	    },

	    // http://jqueryvalidation.org/dateISO-method/
	    dateISO: function (value, element) {
	        return this.optional(element) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
	    },

	    // http://jqueryvalidation.org/number-method/
	    number: function (value, element) {
	        return this.optional(element) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
	    },

	    // http://jqueryvalidation.org/digits-method/
	    digits: function (value, element) {
	        return this.optional(element) || /^\d+$/.test(value);
	    },

	    // http://jqueryvalidation.org/creditcard-method/
	    // based on http://en.wikipedia.org/wiki/Luhn_algorithm
	    creditcard: function (value, element) {
	        if (this.optional(element)) {
	            return "dependency-mismatch";
	        }
	        // accept only spaces, digits and dashes
	        if (/[^0-9 \-]+/.test(value)) {
	            return false;
	        }
	        var nCheck = 0,
	            nDigit = 0,
	            bEven = false,
	            n, cDigit;

	        value = value.replace(/\D/g, "");

	        // Basing min and max length on
	        // http://developer.ean.com/general_info/Valid_Credit_Card_Types
	        if (value.length < 13 || value.length > 19) {
	            return false;
	        }

	        for (n = value.length - 1; n >= 0; n--) {
	            cDigit = value.charAt(n);
	            nDigit = parseInt(cDigit, 10);
	            if (bEven) {
	                if ((nDigit *= 2) > 9) {
	                    nDigit -= 9;
	                }
	            }
	            nCheck += nDigit;
	            bEven = !bEven;
	        }

	        return (nCheck % 10) === 0;
	    },

	    // http://jqueryvalidation.org/minlength-method/
	    minlength: function (value, element, param) {
	        var length = $.isArray(value) ? value.length : this.getLength(value, element);
	        return this.optional(element) || length >= param;
	    },

	    // http://jqueryvalidation.org/maxlength-method/
	    maxlength: function (value, element, param) {
	        var length = $.isArray(value) ? value.length : this.getLength(value, element);
	        return this.optional(element) || length <= param;
	    },

	    // http://jqueryvalidation.org/rangelength-method/
	    rangelength: function (value, element, param) {
	        var length = $.isArray(value) ? value.length : this.getLength(value, element);
	        return this.optional(element) || (length >= param[0] && length <= param[1]);
	    },

	    // http://jqueryvalidation.org/min-method/
	    min: function (value, element, param) {
	        return this.optional(element) || value >= param;
	    },

	    // http://jqueryvalidation.org/max-method/
	    max: function (value, element, param) {
	        return this.optional(element) || value <= param;
	    },

	    // http://jqueryvalidation.org/range-method/
	    range: function (value, element, param) {
	        return this.optional(element) || (value >= param[0] && value <= param[1]);
	    },

	    // http://jqueryvalidation.org/equalTo-method/
	    equalTo: function (value, element, param) {
	        // bind to the blur event of the target in order to revalidate whenever the target field is updated
	        // TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
	        var target = $(param);
	        if (this.settings.onfocusout) {
	            target.off(".validate-equalTo").on("blur.validate-equalTo", function () {
	                $(element).valid();
	            });
	        }
	        return value === target.val();
	    },

	            }
	        }, param));
	        return "pending";
	    }
	}