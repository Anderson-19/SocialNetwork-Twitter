export const dayAndMonth = ( arg: any ) => {

  const date = new Date(arg);
  switch(date.getMonth()){
    case 1: return `${ date.getDate() } January`;
    case 2: return `${ date.getDate() } Febrary`;
    case 3: return `${ date.getDate() } March`;
    case 4: return `${ date.getDate() } April`;
    case 5: return `${ date.getDate() } May`;
    case 6: return `${ date.getDate() } June`;
    case 7: return `${ date.getDate() } July`;
    case 8: return `${ date.getDate() } Agust`;
    case 9: return `${ date.getDate() } Septembre`; 
    case 10: return `${ date.getDate() } Octobre`;
    case 11: return `${ date.getDate() } Novembre`;
    case 12: return `${ date.getDate() } Dicembre`;
  }
}

