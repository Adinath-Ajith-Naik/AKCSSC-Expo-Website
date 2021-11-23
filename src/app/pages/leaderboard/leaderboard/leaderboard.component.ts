import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  leaderboardEntry: any;
  constructor(
    private service: CommonService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.leaderBoard();
  }

  public leaderBoard() {
    this.spinner.show();
    this.service.leaderboard().subscribe((res: any) => {
      if (res.acknowledgement.status === "SUCCESS") {
        this.toast.success(res.acknowledgement.message, res.acknowledgement.status);
        this.leaderboardEntry = res.leaderboard;
        this.spinner.hide();
      }
      else {
        this.toast.error(res.acknowledgement.message, res.acknowledgement.status);
      }
      this.spinner.hide();
    }, (err: HttpErrorResponse) => {
      console.warn(err);
      this.spinner.hide();
    });
  }
}
