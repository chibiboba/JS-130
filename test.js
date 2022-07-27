function makeList() {
  let todo = [];
  return {
    add(arg) {
      let index = todo.indexOf(arg);
      if (index === -1) {
        todo.push(arg);
        console.log(`${arg} added!`);
      }
    },

    remove(arg) {
      let index = todo.indexOf(arg);
      if (index) {
        todo.splice(index, 1);
        console.log(`${arg} removed!`);
      }
    },

    list() {
      if (todo.length === 0) {
        console.log('The list is empty')
      } else {
        todo.forEach(item => console.log(item));
      }
    }
  };
}


let list = makeList();
list.add("peas");
// peas added!

list.list();
//peas

list.add("corn");
//corn added!

list.list();
//peas
//corn

list.remove("peas");
//peas removed!

list.list();
//corn