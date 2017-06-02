import { Invoice } from './../models/invoice.model';
import { Injectable } from '@angular/core';

@Injectable()
export class InvoiceService {

    public fetchInvoices(): Invoice[] {
        return [
            new Invoice("00001", "Infoport", "20 Mai 2017", "25 Mai 2017", "25 Juin 2017", "Simar Aérien", "Prestation", "10 000", "12 000", "20 %", [{"date" : "23/05/2017", "content" : "Accusantium debitis sit nihil et quod iure."}, {"date" : "23/05/2017", "content" : "Accusantium debitis sit nihil et quod iure."}], [], "toBeRelaunched"),
            new Invoice("00002", "Algolinked", "22 Mai 2017", "27 Mai 2017", "27 Juin 2017", "Algolinked", "Prestation", "20 000", "24 000", "20 %", [{"date" : "23/05/2017", "content" : "Accusantium debitis sit nihil et quod iure."}], [], "toSend"),
            new Invoice("00003", "Arkhe Internationnal", "26 Mai 2017", "30 Mai 2017", "30 Juin 2017", "Kreafirm", "Prestation", "30 000", "36 000", "20 %", [], [{"importDate" : "28/05/2017", "name" : "contrat.doc"}], "toPrepare"),
            new Invoice("00004", "Naxos", "26 Mai 2017", "31 Mai 2017", "15 Juillet 2017", "C21 Mobile", "Prestation", "40 000", "48 000", "20 %", [], [], "toBeValidated")
        ];
    }
}