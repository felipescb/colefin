/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

(function (core) {

    core(window.jQuery, window, document);
})(function ($, window, document) {

    $(function () {

        Utils.setResponsiveVideo("SgFgK0IS3KY", "0:0:42", "0:1:34", ".youtube-background");
        Utils.enableCarousel(".owl-faq", 3, {
            center: true,
            loop: true,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                },
                800: {
                    items: 3
                },
                1900: {
                    items: 3
                }
            }
        });

        MetasController.metasToogler(".btn-metas-toogle", ".meta-hide");

        window.donationFormOwl = Utils.enableCarousel(".donation-page-container", 1, {
            nav: false,
            mouseDrag: false,
            touchDrag: false,
            pullDrag: false,
            freeDrag: false,
            autoHeight: true
        });
        DonationForm.init("#select-donation-form");
        DonationForm.customAmountButton("#select-donation-form-input-amount-custom");
        DonationForm.toggleOnlyCardInputs('#donation-payment-form [name=payment_type]');
        DonationForm.inputRadioColor("#select-donation-form");
        DonationForm.changeCardBrand("#donation-payment-form [name=card_number]");
        DonationForm.buttonToStepTwo("#select-donation-form");
        DonationForm.buttonToStepThree("#user-info-form");
        DonationForm.buttonToStepFour("#donation-payment-form");
        DonationForm.back("#back-to-step-one");
        DonationForm.back("#back-to-step-two");
    });

    var Utils = {

        setResponsiveVideo: function setResponsiveVideo(_videosource, _videostart, _videoend, _selector) {
            var videosource = _videosource;
            var startT = _videostart;
            var stopT = _videoend;

            if ($(".youtube-background").length > 0) {
                // check if Youtube bg exists
                if (startT == 'undefined') startT = '0';else {
                    var sts = startT.split(':');
                    startT = parseInt(sts[0]) * 3600 + parseInt(sts[1]) * 60 + parseInt(sts[2]);
                }
                if (stopT == 'undefined') stopT = '0';else {
                    var ets = stopT.split(':');
                    stopT = parseInt(ets[0]) * 3600 + parseInt(ets[1]) * 60 + parseInt(ets[2]);
                }

                $(_selector).mb_YTPlayer({
                    videoURL: videosource,
                    mute: true,
                    loop: true,
                    showControls: true,
                    showAnnotations: false,
                    showYTLogo: false,
                    gaTrack: false,
                    startAt: startT,
                    stopAt: stopT
                });
            }
        },

        enableCarousel: function enableCarousel(_selector, _sizeof, _options) {
            var options = {
                items: _sizeof,
                nav: false,
                dots: true,
                center: true
            };

            $.extend(options, _options);

            return $(_selector).owlCarousel(options);
        },


        disableSubmit: function disableSubmit(_selector) {
            $(_selector).on('submit', function (ev) {
                ev.preventDefault;
                return false;
            });
        }
    }; //End of Utils

    var MetasController = {

        metasToogler: function metasToogler(_selector, _target) {
            $(_selector).click(function () {
                $(_target).each(function () {
                    $(this).slideDown();
                });
            });
        }

    };

    var DonationForm = {
        init: function init(_selector) {
            var form = $(_selector);

            $('input[name=cpf]').mask('000.000.000-00');
            $('input[name=card_number]').mask('9999 9999 9999 9999');
            $('input[name=expiration_date]').mask('00/0000');
            $('input[name=security_code]').mask('0009');
            $('input[name=custom_amount]').mask('09#');
        },

        toggleOnlyCardInputs: function toggleOnlyCardInputs(_selector) {
            $(_selector).on('change', function (ev) {
                var payment_method = $(this).val();
                var form = $(this).parents('form');
                if (payment_method == 'CreditCard' || payment_method == 'DebitCard') {
                    $('.only-card', form).removeClass('hidden');
                    $('.only-transfer', form).addClass('hidden');
                    $('.only-boleto', form).addClass('hidden');
                    $('[type=submit]', form).text('Efetuar Pagamento');
                    console.log('Efetuar Pagamento');
                } else if (payment_method == 'EletronicTransfer') {
                    $('.only-card', form).addClass('hidden');
                    $('.only-transfer', form).removeClass('hidden');
                    $('.only-boleto', form).addClass('hidden');
                } else if (payment_method == 'Boleto') {
                    $('.only-card', form).addClass('hidden');
                    $('.only-transfer', form).addClass('hidden');
                    $('.only-boleto', form).removeClass('hidden');
                    $('[type=submit]', form).text('Gerar Boleto');
                    console.log('Boleto');
                } else {
                    $('.only-card', form).removeClass('hidden');
                    $('.only-transfer', form).removeClass('hidden');
                    $('.only-boleto', form).removeClass('hidden');
                }
                window.donationFormOwl.trigger('refresh.owl.carousel');
            });
        },

        inputRadioColor: function inputRadioColor(_selector) {
            var form = $(_selector);

            $("input[name=amount]", form).on('change', function (ev) {
                $("label", form).addClass('not-selected');
                $(ev.target).siblings('label').removeClass('not-selected');

                if ($(this).attr('id') != 'select-donation-form-input-amount-custom') {
                    form.submit();
                }
            });
        },

        customAmountButton: function customAmountButton(_selector) {
            $("input[name=amount]").on('change', function (ev) {
                var target = $(ev.currentTarget);

                if ("#" + target.attr('id') == _selector) {
                    target.siblings('label').addClass('hidden');
                    target.siblings('input[type=text]').removeClass('hidden').focus();
                } else {
                    $(_selector).siblings('input[type=text]').addClass('hidden').val('');
                    $(_selector).siblings('label').removeClass('hidden');
                }
            });

            $('input[name=custom_amount]').on("change keyup", function () {
                $(_selector).val($(this).val());
            });
        },

        back: function back(_selector) {
            $(_selector).on('click', function () {
                window.donationFormOwl.trigger('prev.owl.carousel');
            });
        },

        buttonToStepTwo: function buttonToStepTwo(_selector) {
            $(_selector).on('submit', function (ev) {
                ev.preventDefault();
                var form = $(this);

                if ($("input[name=amount]:checked").length == 0) {
                    return false;
                } else if ($("input[name=amount]:checked").val() == '' || parseInt($("input[name=amount]:checked").val()) < 0) {
                    return false;
                }

                var amount = $("input[name=amount]:checked").val();

                window.register = {
                    amount: amount
                };

                $("h2 span.amount", $("#donation-page-2")).text(amount);

                window.donationFormOwl.trigger('next.owl.carousel');

                return false;
            });
        },

        buttonToStepThree: function buttonToStepThree(_selector) {
            $(_selector).on('submit', function (ev) {
                ev.preventDefault();

                var form = $(this);

                window.register.name = $("input[name=name]", form).val();
                window.register.last_name = $("input[name=last_name]", form).val();
                window.register.email = $("input[name=email]", form).val();
                window.register.cpf = $("input[name=cpf]", form).val();

                var submit = $('[type=submit]', form).button('loading');

                var action = form.attr('action');

                var data = window.register;
                data._token = $('[name=_token]', form).val();

                DonationForm.clearErrors('#' + form.attr('id'));

                $.post(action, data, function (response) {
                    submit.button('reset');
                    grecaptcha.reset();
                    if (parseInt($("span.amount").first().html()) >= 1064) {

                        $("h2 span.amount", $("#donation-step-transfer")).text(window.register.amount);

                        window.donation = response.donation;
                        window.user = response.user;

                        window.donationFormOwl.trigger('to.owl.carousel', [4, 4]);
                    } else {
                        $("h2 span.amount", $("#donation-page-3")).text(window.register.amount);

                        window.donation = response.donation;
                        window.user = response.user;

                        window.donationFormOwl.trigger('next.owl.carousel');
                    }
                }).fail(function (response) {
                    submit.button('reset');
                    switch (response.status) {
                        case 422:
                            DonationForm.printErrors('#' + form.attr('id'), response.responseJSON);
                            break;
                        case 500:
                            alert('Houve um problema inesperado. Por favor tente novamente mais tarde.');
                            break;
                    };

                    //console.log(response);

                    //PRINT ERRORS
                });

                return false;
            });
        },

        buttonToStepFour: function buttonToStepFour(_selector) {
            $(_selector).on('submit', function (ev) {
                ev.preventDefault;

                var form = $(this);

                var action = form.attr('action');
                var data = {
                    _token: $('[name=_token]').val(),
                    donation_id: window.donation.id,
                    amount: window.donation.amount,
                    user_id: window.user.id,
                    payment_type: $('[name=payment_type]:checked', form).val(),
                    first_name: $('[name=first_name]', form).val(),
                    last_name: $('[name=last_name]', form).val(),

                    //Credit or Debit Card
                    card_number: $('[name=card_number]', form).val().replace(/\s+/g, ''),
                    holder: $('[name=holder]', form).val(),
                    expiration_date: $('[name=expiration_date]', form).val(),
                    security_code: $('[name=security_code]', form).val(),
                    card_brand: $('[name=card_brand]', form).val()
                };
                data['g-recaptcha-response'] = grecaptcha.getResponse();

                var submit = $('[type=submit]', form).button('loading');

                DonationForm.clearErrors('#' + form.attr('id'));

                $.post(action, data, function (response) {
                    submit.button('reset');

                    if ($('[name=payment_type]:checked').val() == "Boleto") {
                        $('#boleto-btn-link').attr('href', response.donation.provider_url);
                        window.donationFormOwl.trigger('to.owl.carousel', [5, 5]);
                    } else window.donationFormOwl.trigger('next.owl.carousel');
                }).fail(function (response) {
                    submit.button('reset');

                    switch (response.status) {
                        case 422:
                            if (response.responseJSON.global) {
                                var errors = {};
                                $.extend(errors, response.responseJSON.errors);
                                errors.global = [response.responseJSON.global];
                                DonationForm.printErrors('#' + form.attr('id'), errors);
                            } else {
                                DonationForm.printErrors('#' + form.attr('id'), response.responseJSON);
                            }
                            break;
                        case 500:
                            alert('Houve um problema inesperado. Por favor tente novamente mais tarde.');
                            break;
                    };

                    //console.log(response);
                    //PRINT ERRORS
                });

                return false;
            });
        },

        clearErrors: function clearErrors(_selector) {
            var form = $(_selector);
            $('.alert.alert-danger', form).addClass('hidden');
            window.donationFormOwl.trigger('refresh.owl.carousel');
        },

        printErrors: function printErrors(_selector, errors) {
            var form = $(_selector);
            $('.alert.alert-danger', form).addClass('hidden');
            $.each(errors, function (key, value) {
                $('.alert.alert-danger[data-target=' + key + ']', form).removeClass('hidden').text(value[0]);
            });
            window.donationFormOwl.trigger('refresh.owl.carousel');
        },

        changeCardBrand: function changeCardBrand(_selector) {
            $(_selector).on('change keyup', function (ev) {
                var value = $(this).val().replace(/\s+/g, '');
                var input_card_brand = $('[name=card_brand]', $(this).parents('form'));

                if (value.match('^4[0-9]{12}(?:[0-9]{3})?$')) {
                    //Visa
                    input_card_brand.val('Visa');
                } else if (value.match('^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$')) {
                    //MasterCard
                    input_card_brand.val('Master');
                } else if (value.match(/^(5078\d{2})(\d{2})(\d{11})$/)) {
                    //Aura
                    input_card_brand.val('Aura');
                } else if (value.match('^3[47][0-9]{13}$')) {
                    //Amex
                    input_card_brand.val('Amex');
                } else if (value.match('^3(?:0[0-5]|[68][0-9])[0-9]{11}$')) {
                    //Diners Club
                    input_card_brand.val('Diners');
                } else if (value.match(/^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/)) {
                    //Elo
                    input_card_brand.val('Elo');
                } else if (value.match('^6(?:011|5[0-9]{2})[0-9]{12}$')) {
                    //Discover
                    input_card_brand.val('Discover');
                } else if (value.match('^(?:2131|1800|35\d{3})\d{11}$')) {
                    //JCB
                    input_card_brand.val('Jcb');
                }
            });
        }
    };
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);