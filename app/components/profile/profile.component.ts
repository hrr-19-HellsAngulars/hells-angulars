import { Component, OnInit } from "@angular/core";
import { ProfileService }    from "./profile.service";

import { AddModalService }     from "../add_modal/addModal.service";

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
  public completedTransactions: Array<any>;
  public userId: string;
  public availableFunds: Number;
  private stripeAccount: any;
  private today: Date = new Date();

  constructor(
    private profileService: ProfileService,
    private addModalService: AddModalService
  ) { }

  getUserIdFromProfile() {
    this.userId = JSON.parse(localStorage.getItem("profile")).user_id;
  }

  getUserInfo() {
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

  getUserProducts(userId: number) {
    this.profileService
      .getUserProducts(userId)
      .then(response => {
        const products = JSON.parse(response._body);
        this.products = products;
      })
      .catch(err => console.log(err));
  }

  getUserTransactions(userId: number) {
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

  getUserRentals(userId: number) {
    this.profileService
      .getUserRentals(userId)
      .then(response => {
        const rentals = JSON.parse(response._body);
        this.rentals = rentals;
        console.log(this.rentals);
      })
      .catch(err => console.log(err));
  }

  getAvailableFunds() {
    let funds = 0;
    this.completedTransactions.forEach(transaction => {
      funds += +transaction.totalvalue;
    });
    this.availableFunds = funds;
  }

  ngOnInit(): void {
    this.getUserIdFromProfile();
    this.getUserInfo();
  }

  onSelect(rental: any) {
    this.selectedTransaction = rental;
  }

  closeTransaction(id: number) {
    this.profileService.closeTransaction(id);
  }
  public open(content: any) {
    this.addModalService.open(content);
  }

  public close() {
    this.addModalService.close();
    this.getUserInfo();
  }

  public convertDate(date: string) {
    return date.slice(0, 10);
  }
}
