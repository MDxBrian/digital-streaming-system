

const apiUsers = require("./api/users");
const apiLogin = require("./api/login");

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

export const ratingAvg = (data: any[]): any => {
  let sum = 0;
  let length = 0;
  data.forEach((val: any) => {
    sum += val.rate;
    length++;
  });
  const reviewCount = length || 1;
  return parseFloat((sum / reviewCount || 0).toFixed(2));
};

export const checkUsers = async () => {
  const res = await apiUsers.getAllUsers();
  const payload = {
    firstName: "IAM",
    lastName: "Admin",
    email: "admin@root.com",
    password: "admin123",
    roleId: 1,
    active: true,
  };
  !res.length && (await apiLogin.registerUser(payload));
};
