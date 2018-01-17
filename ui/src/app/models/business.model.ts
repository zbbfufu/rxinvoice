export class BusinessModel {
    reference: string;
    name: string;

    // FIXME not sure about the 2 next attributes, check customer detail business
    caInvoiced: number;
    caFixed: number;
    creationDate: Date;

  constructor() {
  }
}
