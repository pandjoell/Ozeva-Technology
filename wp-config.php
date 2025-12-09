<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'ozeva_com' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

if ( !defined('WP_CLI') ) {
    define( 'WP_SITEURL', $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] );
    define( 'WP_HOME',    $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] );
}



/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'NLv1hwFgA8dmbux8UthJm4XUefuf6ijgOJ9Zp2A494vn0Ti045OySLJBOsdWpVtm' );
define( 'SECURE_AUTH_KEY',  'scQazooCCg4J9TwmRJhW7gAMWyYxIL0czbPUSdGvJeBLQv6oPk4tlfK4HXoKTkLF' );
define( 'LOGGED_IN_KEY',    'JG5u5vZr2xbXPGI9p6DJ6Z0mFe5STO1qnO6DC0swi9riwXmbmovGSmvfDg8504pq' );
define( 'NONCE_KEY',        'PbgncJx17SWBV9v0f2FhctbOn6uJlCQjIw9gYr6PQSapHOnggm53Wj8k6Z9EhrJp' );
define( 'AUTH_SALT',        '7FuHHQ9Pu05PCVGUNo25bcLp6KB5wEGyw0oZImRQqM1WnfE5MpxfsrSw2iRYwanb' );
define( 'SECURE_AUTH_SALT', 'e12FdJwAC9e4tBIy6IC1rynIYKOvrGbaglD9tAGfYSeCXRxhCeK6rKbXJsumlh7N' );
define( 'LOGGED_IN_SALT',   'e2bm92wwxuPVfpNIzqZs8qEBbbTCxT2RlB4dE5Jbwyo1TqVZIEm2LCKYsSEzqugU' );
define( 'NONCE_SALT',       'bc1YEFHfpc2bg1EeCJOxDplDeubabTbQ2nhNqBzZ5S2PpdrBRdlua8CDWRbZOZ4n' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
