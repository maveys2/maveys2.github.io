$(document).ready(function() {
    var current_frame = -1;
    var chapter_one = [];
    var click_disabled = false;
    var quit_typed_text = false;

    /* Frame object - need to seperate scene frame and choice frame into different objects */
    function Frame() {
        bg = null;
        is_choice = false;
        choice_one = null;
        choice_two = null;
        choice_three = null;
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
        $("#speaker_text").empty();
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
            $("#textarea").click(function() {
                if (click_disabled == true) return;
                quit_typed_text = true;
                next_frame();
            });

            /* CHOICE OPTIONS */
            if (frame.is_choice) {
                click_disabled = true;
                $(".text").hover(function(){
                    $(this).css("background-color", "gray");
                    }, function(){
                    $(this).css("background-color", "transparent");
                });
                $(".text").css({
                    "cursor": "pointer"
                })
                $("#textarea").css({"cursor": "default"});
                if (frame.choice_one != null) {
                    document.getElementById('text_one').innerHTML = frame.choice_one;
                    $("#text_one").click(function() {
                        click_disabled = false;
                        next_frame();
                    });
                }
                if (frame.choice_two != null) {
                    document.getElementById('text_two').innerHTML = frame.choice_two;
                    $("#text_two").click(function() {
                        click_disabled = false;
                        next_frame();
                    });
                }
                if (frame.choice_three != null) {
                    document.getElementById('text_three').innerHTML = frame.choice_three;
                    $("#text_three").click(function() {
                        click_disabled = false;
                        next_frame();
                    });
                }
            } else {
                var speaker_div = document.getElementById('speaker_text');
                speaker_div.innerHTML = frame.speaker_name
                click_disabled = true;


                typed_text("#text_one", frame.text_one, 0, 20).then(function() {
                    if (frame.text_two == null) return;
                    return typed_text("#text_two", frame.text_two, 0, 20);
                }).then(function() {
                    if (frame.text_three == null) return;
                    quit_typed_text = false;
                    return typed_text("#text_three", frame.text_three, 0, 20);
                }).then(function() {
                    click_disabled = false;
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
        document.getElementById('textarea').removeAttribute('click')
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
    ch1f1.bg = "./bg (49).jpg";
    ch1f1.left_idol = "./nico (1).png";
    ch1f1.middle_idol = "./maki (1).png";
    ch1f1.right_idol = "./nozomi (1).png";
    ch1f1.speaker_name = "Maki";
    ch1f1.speaker_pos = "middle";
    ch1f1.text_one = "Class is starting soon, did you need something?";
    chapter_one.push(ch1f1);

    var ch1f2 = new Frame();
    ch1f2.left_idol = "./nico (1).png";
    ch1f2.middle_idol = "./maki (10).png";
    ch1f2.right_idol = "./nozomi (1).png";
    ch1f2.speaker_name = "Nozomi";
    ch1f2.speaker_pos = "right";
    ch1f2.text_one = "Don't worry, Maki may not seem like it, but she's really nervous.";
    ch1f2.text_two = "She was really excited about talking with you.";
    chapter_one.push(ch1f2);

    var ch1f3 = new Frame();
    ch1f3.left_idol = "./nico (1).png";
    ch1f3.middle_idol = "./maki (13).png";
    ch1f3.right_idol = "./nozomi (1).png";
    ch1f3.speaker_name = "Maki";
    ch1f3.speaker_pos = "middle";
    ch1f3.text_one = "Whahh, I am not!";
    ch1f3.text_two = "Anyways, if you don't need anything I need to head to class.";
    chapter_one.push(ch1f3);

    var ch1f4 = new Frame();
    ch1f4.left_idol = "./nico (1).png";
    ch1f4.middle_idol = "./maki (13).png";
    ch1f4.right_idol = "./nozomi (1).png";
    ch1f4.speaker_pos = "middle"
    ch1f4.is_choice = true;
    ch1f4.choice_one = "I was wondering if you wanted to eat lunch together.";
    ch1f4.choice_two = "Are you busy after school?";
    ch1f4.choice_three = "Oh nevermind, sorry I wasted your time.";
    chapter_one.push(ch1f4);

    var ch1f5 = new Frame();
    ch1f5.left_idol = "./nico (3).png";
    ch1f5.middle_idol = "./maki (10).png";
    ch1f5.right_idol = "./nozomi (1).png";
    ch1f5.speaker_pos = "middle"
    ch1f5.speaker_name = "Maki";
    ch1f5.text_one = "Ehh?! Why... Why are you asking that now?";
    ch1f5.text_two = "Nico and Nozomi are here!";
    ch1f5.text_three = "And I have practice anyways after school.";
    chapter_one.push(ch1f5);

    var ch1f6 = new Frame();
    ch1f6.left_idol = "./nico (5).png";
    ch1f6.middle_idol = "./maki (11).png";
    ch1f6.right_idol = "./nozomi (1).png";
    ch1f6.speaker_pos = "right"
    ch1f6.speaker_name = "Nozomi";
    ch1f6.text_one = "Maki, you work so hard, it's okay to take a break once in a while";
    ch1f6.text_two = "I don't think Nico minds either.";
    chapter_one.push(ch1f6);

    next_frame();
});
