<?php
$block_wrapper_attributes = get_block_wrapper_attributes();
?>

<div <?php echo $block_wrapper_attributes; ?>>
	<div class="gallery-thumbnails">
		<?php echo $content; ?>
	</div>
	<div>
		<img src="" alt="" class="image-preview">
	</div>
</div>