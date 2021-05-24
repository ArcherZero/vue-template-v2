import des from "./des";
import EXIF from "exif-js";

function IsPC() {
  const userAgentInfo = navigator.userAgent;
  const Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod",
  ];
  const flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

/**
 * @description 判断字符串或数字为空，可以为0
 * @param {String, Number} value
 */
function isBlank (value) {
  try {
    const _value = value.toString()
    return !_value
  } catch (error) {
    return true
  }
}

// base64转blob
function convertBase64UrlToBlob(urlData) {
  const bytes = window.atob(urlData.split(",")[1]); // 去掉url的头，并转换为byte
  // 处理异常,将ascii码小于0的转换为大于0
  const ab = new ArrayBuffer(bytes.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], {
    type: "image/jpg",
  });
}

// 深度拷贝
function deepClone(obj) {
  let objClone = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === "object") {
    for (let name in obj) {
      if (obj.hasOwnProperty(name)) {
        // 判断ojb子元素是否为对象，如果是，递归复制
        if (obj[name] && typeof obj[name] === "object") {
          objClone[name] = deepClone(obj[name]);
        } else {
          // 如果不是，简单复制
          objClone[name] = obj[name];
        }
      }
    }
  }
  return objClone;
}

// 定义一个用来加密的方法
function encryptByDES(message, key = "zjkysoft") {
  const keyHex = des.CryptoJS.enc.Utf8.parse(key);
  const encrypted = des.CryptoJS.DES.encrypt(message, keyHex, {
    mode: des.CryptoJS.mode.ECB,
    padding: des.CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

// 过滤隐藏的菜单
function filterMenu(menu) {
  const result = [];
  menu.forEach((item) => {
    if (!item.hidden) {
      if (item.subMenus) item.subMenus = filterMenu(item.subMenus);
      result.push(item);
    }
  });
  return result;
}

// 获取手机类型
function getIos() {
  if (!!navigator.userAgent.match(/cpu iphone os (.*?) like mac os/)) {
    return "IOS";
  } else if (navigator.userAgent.indexOf("Android 10") > -1) {
    return "Android10";
  }
}

function versionIOS() {
  let ua = navigator.userAgent.toLowerCase();

  if (ua.indexOf("like mac os x") > 0) {
    let reg = /os [\d._]*/gi;
    let verinfo = ua.match(reg);
    let version = (verinfo + "").replace(/[^0-9|_.]/gi, "").replace(/_/gi, ".");
    let arr = version.split(".");
    console.log(arr);
    if (arr && arr[0] > 12 && arr[1] > 3) {
      return true;
    } else if (arr && arr[0] > 13 && arr[1] >= 0) {
      return true;
    } else {
      return false;
    }
  }
}

// 图片压缩旋转（完整版）
function compresstypeB(fileObj, callback) {
  let Orientation = null;
  if ((!getIos() || getIos() === "IOS") && versionIOS()) {
    console.log("不旋转");
    EXIF.getData(fileObj, function () {
      Orientation = EXIF.getTag(this, "Orientation");
      let image = new Image();
      image.src = URL.createObjectURL(fileObj);
      image.onload = function () {
        let imgWidth = this.width,
          imgHeight = this.height;
        // 控制上传图片的宽高
        if (imgWidth > imgHeight) {
          imgWidth = 400;
          imgHeight = this.height / (this.width / 400);
        } else if (imgWidth < imgHeight) {
          imgWidth = this.width / (this.height / 400);
          imgHeight = 400;
        }

        let canvas = document.createElement("canvas"),
          ctx = canvas.getContext("2d");
        canvas.width = imgWidth;
        canvas.height = imgHeight;
        ctx.drawImage(this, 0, 0, imgWidth, imgHeight);

        let data = canvas.toDataURL("image/jpeg", 0.9);

        // 压缩完成执行回调
        const newFile = convertBase64UrlToBlob(data);
        callback(newFile);
      };
    });
  } else {
    EXIF.getData(fileObj, function () {
      Orientation = EXIF.getTag(this, "Orientation");
      let image = new Image();
      image.src = URL.createObjectURL(fileObj);
      image.onload = function () {
        let imgWidth = this.width,
          imgHeight = this.height;
        // 控制上传图片的宽高
        if (imgWidth > imgHeight) {
          imgWidth = 400;
          imgHeight = this.height / (this.width / 400);
        } else if (imgWidth < imgHeight) {
          imgWidth = this.width / (this.height / 400);
          imgHeight = 400;
        }
        let canvas = document.createElement("canvas"),
          ctx = canvas.getContext("2d");
        canvas.width = imgWidth;
        canvas.height = imgHeight;
        // if (Orientation && Orientation !== 1 && Orientation !== 0 && isRotate) {
        if (Orientation && Orientation !== 1 && Orientation !== 0) {
          switch (Orientation) {
          case 6: // 旋转90度
            console.log(90);
            canvas.width = imgHeight;
            canvas.height = imgWidth;
            ctx.rotate(Math.PI / 2);
            // (0,-imgHeight) 从旋转原理图那里获得的起始点
            ctx.drawImage(this, 0, -imgHeight, imgWidth, imgHeight);
            break;
          case 3: // 旋转180度
            console.log(180);
            ctx.rotate(Math.PI);
            ctx.drawImage(this, -imgWidth, -imgHeight, imgWidth, imgHeight);
            break;
          case 8: // 旋转-90度
            console.log(-90);
            canvas.width = imgHeight;
            canvas.height = imgWidth;
            ctx.rotate((3 * Math.PI) / 2);
            ctx.drawImage(this, -imgWidth, 0, imgWidth, imgHeight);
            break;
          }
        } else {
          console.log(Orientation);
          ctx.drawImage(this, 0, 0, imgWidth, imgHeight);
        }

        let data = canvas.toDataURL("image/jpeg", 0.9);

        // 压缩完成执行回调
        const newFile = convertBase64UrlToBlob(data);
        callback(newFile);
      };
    });
  }
}

export {
  IsPC,
  deepClone,
  convertBase64UrlToBlob,
  encryptByDES,
  filterMenu,
  compresstypeB,
  isBlank
}
