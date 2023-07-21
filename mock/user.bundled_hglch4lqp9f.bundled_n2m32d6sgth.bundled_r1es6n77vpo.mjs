// mock/user.bundled_hglch4lqp9f.bundled_n2m32d6sgth.mjs
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibW9jay9tb2NrL21vY2svdXNlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX19pbmplY3RlZF9maWxlbmFtZV9fID0gXCJDOlxcXFxVc2Vyc1xcXFxjenhcXFxcRGVza3RvcFxcXFx2aXRlLXByb2plY3RcXFxcbW9ja1xcXFx1c2VyLnRzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIkM6XFxcXFVzZXJzXFxcXGN6eFxcXFxEZXNrdG9wXFxcXHZpdGUtcHJvamVjdFxcXFxtb2NrXCI7Y29uc3QgX19pbmplY3RlZF9pbXBvcnRfbWV0YV91cmxfXyA9IFwiZmlsZTovLy9DOi9Vc2Vycy9jengvRGVza3RvcC92aXRlLXByb2plY3QvbW9jay91c2VyLnRzXCI7Ly9cdTc1MjhcdTYyMzdcdTRGRTFcdTYwNkZcdTY1NzBcdTYzNkVcclxuZnVuY3Rpb24gY3JlYXRlVXNlckxpc3QoKSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdXNlcklkOiAxLFxyXG4gICAgICAgICAgICBhdmF0YXI6XHJcbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly93cGltZy53YWxsc3Rjbi5jb20vZjc3ODczOGMtZTRmOC00ODcwLWI2MzQtNTY3MDNiNGFjYWZlLmdpZicsXHJcbiAgICAgICAgICAgIHVzZXJuYW1lOiAnYWRtaW4nLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogJzExMTExMScsXHJcbiAgICAgICAgICAgIGRlc2M6ICdcdTVFNzNcdTUzRjBcdTdCQTFcdTc0MDZcdTU0NTgnLFxyXG4gICAgICAgICAgICByb2xlczogWydcdTVFNzNcdTUzRjBcdTdCQTFcdTc0MDZcdTU0NTgnXSxcclxuICAgICAgICAgICAgYnV0dG9uczogWydjdXNlci5kZXRhaWwnXSxcclxuICAgICAgICAgICAgcm91dGVzOiBbJ2hvbWUnXSxcclxuICAgICAgICAgICAgdG9rZW46ICdBZG1pbiBUb2tlbicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHVzZXJJZDogMixcclxuICAgICAgICAgICAgYXZhdGFyOlxyXG4gICAgICAgICAgICAgICAgJ2h0dHBzOi8vd3BpbWcud2FsbHN0Y24uY29tL2Y3Nzg3MzhjLWU0ZjgtNDg3MC1iNjM0LTU2NzAzYjRhY2FmZS5naWYnLFxyXG4gICAgICAgICAgICB1c2VybmFtZTogJ3N5c3RlbScsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiAnMTExMTExJyxcclxuICAgICAgICAgICAgZGVzYzogJ1x1N0NGQlx1N0VERlx1N0JBMVx1NzQwNlx1NTQ1OCcsXHJcbiAgICAgICAgICAgIHJvbGVzOiBbJ1x1N0NGQlx1N0VERlx1N0JBMVx1NzQwNlx1NTQ1OCddLFxyXG4gICAgICAgICAgICBidXR0b25zOiBbJ2N1c2VyLmRldGFpbCcsICdjdXNlci51c2VyJ10sXHJcbiAgICAgICAgICAgIHJvdXRlczogWydob21lJ10sXHJcbiAgICAgICAgICAgIHRva2VuOiAnU3lzdGVtIFRva2VuJyxcclxuICAgICAgICB9LFxyXG4gICAgXVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBbXHJcbiAgICAvLyBcdTc1MjhcdTYyMzdcdTc2N0JcdTVGNTVcdTYzQTVcdTUzRTNcclxuICAgIHtcclxuICAgICAgICB1cmw6ICcvYXBpL3VzZXIvbG9naW4nLC8vXHU4QkY3XHU2QzQyXHU1NzMwXHU1NzQwXHJcbiAgICAgICAgbWV0aG9kOiAncG9zdCcsLy9cdThCRjdcdTZDNDJcdTY1QjlcdTVGMEZcclxuICAgICAgICByZXNwb25zZTogKHsgYm9keSB9KSA9PiB7XHJcbiAgICAgICAgICAgIC8vXHU4M0I3XHU1M0Q2XHU4QkY3XHU2QzQyXHU0RjUzXHU2NDNBXHU1RTI2XHU4RkM3XHU2NzY1XHU3Njg0XHU3NTI4XHU2MjM3XHU1NDBEXHU0RTBFXHU1QkM2XHU3ODAxXHJcbiAgICAgICAgICAgIGNvbnN0IHsgdXNlcm5hbWUsIHBhc3N3b3JkIH0gPSBib2R5O1xyXG4gICAgICAgICAgICAvL1x1OEMwM1x1NzUyOFx1ODNCN1x1NTNENlx1NzUyOFx1NjIzN1x1NEZFMVx1NjA2Rlx1NTFGRFx1NjU3MCxcdTc1MjhcdTRFOEVcdTUyMjRcdTY1QURcdTY2MkZcdTU0MjZcdTY3MDlcdTZCNjRcdTc1MjhcdTYyMzdcclxuICAgICAgICAgICAgY29uc3QgY2hlY2tVc2VyID0gY3JlYXRlVXNlckxpc3QoKS5maW5kKFxyXG4gICAgICAgICAgICAgICAgKGl0ZW0pID0+IGl0ZW0udXNlcm5hbWUgPT09IHVzZXJuYW1lICYmIGl0ZW0ucGFzc3dvcmQgPT09IHBhc3N3b3JkLFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC8vXHU2Q0ExXHU2NzA5XHU3NTI4XHU2MjM3XHU4RkQ0XHU1NkRFXHU1OTMxXHU4RDI1XHU0RkUxXHU2MDZGXHJcbiAgICAgICAgICAgIGlmICghY2hlY2tVc2VyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyBjb2RlOiAyMDEsIGRhdGE6IHsgbWVzc2FnZTogJ1x1OEQyNlx1NTNGN1x1NjIxNlx1ODAwNVx1NUJDNlx1NzgwMVx1NEUwRFx1NkI2M1x1Nzg2RScgfSB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9cdTU5ODJcdTY3OUNcdTY3MDlcdThGRDRcdTU2REVcdTYyMTBcdTUyOUZcdTRGRTFcdTYwNkZcclxuICAgICAgICAgICAgY29uc3QgeyB0b2tlbiB9ID0gY2hlY2tVc2VyXHJcbiAgICAgICAgICAgIHJldHVybiB7IGNvZGU6IDIwMCwgZGF0YTogeyB0b2tlbiB9IH1cclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIC8vIFx1ODNCN1x1NTNENlx1NzUyOFx1NjIzN1x1NEZFMVx1NjA2RlxyXG4gICAge1xyXG4gICAgICAgIHVybDogJy9hcGkvdXNlci9pbmZvJyxcclxuICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgICAgIHJlc3BvbnNlOiAocmVxdWVzdCkgPT4ge1xyXG4gICAgICAgICAgICAvL1x1ODNCN1x1NTNENlx1OEJGN1x1NkM0Mlx1NTkzNFx1NjQzQVx1NUUyNnRva2VuXHJcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gcmVxdWVzdC5oZWFkZXJzLnRva2VuO1xyXG4gICAgICAgICAgICAvL1x1NjdFNVx1NzcwQlx1NzUyOFx1NjIzN1x1NEZFMVx1NjA2Rlx1NjYyRlx1NTQyNlx1NTMwNVx1NTQyQlx1NjcwOVx1NkIyMXRva2VuXHU3NTI4XHU2MjM3XHJcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrVXNlciA9IGNyZWF0ZVVzZXJMaXN0KCkuZmluZCgoaXRlbSkgPT4gaXRlbS50b2tlbiA9PT0gdG9rZW4pXHJcbiAgICAgICAgICAgIC8vXHU2Q0ExXHU2NzA5XHU4RkQ0XHU1NkRFXHU1OTMxXHU4RDI1XHU3Njg0XHU0RkUxXHU2MDZGXHJcbiAgICAgICAgICAgIGlmICghY2hlY2tVc2VyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyBjb2RlOiAyMDEsIGRhdGE6IHsgbWVzc2FnZTogJ1x1ODNCN1x1NTNENlx1NzUyOFx1NjIzN1x1NEZFMVx1NjA2Rlx1NTkzMVx1OEQyNScgfSB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9cdTU5ODJcdTY3OUNcdTY3MDlcdThGRDRcdTU2REVcdTYyMTBcdTUyOUZcdTRGRTFcdTYwNkZcclxuICAgICAgICAgICAgcmV0dXJuIHsgY29kZTogMjAwLCBkYXRhOiB7Y2hlY2tVc2VyfSB9XHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbl0iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxpQkFBaUI7QUFDdEIsU0FBTztJQUNIO01BQ0ksUUFBUTtNQUNSLFFBQ0k7TUFDSixVQUFVO01BQ1YsVUFBVTtNQUNWLE1BQU07TUFDTixPQUFPLENBQUMsZ0NBQU87TUFDZixTQUFTLENBQUMsY0FBYztNQUN4QixRQUFRLENBQUMsTUFBTTtNQUNmLE9BQU87SUFDWDtJQUNBO01BQ0ksUUFBUTtNQUNSLFFBQ0k7TUFDSixVQUFVO01BQ1YsVUFBVTtNQUNWLE1BQU07TUFDTixPQUFPLENBQUMsZ0NBQU87TUFDZixTQUFTLENBQUMsZ0JBQWdCLFlBQVk7TUFDdEMsUUFBUSxDQUFDLE1BQU07TUFDZixPQUFPO0lBQ1g7RUFDSjtBQUNKO0FBRUEsSUFBTyxlQUFROztFQUVYO0lBQ0ksS0FBSzs7SUFDTCxRQUFROztJQUNSLFVBQVUsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUVwQixZQUFNLEVBQUUsVUFBVSxTQUFTLElBQUk7QUFFL0IsWUFBTSxZQUFZLGVBQWUsRUFBRTtRQUMvQixDQUFDLFNBQVMsS0FBSyxhQUFhLFlBQVksS0FBSyxhQUFhO01BQzlEO0FBRUEsVUFBSSxDQUFDLFdBQVc7QUFDWixlQUFPLEVBQUUsTUFBTSxLQUFLLE1BQU0sRUFBRSxTQUFTLHlEQUFZLEVBQUU7TUFDdkQ7QUFFQSxZQUFNLEVBQUUsTUFBTSxJQUFJO0FBQ2xCLGFBQU8sRUFBRSxNQUFNLEtBQUssTUFBTSxFQUFFLE1BQU0sRUFBRTtJQUN4QztFQUNKOztFQUVBO0lBQ0ksS0FBSztJQUNMLFFBQVE7SUFDUixVQUFVLENBQUMsWUFBWTtBQUVuQixZQUFNLFFBQVEsUUFBUSxRQUFRO0FBRTlCLFlBQU0sWUFBWSxlQUFlLEVBQUUsS0FBSyxDQUFDLFNBQVMsS0FBSyxVQUFVLEtBQUs7QUFFdEUsVUFBSSxDQUFDLFdBQVc7QUFDWixlQUFPLEVBQUUsTUFBTSxLQUFLLE1BQU0sRUFBRSxTQUFTLG1EQUFXLEVBQUU7TUFDdEQ7QUFFQSxhQUFPLEVBQUUsTUFBTSxLQUFLLE1BQU0sRUFBQyxVQUFTLEVBQUU7SUFDMUM7RUFDSjtBQUNKOyIsCiAgIm5hbWVzIjogW10KfQo=
