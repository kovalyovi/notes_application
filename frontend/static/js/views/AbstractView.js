export const $ = (_) => document.querySelector(_);

export default class {
  constructor(params) {
    this.params = params;
  }

  setTitle(title) {
    document.title = title;
  }

  async getHtml() {
    return "";
  }

  async getListeners() { }

  resetError = (_) => {
    $(".login-box").classList.remove("error");
  };


  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  setPending = (status) => {
    document.querySelectorAll(".form-buttons").forEach(x => x.disabled = status);
    if (status) {
      $("#pending-screen").classList.remove("hidden");
    } else {
      $("#pending-screen").classList.add("hidden");
    }
  }
}