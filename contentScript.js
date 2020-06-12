
var RotateImageExtension   = {
  browser : ( "object" === typeof chrome ? chrome : browser ),
  target  : null
};


RotateImageExtension.executeCommand  = function() {
  
  if( RotateImageExtension.target === null  ) {
    return;
  }

  if( RotateImageExtension.target.tagName === "IMG" ) {

    let dataAttribute = RotateImageExtension.target.getAttribute( "data-rotation" );
    let rotationValue = 0;
      
    if( null === dataAttribute ) {

      RotateImageExtension.target.setAttribute( "data-rotation", 0 );

    }
    else {
        
      rotationValue = parseInt( dataAttribute, 10 );
        
    }

    rotationValue += 90;
    rotationValue = ( rotationValue % 360 );
    
    RotateImageExtension.target.setAttribute( "data-rotation", rotationValue );
    RotateImageExtension.target.style.transform = "rotate(" + rotationValue + "deg)";

  }

};


document.addEventListener( "contextmenu", function( event ) {

    RotateImageExtension.target = event.target;

});

// https://developer.chrome.com/extensions/messaging
RotateImageExtension.browser.runtime.onMessage.addListener(
    function( request, sender, sendResponse ) {

        let response = {
            message : "Unknown command requested"
        };
        
        if( "string" === typeof request.command && request.command === "rotateImage" ) {

            RotateImageExtension.executeCommand();

            response.message = "Command has been executed";

        }

        sendResponse( response );

    }
);
