import { AuthHttp }        from "angular2-jwt";
import { Headers, Http }   from "@angular/http";
import { Injectable }      from "@angular/core";
import { myConfig }        from "./auth.config";
import { tokenNotExpired } from "angular2-jwt";

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  public headers: Headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  // Configure Auth0
  public lock = new Auth0Lock(myConfig.clientID, myConfig.domain, {
    additionalSignUpFields: [
      {
        name: "firstname",                              // required
        placeholder: "enter your first name",
      },
      {
        name: "lastname",                              // required
        placeholder: "enter your last name",
      },
    ],
    theme: {
      logo: "../../assets/gearbox_v1.png",
      primaryColor: "#579ed1",
    },
    languageDictionary: {
      title: "GEAR BOX",
    },
  });

  public userProfile: Object;
  public getData: string;

  constructor(private authHttp: AuthHttp, private http: Http) {
    // Set userProfile attribute of already saved profile
    let context = this;
    this.userProfile = JSON.parse(localStorage.getItem("profile"));
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult: any) => {
      localStorage.setItem("id_token", authResult.idToken);
      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }
        localStorage.setItem("profile", JSON.stringify(profile));
        context.userProfile = profile;
        this.findOrCreateUser(profile);
      });
    });

  }

  public authenticated() {
    // Check if there"s an unexpired JWT
    // This searches for an item in localStorage with key == "id_token"
    return tokenNotExpired();
  };

  public findOrCreateUser(profile) {
   return this.http.post("api/users", profile, {headers: this.headers})
    .map(res => res)
    .subscribe(
      data => data
    );
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem("id_token");
    localStorage.removeItem("profile");
    this.userProfile = undefined;
  };

}
