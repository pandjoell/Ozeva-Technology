<?php
/**
 * Plugin Name: B Social Share - Block
 * Description: Share your website/website-page link to social networks and mobile messengers
 * Version: 1.0.6
 * Author: bPlugins
 * Author URI: https://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: social-share
 */

// ABS PATH
if ( !defined( 'ABSPATH' ) ) { exit; }

// Constant
define( 'BSSB_PLUGIN_VERSION', isset( $_SERVER['HTTP_HOST'] ) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.6' );
define( 'BSSB_DIR_PATH', plugin_dir_path( __FILE__ ) );
define( 'BSSB_DIR_URL', plugin_dir_url( __FILE__ ) );

if( !class_exists( 'BSSBSocialShare' ) ){
	class BSSBSocialShare{
		function __construct(){
			add_action( 'enqueue_block_assets', [$this, 'enqueueBlockAssets'] );
			add_action( 'init', [$this, 'onInit'] );
		}

		function enqueueBlockAssets(){
			wp_register_style( 'fontAwesome', BSSB_DIR_URL . 'assets/css/font-awesome.min.css', [], '6.4.2' );
			wp_register_script( 'goodshare', BSSB_DIR_URL . 'assets/js/goodshare.min.js', [], BSSB_PLUGIN_VERSION, true );
		}

		function onInit() {
			register_block_type_from_metadata( __DIR__ . '/inc' );

			wp_set_script_translations( 'bssb-social-share-editor-script', 'social-share', BSSB_DIR_PATH . 'languages' );
		}
	}
	new BSSBSocialShare;
}