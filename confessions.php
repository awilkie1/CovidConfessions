<?php
/**
 * Created by PhpStorm.
 * User: LucW
 * Date: 24/04/2020
 * Time: 16:29
 */

include("includes/header.php");
?>

<audio id="audio_2" loop src="../audio/background.mp3"></audio>

<div class="confessions-page__back-btn">
    <a href="/">
     <span uk-icon="icon: arrow-left; ratio: 2"></span>
     <p>Return to confess</p>
    </a>
</div> 
<div class="confessions-page__info">
    <a href="http://www.audacious.org.uk">
         <span uk-icon="icon: info; ratio: 2"></span>
         <p>Find Out More</p>
    </a>
</div>
<div class="confessionsPage" id="confessionsPage">
    <div class="confessions-page__wrapper">
        <div class="confessions-page__confession-wrapper">

        </div>
    </div>
</div>

<?php

include("includes/footer.php");
?>
   