let $ = (e) => document.querySelector(e);
class write {
  constructor(array = ["test"], node, time = 500) {
    this.node = node;
    let index = 0;
    let { all } = this;
    all = all.bind(this);
    (async (e) => {
      while (true) {
        await all(array[index], time);
        index++;
        index = array.length === index ? 0 : index;
      }
    })();
  }
  write(string = "", time = 500) {
    let index = 0;
    return new Promise((resolve) => {
      let loop = setInterval((e) => {
        this.node.innerHTML = string.slice(0, index);
        if (index === string.length) {
          clearInterval(loop);
          resolve("compleat");
        }
        index++;
      }, time);
    });
  }
  remove(time = 500) {
    let string = this.node.innerHTML;
    let index = string.length;
    return new Promise((resolve) => {
      let loop = setInterval((e) => {
        this.node.innerHTML = string.slice(0, index);
        if (index === 0) {
          clearInterval(loop);
          resolve("compleat");
        }
        index--;
      }, time);
    });
  }
  async all(string, time) {
    let { write, remove } = this;
    write = write.bind(this);
    remove = remove.bind(this);
    await this.write(string, time);
    await wait(1000);
    await this.remove(time);
    await wait(1000);
  }
}
let words = [
  "لغة مفتوحة المصدر",
  " تدعم البايثون، وسي بلاس بلاس",
  "متعددة المنصات",
];
let subtitile = new write(words, $("#subHead"), 300);
function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

$("#date").innerHTML = new Date().getFullYear();
$("#down").onclick = function () {
  let to = document.body.offsetHeight - $("nav").offsetHeight;
  window.scrollTo(0, to);
};
let navHeight;
document.body.onload = function () {
  navHeight = $("ul").offsetHeight + "px";
  $("#menu").style.setProperty("--height" , 0);
};

$(".hamburger").onclick = function(){
  this.classList.toggle("active")
  let style = $("#menu").style;
  if (style.getPropertyValue("--height") === navHeight) {
    this.classList
    style.setProperty("--height" , 0);
  } else {
    style.setProperty("--height" , navHeight);
  }
};
