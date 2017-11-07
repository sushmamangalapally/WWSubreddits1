import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-subreddits',
  templateUrl: './subreddits.component.html',
  styleUrls: ['./subreddits.component.css']
})
export class SubredditsComponent implements OnInit {

  constructor(private _httpService: HttpService) { }
  subreddit = { title:'' }; //for adding subreddit titles
  subreddits = []; //for adding subreddit list
  combostring = ""; //for url with multiple subreddits in .json
  poporno = false; //hide modal css
  popup; //hide modal css
  str; //declaring str -> cleaning up the submissions
  thelink; //post's link
  thetitle; //post's title
  listofnews; //list of posts for all news
  subredditsubject; //subject display
  selftext; //subtext display

  /* so we see each post's info */
  seeAllNews(data){
    this.poporno = true;
    this.thelink = data.permalink;
    this.thetitle = data.title;
    this.subredditsubject = data.subreddit;
    this.selftext = data.selftext;
  }

  /* close modal using poporno variable from css */
  closeModal(){
    this.poporno = false;
  }

  /* to delete subreddit topic */
  deleteSubreddit(subReddit){
    for(var i = 0; i < this.subreddits.length; i++){
      if(subReddit == this.subreddits[i]){
        this.subreddits.splice(i, 1);
        this.combostring = "";
        this.displayAll(this.subreddits); 
      }
    }
  }

  /* when the user submits new subreddit */
  onSubmit(){
    this.str = this.subreddit.title ;
    console.log(this.str)
    console.log("/subreddits/search")
    this.str = this.str.replace(/\s/g, '');
    this.subreddits.push(this.str);
    this.combostring = "";
    this.displayAll(this.subreddits);
    
  }

  /* shows specific subreddits from http.service.ts*/
  displayAll(subreddits){
    for(var i = 0; i < subreddits.length; i++){
      this.combostring += "+"+subreddits[i]
    }    
    console.log(this.subreddits);
    console.log(this.combostring)
    this.subreddit = { title:'' };
    this._httpService.specificSubreddits(this.combostring)
      .then((specificnews) => {
        console.log(specificnews.data.children)
        this.listofnews = specificnews.data.children;
      })
      .catch((err) => {
        console.log(err);
      })

  }

  /* when the user first vists the page, all news have already been displayed */
  ngOnInit() {
    this._httpService.showAllPosts()
      .then((allnews) => {
        console.log(allnews.data.children)
        this.listofnews = allnews.data.children;
      })
      .catch((err) => {
        console.log(err);
      })
    }



}
