<?php

/**
 * ENVIRONMENT
 */
$errors     = array();
$rootPath   = dirname( __FILE__ ) . DIRECTORY_SEPARATOR;
$buildPath  = $rootPath . ".." . DIRECTORY_SEPARATOR . "builds" . DIRECTORY_SEPARATOR . "%browser%" . DIRECTORY_SEPARATOR . "src" . DIRECTORY_SEPARATOR;

/**
 * CONFIG
 */
$configs    = array(
    "Firefox" => array(
        "from"  => $rootPath,
        "to"    => str_replace( "%browser%", "Firefox", $buildPath ),
        "files" => array(
            "backgroundScript.js",
            "contentScript.js",
            "LICENSE",
            "manifest.firefox.json",
            "readme.firefox.txt"
        ),
        "rename" => array(
            "manifest.firefox.json" => "manifest.json",
            "readme.firefox.txt"    => "readme.txt"
        )
    ),
    "Chrome" => array(
        "from"  => $rootPath,
        "to"    => str_replace( "%browser%", "Chrome", $buildPath ),
        "files" => array(
            "backgroundScript.js",
            "contentScript.js",
            "LICENSE",
            "manifest.chrome.json",
            "readme.chrome.txt"
        ),
        "rename" => array(
            "manifest.chrome.json" => "manifest.json",
            "readme.chrome.txt"    => "readme.txt"
            )
    )
);

/**
 * Helper
 */
function clearDir( $targetDir ) {

    $files = glob( $targetDir . "*" );

    foreach( $files as $file ){
        
        if( is_file( $file ) ) {
            
            unlink( $file );
        
        }
    
    }

}

/**
 * BUILD
 */
echo "BUILD STARTED\n";

foreach( $configs as $browser => $browserConfig ) {

    echo "\t" . $browser . ":\n";

    // Empty target directory before copying and renaming files
    clearDir( $browserConfig[ "to" ] );

    foreach( $browserConfig[ "files" ] as $fileToCopy ) {

        $fromFile   = $browserConfig[ "from" ] . $fileToCopy;
        $toFile     = $browserConfig[ "to"] . $fileToCopy;

        $copyStatus = @copy( $fromFile, $toFile );

        echo "\t\t" . $fileToCopy;

        if( !$copyStatus ) {

            echo " ... [ERROR] could not be copied from {" . $fileToCopy . "} to {" . $toFile . "}\n";

        }
        else {

            echo " ... copied";

        }

        echo "\n";
        
    }

    foreach( $browserConfig[ "rename" ] as $renameFrom => $renameTo ) {

        $renameStatus = @rename(
            $browserConfig[ "to"] . $renameFrom,
            $browserConfig[ "to"] . $renameTo
        );

        echo "\t\t" . $renameFrom;

        if( !$renameStatus ) {

            echo " ... [ERROR] could not be renamed to {" . $renameTo . "}\n";

        }
        else {

            echo " ... renamed to {" . $renameTo . "}";

        }

        echo "\n";
        
    }

    echo "\n";

}

echo "\nBUILD FINISHED";
