export class Token {
  type: string;
  value: string;

  constructor(params: Token){
    this.type = params.type;
    this.value = params.value;
 }
}
