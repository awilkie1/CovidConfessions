//Global Variables
var confessions;
var i = 0;
var limitReached = false;

//On Load
$(function () {
    if($("#confessionsPage").length > 0) {
        confession.init();
    }
})

var confession = function () {
    //Initiate Confessions Page
    var init = function () {
        confessions = _getConfessions();
        _loadConfessions(9);
        _initAudioLoop();
        
        //Scroll event
        window.onscroll = function (ev) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                _loadConfessions(6);
            }
        };
    }
    
    //Load in n amount of confessions
    var _loadConfessions = function (n) {
        var html = "";
        var limit = i + n;
        
        if (!limitReached) {
            //Concatenate HTML
            while (i < limit) {
                if (_bindData(confessions[i]) !== null) {
                    html += _bindData(confessions[i]);
                    i++;
                } else {
                    limitReached = true;
                    break;
                }
            }
            
            //Append HTML to container
            $(".confessions-page__confession-wrapper").append(html);
            
            //Fade each confession in
            $(".confession", ".confessions-page__confession-wrapper").each(function (i) {
                $(this).delay((i + 1) * 50).fadeIn();
            })
        }
        else {
            return;
        }
    }
    
    //Get Confessions data
    var _getConfessions = function () {
        var result;
        
        $.ajax({
            url: "/ajax/getConfessions.php",
            async: false,
            success: function (data) {
                result = JSON.parse(data);
            },
            error: function (error) {
                console.log(error);
            }
        });
        
        return result;
    }
    
    //Bind data to HTML
    var _bindData = function (data) {
        if (data !== undefined) {
            var template = document.getElementById('confession-template').innerHTML;
            //Compile the template
            var compiled_template = Handlebars.compile(template);
            //Render the data into the template
            var rendered = compiled_template(data);
            
            return rendered;
        } else {
            return null;
        }
    }
    
    //Lopped audio configuration
    var _initAudioLoop = function() {
        var audioCliplocation = "/audio";
        var audioClipPrefix = "confession_";
        var audioClipExt = "mp3";
        var audioClipLength = 30;
        var audioClipFiles = [];
        var audioClipIndex = Math.floor(Math.random() * audioClipLength);
        var audioClipIntervalTime = 30; //In seconds
        
        for(var i = 1; i <= audioClipLength; i++) {
            audioClipFiles.push(audioCliplocation + "/" + audioClipPrefix + i + "." + audioClipExt);
        }
        var x = document.getElementById("audio_2"); 
        x.play(); 
                  
        //Play Initial Audio Clip
        var audioPlayer = new Audio(audioClipFiles[audioClipIndex + 1]);
        audioPlayer.play();
        audioClipIndex++;
        
        window.setInterval(function() {
            audioPlayer = new Audio(audioClipFiles[(audioClipIndex % audioClipLength) + 1]);
            audioPlayer.play();
            //audioClipIndex++;
            audioClipIndex = Math.floor(Math.random() * audioClipLength);
            //console.log(audioClipIndex);
        }, audioClipIntervalTime * 1000);
    }
    
    //Return public functions
    return {
        init: init
    }
}();