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

export const ratingAvg = (data: any[]): any => {
  let sum = 0;
  let length = 0;
  data.map((val: any) => {
    console.log(val)
    sum += val.rate;
    length++;
  });
  console.log(sum)
  const reviewCount = length || 1;
  console.log(parseFloat((sum / reviewCount || 0).toFixed(2)));
  return parseFloat((sum / reviewCount || 0).toFixed(2))
};
