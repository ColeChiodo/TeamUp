function StoreTokens(response) {
    const refreshCookie = response.tokens.refresh.token;
    const refreshExpiration = response.tokens.refresh.expires;
    const accessCookie = response.tokens.access.token;
    const accessExpiration = response.tokens.access.expires;
    document.cookie = `refreshToken=${refreshCookie}; expires=${refreshExpiration}; path=/`;
    document.cookie = `accessToken=${accessCookie}; expires=${accessExpiration}; path=/`;
}

export default StoreTokens;