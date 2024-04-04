function CheckToken(){
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      if (cookies[i].includes('accessToken')) {
        return true;
      }
    }
}
export default CheckToken;