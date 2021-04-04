import Auth from "../../services/Auth.js";
import AbstractView from "../AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Logout");

    this.email = "";
    this.password = "";
  }

  async getHtml() {
    return `

    <div class="login-container">
    <div class="login-box">

    <svg class="svg-off" version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="75.000000pt" height="75.000000pt" viewBox="0 0 512.000000 512.000000"
    preserveAspectRatio="xMidYMid meet">
   
   <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
   fill="#3ae8e1" stroke="none">
   <path d="M485 4640 c-159 -32 -297 -135 -374 -279 -64 -121 -61 -21 -61 -1835
   0 -1820 -4 -1703 63 -1831 44 -83 146 -184 227 -223 136 -66 61 -63 1421 -60
   l1234 3 69 27 c137 53 240 147 301 273 51 108 55 143 55 513 0 317 -2 340 -21
   382 -43 96 -132 148 -227 134 -60 -9 -131 -59 -159 -113 -23 -43 -23 -49 -23
   -368 0 -359 -3 -377 -62 -413 -33 -20 -47 -20 -1201 -20 -1283 0 -1213 -3
   -1250 59 -16 27 -17 140 -17 1641 0 1501 1 1614 17 1641 37 62 -33 59 1250 59
   1154 0 1168 0 1201 -20 60 -37 62 -52 62 -432 0 -317 2 -346 20 -386 36 -80
   104 -123 194 -123 64 0 94 11 141 53 74 64 75 68 75 480 0 228 -4 387 -11 420
   -31 148 -149 302 -280 366 -133 65 -62 62 -1394 61 -665 -1 -1228 -5 -1250 -9z"/>
   <path d="M3972 3577 c-46 -14 -121 -84 -143 -132 -25 -54 -24 -138 2 -194 13
   -31 82 -108 221 -247 l201 -203 -899 -3 c-893 -3 -899 -3 -944 -24 -187 -89
   -190 -338 -5 -438 40 -21 43 -21 948 -26 l907 -5 -206 -205 c-128 -128 -213
   -220 -225 -245 -24 -52 -24 -137 0 -190 37 -83 126 -144 210 -145 104 0 92
   -11 569 464 244 243 455 458 468 478 33 51 32 113 -2 175 -39 72 -863 895
   -928 928 -54 27 -115 31 -174 12z"/>
   </g>
   </svg>
   

  <h1>Logout</h1>

 
    <div>
        <button id="logout">Log out</button>
    </div>
    </div>
    </div>
  </div>
        `;
  }

  async getListeners() {
    document.querySelector("#logout").addEventListener("click", async (e) => {
      const auth = new Auth();

      await auth.logout();

      this.params.onNavigate('/');
    });
  }

}