
/* Namespace */
var RotateImageExtension   = {
  browser : ( "object" === typeof chrome ? chrome : browser ),
  target  : null
};


/**
 * Rotate an image by +90 degrees everytime this function is executed.
 */
RotateImageExtension.executeCommand  = function() {
  
  // No target image, no rotaion
  if( RotateImageExtension.target === null  ) {
    return;
  }

  // Only target <img> elements (no CSS background images or so, for example)
  if( RotateImageExtension.target.tagName === "IMG" ) {

    // The actual degree will be stored (by this extension)
    // in the <img> attribute "data-rotation" (as an integer).
    let dataAttribute = RotateImageExtension.target.getAttribute( "data-rotation" );
    let rotationValue = 0;
      
    // If the data attribute doesn't already exist, add it with the value of "0"
    // as in "no rotation" so far.
    if( null === dataAttribute ) {

      RotateImageExtension.target.setAttribute( "data-rotation", 0 );

    }
    else {
        
      rotationValue = parseInt( dataAttribute, 10 );
        
    }

    // Rotate in +90 degrees per execution.
    // Might be set via extension setting in the future.
    // But for now, I don't actually see the need for it.
    rotationValue += 90;
    rotationValue = ( rotationValue % 360 );

    // The actual rotation will be done via CSS styling
    // and therefor via the browser and the graphics card.
    RotateImageExtension.target.setAttribute( "data-rotation", rotationValue );
    RotateImageExtension.target.style.transform = "rotate(" + rotationValue + "deg)";

  }

};

/**
 * When hovering an <img> element and the context menu item has been
 * selected, store the element reference.
 */
document.addEventListener( "contextmenu", function( event ) {

    RotateImageExtension.target = event.target;

});


/**
 * Since this is the content script, it will be executed on the current web page.
 * Use the messaging system of the web extensions standard to send and recieve
 * messages between the content and the background script.
 *
 * https://developer.chrome.com/extensions/messaging
 */
RotateImageExtension.browser.runtime.onMessage.addListener(
    function( request, sender, sendResponse ) {

        let response = {
            message : "Unknown command requested"
        };
        
        if( "string" === typeof request.command && request.command === "rotateImage" ) {

            RotateImageExtension.executeCommand();

            // The message is not actually needed
            // but might handy for debugging.
            response.message = "Command has been executed";

        }

        sendResponse( response );

    }
);
