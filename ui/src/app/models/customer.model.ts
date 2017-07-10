export class Customer {
  number: string;
  client: string;
  creationDate: string;
  invoiceDate: string;
  deadlineDate: string;
  deal: string;
  type: string;
  freeTaxAmount: string;
  amount : string;
  tax : string;
  comments : any;
  attachments: any;
  status : string;

  constructor(number: string, client: string, creationDate : string, invoiceDate : string, deadlineDate : string, deal : string,
              type : string, freeTaxAmount : string, amount : string, tax : string, comments : any, attachments : any, status : string) {
    this.number = number;
    this.client = client;
    this.creationDate = creationDate;
    this.invoiceDate = invoiceDate;
    this.deadlineDate = deadlineDate;
    this.deal = deal;
    this.type = type;
    this.freeTaxAmount = freeTaxAmount;
    this.amount = amount;
    this.tax  = tax;
    this.comments  = comments;
    this.attachments = attachments;
    this.status = status;
  }
}
