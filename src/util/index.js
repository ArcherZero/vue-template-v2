import des from './des'

function IsPC() {
  const userAgentInfo = navigator.userAgent
  const Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"
  ]
  const flag = true
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}

// base64转blob
function convertBase64UrlToBlob(urlData) {
  const bytes = window.atob(urlData.split(",")[1]) // 去掉url的头，并转换为byte
  // 处理异常,将ascii码小于0的转换为大于0
  const ab = new ArrayBuffer(bytes.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new Blob([ab], {
    type: "image/jpg"
  })
}

// 深度拷贝
function deepClone(obj) {
  let objClone = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === "object") {
    for (let name in obj) {
      if (obj.hasOwnProperty(name)) {
        // 判断ojb子元素是否为对象，如果是，递归复制
        if (obj[name] && typeof obj[name] === "object") {
          objClone[name] = deepClone(obj[name])
        } else {
          // 如果不是，简单复制
          objClone[name] = obj[name]
        }
      }
    }
  }
  return objClone
}

// 定义一个用来加密的方法
function encryptByDES(message, key='zjkysoft') {
  const keyHex = des.CryptoJS.enc.Utf8.parse(key);
  const encrypted = des.CryptoJS.DES.encrypt(message, keyHex, {
    mode: des.CryptoJS.mode.ECB,
    padding: des.CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

// 过滤隐藏的菜单
function filterMenu (menu) {
  const result = []
  menu.forEach(item =>{
    if (!item.hidden) {
      if (item.subMenus) item.subMenus = filterMenu(item.subMenus)
      result.push(item)
    }
  })
  return result
}

export {
  IsPC,
  deepClone,
  convertBase64UrlToBlob,
  encryptByDES,
  filterMenu
}
