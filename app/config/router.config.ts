import { googleState, homeState, productsState, productDetailsState, profileState, searchState } from "../states";
import { Inject, Injectable } from "@angular/core";
import { UIRouter }         from "ui-router-ng2";

/** UIRouter Config  */
@Injectable()
export class MyUIRouterConfig {
  constructor(@Inject(UIRouter) router: UIRouter) {

    // If no URL matches, go to the `home` state by default
    router.urlRouterProvider.otherwise(
      ($injector, $location) => JSON.stringify(router.stateService.go("home"))
    );
  }
}
