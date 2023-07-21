// mock/user.bundled_0847lrsrw46k.bundled_1dnnwrmynli.bundled_7a092idkrpb.mjs
function createUserList() {
  return [
    {
      userId: 1,
      avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      username: "admin",
      password: "111111",
      desc: "\u5E73\u53F0\u7BA1\u7406\u5458",
      roles: ["\u5E73\u53F0\u7BA1\u7406\u5458"],
      buttons: ["cuser.detail"],
      routes: ["home"],
      token: "Admin Token"
    },
    {
      userId: 2,
      avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      username: "system",
      password: "111111",
      desc: "\u7CFB\u7EDF\u7BA1\u7406\u5458",
      roles: ["\u7CFB\u7EDF\u7BA1\u7406\u5458"],
      buttons: ["cuser.detail", "cuser.user"],
      routes: ["home"],
      token: "System Token"
    }
  ];
}
var user_default = [
  // 用户登录接口
  {
    url: "/api/user/login",
    //请求地址
    method: "post",
    //请求方式
    response: ({ body }) => {
      const { username, password } = body;
      const checkUser = createUserList().find(
        (item) => item.username === username && item.password === password
      );
      if (!checkUser) {
        return { code: 201, data: { message: "\u8D26\u53F7\u6216\u8005\u5BC6\u7801\u4E0D\u6B63\u786E" } };
      }
      const { token } = checkUser;
      return { code: 200, data: { token } };
    }
  },
  // 获取用户信息
  {
    url: "/api/user/info",
    method: "get",
    response: (request) => {
      const token = request.headers.token;
      const checkUser = createUserList().find((item) => item.token === token);
      if (!checkUser) {
        return { code: 201, data: { message: "\u83B7\u53D6\u7528\u6237\u4FE1\u606F\u5931\u8D25" } };
      }
      return { code: 200, data: { checkUser } };
    }
  }
];
export {
  user_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibW9jay9tb2NrL21vY2svbW9jay91c2VyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX2luamVjdGVkX2ZpbGVuYW1lX18gPSBcIkM6XFxcXFVzZXJzXFxcXGN6eFxcXFxEZXNrdG9wXFxcXHZpdGUtcHJvamVjdFxcXFxtb2NrXFxcXHVzZXIudHNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiQzpcXFxcVXNlcnNcXFxcY3p4XFxcXERlc2t0b3BcXFxcdml0ZS1wcm9qZWN0XFxcXG1vY2tcIjtjb25zdCBfX2luamVjdGVkX2ltcG9ydF9tZXRhX3VybF9fID0gXCJmaWxlOi8vL0M6L1VzZXJzL2N6eC9EZXNrdG9wL3ZpdGUtcHJvamVjdC9tb2NrL3VzZXIudHNcIjsvL1x1NzUyOFx1NjIzN1x1NEZFMVx1NjA2Rlx1NjU3MFx1NjM2RVxyXG5mdW5jdGlvbiBjcmVhdGVVc2VyTGlzdCgpIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB1c2VySWQ6IDEsXHJcbiAgICAgICAgICAgIGF2YXRhcjpcclxuICAgICAgICAgICAgICAgICdodHRwczovL3dwaW1nLndhbGxzdGNuLmNvbS9mNzc4NzM4Yy1lNGY4LTQ4NzAtYjYzNC01NjcwM2I0YWNhZmUuZ2lmJyxcclxuICAgICAgICAgICAgdXNlcm5hbWU6ICdhZG1pbicsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiAnMTExMTExJyxcclxuICAgICAgICAgICAgZGVzYzogJ1x1NUU3M1x1NTNGMFx1N0JBMVx1NzQwNlx1NTQ1OCcsXHJcbiAgICAgICAgICAgIHJvbGVzOiBbJ1x1NUU3M1x1NTNGMFx1N0JBMVx1NzQwNlx1NTQ1OCddLFxyXG4gICAgICAgICAgICBidXR0b25zOiBbJ2N1c2VyLmRldGFpbCddLFxyXG4gICAgICAgICAgICByb3V0ZXM6IFsnaG9tZSddLFxyXG4gICAgICAgICAgICB0b2tlbjogJ0FkbWluIFRva2VuJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdXNlcklkOiAyLFxyXG4gICAgICAgICAgICBhdmF0YXI6XHJcbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly93cGltZy53YWxsc3Rjbi5jb20vZjc3ODczOGMtZTRmOC00ODcwLWI2MzQtNTY3MDNiNGFjYWZlLmdpZicsXHJcbiAgICAgICAgICAgIHVzZXJuYW1lOiAnc3lzdGVtJyxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6ICcxMTExMTEnLFxyXG4gICAgICAgICAgICBkZXNjOiAnXHU3Q0ZCXHU3RURGXHU3QkExXHU3NDA2XHU1NDU4JyxcclxuICAgICAgICAgICAgcm9sZXM6IFsnXHU3Q0ZCXHU3RURGXHU3QkExXHU3NDA2XHU1NDU4J10sXHJcbiAgICAgICAgICAgIGJ1dHRvbnM6IFsnY3VzZXIuZGV0YWlsJywgJ2N1c2VyLnVzZXInXSxcclxuICAgICAgICAgICAgcm91dGVzOiBbJ2hvbWUnXSxcclxuICAgICAgICAgICAgdG9rZW46ICdTeXN0ZW0gVG9rZW4nLFxyXG4gICAgICAgIH0sXHJcbiAgICBdXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFtcclxuICAgIC8vIFx1NzUyOFx1NjIzN1x1NzY3Qlx1NUY1NVx1NjNBNVx1NTNFM1xyXG4gICAge1xyXG4gICAgICAgIHVybDogJy9hcGkvdXNlci9sb2dpbicsLy9cdThCRjdcdTZDNDJcdTU3MzBcdTU3NDBcclxuICAgICAgICBtZXRob2Q6ICdwb3N0JywvL1x1OEJGN1x1NkM0Mlx1NjVCOVx1NUYwRlxyXG4gICAgICAgIHJlc3BvbnNlOiAoeyBib2R5IH0pID0+IHtcclxuICAgICAgICAgICAgLy9cdTgzQjdcdTUzRDZcdThCRjdcdTZDNDJcdTRGNTNcdTY0M0FcdTVFMjZcdThGQzdcdTY3NjVcdTc2ODRcdTc1MjhcdTYyMzdcdTU0MERcdTRFMEVcdTVCQzZcdTc4MDFcclxuICAgICAgICAgICAgY29uc3QgeyB1c2VybmFtZSwgcGFzc3dvcmQgfSA9IGJvZHk7XHJcbiAgICAgICAgICAgIC8vXHU4QzAzXHU3NTI4XHU4M0I3XHU1M0Q2XHU3NTI4XHU2MjM3XHU0RkUxXHU2MDZGXHU1MUZEXHU2NTcwLFx1NzUyOFx1NEU4RVx1NTIyNFx1NjVBRFx1NjYyRlx1NTQyNlx1NjcwOVx1NkI2NFx1NzUyOFx1NjIzN1xyXG4gICAgICAgICAgICBjb25zdCBjaGVja1VzZXIgPSBjcmVhdGVVc2VyTGlzdCgpLmZpbmQoXHJcbiAgICAgICAgICAgICAgICAoaXRlbSkgPT4gaXRlbS51c2VybmFtZSA9PT0gdXNlcm5hbWUgJiYgaXRlbS5wYXNzd29yZCA9PT0gcGFzc3dvcmQsXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLy9cdTZDQTFcdTY3MDlcdTc1MjhcdTYyMzdcdThGRDRcdTU2REVcdTU5MzFcdThEMjVcdTRGRTFcdTYwNkZcclxuICAgICAgICAgICAgaWYgKCFjaGVja1VzZXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IGNvZGU6IDIwMSwgZGF0YTogeyBtZXNzYWdlOiAnXHU4RDI2XHU1M0Y3XHU2MjE2XHU4MDA1XHU1QkM2XHU3ODAxXHU0RTBEXHU2QjYzXHU3ODZFJyB9IH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL1x1NTk4Mlx1Njc5Q1x1NjcwOVx1OEZENFx1NTZERVx1NjIxMFx1NTI5Rlx1NEZFMVx1NjA2RlxyXG4gICAgICAgICAgICBjb25zdCB7IHRva2VuIH0gPSBjaGVja1VzZXJcclxuICAgICAgICAgICAgcmV0dXJuIHsgY29kZTogMjAwLCBkYXRhOiB7IHRva2VuIH0gfVxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgLy8gXHU4M0I3XHU1M0Q2XHU3NTI4XHU2MjM3XHU0RkUxXHU2MDZGXHJcbiAgICB7XHJcbiAgICAgICAgdXJsOiAnL2FwaS91c2VyL2luZm8nLFxyXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgcmVzcG9uc2U6IChyZXF1ZXN0KSA9PiB7XHJcbiAgICAgICAgICAgIC8vXHU4M0I3XHU1M0Q2XHU4QkY3XHU2QzQyXHU1OTM0XHU2NDNBXHU1RTI2dG9rZW5cclxuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSByZXF1ZXN0LmhlYWRlcnMudG9rZW47XHJcbiAgICAgICAgICAgIC8vXHU2N0U1XHU3NzBCXHU3NTI4XHU2MjM3XHU0RkUxXHU2MDZGXHU2NjJGXHU1NDI2XHU1MzA1XHU1NDJCXHU2NzA5XHU2QjIxdG9rZW5cdTc1MjhcdTYyMzdcclxuICAgICAgICAgICAgY29uc3QgY2hlY2tVc2VyID0gY3JlYXRlVXNlckxpc3QoKS5maW5kKChpdGVtKSA9PiBpdGVtLnRva2VuID09PSB0b2tlbilcclxuICAgICAgICAgICAgLy9cdTZDQTFcdTY3MDlcdThGRDRcdTU2REVcdTU5MzFcdThEMjVcdTc2ODRcdTRGRTFcdTYwNkZcclxuICAgICAgICAgICAgaWYgKCFjaGVja1VzZXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IGNvZGU6IDIwMSwgZGF0YTogeyBtZXNzYWdlOiAnXHU4M0I3XHU1M0Q2XHU3NTI4XHU2MjM3XHU0RkUxXHU2MDZGXHU1OTMxXHU4RDI1JyB9IH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL1x1NTk4Mlx1Njc5Q1x1NjcwOVx1OEZENFx1NTZERVx1NjIxMFx1NTI5Rlx1NEZFMVx1NjA2RlxyXG4gICAgICAgICAgICByZXR1cm4geyBjb2RlOiAyMDAsIGRhdGE6IHtjaGVja1VzZXJ9IH1cclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXSJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLGlCQUFpQjtBQUN0QixTQUFPO0lBQ0g7TUFDSSxRQUFRO01BQ1IsUUFDSTtNQUNKLFVBQVU7TUFDVixVQUFVO01BQ1YsTUFBTTtNQUNOLE9BQU8sQ0FBQyxnQ0FBTztNQUNmLFNBQVMsQ0FBQyxjQUFjO01BQ3hCLFFBQVEsQ0FBQyxNQUFNO01BQ2YsT0FBTztJQUNYO0lBQ0E7TUFDSSxRQUFRO01BQ1IsUUFDSTtNQUNKLFVBQVU7TUFDVixVQUFVO01BQ1YsTUFBTTtNQUNOLE9BQU8sQ0FBQyxnQ0FBTztNQUNmLFNBQVMsQ0FBQyxnQkFBZ0IsWUFBWTtNQUN0QyxRQUFRLENBQUMsTUFBTTtNQUNmLE9BQU87SUFDWDtFQUNKO0FBQ0o7QUFFQSxJQUFPLGVBQVE7O0VBRVg7SUFDSSxLQUFLOztJQUNMLFFBQVE7O0lBQ1IsVUFBVSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBRXBCLFlBQU0sRUFBRSxVQUFVLFNBQVMsSUFBSTtBQUUvQixZQUFNLFlBQVksZUFBZSxFQUFFO1FBQy9CLENBQUMsU0FBUyxLQUFLLGFBQWEsWUFBWSxLQUFLLGFBQWE7TUFDOUQ7QUFFQSxVQUFJLENBQUMsV0FBVztBQUNaLGVBQU8sRUFBRSxNQUFNLEtBQUssTUFBTSxFQUFFLFNBQVMseURBQVksRUFBRTtNQUN2RDtBQUVBLFlBQU0sRUFBRSxNQUFNLElBQUk7QUFDbEIsYUFBTyxFQUFFLE1BQU0sS0FBSyxNQUFNLEVBQUUsTUFBTSxFQUFFO0lBQ3hDO0VBQ0o7O0VBRUE7SUFDSSxLQUFLO0lBQ0wsUUFBUTtJQUNSLFVBQVUsQ0FBQyxZQUFZO0FBRW5CLFlBQU0sUUFBUSxRQUFRLFFBQVE7QUFFOUIsWUFBTSxZQUFZLGVBQWUsRUFBRSxLQUFLLENBQUMsU0FBUyxLQUFLLFVBQVUsS0FBSztBQUV0RSxVQUFJLENBQUMsV0FBVztBQUNaLGVBQU8sRUFBRSxNQUFNLEtBQUssTUFBTSxFQUFFLFNBQVMsbURBQVcsRUFBRTtNQUN0RDtBQUVBLGFBQU8sRUFBRSxNQUFNLEtBQUssTUFBTSxFQUFDLFVBQVMsRUFBRTtJQUMxQztFQUNKO0FBQ0o7IiwKICAibmFtZXMiOiBbXQp9Cg==
