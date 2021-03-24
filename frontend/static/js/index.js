import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import PostView from "./views/PostView.js";
import Settings from "./views/Settings.js";
import NotFound from "./views/NotFound.js";
import Utils from "./services/Utils.js";
import Auth from "./services/Auth.js";
import Login from "./views/Login.js";
import Logout from "./views/Logout.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

  return Object.fromEntries(keys.map((key, i) => {
    return [key, values[i]];
  }));
};

const navigateTo = url => {
  history.pushState(null, null, url);
  router();
};

const isAuthenticated = async () => {
  const auth = new Auth();

  return await auth.getToken();
}

const router = async () => {
  const isAuthorized = await isAuthenticated();
  console.log(isAuthorized);
  const notFoundRoute = { path: "/404", view: NotFound };

  let routes = [
    { path: "/", view: Dashboard, text: 'Home', shouldDisplay: true, },
    { path: "/login", view: Login, text: 'Login', shouldDisplay: true, },
    { path: "/logout", view: Logout, text: 'Logout', shouldDisplay: true, },
  ];

  if (isAuthorized) {
    routes = [
      { path: "/", view: Dashboard, text: 'Home', shouldDisplay: true },
      { path: "/posts", view: Posts, text: 'Posts', shouldDisplay: true },
      { path: "/posts/:id", view: PostView, shouldDisplay: false },
      { path: "/settings", view: Settings, text: 'Settings', shouldDisplay: true },
      { path: "/logout", view: Logout, text: 'Logout', shouldDisplay: true, },
    ];
  }

  // build nav
  document.querySelector("#nav").innerHTML =
    routes
      .filter(x => x.shouldDisplay)
      .map(x => `<a href="${x.path}" class="nav__link" data-link>${x.text}</a>`);

  // Test each route for potential match
  const potentialMatches = routes.map(route => {
    return {
      route,
      result: location.pathname.match(pathToRegex(route.path))
    };
  });

  let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

  /* Route not found - return first route OR a specific "not-found" route */
  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname]
    };
  }

  const view = new match.route.view({ ...getParams(match), onNavigate: navigateTo });
  document.querySelector("#app").innerHTML = await view.getHtml();
  await view.getListeners();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  /* Document has loaded -  run the router! */
  router();
});
