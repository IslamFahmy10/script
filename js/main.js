var siteName = document.getElementById("site");
var siteUrl = document.getElementById("link");
var condition1, condition2;

var allWebsites = [];
if (localStorage.getItem("websites") != null) {
  allWebsites = JSON.parse(localStorage.getItem("websites"));
  display();
}

function validation(x, y, v_n) {
  if (v_n == 1) {
    var regx = /[\w\d]{3,}/;
    if (regx.test(x)) {
      document.getElementById(y).style.border = "green 5px solid";
      document.getElementById("icon1").style.visibility = "hidden";
    } else {
      document.getElementById(y).style.border = "red 5px solid";
      document.getElementById("icon1").style.visibility = "visible";
    }
  } else if (v_n == 2) {
    var regx = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    if (regx.test(x)) {
      document.getElementById(y).style.border = "green 5px solid";
      document.getElementById("icon2").style.visibility = "hidden";
    } else {
      document.getElementById(y).style.border = "red 5px solid";
      document.getElementById("icon2").style.visibility = "visible";
    }
  }
  condition1 = document.getElementById("icon1").style.visibility;
  condition2 = document.getElementById("icon2").style.visibility;
}

function addWebsite() {
  if (condition1 == "hidden" && condition2 == "hidden") {
    var website = {
      name: siteName.value,
      url: siteUrl.value,
    };
    allWebsites.push(website);
    localStorage.setItem("websites", JSON.stringify(allWebsites));
    display();
    clr();
  } else {
    swl();
  }
}

function display() {
  var content = "";
  for (var i = 0; i < allWebsites.length; i++) {
    content =
      content +
      `<tr><td>${i}</td>
        <td>${allWebsites[i].name}</td>
        <td><a target="_blank"  href='https://${allWebsites[i].url}' class="btn btn-info"><i class="fa-solid fa-eye"></i> visit</a></td>
        <td><button onclick="deleteWebsite(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td></tr>`;
  }
  document.getElementById("new").innerHTML = content;
}
function deleteWebsite(index) {
  allWebsites.splice(index, 1);
  localStorage.setItem("websites", JSON.stringify(allWebsites));
  display();
}
function clr() {
  siteName.value = "";
  siteUrl.value = "";
}

function swl() {
  swal("the site name or its URL is not valid check them again", {
    buttons: {
      cancel: "rules for valid URL",
      catch: {
        text: "I got this",
        value: "catch",
      },
    },
  }).then((value) => {
    switch (value) {
      case "catch":
        swal("Go and Try again");
        break;

      default:
        swal(
          ">> site name should be more than (2) characters \n >> the URL may start with http:// and must end with .example"
        );
    }
  });
}
