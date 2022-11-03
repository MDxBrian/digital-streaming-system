export const setCookie = (cname: string, cvalue: string, exdays = 15 /* 15 days */) => {
    
    const now = new Date();
    const expireMs = exdays * 24 * 60 * 60 * 1000;
    now.setTime(now.getTime() + expireMs);
  
    return (document.cookie = `${cname}=${cvalue};expires=${now.toUTCString()};path=/`);
  };
  