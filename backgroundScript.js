
/* NAMESPACE */

const ROTATE_IMAGE = {
  browser     			: ( "object" === typeof chrome ? chrome : browser ),
  clockwise : {
    menuId      : "ROTATE_IMAGE_MENU_ID_CLOCKWISE",
    sendCommand : function( info, tab ) {

      ROTATE_IMAGE.browser.tabs.sendMessage( tab.id, { command : "rotateImageCW" } );

    }

  },
  counterClockwise : {
    menuId      : "ROTATE_IMAGE_MENU_ID_COUTNERCLOCKWISE",
    sendCommand : function( info, tab ) {

      ROTATE_IMAGE.browser.tabs.sendMessage( tab.id, { command : "rotateImageCCW" } );

    }
  }
};


/**
 * Register a new context menu item "Rotate Image".
 * But only on <img> elements!
 */
ROTATE_IMAGE.browser.contextMenus.create(
  {
    id        : ROTATE_IMAGE.clockwise.menuId,
    title     : "Right",
    contexts  : [
      "image"
    ],
  }
);

ROTATE_IMAGE.browser.contextMenus.create(
  {
    id        : ROTATE_IMAGE.counterClockwise.menuId,
    title     : "Left",
    contexts  : [
      "image"
    ]
  }
);


// Send the "rotateImage" command/message when
// the context menu item has been selected.
ROTATE_IMAGE.browser.contextMenus.onClicked.addListener( ( info, tab) => {

  // console.log( info, tab );
  // console.log( info.menuItemId );

  switch( info.menuItemId ) {

    case ROTATE_IMAGE.clockwise.menuId:
      ROTATE_IMAGE.clockwise.sendCommand( info, tab );
      break;

    case ROTATE_IMAGE.counterClockwise.menuId:
      ROTATE_IMAGE.counterClockwise.sendCommand( info, tab );
      break;

  }

});