$(function() {
    // Form Validation
    const fusername = $("#username");
    const fpassword = $("#password");
    const fcpassword = $("#cpassword");

    const isError = (e, info) => {
        e.css("border", "1px solid red");
        e.siblings(".invalid-feedback").text(info);
        e.siblings(".invalid-feedback").css("display", "block");
    }

    const isSuccess = (e) => {
        e.css("border", "1px solid green");
        e.siblings(".invalid-feedback").css("display", "none");
    };

    const checkUsername = () => {
        let valid = false;
        const username = fusername.val();
        if (username == "") {
            isError(fusername, "This field is required!");
        } else {
            isSuccess(fusername);
            valid = true;
        }
        return valid;
    };



    const checkPassword = () => {
        let valid = false;
        const password = fpassword.val();
        if (password == "") {
            isError(fpassword, "This field is required!");
        } else {
            isSuccess(fpassword);
            valid = true;
        }
        return valid;
    };

    const checkCPassword = () => {
        let valid = false;
        const cpassword = fcpassword.val();
        const password = fpassword.val();
        if (password == "") {
            isError(fcpassword, "This field is required!");
        } else if (cpassword != password ) {
            isError(fcpassword, "password invalid!")
        } else {
            isSuccess(fcpassword);
            valid = true;
        }
        return valid;
    };

    $(".form-control").blur(function(e) {
        switch(e.target.id) {
            case "username":
                checkUsername();
                break;
            case "password":
                checkPassword();
                break;
            case "cpassword":
                checkCPassword();
                break;
        };
    });

    $(".form-control").keyup(function(e) {
        switch(e.target.id) {
            case "username":
                checkUsername();
                break;
            case "password":
                checkPassword();
                break;
            case "cpassword":
                checkCPassword();
                break;
        };
    });

    $("form").submit(function(e) {
        // validate fields
        let isUsername = checkUsername(),
            isPassword = checkPassword(),
            isCPassword = checkCPassword();
        
        let isFormValid = isUsername && isPassword && isCPassword;

        // send email function if form is valid
        if (isFormValid) {
            alert("Success!");
        } else {
            // prevent the form from submitting
            e.preventDefault();
            alert("Invalid user");
        }
    });
})