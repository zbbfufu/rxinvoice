export class Invoice {
    number: string;
    client: string;

    constructor(number: string, client: string) {
        this.number = number;
        this.client = client;
    }
}