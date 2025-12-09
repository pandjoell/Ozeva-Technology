<?php
$id = wp_unique_id( 'bssbSocialShare-' );
extract( $attributes );

wp_enqueue_script( 'goodshare' );
wp_set_script_translations( 'bssb-social-share-view-script', 'social-share', BSSB_DIR_PATH . 'languages' );
?>

<div <?php echo get_block_wrapper_attributes();?> id='<?php echo esc_attr( $id ) ?>' data-attributes='<?php echo esc_attr( wp_json_encode( $attributes ) ); ?>'>
	<div class='bssbStyle'></div>

	<ul class='bssbSocialShare'>
		<?php foreach ( $socials as $index => $social ) {
			extract( $social );
			$upIconUrl = $upIcon['url'];
			$upIconAlt = $upIcon['alt'];
			$iconClass = $icon['class'];

			$upIconEl = !empty( $upIconUrl ) ? "<img src='$upIconUrl' alt='$upIconAlt' />" : '';
			$iconEl = !empty( $iconClass ) ? "<i class='$iconClass'></i>" : '';
			$filterIconEl = $isUpIcon ? $upIconEl : $iconEl; ?>

			<li class='icon icon-<?php echo esc_attr( $index ); ?>' data-social='<?php echo esc_attr( $network ); ?>'>
				<?php echo wp_kses_post( $filterIconEl ); ?>
			</il>
		<?php } ?>
	</ul>
</div>