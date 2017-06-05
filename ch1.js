$(document).ready(function() {
    var current_frame = -1;
    var chapter_one = [];
    var click_disabled = false;
    var quit_typed_text = false;
    var is_paused = false;
    var i = 0;
    /* Frame object */
    function Frame() {
        is_choice = false;
        bg = null;
        left_idol = null;
        middle_idol = null;
        right_idol = null;
        text_one = null;
        text_two = null;
        text_three = null;
        speaker_name = null;
        speaker_pos = null;
    }

    function clear_all_div()
    {
        $("#left").empty();
        $("#middle").empty();
        $("#right").empty();
        $("#speaker").empty();
        $("#dialog > img").remove();
        $(".text").empty();
        quit_typed_text = false;
        click_disabled = false;
    }

    function next_frame()
    {
        if (chapter_one[current_frame + 1] != null) {
            var frame = chapter_one[++current_frame];
            clear_all_div();

            if (frame.bg != null)
                $("#background").css('background-image', 'url("'+frame.bg+'")');
            if (frame.left_idol != null)
                $("#left").append('<img class="idolimg" id="left_idol" src="'+frame.left_idol+'">');
            if (frame.middle_idol != null)
                $("#middle").append('<img class="idolimg" id="middle_idol" src="'+frame.middle_idol+'">');
            if (frame.right_idol != null)
                $("#right").append('<img class="idolimg" id="right_idol" src="'+frame.right_idol+'">');

            switch (frame.speaker_pos) {
                case "left":
                    $('#'+frame.speaker_pos+"_idol").css({
                        "width": "770.56px",
                        "height": "770.75px"
                    });
                    break;
                case "middle":
                    $('#'+frame.speaker_pos+"_idol").css({
                        "width": "770.56px",
                        "height": "770.75px",
                        "margin-left": "-210px"
                    });
                    break;
                case "right":
                    $('#'+frame.speaker_pos+"_idol").css({
                        "width": "770.56px",
                        "height": "770.75px",
                        "margin-left": "-240px"
                    });
                    break;
            }
            $("#speaker").append('<img src="./assets/sprites/name.png"/>');
            $("#dialog").append('<img id="textarea" src="./assets/sprites/dialog.png"/>');

            var speaker_div = document.getElementById('speaker_text');
            speaker_div.innerHTML = frame.speaker_name
            click_disabled = true;
            is_paused = true;

            if (frame.is_choice == true) {

            } else {
                typed_text("#text_one", frame.text_one, 0, 25).then(function() {
                    if (frame.text_two == null) return;
                    return typed_text("#text_two", frame.text_two, 0, 25);
                }).then(function() {
                    if (frame.text_three == null) return;
                    return typed_text("#text_three", frame.text_three, 0, 25);
                }).then(function() {
                    click_disabled = false; // not sure this should be here
                    // all done here - perhaps this is where click_disabled = false should be?
                });
            }
        }
    }

    function typed_text(div, text, index, interval) {

        return new Promise(function(resolve) {
            var do_it = function() {
                if (quit_typed_text == true) {
                    interval = 0;
                }
                if (index < text.length) {
                    console.log('test')
                    $(div).append(text[index++]);
                    setTimeout(do_it, interval);
                } else {
                    resolve();
                }
            }
            do_it();
        });
    }

    function load_choices()
    {
        document.getElementById('background').removeAttribute('onclick');
        $(".user_choice").click(function() {
            clear_all_div();
        })
    }

    /*
    SCENE ONE
        Honoka: Welcome to Otonokizaka High School! My name's Honoka, it's very nice to meet you.
        Honoka: What's your name?
        CHOICE: Choose name:
        Yourself: My name's ____. Nice to meet you.
        Honoka: So you're _____. That's a nice name! Well class is about to start.
    */
    var ch1f1 = new Frame();
    //ch1f1.is_choice = true;
    ch1f1.bg = "./bg (49).jpg";
    ch1f1.left_idol = "./honoka (19).png";
    ch1f1.middle_idol = "./maki (1).png";
    ch1f1.right_idol = "./tmp.png";
    ch1f1.speaker_name = "Honoka";
    ch1f1.speaker_pos = "left";
    ch1f1.text_one = "Welcome to Otonokizaka High School! My name's Honoka.";
    ch1f1.text_two = "Nice to meet you!";
    ch1f1.text_three = "hello";
    chapter_one.push(ch1f1);

    var ch1f2 = new Frame();
    ch1f2.left_idol = "./honoka (19).png";
    ch1f2.middle_idol = "./maki (11).png";
    ch1f2.right_idol = "./tmp.png";
    ch1f2.speaker_name = "Maki";
    ch1f2.speaker_pos = "middle";
    ch1f2.text_one = "I'm Maki, it's nice to meet you.";
    chapter_one.push(ch1f2);

    var ch1f3 = new Frame();
    ch1f3.left_idol = "./honoka (19).png";
    ch1f3.middle_idol = "./maki (11).png";
    ch1f3.right_idol = "./tmp.png";
    ch1f3.speaker_name = "Hanamaru";
    ch1f3.speaker_pos = "right";
    ch1f3.text_one = "I'm Hanamaru, zura! Who would you like to show you around?";
    chapter_one.push(ch1f3);

    next_frame();

    $("#textarea").click(function() {
        if (click_disabled == true) return;
        quit_typed_text = true;
        next_frame();
    });
});
