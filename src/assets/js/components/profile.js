(function ($) {
  'use_strict';
  let doc = $(document);
  let win = $(window);


  const copyText = function(textToCopy, answerClass) {
    this.copied = false;

    // Create textarea element
    const textarea = document.createElement('textarea');
    var answer = document.querySelector(answerClass);
    // Set the value of the text
    textarea.value = textToCopy;

    // Make sure we cant change the text of the textarea
    textarea.setAttribute('readonly', '');

    // Hide the textarea off the screnn
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';

    // Add the textarea to the page
    document.body.appendChild(textarea);

    // Copy the textarea
    textarea.select();
    answer.classList.add('show');
    try {
      let successful = document.execCommand('copy');

      if(successful){
        answer.innerHTML = 'Copied!';
      } else {
        answer.innerHTML = 'Unable to copy!';
      }
      setTimeout(() => {
        answer.classList.remove('show');
      }, 1500);

      this.copied = true;
    } catch(err) {
      this.copied = false;
      answer.innerHTML = 'Unable to copy!';
      setTimeout(() => {
        answer.classList.remove('show');
      }, 1500);
    }

    textarea.remove();
  };

  function isGood(password, progressWrap) {
    let password_strength = progressWrap[0];

    //Display status.
    let strength = "<small class='progress-bar'></small>";
    strength += "<small class='progress-bar'></small>";
    strength += "<small class='progress-bar'></small>";
    strength += "<small class='progress-bar'></small>";

    //TextBox left blank.
    if (password.length === 0) {
      password_strength.innerHTML = strength;
      return;
    }

    //Regular Expressions.
    let regex = new Array();
    regex.push("[A-Z]"); //Uppercase Alphabet.
    regex.push("[a-z]"); //Lowercase Alphabet.
    regex.push("[0-9]"); //Digit.
    regex.push("[$@$!%*#?&]"); //Special Character.

    let passed = 0;

    //Validate for each Regular Expression.
    for (let i = 0; i < regex.length; i++) {
      if (new RegExp(regex[i]).test(password)) {
        passed++;
      }
    }

    //Display status.

    switch (passed) {
      case 0:
        strength = "<small class='progress-bar'></small>";
        strength += "<small class='progress-bar'></small>";
        strength += "<small class='progress-bar'></small>";
        strength += "<small class='progress-bar'></small>";
        break;
      case 1:
        strength = "<small class='progress-bar bg-danger'></small>";
        strength += "<small class='progress-bar'></small>";
        strength += "<small class='progress-bar'></small>";
        strength += "<small class='progress-bar'></small>";
        break;
      case 2:
        strength = "<small class='progress-bar bg-weak'></small>";
        strength += "<small class='progress-bar bg-weak'></small>";
        strength += "<small class='progress-bar'></small>";
        strength += "<small class='progress-bar'></small>";
        break;
      case 3:
        strength = "<small class='progress-bar bg-warning'></small>";
        strength += "<small class='progress-bar bg-warning'></small>";
        strength += "<small class='progress-bar bg-warning'></small>";
        strength += "<small class='progress-bar'></small>";
        break;
      case 4:
        strength = "<small class='progress-bar bg-success'></small>";
        strength += "<small class='progress-bar bg-success'></small>";
        strength += "<small class='progress-bar bg-success'></small>";
        strength += "<small class='progress-bar bg-success'></small>";
        break;

    }
    password_strength.innerHTML = strength;

  }

  doc.ready(function () {

    doc.on("change", ".uploadProfileInput", (e) => {
      let target = e.currentTarget,
        triggerInput = $(target),
        currentImg = triggerInput.closest(".pic-holder").find(".pic").attr("src"),
        holder = triggerInput.closest(".pic-holder"),
        wrapper = triggerInput.closest(".profile-pic-wrapper");
      wrapper.find('[role="alert"]').remove();

      let files = !!target.files ? target.files : [];

      if (!files.length || !window.FileReader) {
        return;
      }

      if ( /^image/.test(files[0].type) ) {
        // only image file
        let reader = new FileReader(); // instance of the FileReader
        reader.readAsDataURL(files[0]); // read the local file

        reader.onloadend = function () {
          console.log('this: ', this);
          holder.addClass("uploadInProgress");
          holder.find(".pic").attr("src", this.result);

          // Dummy timeout; call API or AJAX below
          setTimeout(() => {
            holder.removeClass("uploadInProgress");
            // If upload successful
            if (Math.random() < 0.9) {
              wrapper.append(
                '<div class="snackbar show" role="alert"><i class="fa fa-check-circle text-success"></i> Profile image updated successfully</div>'
              );

              // Clear input after upload
              triggerInput.val("");

              setTimeout(() => {
                wrapper.find('[role="alert"]').remove();
              }, 3000);
            } else {
              holder.find(".pic").attr("src", currentImg);
              wrapper.append(
                '<div class="snackbar show" role="alert"><i class="fa fa-times-circle text-danger"></i> There is an error while uploading! Please try again later.</div>'
              );

              // Clear input after upload
              triggerInput.val("");
              setTimeout(() => {
                wrapper.find('[role="alert"]').remove();
              }, 3000);
            }
          }, 1500);
        };
      } else {
        wrapper.append(
          '<div class="alert alert-danger d-inline-block p-2 small" role="alert">Please choose the valid image.</div>'
        );
        setTimeout(() => {
          wrapper.find('[role="alert"]').remove();
        }, 3000);
      }
    });


    doc.on('focus', 'form.profile-form input', (e) => {
      let target = e.currentTarget,
        triggerInput = $(target),
        field = triggerInput.parents('.profile-form__field'),
        label = triggerInput.closest("label");

      field.addClass('focus-field');

    });

    doc.on('focusout', 'form.profile-form input', (e) => {
      let target = e.currentTarget,
        triggerInput = $(target),
        field = triggerInput.parents('.profile-form__field'),
        label = triggerInput.closest("label");

      field.removeClass('focus-field');

    });

    doc.find('#edit-password-form [name="password"]').keyup((e) => {
      let target = e.currentTarget,
        current = $(target),
        password = current.val(),
        parent = current.parents('.profile-form__field'),
        progressWrap = parent.find('.password-progress');
      isGood(password, progressWrap);
    });

    doc.find('#edit-password-form [name="confirm-password"]').keyup((e) => {
      let target = e.currentTarget,
        current = $(target),
        confirm_password = current.val(),
        parent = current.parents('.profile-form__field'),
        progressWrap = parent.find('.password-progress'),
        errorWrap = parent.find('.error'),
        password = current.parents('form').find('[name="password"]');
      isGood(confirm_password, progressWrap);
      if (password.val() !== confirm_password) {
        errorWrap.addClass('show');
      } else {
        errorWrap.removeClass('show');
      }

    });


    doc.on('click', ".reset-button", (e) => {
      //e.preventDefault();
      let target = e.currentTarget,
        current = $(target),
        formWrap = current.parents('form'),
        progressWrap = formWrap.find('.password-progress'),
        passwords = formWrap.find('.password-field').find("input"),
        passwordsToggle = formWrap.find('.toggle-password'),
        errors = formWrap.find('.error');

      progressWrap.length > 0 && progressWrap.map((indx, el) => {
        const current = $(el);
        isGood('', current);
      });
      passwords.length > 0 && passwords.map((indx, el) => {
        const current = $(el);
        if (current.attr("type") === "text") {
          current.attr("type", "password");
        }
      });
      errors.length > 0 && errors.each( (indx, el) => {
        const current = $(el);
       current.removeClass('show');
      });
      passwordsToggle.length > 0 && passwordsToggle.each( (indx, el) => {
        const current = $(el);
       current.removeClass('show');
      });

    });
    doc.on('click', ".cancel-button", (e) => {
      e.preventDefault();
    });

    doc.on('click', ".open-edit", (e) => {
      e.preventDefault();
      let target = e.currentTarget,
        current = $(target),
        parent = current.parents('.edit-info-card'),
        currentId = current.attr('data-id');
      parent.addClass('hide');
      doc.find(`#${currentId}.edit-form`).addClass('show');
      doc.find(`#${currentId}`).on('submit', (e) => {
        e.preventDefault();
        let target = e.currentTarget,
          current = $(target);
        current.removeClass('show');
        parent.removeClass('hide');
      });
    });

    doc.on('click', ".copyButton", (e) => {
      e.preventDefault();
      let target = e.currentTarget,
        current = $(target),
        row = current.parents('.form-group-row'),
        textToCopy = row.find('.textToCopy');

      if (textToCopy.length > 0) {
        let id = textToCopy[0].id;
        let filed = document.getElementById(id);
        copyText(filed.value, '.copyResult');
      }


    });

  });



})(jQuery);
