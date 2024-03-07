export const month = ( arg: any ) => {
    const date = new Date(arg);
    switch(date.getMonth()){
      case 1: return `January, ${ date.getFullYear() }`;
      case 2: return `Febrary, ${ date.getFullYear() }`;
      case 3: return `March, ${ date.getFullYear() }`;
      case 4: return `April, ${ date.getFullYear() }`;
      case 5: return `May, ${ date.getFullYear() }`;
      case 6: return `June, ${ date.getFullYear() }`;
      case 7: return `July, ${ date.getFullYear() }`;
      case 8: return `Agust, ${ date.getFullYear() }`;
      case 9: return `Septembre, ${ date.getFullYear() }`; 
      case 10: return `Octobre, ${ date.getFullYear() }`;
      case 11: return `Novembre, ${ date.getFullYear() }`;
      case 12: return `Dicembre, ${ date.getFullYear() }`;
    }
}