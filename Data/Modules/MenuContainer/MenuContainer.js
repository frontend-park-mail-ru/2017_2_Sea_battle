/**
 * MenuContainer - module for basic menu container
 * Container is supposed to hold menu items, menu title and back button(if previous menu is set)
 */
;
(function()
{
     const MenuItem = document.MenuItem;
     const Widget = document.Widget;

     class MenuContainer extends Widget
     {
         constructor(parent = document.body, menuClass = "menuContainer",
                     menuTitleText = "", menuTitleTextClass = "menuTitle",
                     previousMenu = null, backButtonClass = "")
         {
             super(parent, "div", menuClass);

             if(menuTitleText != "")
             {
                 this.title = new MenuItem(this.element, menuTitleTextClass, menuTitleText);
                 this.appendChildWidget(this.title);
             }
             else
                 this.title = null;

             if(previousMenu !== null && previousMenu !== undefined)
             {
                 this.backButton = new MenuItem(this.element, backButtonClass);
                 this.backButton.setClickAction(function(){document.Services.changeMenu(previousMenu);});
                 this.backButton.text = "Back";
                 this.appendChildWidget(this.backButton);
             }
             else
                 this.backButton = null;
         }

         appendWidget(appendeeWidget)
         {
             this.appendNode(appendeeWidget.element);
         }

         appendNode(appendeeNode)
         {
             if(this.backButton !== null)
                 this.element.insertBefore(appendeeNode, this.backButton.element);
             else
                 this.element.appendChild(appendeeNode);
         }

         createItem(itemText = "", itemClass = "", onClick = undefined)
         {
             let item = new MenuItem(this.element, itemClass, itemText);
             item.setClickAction(onClick);
             this.appendWidget(item);

             return item;
         }

         appendNewLine()
         {
             let node = document.createElement("div");
             node.className = "newLine";
             if(this.backButton !== null)
                 this.element.insertBefore(node, this.backButton.element);
             else
                 this.element.appendChild(node);
         }
     }

     document.MenuContainer = MenuContainer;

})();
