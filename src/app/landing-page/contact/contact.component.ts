import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

import { PortfolioDataService } from "./../../shared/services/portfolioData/portfolio-data.service";

@Component({
  selector: "app-contact",
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: "./contact.component.html",
  styleUrl: "./contact.component.scss",
})
export class ContactComponent {
  btnDisabled: boolean = true;
  policyChecked: boolean = false;
  isEmptyName: boolean = true;
  isEmptyMail: boolean = true;

  mailTest = true;
  http = inject(HttpClient);
  data = inject(PortfolioDataService);

  contactData = {
    name: "",
    email: "",
    message: "",
  };

  checkPolicy() {
    this.policyChecked = !this.policyChecked;
  }

  post = {
    endPoint: "https://portfolio.dev2k.net/sendMail.php",
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        "Content-Type": "text/plain",
        responseType: "text",
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    if (
      ngForm.submitted &&
      ngForm.form.valid &&
      this.policyChecked &&
      !this.mailTest
    ) {
      this.http
        .post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            ngForm.resetForm();
            this.policyChecked = false;
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info("send post complete"),
        });
    } else if (
      ngForm.submitted &&
      ngForm.form.valid &&
      this.policyChecked &&
      this.mailTest
    ) {
      ngForm.resetForm();
      this.policyChecked = false;
    }
  }
}
