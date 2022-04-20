## Nextjs Setup Custom Server
- To use cookie based auth system, we need to have both client and server running on the same origin/domain
- We need to use proxy for that because our client/next.js is running on 3000 and our server is running on 8000
- To use proxy we need to create custom server, which is only for development mode.
- In production, we will use same origin/domain, so we don't have to worry about it.
- We can simply run build then start next app

```javascript
npm install http-proxy-middleware
```

Can we use proxy instead of setting up custom next dev server?
- To use httpOnly cookie, you need to run both client/server in the same origin. Because we are running client/server is different origin we need to use proxy.
- https://velog.io/@bigbrothershin/Frontend-Next.js%EC%99%80-express-%EC%97%B0%EA%B2%B0%ED%95%98%EA%B8%B0

- Axios Interceptors
- CSRF(Cross-Site Request Forgery)
- https://itstory.tk/entry/CSRF-%EA%B3%B5%EA%B2%A9%EC%9D%B4%EB%9E%80-%EA%B7%B8%EB%A6%AC%EA%B3%A0-CSRF-%EB%B0%A9%EC%96%B4-%EB%B0%A9%EB%B2%95
- https://www.synopsys.com/glossary/what-is-csrf.html#:~:text=Cross%2DSite%20Request%20Forgery%20(CSRF)%20is%20an%20attack%20that,has%20in%20an%20authenticated%20user.
```javascript
npm install csurf
```

- Protected Route
- Create a protected page and restrict only to logged in user with valid token to verify if token is valid, you need to send request to backend
- (Browser will include cookie token in headers automatically)
- If you get successful response then you can show the protected page to the user