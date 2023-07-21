// mock/user.bundled_gxferhf82nb.mjs
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibW9jay9tb2NrL3VzZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiQzpcXFxcVXNlcnNcXFxcY3p4XFxcXERlc2t0b3BcXFxcdml0ZS1wcm9qZWN0XFxcXG1vY2tcXFxcdXNlci50c1wiO2NvbnN0IF9faW5qZWN0ZWRfZGlybmFtZV9fID0gXCJDOlxcXFxVc2Vyc1xcXFxjenhcXFxcRGVza3RvcFxcXFx2aXRlLXByb2plY3RcXFxcbW9ja1wiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vQzovVXNlcnMvY3p4L0Rlc2t0b3Avdml0ZS1wcm9qZWN0L21vY2svdXNlci50c1wiOy8vXHU3NTI4XHU2MjM3XHU0RkUxXHU2MDZGXHU2NTcwXHU2MzZFXHJcbmZ1bmN0aW9uIGNyZWF0ZVVzZXJMaXN0KCkge1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHVzZXJJZDogMSxcclxuICAgICAgICAgICAgYXZhdGFyOlxyXG4gICAgICAgICAgICAgICAgJ2h0dHBzOi8vd3BpbWcud2FsbHN0Y24uY29tL2Y3Nzg3MzhjLWU0ZjgtNDg3MC1iNjM0LTU2NzAzYjRhY2FmZS5naWYnLFxyXG4gICAgICAgICAgICB1c2VybmFtZTogJ2FkbWluJyxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6ICcxMTExMTEnLFxyXG4gICAgICAgICAgICBkZXNjOiAnXHU1RTczXHU1M0YwXHU3QkExXHU3NDA2XHU1NDU4JyxcclxuICAgICAgICAgICAgcm9sZXM6IFsnXHU1RTczXHU1M0YwXHU3QkExXHU3NDA2XHU1NDU4J10sXHJcbiAgICAgICAgICAgIGJ1dHRvbnM6IFsnY3VzZXIuZGV0YWlsJ10sXHJcbiAgICAgICAgICAgIHJvdXRlczogWydob21lJ10sXHJcbiAgICAgICAgICAgIHRva2VuOiAnQWRtaW4gVG9rZW4nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB1c2VySWQ6IDIsXHJcbiAgICAgICAgICAgIGF2YXRhcjpcclxuICAgICAgICAgICAgICAgICdodHRwczovL3dwaW1nLndhbGxzdGNuLmNvbS9mNzc4NzM4Yy1lNGY4LTQ4NzAtYjYzNC01NjcwM2I0YWNhZmUuZ2lmJyxcclxuICAgICAgICAgICAgdXNlcm5hbWU6ICdzeXN0ZW0nLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogJzExMTExMScsXHJcbiAgICAgICAgICAgIGRlc2M6ICdcdTdDRkJcdTdFREZcdTdCQTFcdTc0MDZcdTU0NTgnLFxyXG4gICAgICAgICAgICByb2xlczogWydcdTdDRkJcdTdFREZcdTdCQTFcdTc0MDZcdTU0NTgnXSxcclxuICAgICAgICAgICAgYnV0dG9uczogWydjdXNlci5kZXRhaWwnLCAnY3VzZXIudXNlciddLFxyXG4gICAgICAgICAgICByb3V0ZXM6IFsnaG9tZSddLFxyXG4gICAgICAgICAgICB0b2tlbjogJ1N5c3RlbSBUb2tlbicsXHJcbiAgICAgICAgfSxcclxuICAgIF1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgW1xyXG4gICAgLy8gXHU3NTI4XHU2MjM3XHU3NjdCXHU1RjU1XHU2M0E1XHU1M0UzXHJcbiAgICB7XHJcbiAgICAgICAgdXJsOiAnL2FwaS91c2VyL2xvZ2luJywvL1x1OEJGN1x1NkM0Mlx1NTczMFx1NTc0MFxyXG4gICAgICAgIG1ldGhvZDogJ3Bvc3QnLC8vXHU4QkY3XHU2QzQyXHU2NUI5XHU1RjBGXHJcbiAgICAgICAgcmVzcG9uc2U6ICh7IGJvZHkgfSkgPT4ge1xyXG4gICAgICAgICAgICAvL1x1ODNCN1x1NTNENlx1OEJGN1x1NkM0Mlx1NEY1M1x1NjQzQVx1NUUyNlx1OEZDN1x1Njc2NVx1NzY4NFx1NzUyOFx1NjIzN1x1NTQwRFx1NEUwRVx1NUJDNlx1NzgwMVxyXG4gICAgICAgICAgICBjb25zdCB7IHVzZXJuYW1lLCBwYXNzd29yZCB9ID0gYm9keTtcclxuICAgICAgICAgICAgLy9cdThDMDNcdTc1MjhcdTgzQjdcdTUzRDZcdTc1MjhcdTYyMzdcdTRGRTFcdTYwNkZcdTUxRkRcdTY1NzAsXHU3NTI4XHU0RThFXHU1MjI0XHU2NUFEXHU2NjJGXHU1NDI2XHU2NzA5XHU2QjY0XHU3NTI4XHU2MjM3XHJcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrVXNlciA9IGNyZWF0ZVVzZXJMaXN0KCkuZmluZChcclxuICAgICAgICAgICAgICAgIChpdGVtKSA9PiBpdGVtLnVzZXJuYW1lID09PSB1c2VybmFtZSAmJiBpdGVtLnBhc3N3b3JkID09PSBwYXNzd29yZCxcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAvL1x1NkNBMVx1NjcwOVx1NzUyOFx1NjIzN1x1OEZENFx1NTZERVx1NTkzMVx1OEQyNVx1NEZFMVx1NjA2RlxyXG4gICAgICAgICAgICBpZiAoIWNoZWNrVXNlcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgY29kZTogMjAxLCBkYXRhOiB7IG1lc3NhZ2U6ICdcdThEMjZcdTUzRjdcdTYyMTZcdTgwMDVcdTVCQzZcdTc4MDFcdTRFMERcdTZCNjNcdTc4NkUnIH0gfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vXHU1OTgyXHU2NzlDXHU2NzA5XHU4RkQ0XHU1NkRFXHU2MjEwXHU1MjlGXHU0RkUxXHU2MDZGXHJcbiAgICAgICAgICAgIGNvbnN0IHsgdG9rZW4gfSA9IGNoZWNrVXNlclxyXG4gICAgICAgICAgICByZXR1cm4geyBjb2RlOiAyMDAsIGRhdGE6IHsgdG9rZW4gfSB9XHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICAvLyBcdTgzQjdcdTUzRDZcdTc1MjhcdTYyMzdcdTRGRTFcdTYwNkZcclxuICAgIHtcclxuICAgICAgICB1cmw6ICcvYXBpL3VzZXIvaW5mbycsXHJcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgICAgICByZXNwb25zZTogKHJlcXVlc3QpID0+IHtcclxuICAgICAgICAgICAgLy9cdTgzQjdcdTUzRDZcdThCRjdcdTZDNDJcdTU5MzRcdTY0M0FcdTVFMjZ0b2tlblxyXG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IHJlcXVlc3QuaGVhZGVycy50b2tlbjtcclxuICAgICAgICAgICAgLy9cdTY3RTVcdTc3MEJcdTc1MjhcdTYyMzdcdTRGRTFcdTYwNkZcdTY2MkZcdTU0MjZcdTUzMDVcdTU0MkJcdTY3MDlcdTZCMjF0b2tlblx1NzUyOFx1NjIzN1xyXG4gICAgICAgICAgICBjb25zdCBjaGVja1VzZXIgPSBjcmVhdGVVc2VyTGlzdCgpLmZpbmQoKGl0ZW0pID0+IGl0ZW0udG9rZW4gPT09IHRva2VuKVxyXG4gICAgICAgICAgICAvL1x1NkNBMVx1NjcwOVx1OEZENFx1NTZERVx1NTkzMVx1OEQyNVx1NzY4NFx1NEZFMVx1NjA2RlxyXG4gICAgICAgICAgICBpZiAoIWNoZWNrVXNlcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgY29kZTogMjAxLCBkYXRhOiB7IG1lc3NhZ2U6ICdcdTgzQjdcdTUzRDZcdTc1MjhcdTYyMzdcdTRGRTFcdTYwNkZcdTU5MzFcdThEMjUnIH0gfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vXHU1OTgyXHU2NzlDXHU2NzA5XHU4RkQ0XHU1NkRFXHU2MjEwXHU1MjlGXHU0RkUxXHU2MDZGXHJcbiAgICAgICAgICAgIHJldHVybiB7IGNvZGU6IDIwMCwgZGF0YToge2NoZWNrVXNlcn0gfVxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5dIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsaUJBQWlCO0FBQ3RCLFNBQU87SUFDSDtNQUNJLFFBQVE7TUFDUixRQUNJO01BQ0osVUFBVTtNQUNWLFVBQVU7TUFDVixNQUFNO01BQ04sT0FBTyxDQUFDLGdDQUFPO01BQ2YsU0FBUyxDQUFDLGNBQWM7TUFDeEIsUUFBUSxDQUFDLE1BQU07TUFDZixPQUFPO0lBQ1g7SUFDQTtNQUNJLFFBQVE7TUFDUixRQUNJO01BQ0osVUFBVTtNQUNWLFVBQVU7TUFDVixNQUFNO01BQ04sT0FBTyxDQUFDLGdDQUFPO01BQ2YsU0FBUyxDQUFDLGdCQUFnQixZQUFZO01BQ3RDLFFBQVEsQ0FBQyxNQUFNO01BQ2YsT0FBTztJQUNYO0VBQ0o7QUFDSjtBQUVBLElBQU8sZUFBUTs7RUFFWDtJQUNJLEtBQUs7O0lBQ0wsUUFBUTs7SUFDUixVQUFVLENBQUMsRUFBRSxLQUFLLE1BQU07QUFFcEIsWUFBTSxFQUFFLFVBQVUsU0FBUyxJQUFJO0FBRS9CLFlBQU0sWUFBWSxlQUFlLEVBQUU7UUFDL0IsQ0FBQyxTQUFTLEtBQUssYUFBYSxZQUFZLEtBQUssYUFBYTtNQUM5RDtBQUVBLFVBQUksQ0FBQyxXQUFXO0FBQ1osZUFBTyxFQUFFLE1BQU0sS0FBSyxNQUFNLEVBQUUsU0FBUyx5REFBWSxFQUFFO01BQ3ZEO0FBRUEsWUFBTSxFQUFFLE1BQU0sSUFBSTtBQUNsQixhQUFPLEVBQUUsTUFBTSxLQUFLLE1BQU0sRUFBRSxNQUFNLEVBQUU7SUFDeEM7RUFDSjs7RUFFQTtJQUNJLEtBQUs7SUFDTCxRQUFRO0lBQ1IsVUFBVSxDQUFDLFlBQVk7QUFFbkIsWUFBTSxRQUFRLFFBQVEsUUFBUTtBQUU5QixZQUFNLFlBQVksZUFBZSxFQUFFLEtBQUssQ0FBQyxTQUFTLEtBQUssVUFBVSxLQUFLO0FBRXRFLFVBQUksQ0FBQyxXQUFXO0FBQ1osZUFBTyxFQUFFLE1BQU0sS0FBSyxNQUFNLEVBQUUsU0FBUyxtREFBVyxFQUFFO01BQ3REO0FBRUEsYUFBTyxFQUFFLE1BQU0sS0FBSyxNQUFNLEVBQUMsVUFBUyxFQUFFO0lBQzFDO0VBQ0o7QUFDSjsiLAogICJuYW1lcyI6IFtdCn0K
