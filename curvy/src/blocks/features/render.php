<?php


$block_wrapper_attributes = get_block_wrapper_attributes();
?>

<div <?php echo $block_wrapper_attributes; ?>>
	<?php echo $content;  ?>
</div>