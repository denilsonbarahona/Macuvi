import {structure} from './side_structure';
import {mobileStructure} from './mobile_structure';

/**
 * 
 * @param {*} array 
 * @returns 
 */

const sortByIndex = (array) =>{
    const items = array;
    const itemSize = items.length;

    for (let i=0; i < itemSize; i++) {
        for (let y=0; y < (itemSize -i -1); y++) {
            if(items[y].index >items[y+1].index ){
                var temp = items[y]
                    items[y] = items[y+1]
                    items[y+1] = temp;
            }
        }
    }

    return items;
}

/**
 * 
 * @param {*} access 
 * @param {*} active 
 */
export const createSideMenu =(access, active)=>{
  const menu = []

  Object.keys(access).forEach(key=>{ 
    structure(active).forEach(subMenu=>{
        const subItem = []
        subMenu.sub_items.forEach(item=>{
            if (access[key] && item[key] ) {              
                subItem.push ({ ...item[key], index: item.index })
            }
        }) 

        if (subItem.length) {
            menu[subMenu.type] = { header: subMenu.header, 
                items: menu[subMenu.type] === undefined?subItem: menu[subMenu.type].items.concat(subItem) }
        }
    })
  })

  Object.keys(menu).forEach(key=>{
    const items= sortByIndex(menu[key].items)
    menu[key].items = items
  })
  window.setSideMenu(menu)
}

/**
 * 
 * @param {*} access 
 */
export const createMobileMenu=(access)=>{
    const menu = []
    Object.keys(access).forEach(key=>{ 
      mobileStructure().forEach(subMenu=>{
          const subItem = []
          subMenu.sub_items.forEach(item=>{
              if (access[key] && item[key] ) {              
                  subItem.push ({ ...item[key], index: item.index })
              }
          }) 
  
          if (subItem.length) {
              menu[subMenu.type] = { header: subMenu.header, 
                  items: menu[subMenu.type] === undefined?subItem: menu[subMenu.type].items.concat(subItem) }
          }
      })
    })
  
    Object.keys(menu).forEach(key=>{
      const items= sortByIndex(menu[key].items)
      menu[key].items = items
    })
   
    window.setMobileMenu(menu)
}
