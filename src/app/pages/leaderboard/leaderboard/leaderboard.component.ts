import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  leaderboardEntry: any;
  constructor(private service: CommonService) {}

  ngOnInit(): void {
    this.leaderBoard();
    console.log('leader');
  }

  public leaderBoard() {
    this.service.leaderboard().subscribe((res: any) => {
      console.log(res);
      this.leaderboardEntry = res.leaderboard;
    });
  }
}
