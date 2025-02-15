const Menu = [
  {header: ''},
  {
    title: 'Alunos',
    group: 'apps',
    icon: 'menu',
    name: 'Alunos',
    href: '/students/list'
  },
  // {
  //   title: 'Forms & Controls',
  //   group: 'forms',
  //   component: 'forms',
  //   icon: 'edit',
  //   items: [
  //     {name: 'basic', title: 'General', href: '/forms/basic-forms'},
  //     {name: 'selects', title: 'Selects', badge: 'new', href: '/forms/selects'},
  //     {name: 'selection-controls', title: 'Selection Controls', href: '/forms/selection-controls'},
  //     {name: 'text-fields', title: 'Text Fields', href: '/forms/text-fields'},
  //     {name: 'steppers', title: 'Steppers', href: '/forms/steppers'},
  //     {name: 'editors', title: 'Editors', href: '/forms/editors'},
  //   ]
  // },
];
// reorder menu
Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
});

export default Menu;
