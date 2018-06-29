function addCss(fileName) {
  const head = document.head;
  const link = document.createElement('link');

  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = fileName;

  head.appendChild(link);
}

addCss('https://dripform.now.sh/css/toggle.css');
const dripForm = '<button id="dripform-container" onclick="toggleDripform()">' +
                      '<img src="https://dripform.now.sh/img/toggle-form.png" />' +
                      '<p> Feedback?</p>' +
                    '</button>' +
                    '<div id="dripform-box">' +
                      '<div class="top-bar">' +
                        '<p>Feedback</p>' +
                        '<p class="close" onclick="closeDripform()">-</p>' +
                      '</div>' +
                        '<div class="content">' +
                        '<form action="https://dripform.now.sh/api/send-message" method="post">' +
                          '<p class="label">Email</p>' +
                          '<input type="email" name="email" placeholder="Enter your email.." required>' +
                          '<p class="label">Message</p>' +
                          '<textarea type="text" name="message" placeholder="Enter your feedback or message.." required></textarea>' +
                          '<input name="user" value="547308779" type="hidden" required/>' +
                          '<button>Submit</button>' +
                        '</form>' +
                      '</div>' +
                      '<div class="footer">' +
                        '<p>Powered by <a href="https://dripform.now.sh">Dripform</a>' +
                        '</p></div></div>';
document.body.innerHTML += dripForm;
function toggleDripform() {
  const x = document.getElementById('dripform-box');
  x.style.display = 'block';
}

function closeDripform() {
  const x = document.getElementById('dripform-box');
  x.style.display = 'none';
}
