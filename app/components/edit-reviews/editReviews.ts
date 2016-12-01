import { Component, Input, Output, EventEmitter, OnInit }         from "@angular/core";
import { NewReview }        from "../add-review/newReview";
import { EditReviewService } from "./editReviews.service";

import { NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
  moduleId: module.id,
  selector: "editreview-form",
  templateUrl: "editReviews.html",
  styleUrls: [ "editReviews.css" ],
  providers: [ NgbRatingConfig ],
})

export class EditReviewForm {
  @Input() transaction: any;
  @Input() userId: any;
  @Input() review: any;
  @Output()
  close: EventEmitter<any> = new EventEmitter();

  public selected = 0;
  public hovered = 0;
  public readonly = false;

  public model = new NewReview();

  constructor(
    private editReviewService: EditReviewService,
    private config: NgbRatingConfig,
  ) {
    config.max = 5;
  }

  public ngOnInit(): void {
    console.log(this.review);
    this.model.text = this.review.text
  }

  public onSubmit(model: NewReview) {
    console.log(this.userId);
    console.log(this.transaction);

    model.authorId = this.userId;
    model.transactionId = this.transaction.id;
    model.productId = this.transaction.product_id;
    model.buyerId = this.transaction.buyer_id;
    model.sellerId = this.transaction.seller_id;
    model.rating = this.selected;
    this.editReviewService.updateReview(model, this.review.id)
        .then(result => {
          this.close.emit();
        })
        .catch(error => {
          console.log(error);
        });
  }

  public deleteReview(){
    this.editReviewService.deleteReview(this.review.id);
  }

}
