import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Dashboard");
  }

  async getHtml() {
    return `
<div class="main-container">
    <div class="container">
       <div class="item">
          <div class="icon-container">
             <i class="fas fa-envelope"></i>
             <h3>Personal Note</h3>
          </div>
       </div>
       <div class="item">
          <div class="icon-container">
             <i class="fas fa-database"></i>
             <h3>Team Notes</h3>
             <a href="/posts" data-link>View recent posts</a>
          </div>
       </div>
       <div class="item">
          <div class="icon-container">
             <i class="fas fa-users"></i>
             <h3>Teams</h3>
          </div>
       </div>
       <div class="item">
          <div class="icon-container">
             <i class="fas fa-cog"></i>
             <h3>Settings</h3>
          </div>
       </div>
    </div>
 </div>
        `;
  }
}
