import { Component, OnInit } from "@angular/core";
import { ProfileService }    from "./profile.service";

import { AddModalService }     from "../add_modal/addModal.service";

import * as moment from "moment";

@Component({
  moduleId: module.id,
  selector: "profile",
  styleUrls: ["profile.component.css"],
  templateUrl: "profile.component.html",
})

export class ProfileComponent implements OnInit {
  public user: any;
  public products: Array<any>;
  public rentals: Array<any>;
  public transactions: Array<any>;
  public selectedTransaction: any;
  public selectedProduct: any;
  public completedTransactions: Array<any>;
  public userId: string;
  public availableFunds: Number;
  private stripeAccount: any;
  private today: any = moment();

  constructor(
    private profileService: ProfileService,
    private addModalService: AddModalService
  ) { }

  public getUserIdFromProfile() {
    this.userId = JSON.parse(localStorage.getItem("profile")).user_id;
  }

  public getUserInfo() {
    this.profileService
      .getUserInfo(this.userId)
      .then(response => {
        const user = JSON.parse(response._body);
        this.user = user;
        this.stripeAccount = user.stripeaccountid;
        this.getUserProducts(this.user.id);
        this.getUserRentals(this.user.id);
        this.getUserTransactions(this.user.id);
      })
      .catch(err => console.log(err));
  }

  public getUserProducts(userId: number) {
    this.profileService
      .getUserProducts(userId)
      .then(response => {
        const products = JSON.parse(response._body);
        this.products = products;
      })
      .catch(err => console.log(err));
  }

  public getUserTransactions(userId: number) {
    this.profileService
      .getUserTransactions(userId)
      .then(response => {
        const transactions = JSON.parse(response._body);
        this.transactions = transactions;
        this.completedTransactions = transactions.filter(transaction => {
          return transaction.status_id === 2;
        });
        this.getAvailableFunds();
      })
      .catch(err => console.log(err));
  }

  public getUserRentals(userId: number) {
    this.profileService
      .getUserRentals(userId)
      .then(response => {
        const rentals = JSON.parse(response._body);
        this.rentals = rentals;
      })
      .catch(err => console.log(err));
  }

  public getAvailableFunds() {
    let funds = 0;
    this.completedTransactions.forEach(transaction => {
      funds += +transaction.totalvalue;
    });
    this.availableFunds = funds;
  }

  public ngOnInit(): void {
    this.getUserIdFromProfile();
    this.getUserInfo();
  }

  public onSelect(rental: any) {
    this.selectedTransaction = rental;
  }

  public closeTransaction(id: number) {
    let context = this;
    this.profileService.closeTransaction(id)
      .then(response => {
        console.log(response);
        context.getUserTransactions(context.user.id);
      });
  }

  public onSelectProduct(product: any) {
    this.selectedProduct = product;
  }

  public open(content: any) {
    this.addModalService.open(content);
  }

  public close() {
    this.addModalService.close();
    this.getUserInfo();
  }

  public transfer() {
    window.alert("We have received your request. Please allow 3-5 business days to process the payment");
  }

  public convertDate(date: string) {
    return date.slice(0, 10);
  }

  public compare(dateTimeA: any, dateTimeB: any) {
    let momentA = moment(dateTimeA, "YYYY-MM-DD");
    let momentB = moment(dateTimeB, "YYYY-MM-DD");
    if (momentA > momentB) {
      return 1;
    } else if (momentA < momentB) {
      return -1;
    } else {
      return 0;
    }
  }
}
