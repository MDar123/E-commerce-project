export interface signup{
    name:string;
    password:number;
    email:string;
}

export interface login{
    email:string;
    password:number;
}


export interface product {
    name:string;
    Price:number;
    Color:string;
    Category:string;
    Description:string;
    image:string;
    id:number;
    quantity:undefined | number;
    productId:undefined | number;
}

export interface cart {
    name:string;
    Price:number;
    Color:string;
    Category:string;
    Description:string;
    image:string;
    id:number | undefined;
    quantity:undefined | number;
    userId : number;
    productId : number;
}

export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
  }

  export interface order {
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:string,
    id:number|undefined ,
  }