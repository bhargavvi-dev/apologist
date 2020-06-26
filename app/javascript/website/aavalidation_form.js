$(function(){

  I18n.locale = document.documentElement.lang;
  $.fn.datepicker.defaults.language = I18n.locale;

  // $('#selling-commission-housing-form').formValidation({
  //   message: '',
  //   excluded: [],
  //   fields: {
  //     agent_office_commission_selling_housing_company_attributes_name: {
  //       selector: "#agent_office_commission_selling_housing_company_attributes_name",
  //       validators: {
  //           notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
  //       }
  //     },
  //     superintendent_office_name: {
  //       selector: "#superintendent_office_name",
  //       validators: {
  //           notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
  //       }
  //     }
  //   }
  // });

  // $('#registerNewSuperintendentModal').on('shown.bs.modal', function () {
  //   $(this).find('form').formValidation('destroy').formValidation({
  //     framework: 'bootstrap',
  //     fields: {
  //       register_superintendent_office_name: {
  //         selector: "#register_superintendent_office_name",
  //         validators: {
  //             notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
  //         }
  //       }
  //     }
  //   })
  // });

  // user form validation
  $('#responsible-person-form, #office_manager-form, #executive-form, #agent-form, #director-form, #network_partner-form').formValidation({
    framework: 'bootstrap',
    fields: {
      user_first_name: {
        selector: "#user_first_name",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      },
      user_last_name: {
        selector: "#user_last_name",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      },
      user_email: {
        selector: "#user_email",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      }
    }
  });


  // customer form validation
  $('#lead-reassigner-form').formValidation({
    framework: 'bootstrap',
    fields: {
      customer_first_name: {
        selector: "#customer_first_name",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      },
      customer_last_name: {
        selector: "#customer_last_name",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      },
      customer_email: {
        selector: "#customer_email",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      }
    }
  });  

  $('#register-responsible-person').formValidation({
    framework: 'bootstrap',
    fields: {
      responsible_first_name: {
        selector: "#responsible_first_name",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      },
      responsible_last_name: {
        selector: "#responsible_last_name",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      },            
      responsible_email: {
        selector: "#responsible_email",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      }      
    }
  });  


  //office form validation
  $('#office-form').formValidation({
    framework: 'bootstrap',
    fields: {
      office_office_name: {
        selector: "#office_office_name",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      },
      office_company_id: {
        selector: "#office_company_id",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      },
      office_company_name: {
        selector: "#office_company_name",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      },
      office_email: {
        selector: "#office_email",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      }      
    }
  });

  //login form
  $('#login-form').formValidation({
    framework: 'bootstrap',
    fields: {
      user_email: {
        selector: "#user_email",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      },
      user_password: {
        selector: "#user_password",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      }
    }
  });  

  //forgot password form
  $('#forgotPass-form').formValidation({
    framework: 'bootstrap',
    fields: {
      user_email: {
        selector: "#user_email",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      }
    }
  });    

  //change password form
  $('#changePass-form').formValidation({
    framework: 'bootstrap',
    fields: {
      user_password: {
        selector: "#user_password",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      },
      user_password_confirmation: {
        selector: "#user_password_confirmation",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      }      
    }
  });      

  //order_remax_email_form
  $('#order_remax_email_form').formValidation({
    framework: 'bootstrap',
    fields: {
      input_recipient_email: {
        selector: "#input_recipient_email",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      },
      subject: {
        selector: "#subject",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      },
      message: {
        selector: "#message",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      }      
    }
  });  

  //send_login_info_email_form
  $('#send_login_info_email_form').formValidation({
    framework: 'bootstrap',
    fields: {
      recipient_email: {
        selector: "#recipient_email",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      },
      subject: {
        selector: "#subject",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      },
      message: {
        selector: "#message",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      }      
    }
  });    

  // message

  // send feedback email form
  $('#send_feedback_email_form')
    .formValidation({
      framework: 'bootstrap',
      fields: {
        feedback_message: {
          selector: "#feedback_message",
          validators: {
              notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
          }
        }      
      }
    }).on('success.form.fv', function(e) {
      // Prevent form submission
      e.preventDefault();

      // Some instances you can use are
      var $form = $(e.target),        // The form instance
          fv    = $(e.target).data('formValidation'); // FormValidation instance

      // Do whatever you want here ...
    });

  // register new customer-from
  $('#register-customer-form').formValidation({
    framework: 'bootstrap',
    fields: {
      customer_first_name: {
        selector: "#customer_first_name",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      },
      customer_last_name: {
        selector: "#customer_last_name",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      },
      customer_email: {
        selector: "#customer_email",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      },      
    }
  });

  $('#register-inspector').formValidation({
    framework: 'bootstrap',
    fields: {
      inspector_first_name: {
        selector: "#inspector_first_name",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      },
      inspector_last_name: {
        selector: "#inspector_last_name",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      },            
      inspector_email: {
        selector: "#inspector_email",
        validators: {
            notEmpty: {message: I18n.t("js.general.task.mandatory_field")}
        }
      }      
    }
  });
});
