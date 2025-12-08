<?php

/**
 * Plugin Name:       Advanced Posts Listing
 * Plugin URI:        https://wordpress.org/plugins/advanced-posts-listing
 * Description:       A Gutenberg block that enables site admins to add & display beautiful blog posts listing / custom post type listing on frontend with live preview in editor.
 * Requires at least: 5.5
 * Requires PHP:      7.0
 * Version:           1.0.7
 * Author:            flippercode
 * Author URI:        https://weplugins.com/
 * License:           GPLv2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       advanced-posts-listing
 * Domain Path:       /lang/
 */

if (!defined('ABSPATH')) {
    die('You are not allowed to call this page directly.');
}

if (!class_exists('Advanced_Post_Listing_Block')) {

    class Advanced_Post_Listing_Block
    {

        public function __construct()
        {
            $this->aplb_register_plugin_hooks();
        }

        function aplb_register_plugin_hooks()
        {
            add_action('init',                  [$this, 'aplb_advance_posts_listing_block_callback']);
            add_action('rest_api_init',         [$this, 'aplb_register_custom_endpoints']);
            add_action('rest_api_init',         [$this, 'aplb_register_custom_rest_fields']);
            add_action('plugins_loaded',        [$this, 'aplb_load_plugin_languages']);
            add_action('enqueue_block_editor_assets', [$this, 'aplb_get_server_side_pass']);
        }

        function aplb_load_plugin_languages()
        {

            load_plugin_textdomain('advanced-posts-listing', false, dirname(plugin_basename(__FILE__)) . '/lang');
        }

        function aplb_advance_posts_listing_block_callback()
        {
            register_block_type(__DIR__ . '/build',  array(
                'render_callback' => array($this, 'aplb_advance_post_listing_block'),
            ));
        }
        function aplb_advance_post_listing_block($attributes)
        {
            $post_type_names = strtolower($attributes['selectedCustomPostType']);

            if (strpos($post_type_names, 'pages') !== false || strpos($post_type_names, 'posts') !== false) {
                if (substr($post_type_names, -1) === 's') {
                    $post_type_names = substr($post_type_names, 0, -1);
                }
            }


            if (isset($attributes['sortBy'])) {

                switch ($attributes['sortBy']) {
                    case 'new-to-old':
                        $order   = 'DESC';
                        $orderby = 'date';
                        break;
                    case 'old-to-new':
                        $order   = 'ASC';
                        $orderby = 'date';
                        break;
                    case 'A-Z':
                        $order   = 'ASC';
                        $orderby = 'title';
                        break;
                    case 'Z-A':
                        $order   = 'DESC';
                        $orderby = 'title';
                        break;
                    default:
                        $order   = 'DESC';
                        $orderby = 'date';
                        break;
                }
            } else {
                $orderby = 'date';
                $order = 'DESC';
            }

            $post_ids_to_remove = $attributes['RemoveCommaSeparatedIds'] ?? [];
            $post_ids_to_show = $attributes['commaSeparatedIds'] ?? [];

            $args = array(
                'posts_per_page'      => $attributes['numPostsToShow'] ?? 10,
                'post_status'         => 'publish',
                // 'post_type'           => $post_type_names,
                // 'ignore_sticky_posts' => true,
                'order'               => $order,
                'orderby'             => $orderby,
            );
            if (!empty($post_ids_to_remove) && !empty($post_ids_to_show)) {
                $post_ids_to_show = array_diff($post_ids_to_show, $post_ids_to_remove);
                $args['post__in'] = $post_ids_to_show;
            } elseif (!empty($post_ids_to_show)) {
                $args['post__in'] = $post_ids_to_show;
            } elseif (!empty($post_ids_to_remove)) {
                $args['post__not_in'] = $post_ids_to_remove;
            }
            if (!empty($post_ids_to_show)) {
                $args['post_type'] = 'any';
            } else {
                $args['post_type'] = $post_type_names;
            }

            if (isset($attributes['customTaxonomyPosts']) && !empty($attributes['customTaxonomyPosts'])) {

                $tax_query = array(
                    'relation' => 'AND',
                );

                foreach ($attributes['customTaxonomyPosts'] as $key => $terms) {
                    if ($key === 'tags') {
                        $taxonomy = 'post_tag';
                    } elseif ($key === 'categories') {
                        $taxonomy = 'category';
                    } else {
                        $taxonomy = $key;
                    }
                    foreach ($terms as $slug) {
                        $tax_query[] = array(
                            'taxonomy' => $taxonomy,
                            'field'    => 'slug',
                            'terms'    => $slug,
                        );
                    }
                }

                $args['tax_query'] = $tax_query;
            }

            if (isset($tax_query)) {
                $args['tax_query'] = $tax_query;
            }

            $args = apply_filters('aplb_frontend_query_args', $args);
            $selectedLayout = $attributes['selectedLayout'];
            $plugin_url = plugin_dir_url(__FILE__);
            if (isset($selectedLayout) && !empty($selectedLayout)) {
                $list_items_markup = null;
                switch ($selectedLayout) {
                    case 'listing-layout':
                        $list_items_markup = $this->aplb_listing_layout($args, $attributes);
                        break;
                        case 'listing-layout-two':
                            $list_items_markup = $this->aplb_listing_layout_two($args, $attributes);
                            break;    
                    case 'grid-layout':
                        $list_items_markup = $this->aplb_grid_layout($args, $attributes);
                        break;
                    case 'overlay-layout':
                        $list_items_markup = $this->aplb_overlay_layout($args, $attributes);
                        break;
                    case 'slider-layout':
                        $list_items_markup = $this->aplb_slider_layout($args, $attributes);
                        break;
                    case 'masonry-layout':
                        $list_items_markup = $this->aplb_masonry_layout($args, $attributes);
                        break;
                    default:
                        $list_items_markup = "Invalid layout selected.";
                        break;
                }
            }

            $classes = array('wp-block-latest-posts__list');

            $wrapper_attributes = get_block_wrapper_attributes(array('class' => implode(' ', $classes)));

            return sprintf(
                '<div %1$s>%2$s</div>',
                $wrapper_attributes,
                $list_items_markup
            );
        }


        function aplb_listing_layout($args, $attributes)
        {


            $title_Manage_styling = !empty($attributes['title_Manage_styling']) ? 'true' : 'false';
            $title_font_size = !empty($attributes['title_font_size']) ? $attributes['title_font_size'] : '1.5rem';

            $Meta_Manage_styling = !empty($attributes['Meta_Manage_styling']) ? 'true' : 'false';
            $Meta_font_size = !empty($attributes['Meta_font_size']) ? $attributes['Meta_font_size'] : '0.875rem';

            $Content_Manage_styling = !empty($attributes['Content_Manage_styling']) ? 'true' : 'false';
            $Content_font_size = !empty($attributes['Content_font_size']) ? $attributes['Content_font_size'] : '1.5rem';


            $showReadMoreToggler = !empty($attributes['showReadMoreToggler']) ? 'true' : 'false';
            $css = '';

            if ($showReadMoreToggler === 'true') {
                $button_Top_bottom_Padding = !empty($attributes['button_Top_bottom_Padding']) ? $attributes['button_Top_bottom_Padding'] : '8px';
                $button_Right_Left_Padding = !empty($attributes['button_Right_Left_Padding']) ? $attributes['button_Right_Left_Padding'] : '16px';
                $ReadMoreTextColor = !empty($attributes['ReadMoreTextColor']) ? $attributes['ReadMoreTextColor'] : '#FFFFFF';
                $ReadMoreBgColor = !empty($attributes['ReadMoreBgColor']) ? $attributes['ReadMoreBgColor'] : '#000000';

                $css .= '
                .read-more-button {
                    background-color: ' . $ReadMoreBgColor . '!important;
                    color: ' . $ReadMoreTextColor . ' !important;
                    padding: ' . $button_Top_bottom_Padding . ' ' . $button_Right_Left_Padding . ' !important;
                }
                .pagination .page-numbers:hover, .pagination .page-numbers.current {
                    background-color:' . $ReadMoreBgColor . '!important;
                    color: ' . $ReadMoreTextColor . '!important;
                    border-color: ' . $ReadMoreBgColor . '!important;
                }';
            }
            $customCSS = !empty($attributes['customCSS']) ? $attributes['customCSS'] : '';


            $row_gap = isset($attributes['rowGap']) && !empty($attributes['rowGap']) ? $attributes['rowGap'] : '30px';
            $row_gap = str_replace("px", "", $row_gap);
            $row_gap .= 'px';
            if (!empty($customCSS)) {
                $css .= $customCSS;
            }
            $css .= '
            .post-container {
                margin-bottom: ' . $row_gap . ' !important; 
            }';
            $css = apply_filters('apl_listing_style', $css, $attributes);
            $custom_css = "<style>" . $css . "</style>";

            $list_items_markup = '';
            $list_items_markup .= $custom_css;
            $list_items_markup .= '<div class="listing-layout">';
            if (isset($attributes['PaginationOnToggler']) && !empty($attributes['PaginationOnToggler'])) {
                $args['paged'] = get_query_var('paged') ? get_query_var('paged') : 1;
            }
            $query = new WP_Query($args);


            if ($query->have_posts()) :
                while ($query->have_posts()) : $query->the_post();
                    $post_title = get_the_title();
                    $post_date  = get_the_date();
                    $post_permalink = get_permalink();
                    $post_author  = get_the_author();
                    $post_categories = get_the_category();
                    $category_names = array();

                    if (empty($post_categories)) {
                        $taxonomies = get_object_taxonomies(get_post(), 'names');
                        foreach ($taxonomies as $taxonomy) {
                            $terms = get_the_terms(get_the_ID(), $taxonomy);
                            if ($terms && !is_wp_error($terms)) {
                                foreach ($terms as $term) {
                                    $category_names[] = $term->name;
                                }
                            }
                        }
                    } else {
                        foreach ($post_categories as $category) {
                            $category_names[] = $category->name;
                        }
                    }

                    $category_list = implode(', ', $category_names);
                    $list_items_markup .= '<div class="post-container">';
                    $image_url = get_the_post_thumbnail_url(get_the_ID(), 'large');
                    if (!empty($image_url)) {

                        if (isset($attributes['showImgToggler']) && $attributes['showImgToggler'] == 1) {
                            if (isset($attributes['imageUrl'])) {
                                $image_url = get_the_post_thumbnail_url(get_the_ID(), 'large');

                                if (empty($attributes['selectedImageTogggler']) && empty($attributes['widthPercentageState'])) {
                                    $custom_width = isset($attributes['ImgWidth']) ? $attributes['ImgWidth'] : '';
                                    $custom_height = isset($attributes['height']) ? $attributes['height'] : '';
                                } elseif (isset($attributes['widthPercentageState']) && $attributes['widthPercentageState'] == true && empty($attributes['selectedImageTogggler'])) {
                                    $custom_width = $attributes['widthPercentage'];
                                    $custom_height = $attributes['widthPercentage'];
                                }
                            }
                            $list_items_markup .= '    <div class="image-container">';
                            if (!empty($custom_width) && !empty($custom_height)) {
                                if(wp_is_mobile()){
                                    $list_items_markup .= '<img class="block-image" src="' . esc_url($image_url) . '" >';
                                }else{
                                    $list_items_markup .= '<img class="block-image" src="' . esc_url($image_url) . '" style="max-width: ' . esc_attr($custom_width) . '; max-height: ' . esc_attr($custom_height) . ';">';
                                }
                                
                            } else {
                                $list_items_markup .= '<img class="block-image" src="' . esc_url($image_url) . '">';
                            }
                            $list_items_markup .= '    </div>';
                        }
                    }

                    if (isset($attributes['showPostTitle']) && $attributes['showPostTitle'] == 1) {
                        $list_items_markup .= '    <div class="post-title"  ';
                        if ($title_Manage_styling === 'true') {
                            $list_items_markup .= ' style="font-size:' . esc_html($title_font_size) . '"';
                        }
                        $list_items_markup .= '>';
                        $list_items_markup .= '<a href="' . esc_url($post_permalink) . '" class="title">' . esc_html($post_title) . '</a>';
                        $list_items_markup .= '    </div>';
                    }

                    if (isset($attributes['showMeta']) && $attributes['showMeta'] == 1) {
                        $list_items_markup .= '    <div class="meta-data" ';
                        if ($Meta_Manage_styling === 'true') {
                            $list_items_markup .= ' style="font-size:' . esc_html($Meta_font_size) . '"';
                        }
                        $list_items_markup .= '>';
                        $list_items_markup .= '<p>' . esc_html($post_date) . ' | Author: ' . esc_html($post_author) . ' | Categories: ' . esc_html($category_list) . '</p>';
                        $list_items_markup .= '    </div>';
                    }

                    if (isset($attributes['showContent']) && $attributes['showContent'] == 1) {
                        if (isset($attributes['contentType'])) {
                            if ($attributes['contentType'] == 'Excerpt') {
                                $words_limit = isset($attributes['wordsLimit']) ? intval($attributes['wordsLimit']) : 100;
                                $excerpt = get_the_excerpt();
                                $words = explode(' ', $excerpt);
                                $post_content = implode(' ', array_slice($words, 0, $words_limit));
                            } elseif ($attributes['contentType'] == 'Full-Post') {
                                $post_content = get_the_content();
                            }
                        }
                        $list_items_markup .= '    <div class="post-content"';
                        if ($Content_Manage_styling === 'true') {
                            $list_items_markup .= ' style="font-size: ' . esc_html($Content_font_size) . ';"';
                        }
                        $list_items_markup .= ' ><p>';
                        $list_items_markup .=      apply_filters('adv_post_content', $post_content);
                        $list_items_markup .= '    </p></div>';
                    }

                    $list_items_markup .= '    <div class="read-more-btn">';
                    $list_items_markup .= '        <a target="_blank" href="' . esc_url($post_permalink) . '" class="read-more-button"';
                    $Read_more_font_size = !empty($attributes['Read_more_font_size']) ? $attributes['Read_more_font_size'] : '1rem';

                    if ($showReadMoreToggler === 'true') {

                        $list_items_markup .= ' style="font-size:' . esc_html($Read_more_font_size) . '"';
                    }
                    $ReadMoreText = !empty($attributes['ReadMoreText']) ? $attributes['ReadMoreText'] : 'Read More';
                    $list_items_markup .= '>' . $ReadMoreText . '</a>';
                    $list_items_markup .= '    </div>';
                    $list_items_markup .= '</div>';

                endwhile;

                // Pagination

                wp_reset_postdata();

            endif;

            $list_items_markup .= '</div>';

            if (isset($attributes['PaginationOnToggler']) && !empty($attributes['PaginationOnToggler'])) {
                $pagination_args = array(
                    'total'        => $query->max_num_pages,
                    'current'      => $args['paged'],
                    'mid_size'     => 2,
                    'prev_text' => isset($attributes['prevName']) ? __($attributes['prevName']) : __('Prev'),
                    'next_text' => isset($attributes['nextName']) ? __($attributes['nextName']) : __('Next'),
                    'type'         => 'array',
                );

                $pagination_links = paginate_links($pagination_args);

                if ($pagination_links) {
                    $alignment_class = isset($attributes['paginationAline']) ? $attributes['paginationAline'] : 'center';
                    $list_items_markup .= '<nav class="pagination wep-pagination ' . esc_attr($alignment_class) . '">';

                    // Output the pagination links
                    foreach ($pagination_links as $link) {
                        $list_items_markup .= str_replace(
                            array('<a', '</a>', 'page-numbers'),
                            array('<a class="page-numbers"', '</a>', 'page-numbers'),
                            $link
                        );
                    }

                    $list_items_markup .= '</nav>';
                }
            }

            return  $list_items_markup;
        }


        function aplb_listing_layout_two($args, $attributes)
        {


            $title_Manage_styling = !empty($attributes['title_Manage_styling']) ? 'true' : 'false';
            $title_font_size = !empty($attributes['title_font_size']) ? $attributes['title_font_size'] : '1.5rem';

            $Meta_Manage_styling = !empty($attributes['Meta_Manage_styling']) ? 'true' : 'false';
            $Meta_font_size = !empty($attributes['Meta_font_size']) ? $attributes['Meta_font_size'] : '0.875rem';

            $Content_Manage_styling = !empty($attributes['Content_Manage_styling']) ? 'true' : 'false';
            $Content_font_size = !empty($attributes['Content_font_size']) ? $attributes['Content_font_size'] : '1.5rem';


            $showReadMoreToggler = !empty($attributes['showReadMoreToggler']) ? 'true' : 'false';
            $css = '';

            if ($showReadMoreToggler === 'true') {
                $button_Top_bottom_Padding = !empty($attributes['button_Top_bottom_Padding']) ? $attributes['button_Top_bottom_Padding'] : '8px';
                $button_Right_Left_Padding = !empty($attributes['button_Right_Left_Padding']) ? $attributes['button_Right_Left_Padding'] : '16px';
                $ReadMoreTextColor = !empty($attributes['ReadMoreTextColor']) ? $attributes['ReadMoreTextColor'] : '#FFFFFF';
                $ReadMoreBgColor = !empty($attributes['ReadMoreBgColor']) ? $attributes['ReadMoreBgColor'] : '#000000';

                $css .= '
                .wep-btn {
                    background-color: ' . $ReadMoreBgColor . '!important;
                    color: ' . $ReadMoreTextColor . ' !important;
                    padding: ' . $button_Top_bottom_Padding . ' ' . $button_Right_Left_Padding . ' !important;
                }
                .pagination .page-numbers:hover, .pagination .page-numbers.current {
                    background-color:' . $ReadMoreBgColor . '!important;
                    color: ' . $ReadMoreTextColor . '!important;
                    border-color: ' . $ReadMoreBgColor . '!important;
                }';
            }
            $customCSS = !empty($attributes['customCSS']) ? $attributes['customCSS'] : '';


            $row_gap = isset($attributes['rowGap']) && !empty($attributes['rowGap']) ? $attributes['rowGap'] : '30px';
            $row_gap = str_replace("px", "", $row_gap);
            $row_gap .= 'px';
            if (!empty($customCSS)) {
                $css .= $customCSS;
            }
            $css .= '
            .wep-card-text {
                margin-bottom: ' . $row_gap . ' !important; 
            }
            .listing-layout {
                gap: ' . $row_gap . ' !important; 
            }';
            $css = apply_filters('apl_listing_style', $css, $attributes);
            $custom_css = "<style>" . $css . "</style>";

            $list_items_markup = '';
            $list_items_markup .= $custom_css;
            $list_items_markup .= '<div class="wep-root"><div class="listing-layout" style="gap: 30px;">';
            if (isset($attributes['PaginationOnToggler']) && !empty($attributes['PaginationOnToggler'])) {
                $args['paged'] = get_query_var('paged') ? get_query_var('paged') : 1;
            }
            $query = new WP_Query($args);


            if ($query->have_posts()) :
                while ($query->have_posts()) : $query->the_post();
                    $post_title = get_the_title();
                    $post_date  = get_the_date();
                    $post_permalink = get_permalink();
                    $post_author  = get_the_author();
                    $post_categories = get_the_category();
                    $category_names = array();

                    if (empty($post_categories)) {
                        $taxonomies = get_object_taxonomies(get_post(), 'names');
                        foreach ($taxonomies as $taxonomy) {
                            $terms = get_the_terms(get_the_ID(), $taxonomy);
                            if ($terms && !is_wp_error($terms)) {
                                foreach ($terms as $term) {
                                    $category_names[] = $term->name;
                                }
                            }
                        }
                    } else {
                        foreach ($post_categories as $category) {
                            $category_names[] = $category->name;
                        }
                    }

                    $category_list = implode(', ', $category_names);
                    $list_items_markup .= '<div class="wep-card wep-card-horizontal">';
                    $image_url = get_the_post_thumbnail_url(get_the_ID(), 'large');
                    if (!empty($image_url)) {

                        if (isset($attributes['showImgToggler']) && $attributes['showImgToggler'] == 1) {
                            if (isset($attributes['imageUrl'])) {
                                $image_url = get_the_post_thumbnail_url(get_the_ID(), 'large');

                                if (empty($attributes['selectedImageTogggler']) && empty($attributes['widthPercentageState'])) {
                                    $custom_width = isset($attributes['ImgWidth']) ? $attributes['ImgWidth'] : '';
                                    $custom_height = isset($attributes['height']) ? $attributes['height'] : '';
                                } elseif (isset($attributes['widthPercentageState']) && $attributes['widthPercentageState'] == true && empty($attributes['selectedImageTogggler'])) {
                                    $custom_width = $attributes['widthPercentage'];
                                    $custom_height = $attributes['widthPercentage'];
                                }
                            }
                            $list_items_markup .= '    <div class="wep-card-img">';
                            if (!empty($custom_width) && !empty($custom_height)) {
                                $list_items_markup .= '<img src="' . esc_url($image_url) . '" style="max-width: ' . esc_attr($custom_width) . '; max-height: ' . esc_attr($custom_height) . ';">';
                            } else {
                                $list_items_markup .= '<img src="' . esc_url($image_url) . '">';
                            }
                            $list_items_markup .= '    </div>';
                        }
                    }
                    $list_items_markup .= '<div class="wep-card-body"><div class="wep-card-heading">';
                    if (isset($attributes['showPostTitle']) && $attributes['showPostTitle'] == 1) {
                        $list_items_markup .= '    <h4 class="wep-card-title"  ';
                        if ($title_Manage_styling === 'true') {
                            $list_items_markup .= ' style="font-size:' . esc_html($title_font_size) . '"';
                        }
                        $list_items_markup .= '>';
                        $list_items_markup .= '<a href="' . esc_url($post_permalink) . '" >' . esc_html($post_title) . '</a>';
                        $list_items_markup .= '    </h4>';
                    }

                    if (isset($attributes['showMeta']) && $attributes['showMeta'] == 1) {
                        $list_items_markup .= '    <div class="meta-data" ';
                        if ($Meta_Manage_styling === 'true') {
                            $list_items_markup .= ' style="font-size:' . esc_html($Meta_font_size) . '"';
                        }
                        $list_items_markup .= '>';
                        $list_items_markup .= esc_html($post_date) . ' | Author: ' . esc_html($post_author) . ' | Categories: ' . esc_html($category_list);
                        $list_items_markup .= '    </div>';
                    }
                    $list_items_markup .= '</div>';
                    if (isset($attributes['showContent']) && $attributes['showContent'] == 1) {
                        if (isset($attributes['contentType'])) {
                            if ($attributes['contentType'] == 'Excerpt') {
                                $words_limit = isset($attributes['wordsLimit']) ? intval($attributes['wordsLimit']) : 100;
                                $excerpt = get_the_excerpt();
                                $words = explode(' ', $excerpt);
                                $post_content = implode(' ', array_slice($words, 0, $words_limit));
                            } elseif ($attributes['contentType'] == 'Full-Post') {
                                $post_content = get_the_content();
                            }
                        }
                        $list_items_markup .= '    <div class="wep-card-text"';
                        if ($Content_Manage_styling === 'true') {
                            $list_items_markup .= ' style="font-size: ' . esc_html($Content_font_size) . ';"';
                        }
                        $list_items_markup .= ' ><p>';
                        $list_items_markup .=      apply_filters('adv_post_content', $post_content);
                        $list_items_markup .= '    </p></div>';
                    }
                    $list_items_markup .= '</div>';

                    $list_items_markup .= '    <div class="wep-card-footer">';
                    $list_items_markup .= '        <a target="_blank" href="' . esc_url($post_permalink) . '" class="wep-btn wep-btn-primary"';
                    $Read_more_font_size = !empty($attributes['Read_more_font_size']) ? $attributes['Read_more_font_size'] : '1rem';

                    if ($showReadMoreToggler === 'true') {

                        $list_items_markup .= ' style="font-size:' . esc_html($Read_more_font_size) . '"';
                    }
                    $ReadMoreText = !empty($attributes['ReadMoreText']) ? $attributes['ReadMoreText'] : 'Read More';
                    $list_items_markup .= '>' . $ReadMoreText . '</a>';
                    $list_items_markup .= '    </div>';
                    $list_items_markup .= '</div>';

                endwhile;

                // Pagination

                wp_reset_postdata();

            endif;

            $list_items_markup .= '</div></div>';

            if (isset($attributes['PaginationOnToggler']) && !empty($attributes['PaginationOnToggler'])) {
                $pagination_args = array(
                    'total'        => $query->max_num_pages,
                    'current'      => $args['paged'],
                    'mid_size'     => 2,
                    'prev_text' => isset($attributes['prevName']) ? __($attributes['prevName']) : __('Prev'),
                    'next_text' => isset($attributes['nextName']) ? __($attributes['nextName']) : __('Next'),
                    'type'         => 'array',
                );

                $pagination_links = paginate_links($pagination_args);

                if ($pagination_links) {
                    $alignment_class = isset($attributes['paginationAline']) ? $attributes['paginationAline'] : 'center';
                    $list_items_markup .= '<nav class="pagination wep-pagination ' . esc_attr($alignment_class) . '">';

                    // Output the pagination links
                    foreach ($pagination_links as $link) {
                        $list_items_markup .= str_replace(
                            array('<a', '</a>', 'page-numbers'),
                            array('<a class="page-numbers"', '</a>', 'page-numbers'),
                            $link
                        );
                    }

                    $list_items_markup .= '</nav>';
                }
            }

            return  $list_items_markup;
        }

        function aplb_grid_layout($args, $attributes)
        {

            $title_Manage_styling = !empty($attributes['title_Manage_styling']) ? 'true' : 'false';
            $title_font_size = !empty($attributes['title_font_size']) ? $attributes['title_font_size'] : '1.5rem';

            $Meta_Manage_styling = !empty($attributes['Meta_Manage_styling']) ? 'true' : 'false';
            $Meta_font_size = !empty($attributes['Meta_font_size']) ? $attributes['Meta_font_size'] : '8px';

            $Content_Manage_styling = !empty($attributes['Content_Manage_styling']) ? 'true' : 'false';
            $Content_font_size = !empty($attributes['Content_font_size']) ? $attributes['Content_font_size'] : '8px';

            $Read_more_font_size = !empty($attributes['Read_more_font_size']) ? $attributes['Read_more_font_size'] : '1rem';

            $showReadMoreToggler = !empty($attributes['showReadMoreToggler']) ? 'true' : 'false';
            $css = '';

            if ($showReadMoreToggler === 'true') {
                $button_Top_bottom_Padding = !empty($attributes['button_Top_bottom_Padding']) ? $attributes['button_Top_bottom_Padding'] : '8px';
                $button_Right_Left_Padding = !empty($attributes['button_Right_Left_Padding']) ? $attributes['button_Right_Left_Padding'] : '16px';
                $ReadMoreTextColor = !empty($attributes['ReadMoreTextColor']) ? $attributes['ReadMoreTextColor'] : '#FFFFFF';
                $ReadMoreBgColor = !empty($attributes['ReadMoreBgColor']) ? $attributes['ReadMoreBgColor'] : '#000000';

                $css .= '
                     
                .grid-layout .wep-btn {
                    padding: ' . $button_Top_bottom_Padding . ' ' . $button_Right_Left_Padding . ' !important;
                    background-color:' . $ReadMoreBgColor . '!important;
                    color: ' . $ReadMoreTextColor . '!important;
                }
                .pagination .page-numbers:hover, .pagination .page-numbers.current {
                    background-color:' . $ReadMoreBgColor . '!important;
                    color: ' . $ReadMoreTextColor . '!important;
                    border-color: ' . $ReadMoreBgColor . '!important;
                }
            
                ';
            }


            $columns = !empty($attributes['totalColoms']) ? $attributes['totalColoms'] : 3;
            $column_gap = isset($attributes['columnGap']) && !empty($attributes['columnGap']) ? $attributes['columnGap'] : '20px';
            $row_gap = isset($attributes['rowGap']) && !empty($attributes['rowGap']) ? $attributes['rowGap'] : '30px';
            $row_gap = str_replace("px", "", $row_gap);
            $row_gap .= 'px';
            $column_gap = str_replace("px", "", $column_gap);
            $column_gap .= 'px';

            $customCSS = !empty($attributes['customCSS']) ? $attributes['customCSS'] : '';
            if (!empty($customCSS)) {
                $css .= $customCSS;
            }


            $css .=  '
            .grid-layout {
                gap: ' . $row_gap . ' ' . $column_gap . ' !important; 
            }

            @media (min-width: 992px) {
                .grid-layout {
                    grid-template-columns: repeat(' . $columns . ', 1fr) !important;
                }
            }
            
            /* For very large screens */
            @media (min-width: 1200px) {
                .grid-layout {
                    grid-template-columns: repeat(' . $columns . ', 1fr) !important;
                }
            }
            ';



            $css = apply_filters('apl_grid_style', $css, $attributes);
            $custom_css = "<style>" . $css . "</style>";

            $list_items_markup = '';
            $list_items_markup .= $custom_css;
            $list_items_markup .= '<div class="wep-root" ><div class="grid-layout" >';
            if (isset($attributes['PaginationOnToggler']) && !empty($attributes['PaginationOnToggler'])) {
                $args['paged'] = get_query_var('paged') ? get_query_var('paged') : 1;
            }
            $query = new WP_Query($args);

            if ($query->have_posts()) :
                while ($query->have_posts()) : $query->the_post();
                    $post_title = get_the_title();
                    $post_date  = get_the_date();
                    $post_permalink = get_permalink();
                    $post_author  = get_the_author();
                    $post_categories = get_the_category();
                    $category_names = array();

                    if (empty($post_categories)) {
                        $taxonomies = get_object_taxonomies(get_post(), 'names');
                        foreach ($taxonomies as $taxonomy) {
                            $terms = get_the_terms(get_the_ID(), $taxonomy);
                            if ($terms && !is_wp_error($terms)) {
                                foreach ($terms as $term) {
                                    $category_names[] = $term->name;
                                }
                            }
                        }
                    } else {
                        foreach ($post_categories as $category) {
                            $category_names[] = $category->name;
                        }
                    }

                    $category_list = implode(', ', $category_names);
                    $list_items_markup .= '<div class="wep-card">';
                    if (isset($attributes['showImgToggler']) && $attributes['showImgToggler'] == 1) {
                        if (isset($attributes['imageUrl'])) {
                            $image_url = get_the_post_thumbnail_url(get_the_ID(), 'medium');

                            if (empty($attributes['selectedImageTogggler']) && empty($attributes['widthPercentageState'])) {
                                $custom_width = isset($attributes['ImgWidth']) ? $attributes['ImgWidth'] : '';
                                $custom_height = isset($attributes['height']) ? $attributes['height'] : '';
                            } elseif (isset($attributes['widthPercentageState']) && $attributes['widthPercentageState'] == true && empty($attributes['selectedImageTogggler'])) {
                                $custom_width = $attributes['widthPercentage'];
                                $custom_height = $attributes['widthPercentage'];
                            }
                        }
                        if (isset($image_url) && !empty($image_url)) {
                            $list_items_markup .= '    <div class="wep-card-img">';
                            if (!empty($custom_width) && !empty($custom_height)) {
                                $list_items_markup .= '<img src="' . esc_url($image_url) . '">';
                            } else {
                                $list_items_markup .= '<img src="' . esc_url($image_url) . '">';
                            }
                            $list_items_markup .= '        <span class="wep-chip">' . esc_html($category_list) . '</span>';
                            $list_items_markup .= '    </div>';
                        }
                    }

                    $list_items_markup .= '<div class="wep-card-body"><div class="wep-card-heading">';
                    if (isset($attributes['showPostTitle']) && $attributes['showPostTitle'] == 1) {
                        $list_items_markup .= '    <h4 class="wep-card-title"  ';
                        if ($title_Manage_styling === 'true') {
                            $list_items_markup .= ' style="font-size:' . esc_html($title_font_size) . '"';
                        }
                        $list_items_markup .= '>';
                        $list_items_markup .= ' <a href="' . esc_url($post_permalink) . '">' . esc_html($post_title) . '</a>';
                        $list_items_markup .= '    </h4>';
                    }

                    if (isset($attributes['showMeta']) && $attributes['showMeta'] == 1) {
                        $list_items_markup .= '    <div class="meta-data" ';
                        if ($Meta_Manage_styling === 'true') {
                            $list_items_markup .= ' style="font-size:' . esc_html($Meta_font_size) . '"';
                        }
                        $list_items_markup .= '>';
                        $list_items_markup .= '<p>' . esc_html($post_date) . ' | Author: ' . esc_html($post_author) . '</p>';
                        $list_items_markup .= '    </div>';
                    }
                    $list_items_markup .= '</div>';
                    if (isset($attributes['showContent']) && $attributes['showContent'] == 1) {
                        if (isset($attributes['contentType'])) {
                            if ($attributes['contentType'] == 'Excerpt') {
                                $words_limit = isset($attributes['wordsLimit']) ? intval($attributes['wordsLimit']) : 100;
                                $excerpt = get_the_excerpt();
                                $words = explode(' ', $excerpt);
                                $post_content = implode(' ', array_slice($words, 0, $words_limit));
                            } elseif ($attributes['contentType'] == 'Full-Post') {
                                $post_content = get_the_content();
                            }
                        }
                        $list_items_markup .= '    <div class="wep-card-text"';
                        if ($Content_Manage_styling === 'true') {
                            $list_items_markup .= ' style="font-size: ' . esc_html($Content_font_size) . ';"';
                        }
                        $list_items_markup .= ' ><p>';
                        $list_items_markup .=      apply_filters('adv_post_content', $post_content);
                        $list_items_markup .= '    </p></div>';
                    }
                    $list_items_markup .= '</div>';

                    $list_items_markup .= '    <div class="wep-card-footer">';
                    $list_items_markup .= '        <a target="_blank" href="' . esc_url($post_permalink) . '" class="wep-btn wep-btn-primary"';
                    if ($showReadMoreToggler === 'true') {
                        $list_items_markup .= ' style="font-size:' . esc_html($Read_more_font_size) . '"';
                    }
                    $ReadMoreText = !empty($attributes['ReadMoreText']) ? $attributes['ReadMoreText'] : 'Read More';
                    $list_items_markup .= '>' . $ReadMoreText . '</a>';
                    $list_items_markup .= '    </div>';
                    $list_items_markup .= '</div>';

                endwhile;


                wp_reset_postdata();

            endif;

            $list_items_markup .= '</div></div>';
            if (isset($attributes['PaginationOnToggler']) && !empty($attributes['PaginationOnToggler'])) {
                $pagination_args = array(
                    'total'        => $query->max_num_pages,
                    'current'      => $args['paged'],
                    'mid_size'     => 2,
                    'prev_text' => isset($attributes['prevName']) ? __($attributes['prevName']) : __('Prev'),
                    'next_text' => isset($attributes['nextName']) ? __($attributes['nextName']) : __('Next'),
                    'type'         => 'array',
                );

                $pagination_links = paginate_links($pagination_args);
                if ($pagination_links) {
                    $alignment_class = isset($attributes['paginationAline']) ? $attributes['paginationAline'] : 'center';
                    $list_items_markup .= '<nav class="pagination wep-pagination ' . esc_attr($alignment_class) . '">';

                    // Output the pagination links
                    foreach ($pagination_links as $link) {
                        $list_items_markup .= str_replace(
                            array('<a', '</a>', 'page-numbers'),
                            array('<a class="page-numbers"', '</a>', 'page-numbers'),
                            $link
                        );
                    }

                    $list_items_markup .= '</nav>';
                }
            }
            return  $list_items_markup;
        }

        function aplb_overlay_layout($args, $attributes)
        {

            $title_Manage_styling = !empty($attributes['title_Manage_styling']) ? 'true' : 'false';
            $title_font_size = !empty($attributes['title_font_size']) ? $attributes['title_font_size'] : '1.5rem';

            $Meta_Manage_styling = !empty($attributes['Meta_Manage_styling']) ? 'true' : 'false';
            $Meta_font_size = !empty($attributes['Meta_font_size']) ? $attributes['Meta_font_size'] : '8px';

            $Content_Manage_styling = !empty($attributes['Content_Manage_styling']) ? 'true' : 'false';
            $Content_font_size = !empty($attributes['Content_font_size']) ? $attributes['Content_font_size'] : '8px';

            $Read_more_font_size = !empty($attributes['Read_more_font_size']) ? $attributes['Read_more_font_size'] : '1rem';

            $showReadMoreToggler = !empty($attributes['showReadMoreToggler']) ? 'true' : 'false';
            $css = '';

            if ($showReadMoreToggler === 'true') {
                $button_Top_bottom_Padding = !empty($attributes['button_Top_bottom_Padding']) ? $attributes['button_Top_bottom_Padding'] : '8px';
                $button_Right_Left_Padding = !empty($attributes['button_Right_Left_Padding']) ? $attributes['button_Right_Left_Padding'] : '16px';
                $ReadMoreTextColor = !empty($attributes['ReadMoreTextColor']) ? $attributes['ReadMoreTextColor'] : '#FFFFFF';
                $ReadMoreBgColor = !empty($attributes['ReadMoreBgColor']) ? $attributes['ReadMoreBgColor'] : '#000000';

                $css .= '
                 .overlay-layout  .wep-btn {
            padding: ' . $button_Top_bottom_Padding . ' ' . $button_Right_Left_Padding . ' !important;

                background-color:' . $ReadMoreBgColor . '!important;
                color: ' . $ReadMoreTextColor . '!important;

            }    
                .pagination .page-numbers:hover, .pagination .page-numbers.current {
                      background-color:' . $ReadMoreBgColor . '!important;
                color: ' . $ReadMoreTextColor . '!important;
                    border-color:' . $ReadMoreBgColor . '!important;
                }
            ';
            }


            $columns = !empty($attributes['totalColoms']) ? $attributes['totalColoms'] : 3;
            $width_percentage = 100 / $columns;
            $column_gap = isset($attributes['columnGap']) && !empty($attributes['columnGap']) ? $attributes['columnGap'] : '20px';
            $row_gap = isset($attributes['rowGap']) && !empty($attributes['rowGap']) ? $attributes['rowGap'] : '30px';
            $row_gap = str_replace("px", "", $row_gap);
            $row_gap .= 'px';
            $column_gap = str_replace("px", "", $column_gap);
            $column_gap .= 'px';
            $customCSS = !empty($attributes['customCSS']) ? $attributes['customCSS'] : '';
            if (!empty($customCSS)) {
                $css .= $customCSS;
            }

            if( wp_is_mobile()){
                $css .=  '
                .overlay-layout{
                    gap: ' . $row_gap . ' ' . $column_gap . ' !important; 
                    grid-template-columns: repeat(1, 1fr);
                }';
            }else{
                $css .=  '
                .overlay-layout{
                    gap: ' . $row_gap . ' ' . $column_gap . ' !important; 
                    grid-template-columns: repeat('.$attributes["totalColoms"].', 1fr);
                }';
            }
            

            $css = apply_filters('wpl_overlay_style', $css, $attributes);
            $custom_css = "<style>" . $css . "</style>";


            $list_items_markup = '';
            $list_items_markup .= $custom_css;
            
            $list_items_markup .= '<div class="wep-root"><div class="overlay-layout">';
            if (isset($attributes['PaginationOnToggler']) && !empty($attributes['PaginationOnToggler'])) {
                $args['paged'] = get_query_var('paged') ? get_query_var('paged') : 1;
            }
            
            $query = new WP_Query($args);

            if ($query->have_posts()) :
                while ($query->have_posts()) : $query->the_post();
                    $post_title = get_the_title();
                    $post_date  = get_the_date();
                    $post_permalink = get_permalink();
                    $post_author  = get_the_author();
                    $post_categories = get_the_category();
                    $category_names = array();

                    if (empty($post_categories)) {
                        $taxonomies = get_object_taxonomies(get_post(), 'names');
                        foreach ($taxonomies as $taxonomy) {
                            $terms = get_the_terms(get_the_ID(), $taxonomy);
                            if ($terms && !is_wp_error($terms)) {
                                foreach ($terms as $term) {
                                    $category_names[] = $term->name;
                                }
                            }
                        }
                    } else {
                        foreach ($post_categories as $category) {
                            $category_names[] = $category->name;
                        }
                    }

                    $category_list = implode(', ', $category_names);
                    if (isset($attributes['showImgToggler']) && $attributes['showImgToggler'] == 1) {
                        if (isset($attributes['imageUrl'])) {
                            $image_url = get_the_post_thumbnail_url(get_the_ID(), 'medium');

                            if (empty($attributes['selectedImageTogggler']) && empty($attributes['widthPercentageState'])) {
                                $custom_width = isset($attributes['ImgWidth']) ? $attributes['ImgWidth'] : '';
                                $custom_height = isset($attributes['height']) ? $attributes['height'] : '';
                            } elseif (isset($attributes['widthPercentageState']) && $attributes['widthPercentageState'] == true && empty($attributes['selectedImageTogggler'])) {
                                $custom_width = $attributes['widthPercentage'];
                                $custom_height = $attributes['widthPercentage'];
                            }
                        }
                        if (!empty($custom_width) && !empty($custom_height)) {
                            $list_items_markup .= '    <div class="wep-card" style = "background-image:url(' . esc_url($image_url) . ');background-repeat: no-repeat;
  background-size: cover;">';
                        } else {
                            $list_items_markup .= '    <div class="wep-card" style = "background-image:url(' . esc_url($image_url) . ');background-repeat: no-repeat; background-size: cover;">';
                        }
                        $list_items_markup .= '     <div class="wep-card-img-overlay">';
                        $list_items_markup .= '   <div class="wep-card-body"><div class="wep-card-heading">';
                    }

                    if (isset($attributes['showPostTitle']) && $attributes['showPostTitle'] == 1) {
                        $list_items_markup .= '    <h4 class="wep-card-title"  ';
                        if ($title_Manage_styling === 'true') {
                            $list_items_markup .= ' style="font-size:' . esc_html($title_font_size) . '"';
                        }
                        $list_items_markup .= '>';
                        $list_items_markup .= '<a href="' . esc_url($post_permalink) . '" class="title">' . esc_html($post_title) . '</a>';
                        $list_items_markup .= '    </h4>';
                    }

                    if (isset($attributes['showMeta']) && $attributes['showMeta'] == 1) {
                        $list_items_markup .= '    <div class="meta-data" ';
                        if ($Meta_Manage_styling === 'true') {
                            $list_items_markup .= ' style="font-size:' . esc_html($Meta_font_size) . '"';
                        }
                        $list_items_markup .= '>';
                        $list_items_markup .= '<p>' . esc_html($post_date) . ' | Author: ' . esc_html($post_author) . ' | Categories: ' . esc_html($category_list) . '</p>';
                        $list_items_markup .= '    </div>';
                    }
                    $list_items_markup .= '    </div>';
                    if (isset($attributes['showContent']) && $attributes['showContent'] == 1) {
                        if (isset($attributes['contentType'])) {
                            if ($attributes['contentType'] == 'Excerpt') {
                                $words_limit = isset($attributes['wordsLimit']) ? intval($attributes['wordsLimit']) : 100;
                                $excerpt = get_the_excerpt();
                                $words = explode(' ', $excerpt);
                                $post_content = implode(' ', array_slice($words, 0, $words_limit)) . '...';
                            } elseif ($attributes['contentType'] == 'Full-Post') {
                                $post_content = get_the_content();
                            }
                        }
                        $list_items_markup .= '    <div class="wep-card-text"';
                        if ($Content_Manage_styling === 'true') {
                            $list_items_markup .= ' style="font-size: ' . esc_html($Content_font_size) . ';"';
                        }
                        $list_items_markup .= ' ><p>';
                        $list_items_markup .=      apply_filters('adv_post_content', $post_content);
                        $list_items_markup .= '    </p></div>';
                    }
                    $list_items_markup .= '</div>';
                    $list_items_markup .= '    <div class="wep-card-footer">';
                    $list_items_markup .= '        <a target="_blank" href="' . esc_url($post_permalink) . '" class="wep-btn wep-btn-primary"';
                    if ($showReadMoreToggler === 'true') {
                        $list_items_markup .= ' style="font-size:' . esc_html($Read_more_font_size) . '"';
                    }
                    $ReadMoreText = !empty($attributes['ReadMoreText']) ? $attributes['ReadMoreText'] : 'Read More';
                    $list_items_markup .= '>' . $ReadMoreText . '</a>';
                    $list_items_markup .= '    </div>';
                    $list_items_markup .= '    </div>';
                    $list_items_markup .= '    </div>';

                endwhile;
                wp_reset_postdata();

            endif;

            $list_items_markup .= '</div></div>';

            if (isset($attributes['PaginationOnToggler']) && !empty($attributes['PaginationOnToggler'])) {

                $pagination_args = array(
                    'total'        => $query->max_num_pages,
                    'current'      => $args['paged'],
                    'mid_size'     => 2,
                    'prev_text' => isset($attributes['prevName']) ? __($attributes['prevName']) : __('Prev'),
                    'next_text' => isset($attributes['nextName']) ? __($attributes['nextName']) : __('Next'),
                    'type'         => 'array',
                );

                $pagination_links = paginate_links($pagination_args);

                if ($pagination_links) {
                    $alignment_class = isset($attributes['paginationAline']) ? $attributes['paginationAline'] : 'center';
                    $list_items_markup .= '<nav class="pagination wep-pagination ' . esc_attr($alignment_class) . '">';

                    // Output the pagination links
                    foreach ($pagination_links as $link) {
                        $list_items_markup .= str_replace(
                            array('<a', '</a>', 'page-numbers'),
                            array('<a class="page-numbers"', '</a>', 'page-numbers'),
                            $link
                        );
                    }

                    $list_items_markup .= '</nav>';
                }
            }

            return  $list_items_markup;
        }

        function aplb_slider_layout($args, $attributes)
        {

            $title_Manage_styling = !empty($attributes['title_Manage_styling']) ? 'true' : 'false';
            $title_font_size = !empty($attributes['title_font_size']) ? $attributes['title_font_size'] : '1.5rem';

            $Meta_Manage_styling = !empty($attributes['Meta_Manage_styling']) ? 'true' : 'false';
            $Meta_font_size = !empty($attributes['Meta_font_size']) ? $attributes['Meta_font_size'] : '8px';

            $Content_Manage_styling = !empty($attributes['Content_Manage_styling']) ? 'true' : 'false';
            $Content_font_size = !empty($attributes['Content_font_size']) ? $attributes['Content_font_size'] : '8px';

            $Read_more_font_size = !empty($attributes['Read_more_font_size']) ? $attributes['Read_more_font_size'] : '1rem';

            $showReadMoreToggler = !empty($attributes['showReadMoreToggler']) ? 'true' : 'false';
            $css = '';

            if ($showReadMoreToggler === 'true') {
                $button_Top_bottom_Padding = !empty($attributes['button_Top_bottom_Padding']) ? $attributes['button_Top_bottom_Padding'] : '8px';
                $button_Right_Left_Padding = !empty($attributes['button_Right_Left_Padding']) ? $attributes['button_Right_Left_Padding'] : '16px';
                $ReadMoreTextColor = !empty($attributes['ReadMoreTextColor']) ? $attributes['ReadMoreTextColor'] : '#FFFFFF';
                $ReadMoreBgColor = !empty($attributes['ReadMoreBgColor']) ? $attributes['ReadMoreBgColor'] : '#000000';
                $css .= '
                .slider-container .wep-btn {
                    padding: ' . $button_Top_bottom_Padding . ' ' . $button_Right_Left_Padding . ' !important;
    
                    background-color:' . $ReadMoreBgColor . '!important;
                    color: ' . $ReadMoreTextColor . '!important;
    
                }
                ';
            }
            $customCSS = !empty($attributes['customCSS']) ? $attributes['customCSS'] : '';

            if (!empty($customCSS)) {
                $css .= $customCSS;
            }

            $css = apply_filters('apl_slider_style', $css, $attributes);
            $custom_css = "<style>" . $css . "</style>";
            $list_items_markup = '';
            $list_items_markup .= $custom_css;
            $list_items_markup .= '<div class="wep-root"><div class="slider-container">';
            $list_items_markup .= '<div class="slider">';
            $query = new WP_Query($args);
            if ($query->have_posts()) :
                while ($query->have_posts()) : $query->the_post();
                    $post_title = get_the_title();
                    $post_date  = get_the_date();
                    $post_permalink = get_permalink();
                    $post_author  = get_the_author();
                    $post_categories = get_the_category();
                    $category_names = array();
                    $image_url = get_the_post_thumbnail_url(get_the_ID(), 'large');
                    if (empty($post_categories)) {
                        $taxonomies = get_object_taxonomies(get_post(), 'names');
                        foreach ($taxonomies as $taxonomy) {
                            $terms = get_the_terms(get_the_ID(), $taxonomy);
                            if ($terms && !is_wp_error($terms)) {
                                foreach ($terms as $term) {
                                    $category_names[] = $term->name;
                                }
                            }
                        }
                    } else {
                        foreach ($post_categories as $category) {
                            $category_names[] = $category->name;
                        }
                    }

                    $category_list = implode(', ', $category_names);
                    $list_items_markup .= '<div class="slide">';
                    $list_items_markup .= '<div class="wep-card">';
                    if (isset($attributes['showImgToggler']) && $attributes['showImgToggler'] == 1) {
                        if ($image_url) {

                            if (isset($attributes['imageUrl'])) {
                                $image_url = get_the_post_thumbnail_url(get_the_ID(), 'large');

                                if (empty($attributes['selectedImageTogggler']) && empty($attributes['widthPercentageState'])) {
                                    $custom_width = isset($attributes['ImgWidth']) ? $attributes['ImgWidth'] : '';
                                    $custom_height = isset($attributes['height']) ? $attributes['height'] : '';
                                } elseif (isset($attributes['widthPercentageState']) && $attributes['widthPercentageState'] == true && empty($attributes['selectedImageTogggler'])) {
                                    $custom_width = $attributes['widthPercentage'];
                                    $custom_height = $attributes['widthPercentage'];
                                }
                                $list_items_markup .= '    <div class="wep-card-img">';
                                if (!empty($custom_width) && !empty($custom_height)) {
                                    $list_items_markup .= '<img src="' . esc_url($image_url) . '">';
                                } else {
                                    $list_items_markup .= '<img src="' . esc_url($image_url) . '">';
                                }
                                $list_items_markup .= '    </div>';
                            }
                        }
                    }

                    $list_items_markup .= '<div class="wep-card-body"><div class="wep-card-heading">';
                    if (isset($attributes['showPostTitle']) && $attributes['showPostTitle'] == 1) {
                        $list_items_markup .= '    <h4 class="wep-card-title"  ';
                        if ($title_Manage_styling === 'true') {
                            $list_items_markup .= ' style="font-size:' . esc_html($title_font_size) . '"';
                        }
                        $list_items_markup .= '>';
                        $list_items_markup .= '<a href="' . esc_url($post_permalink) . '">' . esc_html($post_title) . '</a>';
                        $list_items_markup .= '    </h4>';
                    }

                    if (isset($attributes['showMeta']) && $attributes['showMeta'] == 1) {
                        $list_items_markup .= '    <div class="meta-data" ';
                        if ($Meta_Manage_styling === 'true') {
                            $list_items_markup .= ' style="font-size:' . esc_html($Meta_font_size) . '"';
                        }
                        $list_items_markup .= '>';
                        $list_items_markup .= '<p>' . esc_html($post_date) . ' | Author: ' . esc_html($post_author) . ' | Categories: ' . esc_html($category_list) . '</p>';
                        $list_items_markup .= '    </div>';
                    }

                    $list_items_markup .= '</div>';
                    if (isset($attributes['showContent']) && $attributes['showContent'] == 1) {
                        if (isset($attributes['contentType'])) {
                            if ($attributes['contentType'] == 'Excerpt') {
                                $words_limit = isset($attributes['wordsLimit']) ? intval($attributes['wordsLimit']) : 100;
                                $excerpt = get_the_excerpt();
                                $words = explode(' ', $excerpt);
                                $post_content = implode(' ', array_slice($words, 0, $words_limit));
                            } elseif ($attributes['contentType'] == 'Full-Post') {
                                $post_content = get_the_content();
                            }
                        }
                        $list_items_markup .= '    <div class="wep-card-text"';
                        if ($Content_Manage_styling === 'true') {
                            $list_items_markup .= ' style="font-size: ' . esc_html($Content_font_size) . ';"';
                        }
                        $list_items_markup .= ' ><p>';
                        $list_items_markup .=      apply_filters('adv_post_content', $post_content);
                        $list_items_markup .= '    </p></div>';
                    }
                    $list_items_markup .= '</div>';

                    $list_items_markup .= '    <div class="wep-card-footer">';
                    $list_items_markup .= '        <a target="_blank" href="' . esc_url($post_permalink) . '" class="wep-btn wep-btn-primary"';
                    if ($showReadMoreToggler === 'true') {
                        $list_items_markup .= ' style="font-size:' . esc_html($Read_more_font_size) . '"';
                    }
                    $ReadMoreText = !empty($attributes['ReadMoreText']) ? $attributes['ReadMoreText'] : 'Read More';
                    $list_items_markup .= '>' . $ReadMoreText . '</a>';
                    $list_items_markup .= '    </div>';
                    $list_items_markup .= '</div>';
                    $list_items_markup .= '</div>';
                endwhile;
                wp_reset_postdata();

            endif;

            $list_items_markup .= '</div>';
            $list_items_markup .= ' <button class="slider-button prev">❮</button>';
            $list_items_markup .= ' <button class="slider-button next">❯</button>';
            $list_items_markup .= '</div>';
            $list_items_markup .= '</div></div>';

            $js = "document.addEventListener('DOMContentLoaded', function() {
                let currentIndex = 0;
                const slides = document.querySelectorAll('.slide');
            
                function showSlide(index) {
                    slides.forEach((slide, i) => {
                        slide.style.display = i === index ? 'block' : 'none';
                    });
                }
            
                function nextSlide() {
                    currentIndex = (currentIndex + 1) % slides.length;
                    showSlide(currentIndex);
                }
            
                function prevSlide() {
                    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                    showSlide(currentIndex);
                }
            
                document.querySelector('.next').addEventListener('click', nextSlide);
                document.querySelector('.prev').addEventListener('click', prevSlide);
            
                setInterval(nextSlide, 3000);
            
                showSlide(currentIndex);
            });";

            $js = apply_filters('apl_slider_script', $js, $attributes);
            $custom_js = "<script>" . $js . "</script>";
            $list_items_markup .= $custom_js;


            return  $list_items_markup;
        }

        function aplb_masonry_layout($args, $attributes)
        {

            $title_Manage_styling = !empty($attributes['title_Manage_styling']) ? 'true' : 'false';
            $title_font_size = !empty($attributes['title_font_size']) ? $attributes['title_font_size'] : '1.5rem';

            $Meta_Manage_styling = !empty($attributes['Meta_Manage_styling']) ? 'true' : 'false';
            $Meta_font_size = !empty($attributes['Meta_font_size']) ? $attributes['Meta_font_size'] : '8px';

            $Content_Manage_styling = !empty($attributes['Content_Manage_styling']) ? 'true' : 'false';
            $Content_font_size = !empty($attributes['Content_font_size']) ? $attributes['Content_font_size'] : '8px';

            $Read_more_font_size = !empty($attributes['Read_more_font_size']) ? $attributes['Read_more_font_size'] : '1rem';

            $showReadMoreToggler = !empty($attributes['showReadMoreToggler']) ? 'true' : 'false';
            $css = '';

            if ($showReadMoreToggler === 'true') {
                $button_Top_bottom_Padding = !empty($attributes['button_Top_bottom_Padding']) ? $attributes['button_Top_bottom_Padding'] : '8px';
                $button_Right_Left_Padding = !empty($attributes['button_Right_Left_Padding']) ? $attributes['button_Right_Left_Padding'] : '16px';
                $ReadMoreTextColor = !empty($attributes['ReadMoreTextColor']) ? $attributes['ReadMoreTextColor'] : '#FFFFFF';
                $ReadMoreBgColor = !empty($attributes['ReadMoreBgColor']) ? $attributes['ReadMoreBgColor'] : '#000000';

                $css .= '
                 .masonry-layout .wep-btn {
                    padding: ' . $button_Top_bottom_Padding . ' ' . $button_Right_Left_Padding . ' !important;

                    background-color:' . $ReadMoreBgColor . '!important;
                    color: ' . $ReadMoreTextColor . '!important ;

                }    
                .pagination .page-numbers:hover, .pagination .page-numbers.current {
                    background-color:' . $ReadMoreBgColor . '!important;
                    color: ' . $ReadMoreTextColor . '!important;
                    border-color: ' . $ReadMoreBgColor . '!important;
                }
            
                ';
            }

            $customCSS = !empty($attributes['customCSS']) ? $attributes['customCSS'] : '';

            $columns = !empty($attributes['totalColoms']) ? $attributes['totalColoms'] : 3;
            $column_gap = isset($attributes['columnGap']) && !empty($attributes['columnGap']) ? $attributes['columnGap'] : '20px';
            $row_gap = isset($attributes['rowGap']) && !empty($attributes['rowGap']) ? $attributes['rowGap'] : '30px';
            $row_gap = str_replace("px", "", $row_gap);
            $row_gap .= 'px';
            $column_gap = str_replace("px", "", $column_gap);
            $column_gap .= 'px';
            if (!empty($customCSS)) {
                $css .= $customCSS;
            }

            if( wp_is_mobile()){
                $css .=  '.masonry-layout {
                    column-gap: ' . $column_gap . ' !important;
                    column-count: 1; 
                }';
            }else{
                $css .=  '.masonry-layout {
                    column-gap: ' . $column_gap . ' !important;
                    column-count: '.$attributes["totalColoms"].'; 
                }';
            }

            $css .=  '
            .masonry-layout .wep-card-text {
                margin-bottom: ' . $row_gap . ' !important; 
            }
            @media (min-width: 992px) {
                .masonry-layout {
                    column-count: ' . $columns . ' !important;
                }
            }
            
            .pagination{
                margin-top: ' . $row_gap . ' !important; 
            }
            /* Extra large screens (large desktops, 1200px and up) */
            @media (min-width: 1200px) {
                .masonry-layout {
                    column-count: ' . $columns . ' !important;
                }
            }
           
            ';

            $css = apply_filters('apl_masanory_style', $css, $attributes);
            $custom_css = "<style> " . $css . " </style>";
            $list_items_markup = '';
            $list_items_markup .= $custom_css;
            $list_items_markup .= '<div class="wep-root" ><div class="masonry-layout">';
            if (isset($attributes['PaginationOnToggler']) && !empty($attributes['PaginationOnToggler'])) {
                $args['paged'] = get_query_var('paged') ? get_query_var('paged') : 1;
            }
            $query = new WP_Query($args);

            if ($query->have_posts()) :
                while ($query->have_posts()) : $query->the_post();
                    $post_title = get_the_title();
                    $post_date  = get_the_date();
                    $post_permalink = get_permalink();
                    $post_author  = get_the_author();
                    $post_categories = get_the_category();
                    $category_names = array();

                    if (empty($post_categories)) {
                        $taxonomies = get_object_taxonomies(get_post(), 'names');
                        foreach ($taxonomies as $taxonomy) {
                            $terms = get_the_terms(get_the_ID(), $taxonomy);
                            if ($terms && !is_wp_error($terms)) {
                                foreach ($terms as $term) {
                                    $category_names[] = $term->name;
                                }
                            }
                        }
                    } else {
                        foreach ($post_categories as $category) {
                            $category_names[] = $category->name;
                        }
                    }

                    $category_list = implode(', ', $category_names);
                    $list_items_markup .= '<div class="wep-card" style="margin-bottom: 30px;">';
                    $image_url = get_the_post_thumbnail_url(get_the_ID(), 'medium');
                    if (!empty($image_url)) {
                        if (isset($attributes['showImgToggler']) && $attributes['showImgToggler'] == 1) {
                            if (isset($attributes['imageUrl'])) {
                                $image_url = get_the_post_thumbnail_url(get_the_ID(), 'medium');

                                if (empty($attributes['selectedImageTogggler']) && empty($attributes['widthPercentageState'])) {
                                    $custom_width = isset($attributes['ImgWidth']) ? $attributes['ImgWidth'] : '';
                                    $custom_height = isset($attributes['height']) ? $attributes['height'] : '';
                                } elseif (isset($attributes['widthPercentageState']) && $attributes['widthPercentageState'] == true && empty($attributes['selectedImageTogggler'])) {
                                    $custom_width = $attributes['widthPercentage'];
                                    $custom_height = $attributes['widthPercentage'];
                                }
                            }
                            $list_items_markup .= ' <div class="wep-card-img">';
                            if (!empty($custom_width) && !empty($custom_height)) {
                                $list_items_markup .= '<img src="' . esc_url($image_url) . '">';
                            } else {
                                $list_items_markup .= '<img src="' . esc_url($image_url) . '">';
                            }
                            $list_items_markup .= '<span class="wep-chip">'.$category_list.'</span> </div>';
                        }
                    }
                    $list_items_markup .= '<div class="wep-card-body"><div class="wep-card-heading">';
                    if (isset($attributes['showPostTitle']) && $attributes['showPostTitle'] == 1) {
                        $list_items_markup .= '    <h4 class="wep-card-title"  ';
                        if ($title_Manage_styling === 'true') {
                            $list_items_markup .= ' style="font-size:' . esc_html($title_font_size) . '"';
                        }
                        $list_items_markup .= '>';
                        $list_items_markup .= '<a href="' . esc_url($post_permalink) . '" >' . esc_html($post_title) . '</a>';
                        $list_items_markup .= '    </h4>';
                    }
                    

                    if (isset($attributes['showMeta']) && $attributes['showMeta'] == 1) {
                        $list_items_markup .= '    <div class="meta-data" ';
                        if ($Meta_Manage_styling === 'true') {
                            $list_items_markup .= ' style="font-size:' . esc_html($Meta_font_size) . '"';
                        }
                        $list_items_markup .= '>';
                        $list_items_markup .= '<p>' . esc_html($post_date) . ' | Author: ' . esc_html($post_author) . ' | Categories: ' . esc_html($category_list) . '</p>';
                        $list_items_markup .= '    </div>';
                    }
                    $list_items_markup .= '</div>';
                    if (isset($attributes['showContent']) && $attributes['showContent'] == 1) {
                        if (isset($attributes['contentType'])) {
                            if ($attributes['contentType'] == 'Excerpt') {
                                $words_limit = isset($attributes['wordsLimit']) ? intval($attributes['wordsLimit']) : 100;
                                $excerpt = get_the_excerpt();
                                $words = explode(' ', $excerpt);
                                $post_content = implode(' ', array_slice($words, 0, $words_limit));
                            } elseif ($attributes['contentType'] == 'Full-Post') {
                                $post_content = get_the_content();
                            }
                        }
                        $list_items_markup .= '    <div class="wep-card-text"';
                        if ($Content_Manage_styling === 'true') {
                            $list_items_markup .= ' style="font-size: ' . esc_html($Content_font_size) . ';"';
                        }
                        $list_items_markup .= ' ><p>';
                        $list_items_markup .=      apply_filters('adv_post_content', $post_content);
                        $list_items_markup .= '    </p></div>';
                    }
                    $list_items_markup .= '</div>';

                    $list_items_markup .= '    <div class="wep-card-footer">';
                    $list_items_markup .= '        <a target="_blank" class="wep-btn wep-btn-primary" href="' . esc_url($post_permalink) . '"';
                    if ($showReadMoreToggler === 'true') {
                        $list_items_markup .= ' style="font-size:' . esc_html($Read_more_font_size) . '"';
                    }
                    $ReadMoreText = !empty($attributes['ReadMoreText']) ? $attributes['ReadMoreText'] : 'Read More';
                    $list_items_markup .= '>' . $ReadMoreText . '</a>';
                    $list_items_markup .= '    </div>';
                    $list_items_markup .= '</div>';

                endwhile;
                wp_reset_postdata();

            endif;

            $list_items_markup .= '</div></div>';
            if (isset($attributes['PaginationOnToggler']) && !empty($attributes['PaginationOnToggler'])) {

                $pagination_args = array(
                    'total'        => $query->max_num_pages,
                    'current'      => $args['paged'],
                    'mid_size'     => 2,
                    'prev_text' => isset($attributes['prevName']) ? __($attributes['prevName']) : __('Prev'),
                    'next_text' => isset($attributes['nextName']) ? __($attributes['nextName']) : __('Next'),
                    'type'         => 'array',
                );

                $pagination_links = paginate_links($pagination_args);

                if ($pagination_links) {
                    $alignment_class = isset($attributes['paginationAline']) ? $attributes['paginationAline'] : 'center';
                    $list_items_markup .= '<nav class="pagination wep-pagination ' . esc_attr($alignment_class) . '">';

                    // Output the pagination links
                    foreach ($pagination_links as $link) {
                        $list_items_markup .= str_replace(
                            array('<a', '</a>', 'page-numbers'),
                            array('<a class="page-numbers"', '</a>', 'page-numbers'),
                            $link
                        );
                    }

                    $list_items_markup .= '</nav>';
                }
            }

            return  $list_items_markup;
        }

        function aplb_register_custom_endpoints()
        {
            register_rest_route(
                'wpppro/v1',
                '/list-cpt/',
                array(
                    'methods'             => 'GET',
                    'callback'            => array($this, 'aplb_get_custom_post_types_and_tax'),
                    'permission_callback' => '__return_true',
                )
            );

            register_rest_route(
                'wpppro/v1',
                '/get-post-by-id/',
                array(
                    'methods'             => 'GET',
                    'callback'            => array($this, 'aplb_get_posts_type_by_id'),
                    'permission_callback' => '__return_true',
                )
            );
        }

        function aplb_get_posts_type_by_id($request)
        {
            $id = $request['id'];
            $id_array = explode(',', $id);

            $args = array(
                'post_type' => 'any',
                'post__in' => $id_array,
                'orderby' => 'post__in',
                'posts_per_page' => -1,
            );


            $query = new WP_Query($args);

            $posts_data = array();

            if ($query->have_posts()) {
                while ($query->have_posts()) {
                    $query->the_post();
                    $post_id = get_the_ID();

                    // Prepare the post data array
                    $post_data = array(
                        'id' => $post_id,
                        'date' => get_the_date('c'),
                        'date_gmt' => get_gmt_from_date(get_the_date('Y-m-d H:i:s')),
                        'guid' => array('rendered' => get_the_guid()),
                        'modified' => get_the_modified_date('c'),
                        'modified_gmt' => get_gmt_from_date(get_the_modified_date('Y-m-d H:i:s')),
                        'slug' => get_post_field('post_name', $post_id),
                        'status' => get_post_status($post_id),
                        'type' => get_post_type($post_id),
                        'link' => get_permalink($post_id),
                        'title' => array('rendered' => get_the_title($post_id)),
                        'content' => array('rendered' => apply_filters('the_content', get_the_content($post_id)), 'protected' => false),
                        'featured_media' => get_post_thumbnail_id($post_id),
                        'template' => get_page_template_slug($post_id),
                        'meta' => get_post_meta($post_id),
                        'featured_image_url' => array(
                            'thumbnail' => get_the_post_thumbnail_url($post_id, 'thumbnail'),
                            'medium' => get_the_post_thumbnail_url($post_id, 'medium'),
                            'medium_large' => get_the_post_thumbnail_url($post_id, 'medium_large'),
                            'large' => get_the_post_thumbnail_url($post_id, 'large'),
                            '1536x1536' => get_the_post_thumbnail_url($post_id, '1536x1536'),
                            '2048x2048' => get_the_post_thumbnail_url($post_id, '2048x2048')
                        ),
                        'post_author' => get_the_author_meta('display_name', get_post_field('post_author', $post_id)),
                        'assigned_categories' => wp_get_post_categories($post_id, array('fields' => 'names')),
                    );

                    $posts_data[] = $post_data;
                }
            }

            wp_reset_postdata();

            return new WP_REST_Response($posts_data, 200);
        }


        function aplb_get_custom_post_types_and_tax()
        {
            $args = array('public'   => true, '_builtin' => false);

            $custom_post_types = get_post_types($args, 'objects');

            $cpt_minial_info = [];

            if ($custom_post_types) {

                foreach ($custom_post_types  as $post_type) {
                    $cpt_minial_info[$post_type->name] = $post_type->label;
                }
            }

            $custom_post_types = $cpt_minial_info;

            $post_type_taxonomies = array();

            $all_cpts = array_merge(array('post' => 'Posts', 'page' => 'Pages'), $custom_post_types);

            foreach ($all_cpts as $post_type => $postName) {

                $taxonomies = get_object_taxonomies($post_type, 'objects');

                $taxonomy_info = array();

                foreach ($taxonomies as $taxonomy) {

                    $taxonomy_info[] = array(
                        'slug' => $taxonomy->name,
                        'label' => $taxonomy->label,
                    );
                }


                $post_type_taxonomies[$post_type] = $taxonomy_info;
            }

            $response =  array('cpt_list' => $custom_post_types, 'post_type_and_taxonomies' => $post_type_taxonomies);

            return rest_ensure_response($response);
        }

        // Register REST fields for various post types

        function aplb_register_custom_rest_fields()
        {

            $post_types = get_post_types(array('public' => true, '_builtin' => false), 'names', 'and');
            $post_types = array_merge($post_types, array('post', 'page'));

            foreach ($post_types as $post_type) {

                $this->aplb_register_featured_image_rest_field($post_type);
                $this->aplb_register_author_rest_field($post_type);
                $this->aplb_register_assigned_categories_rest_field($post_type);
            }
        }

        // Register 'featured_image_url' REST field
        function aplb_register_featured_image_rest_field($post_type)
        {

            register_rest_field($post_type, 'featured_image_url', array(
                'get_callback' =>  array($this, 'aplb_get_featured_image_callback'),
                'schema' => array(
                    'description' => esc_html__('Featured Image', 'advanced-posts-listing'),
                    'type'        => 'string'
                ),
            ));
        }

        function aplb_get_featured_image_callback($post)
        {

            $featured_image_id = get_post_thumbnail_id($post['id']);
            $image_sizes = get_intermediate_image_sizes();
            $all_sizes = array();

            if (!empty($image_sizes)) {
                foreach ($image_sizes as $size) {
                    $image_url = wp_get_attachment_image_src($featured_image_id, $size);
                    if (isset($image_url[0])) {
                        $all_sizes[$size] = $image_url[0];
                    }
                }
            }

            return $all_sizes;
        }

        function aplb_register_author_rest_field($post_type)
        {

            register_rest_field($post_type, 'post_author', array(
                'get_callback' =>  array($this, 'aplb_get_author_callback'),
                'schema' => array(
                    'description' => esc_html__('Author Name', 'advanced-posts-listing'),
                    'type' => 'string'
                ),
            ));
        }

        function aplb_get_author_callback($post)
        {

            $author_name = '';

            if (isset($post['author']) && !empty($post['author'])) {
                $author = get_userdata($post['author']);

                if ($author && !is_wp_error($author)) {
                    if ($author->first_name && $author->last_name) {
                        $author_name = $author->first_name . ' ' . $author->last_name;
                    } elseif ($author->display_name) {
                        $author_name = $author->display_name;
                    } else {
                        $author_name = $author->user_login;
                    }
                }
            }

            return $author_name;
        }

        function aplb_register_assigned_categories_rest_field($post_type)
        {

            register_rest_field($post_type, 'assigned_categories', array(
                'get_callback' =>  array($this, 'aplb_get_assigned_categories_callback'),
                'schema' => array(
                    'description' => esc_html__('Assigned Categories', 'advanced-posts-listing'),
                    'type'        => 'string'
                ),
            ));
        }

        function aplb_get_assigned_categories_callback($post)
        {

            $categories = get_the_category($post['id']);
            $category_names = array();

            if (empty($categories)) {
                $post_id = $post['id'];
                $post_type = $post['type'];
                $taxonomies = get_object_taxonomies($post_type);

                foreach ($taxonomies as $taxonomy) {
                    $terms = wp_get_post_terms($post_id, $taxonomy);
                    if (!empty($terms)) {
                        foreach ($terms as $term) {
                            $category_names[] = $term->name;
                        }
                    }
                }
                $category_names = array_unique($category_names);
            } else {
                foreach ($categories as $category) {
                    $category_names[] = $category->name;
                }
            }

            return implode(', ', $category_names);
        }

        function aplb_get_server_side_pass()
        {
            wp_localize_script('advanced-posts-listing-advanced-posts-listing-block-editor-script', 'aplb_server_data', array(
                'rest_url' => esc_url(get_rest_url(null)),
            ));
        }
    }

    return new Advanced_Post_Listing_Block();
}
