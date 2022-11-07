export const setCookie = (
  cname: string,
  cvalue: string,
  exdays = 15 /* 15 days */
) => {
  const now = new Date();
  const expireMs = exdays * 24 * 60 * 60 * 1000;
  now.setTime(now.getTime() + expireMs);

  return (document.cookie = `${cname}=${cvalue};expires=${now.toUTCString()};path=/`);
};

export const getCookie = (cname: string) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
