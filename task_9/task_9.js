$(document).ready(function () {

    const formStructure = [
        { type: "text", label: "Name", id: "name" },
        { type: "email", label: "Email", id: "email" },
        { type: "password", label: "Password", id: "password" },
        {
            type: "select",
            label: "Country",
            id: "country",
            options: ["Select", "USA", "India", "UK"]
        },
        {
            type: "select",
            label: "Role",
            id: "role",
            options: ["Select", "Student", "Employee"]
        }
    ];

    buildForm();


    function buildForm() {

        formStructure.forEach(field => {

            let div = $("<div>").addClass("form-group");
            div.append(`<label>${field.label}</label>`);

            if (field.type === "select") {

                let select = $("<select>").attr("id", field.id);

                field.options.forEach(option => {
                    select.append(`<option value="${option}">${option}</option>`);
                });

                div.append(select);

            } else {
                div.append(`<input type="${field.type}" id="${field.id}">`);
            }

            div.append(`<div class="error" id="${field.id}Error"></div>`);

            $("#dynamicForm").append(div);
        });

        $("#dynamicForm").append('<div id="dynamicFields"></div>');
        $("#dynamicForm").append('<button type="submit">Submit</button>');
    }


    $("#dynamicForm").on("change", "#country", function () {

        $("#stateContainer").remove();

        if ($(this).val() === "USA") {

            let div = $('<div class="form-group" id="stateContainer">');
            div.append('<label>State</label>');

            let select = $('<select id="state">');
            select.append('<option value="Select">Select</option>');
            select.append('<option value="California">California</option>');
            select.append('<option value="Texas">Texas</option>');
            select.append('<option value="New York">New York</option>');

            div.append(select);
            div.append('<div class="error" id="stateError"></div>');

            $("#dynamicFields").append(div);
        }
    });


    $("#dynamicForm").on("change", "#role", function () {

        $("#extraFieldContainer").remove();

        let role = $(this).val();

        if (role === "Student") {

            let div = $('<div class="form-group" id="extraFieldContainer">');
            div.append('<label>College Name</label>');
            div.append('<input type="text" id="college">');
            div.append('<div class="error" id="collegeError"></div>');

            $("#dynamicFields").append(div);

        } else if (role === "Employee") {

            let div = $('<div class="form-group" id="extraFieldContainer">');
            div.append('<label>Company Name</label>');
            div.append('<input type="text" id="company">');
            div.append('<div class="error" id="companyError"></div>');

            $("#dynamicFields").append(div);
        }
    });

    $("#dynamicForm").on("submit", function (e) {

        e.preventDefault();
        $(".error").text("");
        let isValid = true;

        if ($("#name").val().trim() === "") {
            $("#nameError").text("Name is required");
            isValid = false;
        }

        let email = $("#email").val().trim();
        if (email === "" || !email.includes("@")) {
            $("#emailError").text("Valid email required");
            isValid = false;
        }

        if ($("#password").val().length < 6) {
            $("#passwordError").text("Password must be at least 6 characters");
            isValid = false;
        }

        if ($("#country").val() === "Select") {
            $("#countryError").text("Select country");
            isValid = false;
        }

        if ($("#country").val() === "USA" && $("#state").val() === "Select") {
            $("#stateError").text("Select state");
            isValid = false;
        }

        if ($("#role").val() === "Student" && $("#college").val()?.trim() === "") {
            $("#collegeError").text("College required");
            isValid = false;
        }

        if ($("#role").val() === "Employee" && $("#company").val()?.trim() === "") {
            $("#companyError").text("Company required");
            isValid = false;
        }

        if (isValid) {
            alert("Form submitted successfully!");
        }

    });

});