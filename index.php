<?php
/**
 * Created by PhpStorm.
 * User: LucW
 * Date: 24/04/2020
 * Time: 16:20
 */
include("includes/header.php");
require_once("config.php");

$query = "SELECT text FROM confessions WHERE isSafe='1' ORDER BY RAND() LIMIT 5";
$result = $conn->query($query);

while ($row = $result->fetch_row()) {
    $rows[] = $row[0];
}

$randomConfession_1 = $conn->query("SELECT text FROM confessions WHERE isSafe='1' ORDER BY RAND() LIMIT 5")->fetch_object()->text;


mysqli_close($conn);

?>
    <audio id="audio_1" src="../audio/confessions_intro_1.mp3"></audio>

    <script>

        function fullscreen() {
            //videoEl.setAttribute('rotation', {x: 0, y: 180, z: 0});
            var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
                (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
                (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
                (document.msFullscreenElement && document.msFullscreenElement !== null);

            var docElm = document.documentElement;
            if (!isInFullScreen) {
                if (docElm.requestFullscreen) {
                    docElm.requestFullscreen();
                } else if (docElm.mozRequestFullScreen) {
                    docElm.mozRequestFullScreen();
                } else if (docElm.webkitRequestFullScreen) {
                    docElm.webkitRequestFullScreen();
                } else if (docElm.msRequestFullscreen) {
                    docElm.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        }
        
        AFRAME.registerComponent('start', {
            schema: {
              default: ''
            },
            init() {
              const start = document.querySelector('#start');
              var b = false
              this.el.addEventListener('click', () => {
              });
            }
          });
                
    </script>


    <div class="home-page">

        <div class="home-page__wrapper">
            <div id="splash">
                <h1>Confessions</h1>
                <div class="loading"></div>
                <p></p>
               <img src="images/ACE.png">
            </div>


            <a-scene loading-screen="dotsColor: blue ; backgroundColor: black; enabled: false;"
                     background="color: #FAFAFA" cursor-listener>
                

                <a-camera id="camera" rotation="0 180 0" look-controls animation="property: rotation; to:0 180 0; dur: 39000; easing: easeOutSine;"> 
                </a-camera>


                <a-assets>
                    <video id="video" preload="" loop="false" crossorigin="anonymous" playsinline=""
                           webkit-playsinline="" src="video/video.mp4">
                       <source src="video/video.mp4" type="video/mp4">
                    </video>
<!--                    <img id="ACE" src="images/ACE.png">-->
                </a-assets>
                <a-videosphere src="#video" rotation="0 270 0"></a-videosphere>
              
                <a-entity id="textt">
                    <a-text align="center" value="Welcome to our Anonymous Confessions Experience" color="white" wrap-count="25" position="0 2 -5" opacity="0"
                            animation__2="property: opacity; to: 1; dur: 3000; easing: easeInSine;"></a-text>
                    
                    <a-text  align="center" value="Click Here To Begin" color="white" position="0 0 -5" opacity="0"
                            id="start" material="opacity: 0" start
                            animation="property: position; to: 0 1 -3; dur: 3000; easing: easeInSine; loop: true; dir:alternate;"
                            animation__2="property: opacity; to: 1; dur: 3000; easing: easeInSine; loop: true; dir:alternate;">
                    </a-text>
                    
<!--                    <a-image src="#ACE" position="0 -1 -5" width="2.8" height="1"></a-image>-->
                </a-entity>
                
                <a-entity id="instructions">
                    <a-text id="instructions__text" align="center" baseline="bottom" value="This scene is interactive" color="white" wrap-count="25" position="0 -1 -6" opacity="0" 
                    animation="property: opacity; to: 0; dur: 3000; easing: easeInOutBack; loop:4; dir:alternate;"
                    ></a-text>
                    <a-text id="instructions__mouse" align="center" baseline="bottom" value="Use your mouse to explore!" color="white" wrap-count="25" position="0 -1.5 -6" opacity="0" 
                    animation="property: opacity; to: 0; dur: 3000; delay: 1000; easing: easeInOutBack; loop:4; dir:alternate;"
                    ></a-text>
                </a-entity>
                
                
                

                <?php $rotations = ["0 0 0", "0 72 0", "0 144 0", "0 216 0", "0 288 0"] ?>
                <?php $position_start = ["0 4 -5", "0 2 -5", "0 3 -5", "0 1 -5", "0 3 -5"] ?>
                <?php $position_movement = ["0 4 -5", "0 0 -5", "0 1 -5", "0 0 -5", "0 1 -5"] ?>
                <?php for ($i = 0; $i < Count($rows); $i++): ?>
                
                    <a-entity class="confession-item"  visible="false"
                              rotation="<?php echo $rotations[$i] ?>"
                              >
                            <a-text align="center" value="I confess that...  <?php echo $rows[$i]; ?>" color="#FFF"

                                geometry="primitive:plane; width: 5;" material="opacity: 0; colour: #000"
                                baseline="center" position="<?php echo $position_start[$i] ?>"; wrap-count="35"
                                animation="property: position; to: <?php echo $position_movement[$i] ?>; dur: 20000; easing: easeInSine; loop: true; dir:alternate;" 
                                opacity= "0" 
                                animation__2="property: opacity; to:0; dur: 5000; easing: easeInSine;">
                        
                        </a-text>
                    </a-entity>
                <?php endfor; ?>
            </a-scene>

            <div id="vis" style="visibility: hidden">
                
                <form id="confession-form" uk-scrollspy="cls:uk-animation-fade;">
                    <p id="instruction">Type your anonymous confession here</p>
                    <textarea onkeyup="textAreaAdjust(this)" style="overflow:hidden" type="text" maxlength="250" class="confession__input uk-textarea"></textarea>
                    <span class="character-count"></span>
                    <button value="submit" class="uk-button uk-button-default">Confess</button>
                    <button id="skip" type="button" class="uk-button uk-button-default" >I'll come back</button>
                    <p id="wordLimitError" style="color: red; display: none; width: 100%; text-align: center;">That's a
                        few too many words for us!</p>
                </form>
                
            </div>

        </div>

    </div>

<?php include("includes/footer.php") ?>