$(function () {
    window.setTimeout(function () {
        $("#splash").fadeOut();
    }, 5000);

    var looping = true;
    //Confession Form Page
    if ($("#confession-form").length > 0) {
        
        var x = document.getElementById("myBtn");
        //Init character count
        $(".character-count").html(characterCount(""));
        //Form Submit
        $("#confession-form").on("submit", function (event) {
            event.preventDefault();
            
            var confessionText = $("textarea", $(this)).val();
            $.ajax({
                url: "/ajax/postConfession.php?confession=" + confessionText,
                method: "POST",
                success: function (response) {
                    var jsonResponse = JSON.parse(response);

                    //Check to see if was accepted
                    if (jsonResponse.success) {
                        proceedToConfessions();
                        
                    } else {
                        console.log(jsonResponse.message);
                    }

                },
                error: function (error) {
                    console.error(error);
                }
            })
        });

        //Skip confession
        $("#skip").on("click", function() {
            proceedToConfessions();
        })

        function proceedToConfessions() {
            $("#confession-form").fadeOut("slow");

            //Continue the video
            console.log("Looping");
            looping = false;
            //this.removeEventListener("timeupdate", pausing_function);

            //Fades out confessions for fly through.
            document.querySelectorAll(".confession-item")
                .forEach(function (el) {
                    var insideEl = el.querySelector('a-text')
                    insideEl.setAttribute('animation__2', 'to: 0');

                });
            
            document.getElementById('instructions__text').setAttribute('animation', 'to: 0');
            document.getElementById('instructions__mouse').setAttribute('animation', 'to: 0');
            document.getElementById('instructions__wait').setAttribute('animation', 'to: 1');
        }

        //Character limit
        document.querySelector(".confession__input")
            .addEventListener("input", function (event) {
                var _this = this;

                if (event.target.value.length >= 250) {
                    $("#wordLimitError").fadeIn("slow");
                } else {
                    $("#wordLimitError").fadeOut("slow");
                }

                $(".character-count").html(characterCount(event.target.value));
            });

    
                    //Focusing on text box
        $(".confession__input").on("focus", function () {
            $(".home-page").addClass("focus");
        })

        var isLoaded = false;
        document.addEventListener("click", function () {
            if (isLoaded == false) {
            
//                start.setAttribute('geometry', {
//                        height: 0, 
//                        width: 0
//                });
                  
                var videoEl = document.querySelector('#video');
                videoEl.play();

                var el1 = document.querySelector('#textt');
                el1.setAttribute('visible', 'false');
                
                var cam1 = document.querySelector('#camera');
                cam1.setAttribute('animation', 'to: 0 360 0');
                
                var x = document.getElementById("audio_1"); 
                x.play(); 
                  
                isLoaded = true;
            }
        })
        
     //Video Time to pause
        var pausing_function = function () {
            var video = document.getElementById("video");
            if (video.currentTime >= 25) {
                
                //Shows confessions and animates in
                document.querySelectorAll(".confession-item") 
                    .forEach(function (el) {
                    el.setAttribute('visible', 'true');
                    
                    var insideEl = el.querySelector('a-text')
                    insideEl.setAttribute('animation__2', 'to: 1');
                
                });
            
                document.getElementById('vis').style.visibility = 'visible';
                
                document.getElementById('instructions').setAttribute('visible', 'true');
                document.getElementById('instructions__text').setAttribute('animation', 'to: 1');
                document.getElementById('instructions__mouse').setAttribute('animation', 'to: 1');
                
                placeholder();

                this.removeEventListener("timeupdate", pausing_function);
            }
              
        };
        video.addEventListener("timeupdate", pausing_function);
        
        //load More confessions
        var load_function = function () {
            var video = document.getElementById("video");
            if (video.currentTime >= 70) {
                
                    $(".home-page").fadeOut("slow", function () {
                        window.location.href = "/confessions";
                    });
                
                this.removeEventListener("timeupdate", load_function);
            }
        };
        video.addEventListener("timeupdate", load_function);

        //Video end loop
        var loop_function = function () {
            var video = document.getElementById("video");
            if (video.currentTime >= 38.29) {
                if (looping){
                    console.log("Looping");
                    video.currentTime = 0;
                    video.play();
                }
                
                if (looping==false){
                    console.log("Wahoo");
        
                    document.querySelectorAll(".confession-item") 
                    .forEach(function (el) {      
                    //el.setAttribute('visible', 'false');
                    var insideEl = el.querySelector('a-text')
                    insideEl.setAttribute('animation__2', 'to: 0');
                
                    });
                    document.getElementById('instructions__text').setAttribute('animation', 'to: 0');
                    document.getElementById('instructions__mouse').setAttribute('visible', 'false');
                    document.getElementById('instructions__text').setAttribute('animation', 'to: 0');
                    document.getElementById('instructions__mouse').setAttribute('visible', 'false');
                    
                }
            }
        };
        video.addEventListener("timeupdate", loop_function);

        //Placeholder text animation
        var ph = "I confess that...",
            searchBar = $('.confession__input'),
            // placeholder loop counter
            phCount = 0

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
            $(searchBar).attr("placeholder", "");
            printLetter(ph, searchBar);
        }

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

function characterCount(input, limit = 250) {
    var charCount = input.length;

    return charCount.toString() + "/" + limit.toString();
}

function printResponse(success, message) {
    if (success) {
        $("#response").html(message);
    } else {
        $("#response").html(message);
    }
}

function textAreaAdjust(o) {
    o.style.height = "1px";
    o.style.height = (o.scrollHeight)+"px";
  }

function play_1() {
    var audio = document.getElementById("audio_1");
    audio.play();
}


