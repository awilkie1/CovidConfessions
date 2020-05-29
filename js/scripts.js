$(function () {
    //Confession Form Page
    if ($("#confession-form").length > 0) {

        //Form Submit
        $("#confession-form").on("submit", function (event) {
            event.preventDefault();

            var confessionText = $("textarea", $(this)).val();
            $.ajax({
                url: "/ajax/postConfession.php?confession=" + confessionText,
                method: "POST",
                success: function (response) {
                    $(".home-page").fadeOut("slow", function () {
                        window.location.href = "/confessions";
                    });
                },
                error: function (error) {
                    console.error(error);
                }
            })
        });

        //Focusing on text box
        $(".confession__input").on("focus", function () {
            $(".home-page").addClass("focus");
        })

        //Placeholder text animation
        var ph = "I confess that...",
            searchBar = $('.confession__input'),
            // placeholder loop counter
            phCount = 0,
            count = 0;

        // function to return random number between with min/max range
        function randDelay(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        // function to print placeholder text in a 'typing' effect
        function printLetter(string, el) {

            // split string into character seperated array
            var arr = string.split(''),
                input = el,
                // store full placeholder
                origString = string,
                // get current placeholder value
                curPlace = $(input).attr("placeholder"),
                // append next letter to current placeholder
                placeholder = curPlace + arr[phCount];

            setTimeout(function () {
                // print placeholder text
                $(input).attr("placeholder", placeholder);
                // increase loop count
                phCount++;
                // run loop until placeholder is fully printed
                if (phCount < arr.length) {
                    printLetter(origString, input);
                }
                // use random speed to simulate
                // 'human' typing
            }, randDelay(50, 90));
        }

        // function to init animation
        function placeholder() {
            if (count == 6) {
                $(searchBar).attr("placeholder", "");
                printLetter(ph, searchBar);
            }
        }

        $(".confession").fadeIn("slow", function () {
            count++;
            placeholder();
        })

    }

    //View Confession page
    if ($("#confessionsPage").length > 0) {

        $.ajax({
            url: "/ajax/getConfessions.php",
            success: function (response) {
                var JSONresponse = JSON.parse(response);
                var returnArray = splitArray(JSONresponse, 3);

                for (var i = 0; i < returnArray.length; i++) {
                    for (j = 0; j < returnArray[i].length; j++) {
                        $($(".confessionsPage__column")[i]).append("<h2>" + returnArray[i][j]) + "</h2>";
                    }
                }

                $("#confessionsPage").fadeIn("slow");

            },
            error: function (error) {
                console.log(error);
            }
        })
    }
});

function splitArray(Array, chunk_size) {
    var arrayLength = Array.length;
    var returnArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
        myChunk = Array.slice(index, index + chunk_size);
        returnArray.push(myChunk);
    }

    return returnArray;
}

function printResponse(success, message) {
    if (success) {
        $("#response").html(message);
    } else {
        $("#response").html(message);
    }
}
  function play_1() {
        var audio = document.getElementById("audio_1");
        audio.play();
      }
     function play_2() {
        var audio = document.getElementById("audio_2");
        audio.play();
      }
     function play_3() {
        var audio = document.getElementById("audio_3");
        audio.play();
      }
     function play_4() {
        var audio = document.getElementById("audio_4");
        audio.play();
      }
     function play_5() {
        var audio = document.getElementById("audio_5");
        audio.play();
      }
     function play_6() {
        var audio = document.getElementById("audio_6");
        audio.play();
      }