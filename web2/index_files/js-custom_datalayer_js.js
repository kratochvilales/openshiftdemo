
;(function () {
  window.dataLayer = window.dataLayer || [];
  window.DY = window.DY || {};

  window.customDatalayer = {
    FORM: {
      field: function (evt, formName) {
        if (!evt || !formName) {
          return null;
        }
        const field_ = (evt.target || evt).name;
        if (field_) {
          pushData(formName + '_field', {
            field: field_
          });
        }
      },

      form_result: function(formEvent, data) {
        if (!formEvent) {
          return null;
        }
        pushData(formEvent, (typeof data === 'object' ? data : null ));
      },

      
      // pushData('registration_emailConfirmation');

      field_error: function (evt, formName, error) {
        if (!evt || !formName) {
          return null;
        }
        const field_ = (evt.target || evt).name;
        if (field_ && error) {
          pushData(formName +  '_FailedField', {
            field: field_,
            error: error
          }); 
        }
      },
      
      form_errors: function(errors, formName) {
        if (!formName) {
          return null;
        }
        let errors_ = [];
        for(let i = 0, l = errors.length; i < l; i++) {
          errors_.push({
            field: errors[i].field,
            error: errors[i].text
          })
        }
        pushData(formName + '_formSentErrors', {
          errors: errors_
        });
      },
      // registration_mobileConfirmation
      // {
      //  accountNumber: regmobconEv.detail.accountNumber,
      //  userName: regmobconEv.detail.userName
      //  }
    },
    LOGIN: {
      success: function (userData) {
        handlerWithData('login_success', userData); 
      },
      failed: function () {
        pushData('login_failed'); 
      },
      logout: function (userData) {
        handlerWithData('logout_success', userData); 
      }
    },
    DEPOSIT: {
      success: function (data) {
        handlerWithData('deposit_success', data); 
      },
      failed: function (data) {
        handlerWithData('deposit_failed', data); 
      }
    },
    USER: {
      verify: function(section, data) {
        handlerWithData(section, data);
      }
    },
    BETSLIP: {
      addTo: function (data) {
        handlerWithData('betslip_addTo', data);
      },
      accepted: function (data) {
        handlerWithData('betslip_complete', data);
      }
    }

  };

  /**
   * Boilerplate 
   * @param  {[type]} section [description]
   * @param  {[type]} data    [description]
   * @return {[type]}         [description]
   */
  function handlerWithData (section, data) {
    if (section && data) {
      pushData(section, data);
    }
  }

  function pushData (eventName, data) {
    let payload_ = {};
    if (typeof data === 'object') {
      payload_.data = data
    }

    // GA DataLayer
    if (typeof dataLayer.push === 'function') {
      const gtmData = Object.assign({}, payload_, { event: eventName });
      dataLayer.push(gtmData);
    }

    // DY tracking
    if (typeof DY.API === 'function') {
      DY.API("event", {
         name: eventName,
         properties: data || {}
      });
    }
  }
})();
