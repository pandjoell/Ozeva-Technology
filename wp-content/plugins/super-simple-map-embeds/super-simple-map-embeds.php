<?php
/**
 * Plugin Name: Super Simple Map Embeds
 * Description: The easiest way to embed Google Maps in WordPress - just enter an address and you're done!
 * Version: 1.0.1
 * Author: John Ward
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: super-simple-map-embeds
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

function super_simple_map_embeds_init() {
    register_block_type(__DIR__ . '/build');
}
add_action('init', 'super_simple_map_embeds_init'); 