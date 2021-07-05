class write {
  constructor(array = ["test"], node, time = 500) {
    this.node = node;
    let index = 0;
    let { all } = this;
    all = all.bind(this);
    (async e => {
      while (true) {
        await all(array[index], time);
        index++;
        index = array.length === index ? 0 : index;
      }
    })();
  }
  write(string = "", time = 500) {
    let index = 0;
    return new Promise(resolve => {
      let loop = setInterval(e => {
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
    return new Promise(resolve => {
      let loop = setInterval(e => {
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
  "متعددة المنصات"
];
let subtitile = new write(words, document.querySelector("#subHead"), 300);
function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

document.querySelector("#date").innerHTML = new Date().getFullYear();
document.querySelector("#down").onclick = function(){
  let to = document.body.offsetHeight - document.querySelector("nav").offsetHeight;
  window.scrollTo(0,to);
}
let style = document.querySelector(".phones").style;
let runMore = false;
style.height = "0px"
document.querySelector("#more").onclick = async function(){
  if(runMore) return; 
  runMore =  !runMore;
  if(style.height === "0px"){
    style.height = "261.8px"
    await wait(1000);
  }else {
    style.height = "0px"
    await wait(1000);
  }
  runMore =  !runMore;
}