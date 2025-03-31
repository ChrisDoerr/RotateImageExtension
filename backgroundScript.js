
/* NAMESPACE */

const ROTATE_IMAGE = {
  browser     			: ( "object" === typeof chrome ? chrome : browser ),
  clockwise : {
    menuId : "ROTATE_IMAGE_MENU_ID_CLOCKWISE",
    sendCommand 			: function( info, tab ) {
  
      // Send message to content script
      ROTATE_IMAGE.browser.tabs.sendMessage(
        tab.id,
        {
          command : "rotateImageCW"
        },
        function( response ) {
          // console.log( response );
        }
      );
    }  
  },
  counterClockwise : {
    menuId : "ROTATE_IMAGE_MENU_ID_COUTNERCLOCKWISE",
    sendCommand 			: function( info, tab ) {
  
      // Send message to content script
      ROTATE_IMAGE.browser.tabs.sendMessage(
        tab.id,
        {
          command : "rotateImageCCW"
        },
        function( response ) {
          // console.log( response );
        }
      );
    }
  }
};


/**
 * Register a new context menu item "Rotate Image".
 * But only on <img> elements!
 */
ROTATE_IMAGE.browser.contextMenus.create({
  id        : ROTATE_IMAGE.clockwise.menuId,
  title     : "Rotate Image +90",
  contexts  : [
    "image"
  ]
});

ROTATE_IMAGE.browser.contextMenus.create({
  id        : ROTATE_IMAGE.counterClockwise.menuId,
  title     : "Rotate Image -90",
  contexts  : [
    "image"
  ]
});


// Send the "rotateImage" command/message when
// the context menu item has been selected.
ROTATE_IMAGE.browser.contextMenus.onClicked.addListener( ROTATE_IMAGE.clockwise.sendCommand );
ROTATE_IMAGE.browser.contextMenus.onClicked.addListener( ROTATE_IMAGE.counterClockwise.sendCommand );
