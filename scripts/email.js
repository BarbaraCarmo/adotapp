function validateForm() {
    var name =  document.getElementById('name').value;
    if (name == "") {
        document.querySelector('.status').innerHTML = "Nome não pode ficar vazio";
        return false;
    }
    var email =  document.getElementById('email').value;
    if (email == "") {
        document.querySelector('.status').innerHTML = "Email não pode ficar vazio";
        return false;
    } else {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(email)){
            document.querySelector('.status').innerHTML = "Formato do email inválido";
            return false;
        }
    }
    var subject =  document.getElementById('subject').value;
    if (subject == "") {
        document.querySelector('.status').innerHTML = "Assunto não pode ficar vazio";
        return false;
    }
    var message =  document.getElementById('message').value;
    if (message == "") {
        document.querySelector('.status').innerHTML = "Menssage não pode ficar vazia";
        return false;
    }
    document.querySelector('.status').innerHTML = "Enviando...";

    document.getElementById('status').innerHTML = "Sending...";

    formData = {
        'name': $('input[name=name]').val(),
        'email': $('input[name=email]').val(),
        'subject': $('input[name=subject]').val(),
        'message': $('textarea[name=message]').val()
    };

    $.ajax({
        url : "mail.php",
        type: "POST",
        data : formData,
        success: function(data, textStatus, jqXHR){
            $('#status').text(data.message);
            if (data.code) //If mail was sent successfully, reset the form.
            $('#contact-form').closest('form').find("input[type=text], textarea").val("");
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            $('#status').text(jqXHR);
        }
    });
}