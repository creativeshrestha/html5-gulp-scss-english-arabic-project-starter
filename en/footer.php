<footer>

</footer>
<!--<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>-->
<script>window.jQuery || document.write('<script src="../js/jquery-1.11.2.min.js"><\/script>')</script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

<script src="../js/jquery.fittext.js"></script>
<script src="../js/dropzone.js"></script>
<script src="../js/jquery.popupoverlay.js"></script>
<script src="../js/owl.carousel.min.js"></script>
<script src="../js/parsley.min.js"></script>
<script src="../js/main.js"></script>

<script type="text/javascript">
  $('#form').parsley();
</script>

<script type="application/javascript">
	jQuery(document).ready( function(){
		//language switch
		var path = window.location.href;
		var page = location.href.split("/").slice(-1);
		jQuery('a#lang_switch').attr('href', '../ar/'+page);
		//document.getElementById('lang_switch').setAttribute('href', '');
	});
</script>